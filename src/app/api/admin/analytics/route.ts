import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const propertyId = process.env.GA_PROPERTY_ID || ''

function getAnalyticsClient() {
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const clientEmail = process.env.GA_CLIENT_EMAIL

  if (!privateKey || !clientEmail || !propertyId) {
    return null
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  })
}

export async function GET(request: Request) {
  try {
    // Auth check — admin only
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    const session = verifyAdminToken(token)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const days = searchParams.get('days') || '30'
    const startDate = `${days}daysAgo`

    const analyticsClient = getAnalyticsClient()
    if (!analyticsClient) {
      return NextResponse.json({ error: 'GA4 credentials not configured.' }, { status: 503 })
    }

    // Run all GA4 reports in parallel
    const [overviewReport, pageReport, sourceReport, countryReport] = await Promise.all([
      // Overview metrics: sessions, users, page views, bounce rate
      analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: 'today' }],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      }),

      // Top pages
      analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 8,
      }),

      // Traffic sources
      analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 6,
      }),

      // Top countries
      analyticsClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 6,
      }),
    ])

    // Parse overview
    const overviewRow = overviewReport[0]?.rows?.[0]
    const overview = {
      sessions: overviewRow?.metricValues?.[0]?.value || '0',
      users: overviewRow?.metricValues?.[1]?.value || '0',
      pageViews: overviewRow?.metricValues?.[2]?.value || '0',
      bounceRate: Number(overviewRow?.metricValues?.[3]?.value || 0).toFixed(1),
      avgSessionDuration: Math.round(Number(overviewRow?.metricValues?.[4]?.value || 0)),
    }

    // Parse top pages
    const topPages = (pageReport[0]?.rows || []).map(row => ({
      path: row.dimensionValues?.[0]?.value || '',
      title: row.dimensionValues?.[1]?.value || '',
      views: row.metricValues?.[0]?.value || '0',
      users: row.metricValues?.[1]?.value || '0',
    }))

    // Parse traffic sources
    const trafficSources = (sourceReport[0]?.rows || []).map(row => ({
      channel: row.dimensionValues?.[0]?.value || 'Other',
      sessions: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    }))

    // Parse countries
    const topCountries = (countryReport[0]?.rows || []).map(row => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: Number(row.metricValues?.[0]?.value || 0),
      sessions: Number(row.metricValues?.[1]?.value || 0),
    }))

    return NextResponse.json({
      success: true,
      days: Number(days),
      overview,
      topPages,
      trafficSources,
      topCountries,
    })
  } catch (error: any) {
    console.error('GA4 API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics data.' },
      { status: 500 }
    )
  }
}
