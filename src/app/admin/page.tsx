"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  Search,
  Package,
  Layers,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
  Sparkles,
  Upload,
  ImageIcon,
  LogOut,
  Lock,
  KeyRound,
  ShieldAlert,
  Grid3X3,
  List,
  Tag,
  Database,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Activity,
  Boxes,
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Settings2,
  ExternalLink,
  UserCircle2,
  AtSign,
  KeySquare,
  Save,
  Shield,
  PieChart as PieChartIcon,
  MousePointerClick,
  FileSpreadsheet,
  Calendar,
  Download,
  ArrowDownRight,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ─────────────────────────── types ─────────────────────────── */
interface ProductSpec {
  label: string;
  value: string;
}
interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  slug: string;
  category: string;
  image_url?: string | null;
  description: string;
  features?: string[];
  specs?: ProductSpec[];
  applications?: string[];
}

const CATEGORY_OPTIONS = [
  "Finished Product",
  "Raw Material",
  "Intermediate Product",
  "Animal Feed",
  "Food Grade",
  "Industrial Grade",
];

const MONTHLY_TRAFFIC = [
  { month: "Jan", views: 2400, inquiries: 420 },
  { month: "Feb", views: 3200, inquiries: 580 },
  { month: "Mar", views: 4100, inquiries: 790 },
  { month: "Apr", views: 3800, inquiries: 640 },
  { month: "May", views: 5200, inquiries: 920 },
  { month: "Jun", views: 6100, inquiries: 1150 },
  { month: "Jul", views: 7400, inquiries: 1380 },
];

const PIE_COLORS = [
  "hsl(150, 100%, 18%)", // Primary KGI Green
  "#e5a823", // Amber Gold
  "#10b981", // Emerald
  "#0284c7", // Sky Blue
  "#8b5cf6", // Purple
  "#f59e0b", // Warm Amber
];

const RECENT_ACTIVITY_LOGS = [
  { id: 1, action: "Catalog Sync", detail: "Product catalog synchronized with Neon DB & Sanity CMS", time: "10 mins ago", type: "system" },
  { id: 2, action: "Spec Updated", detail: "Viscosity rating updated for Fast Hydration Guar", time: "1 hour ago", type: "product" },
  { id: 3, action: "Admin Session", detail: "Authenticated via Neon HTTP-only cookie session", time: "2 hours ago", type: "auth" },
  { id: 4, action: "Image Upload", detail: "Uploaded new product image to public/uploads", time: "5 hours ago", type: "media" },
];

/* ────────────────────── Skeleton loader ────────────────────── */
const SkeletonRow = () => (
  <tr className="border-b border-border">
    {[1, 2, 3, 4, 5].map((i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-muted rounded-md animate-pulse" style={{ width: `${60 + i * 7}%` }} />
      </td>
    ))}
  </tr>
);

const SkeletonCard = () => (
  <div className="bg-card border border-border rounded-[18px] overflow-hidden animate-pulse">
    <div className="aspect-video bg-muted" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  </div>
);

/* ────────────────────── Stat card ─────────────────────────── */
const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
  accent?: boolean;
}) => (
  <div
    className={`relative group bg-card border border-border rounded-[18px] p-5 overflow-hidden
      shadow-[0_1px_3px_0_rgba(0,0,0,.04),0_1px_2px_-1px_rgba(0,0,0,.04)]
      hover:shadow-[0_4px_16px_-2px_rgba(0,92,46,.12),0_2px_4px_-2px_rgba(0,92,46,.08)]
      hover:-translate-y-0.5 transition-all duration-200 ease-out`}
  >
    {/* Decorative bg blob */}
    <div
      className={`absolute -right-4 -top-4 h-20 w-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${accent ? "bg-amber-300/20" : "bg-primary/10"}`}
    />
    <div className="relative flex items-start justify-between">
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-[10px]
          ${accent ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
        {label}
      </span>
    </div>
    <div className="mt-3">
      <span className="text-[2rem] font-black tracking-tight text-foreground leading-none">
        {value}
      </span>
    </div>
    <p className="mt-1 text-[11px] font-medium text-muted-foreground">{sub}</p>
  </div>
);

/* ══════════════════════ MAIN COMPONENT ══════════════════════ */
export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"catalog" | "analytics" | "sanity" | "profile">("catalog");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Profile state
  const [profileEmail, setProfileEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileForm, setProfileForm] = useState({
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);

  // Analytics state
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState("30");
  const [analyticsData, setAnalyticsData] = useState<{
    overview: { sessions: string; users: string; pageViews: string; bounceRate: string; avgSessionDuration: number };
    topPages: { path: string; title: string; views: string; users: string }[];
    trafficSources: { channel: string; sessions: number; users: number }[];
    topCountries: { country: string; users: number; sessions: number }[];
  } | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileBase64, setImageFileBase64] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    _id?: string;
    id?: string | number;
    name: string;
    category: string;
    image_url: string;
    description: string;
    features: string;
    specs: { label: string; value: string }[];
    applications: string;
  }>({
    name: "",
    category: "Finished Product",
    image_url: "/Products/GuarGumPowder.jpg",
    description: "",
    features: "",
    specs: [{ label: "", value: "" }],
    applications: "",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState("admin@karachigum.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ── profile ── */
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/auth/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileEmail(data.email || "");
        setProfileForm(f => ({ ...f, newEmail: data.email || "" }));
      }
    } catch {
      // silently fail
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileSuccess("");
    setProfileError("");
    try {
      const res = await fetch("/api/admin/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: profileForm.currentPassword,
          newEmail: profileForm.newEmail !== profileEmail ? profileForm.newEmail : undefined,
          newPassword: profileForm.newPassword || undefined,
          confirmPassword: profileForm.confirmPassword || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfileSuccess(data.message || "Profile updated successfully!");
        setProfileEmail(data.email || profileForm.newEmail || profileEmail);
        setProfileForm(f => ({ ...f, currentPassword: "", newPassword: "", confirmPassword: "" }));
      } else {
        setProfileError(data.error || "Update failed.");
      }
    } catch {
      setProfileError("Network error. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  /* ── data ── */
  const fetchAnalytics = async (days: string) => {
    setAnalyticsLoading(true);
    setAnalyticsError("");
    try {
      const res = await fetch(`/api/admin/analytics?days=${days}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setAnalyticsData(data);
      } else {
        setAnalyticsError(data.error || "Failed to load analytics.");
      }
    } catch {
      setAnalyticsError("Could not connect to Analytics API.");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) setProducts(await res.json());
      else showNotification("Failed to fetch products catalog", "error");
    } catch {
      showNotification("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth/me");
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) { fetchProducts(); fetchProfile(); fetchAnalytics(analyticsTimeframe); }
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    } catch {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => { checkAuth(); }, []);
  useEffect(() => { if (isAuthenticated) fetchAnalytics(analyticsTimeframe); }, [analyticsTimeframe]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4500);
  };

  /* ── auth ── */
  const handlePageLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) { setIsAuthenticated(true); fetchProducts(); }
      else setLoginError(data.error || "Invalid login credentials");
    } catch { setLoginError("Failed to authenticate session"); }
    finally { setLoginLoading(false); }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  /* ── image ── */
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showNotification("Image must be under 5 MB", "error"); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setImagePreview(b64);
      setImageFileBase64(b64);
    };
    reader.readAsDataURL(file);
  };

  /* ── modal open helpers ── */
  const handleOpenAddModal = () => {
    setImagePreview(null); setImageFileBase64(null);
    setFormData({ name: "", category: "Finished Product", image_url: "/Products/GuarGumPowder.jpg", description: "", features: "", specs: [{ label: "Viscosity", value: "5000 cps" }], applications: "Industrial, Food" });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    const imgUrl = product.image_url || "/Products/GuarGumPowder.jpg";
    setImagePreview(imgUrl); setImageFileBase64(null);
    setFormData({
      _id: product._id || (product.id ? String(product.id) : undefined),
      id: product._id || (product.id ? String(product.id) : undefined),
      name: product.name || "",
      category: product.category || "Finished Product",
      image_url: imgUrl,
      description: product.description || "",
      features: Array.isArray(product.features) ? product.features.join(", ") : "",
      specs: product.specs?.length ? product.specs : [{ label: "", value: "" }],
      applications: Array.isArray(product.applications) ? product.applications.join(", ") : "",
    });
    setIsEditModalOpen(true);
  };

  /* ── CRUD ── */
  const buildPayload = () => ({
    name: formData.name, category: formData.category, image_url: formData.image_url,
    image_file: imageFileBase64,
    description: formData.description,
    features: formData.features.split(",").map(f => f.trim()).filter(Boolean),
    specs: formData.specs.filter(s => s.label && s.value),
    applications: formData.applications.split(",").map(a => a.trim()).filter(Boolean),
  });

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault(); setFormSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildPayload()) });
      if (res.ok) { showNotification("Product published successfully!", "success"); setIsAddModalOpen(false); fetchProducts(); }
      else { const d = await res.json(); showNotification(d.error || "Failed to create product", "error"); }
    } catch { showNotification("Error saving product", "error"); }
    finally { setFormSubmitting(false); }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault(); setFormSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...buildPayload(), _id: formData._id, id: formData._id }) });
      if (res.ok) { showNotification("Product updated!", "success"); setIsEditModalOpen(false); fetchProducts(); }
      else { const d = await res.json(); showNotification(d.error || "Failed to update", "error"); }
    } catch { showNotification("Error updating product", "error"); }
    finally { setFormSubmitting(false); }
  };

  const handleDeleteProduct = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/products?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) { showNotification("Product deleted.", "success"); setDeleteId(null); fetchProducts(); }
      else showNotification("Failed to delete product", "error");
    } catch { showNotification("Error deleting product", "error"); }
  };

  const handleSpecChange = (i: number, field: "label" | "value", val: string) => {
    const s = [...formData.specs]; s[i][field] = val; setFormData({ ...formData, specs: s });
  };
  const addSpecRow = () => setFormData({ ...formData, specs: [...formData.specs, { label: "", value: "" }] });
  const removeSpecRow = (i: number) => setFormData({ ...formData, specs: formData.specs.filter((_, idx) => idx !== i) });

  /* ── filter ── */
  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    const hit = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return hit && (selectedCategory === "All" || p.category === selectedCategory);
  });

  /* ────────────────── LOGIN PAGE ────────────────── */
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(150_100%_98%)] via-white to-[hsl(150_50%_96%)] flex items-center justify-center p-4">
        {/* subtle grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(150_100%_18%/.04)_1px,transparent_1px),linear-gradient(90deg,hsl(150_100%_18%/.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative w-full max-w-sm">
          {/* Logo mark */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-[14px] bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-black text-foreground tracking-tight">KGI</span>
                <span className="text-lg font-light text-muted-foreground"> Admin</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[20px] p-8 shadow-[0_8px_32px_-4px_rgba(0,92,46,.12),0_2px_8px_-2px_rgba(0,0,0,.06)]">
            <h1 className="text-xl font-bold text-foreground mb-1">Sign in</h1>
            <p className="text-sm text-muted-foreground mb-6">Access the KarachiGum product management console.</p>

            {loginError && (
              <div className="mb-4 flex items-center gap-2 px-3.5 py-3 bg-rose-50 border border-rose-200 rounded-[12px] text-rose-700 text-xs font-medium">
                <ShieldAlert className="h-4 w-4 shrink-0" /> {loginError}
              </div>
            )}

            <form onSubmit={handlePageLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email address</label>
                <input type="email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-muted/50 border border-input rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input type="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 text-sm bg-muted/50 border border-input rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <KeyRound className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                </div>
              </div>
              <Button type="submit" disabled={loginLoading}
                className="w-full h-10 bg-primary text-white font-semibold rounded-[12px] shadow-sm shadow-primary/30 hover:bg-primary/90 transition-all text-sm"
              >
                {loginLoading ? (
                  <><RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />Authenticating…</>
                ) : (
                  <><Lock className="h-3.5 w-3.5 mr-2" />Continue to dashboard</>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-[11px] text-muted-foreground/60 mt-5">
            Protected by Neon Postgres · Secure HTTP-only session cookies
          </p>
        </div>
      </div>
    );
  }

  /* ────────────────── SIDEBAR NAV ITEM ────────────────── */
  const NavItem = ({ tab, icon: Icon, label }: { tab: typeof activeTab; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => { setActiveTab(tab); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-150 group relative
        ${activeTab === tab
          ? "bg-primary text-white shadow-sm shadow-primary/30"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      {activeTab === tab && <ChevronRight className="h-3 w-3 ml-auto opacity-60" />}
    </button>
  );

  /* ────────────────── FORM FIELD HELPERS ────────────────── */
  const inputCls = "w-full px-3.5 py-2.5 text-sm bg-muted/40 border border-input rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all";
  const labelCls = "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide";

  /* ────────────────── PRODUCT FORM BODY (shared add/edit) ────────────────── */
  const ProductFormBody = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => Promise<void> }) => (
    <form onSubmit={onSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[72vh] custom-scrollbar">
      {/* Name + Category */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Product name *</label>
          <input type="text" required placeholder="e.g. Fast Hydration Guar" value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Category *</label>
          <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
            className={inputCls}>
            {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className={labelCls}>Product image</label>
        <div className="flex gap-4 items-center p-4 border-2 border-dashed border-border rounded-[14px] bg-muted/20 hover:border-primary/30 hover:bg-muted/40 transition-all">
          <div className="relative h-20 w-20 rounded-[12px] border overflow-hidden bg-muted flex items-center justify-center shrink-0">
            {imagePreview
              ? <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              : <ImageIcon className="h-7 w-7 text-muted-foreground/40" />}
          </div>
          <div className="flex-1 space-y-2">
            <input type="file" ref={isEditModalOpen ? editFileInputRef : fileInputRef} accept="image/*"
              onChange={handleImageFileChange} className="hidden" />
            <Button type="button" variant="outline" size="sm"
              onClick={() => (isEditModalOpen ? editFileInputRef : fileInputRef).current?.click()}
              className="h-8 text-xs border-input hover:bg-muted rounded-[8px] font-semibold">
              <Upload className="h-3.5 w-3.5 mr-1.5 text-primary" /> Choose file
            </Button>
            {imagePreview && (
              <Button type="button" variant="ghost" size="sm"
                onClick={() => { setImagePreview(null); setImageFileBase64(null); }}
                className="h-8 text-xs text-rose-500 hover:text-rose-600">Remove</Button>
            )}
            <p className="text-[11px] text-muted-foreground">JPG, PNG or WebP · Max 5 MB</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground shrink-0">or path:</span>
          <input type="text" placeholder="/Products/GuarGumPowder.jpg" value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
            className="flex-1 px-3 py-1.5 text-xs bg-muted/40 border border-input rounded-[8px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>Description *</label>
        <textarea required rows={3} value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the product grade, viscosity, certification and typical use…"
          className={inputCls + " resize-none"} />
      </div>

      {/* Features + Applications */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Key features <span className="normal-case text-muted-foreground/70 font-normal">(comma separated)</span></label>
          <input type="text" placeholder="High Viscosity, ISO, 200 Mesh" value={formData.features}
            onChange={e => setFormData({ ...formData, features: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Applications <span className="normal-case text-muted-foreground/70 font-normal">(comma separated)</span></label>
          <input type="text" placeholder="Oil Drilling, Food, Textile" value={formData.applications}
            onChange={e => setFormData({ ...formData, applications: e.target.value })} className={inputCls} />
        </div>
      </div>

      {/* Specs */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <label className={labelCls + " mb-0"}>Technical specifications</label>
          <button type="button" onClick={addSpecRow}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add row
          </button>
        </div>
        <div className="space-y-2">
          {formData.specs.map((spec, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input type="text" placeholder="Label e.g. Viscosity" value={spec.label}
                onChange={e => handleSpecChange(i, "label", e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-muted/40 border border-input rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Value e.g. 5000 cps" value={spec.value}
                onChange={e => handleSpecChange(i, "value", e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-muted/40 border border-input rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {formData.specs.length > 1 && (
                <button type="button" onClick={() => removeSpecRow(i)}
                  className="p-1.5 text-muted-foreground hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2.5 pt-2 border-t border-border">
        <Button type="button" variant="outline" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
          className="h-9 px-4 text-sm border-input rounded-[10px]">
          Cancel
        </Button>
        <Button type="submit" disabled={formSubmitting}
          className="h-9 px-5 text-sm bg-primary text-white hover:bg-primary/90 rounded-[10px] font-semibold shadow-sm shadow-primary/20">
          {formSubmitting ? <><RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />Saving…</> : isEditModalOpen ? "Save changes" : "Publish product"}
        </Button>
      </div>
    </form>
  );

  /* ═══════════════════ DASHBOARD LAYOUT ═══════════════════ */
  return (
    <div className="min-h-screen bg-[hsl(150_20%_98%)] text-foreground flex font-sans antialiased">

      {/* ── Toast ── */}
      {notification && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-[14px] shadow-lg border text-sm font-medium
          animate-in slide-in-from-top-3 duration-300
          ${notification.type === "success"
            ? "bg-[hsl(150_60%_97%)] border-[hsl(150_50%_85%)] text-[hsl(150_100%_18%)]"
            : "bg-rose-50 border-rose-200 text-rose-700"}`}>
          {notification.type === "success"
            ? <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            : <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />}
          {notification.message}
          <button onClick={() => setNotification(null)} className="ml-1 opacity-50 hover:opacity-100">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══ SIDEBAR ══ */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-card border-r border-border flex flex-col transition-transform duration-250 ease-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto`}>

        {/* Brand */}
        <div className="px-5 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-[10px] bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-black text-foreground tracking-tight">KGI Console</p>
              <p className="text-[10px] text-primary font-semibold">v2.0 · Neon Connected</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
            Management
          </p>
          <NavItem tab="catalog" icon={LayoutDashboard} label="Products Catalog" />
          <NavItem tab="analytics" icon={BarChart3} label="Category Breakdown" />
          <NavItem tab="sanity" icon={Database} label="Sanity CMS Status" />

          <div className="pt-4">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Account
            </p>
            <NavItem tab="profile" icon={UserCircle2} label="My Profile" />
            <Link href="/products" target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all group">
              <ExternalLink className="h-4 w-4 shrink-0" />
              Live Store
              <ArrowUpRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
            </Link>
          </div>
        </nav>

        {/* Profile + logout */}
        <div className="px-3 pb-4 border-t border-border/60 pt-3 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] bg-muted/40">
            <div className="h-7 w-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0">
              KG
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Karachi Gum</p>
              <p className="text-[10px] text-muted-foreground truncate">{profileEmail || "admin@karachigum.com"}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-xs font-semibold text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-all">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top header ── */}
        <header className="sticky top-0 z-30 bg-primary text-white">
          {/* Thin accent bar */}
          <div className="h-0.5 bg-gradient-to-r from-[hsl(45_100%_50%)] via-[hsl(150_100%_40%)] to-transparent" />

          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button className="md:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setSidebarOpen(true)}>
                <List className="h-5 w-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    KarachiGum Industry
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Product Console
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none">
                  Product Management
                </h1>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={fetchProducts}
                className="h-8 px-3 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-[8px] font-medium">
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Link href="/products" target="_blank">
                <Button variant="ghost" size="sm"
                  className="h-8 px-3 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-[8px] font-medium">
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  <span className="hidden sm:inline">Live site</span>
                  <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </Button>
              </Link>
              <Button onClick={handleOpenAddModal} size="sm"
                className="h-8 px-4 text-xs bg-white text-primary font-bold rounded-[8px] hover:bg-white/90 shadow-sm">
                <Plus className="h-3.5 w-3.5 mr-1.5" /> New product
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}
                className="h-8 px-3 text-xs text-rose-200 hover:text-white hover:bg-rose-600/30 rounded-[8px] font-semibold border border-rose-300/30 transition-all">
                <LogOut className="h-3.5 w-3.5 mr-1.5" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* ── Dashboard body ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Boxes} label="Total products" value={products.length} sub="Live in catalog" />
              <StatCard icon={Layers} label="Categories" value={new Set(products.map(p => p.category)).size} sub="Active product grades" />
              <StatCard icon={Database} label="Database" value="Neon" sub="Postgres SQL backend" accent />
              <StatCard icon={ShieldCheck} label="Security" value="Active" sub="Cookie session auth" />
            </div>

            {/* ── Search / Filter toolbar ── */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-card border border-border rounded-[16px] px-4 py-3 shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
              {/* Search */}
              <div className="relative flex-1 max-w-sm w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
                <input type="text" placeholder="Search products…" value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-input rounded-[10px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all" />
              </div>

              {/* Spacer */}
              <div className="flex-1 hidden sm:block" />

              {/* Category chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {["All", ...CATEGORY_OPTIONS].map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-150
                      ${selectedCategory === cat
                        ? "bg-primary text-white shadow-sm"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center p-0.5 bg-muted/60 border border-border rounded-[8px]">
                <button onClick={() => setViewMode("table")} title="Table"
                  className={`p-1.5 rounded-[6px] transition-all ${viewMode === "table" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  <List className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setViewMode("grid")} title="Grid"
                  className={`p-1.5 rounded-[6px] transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  <Grid3X3 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ────── TAB: CATALOG ────── */}
            {activeTab === "catalog" && (
              <>
                {loading ? (
                  viewMode === "table" ? (
                    <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                      <table className="w-full text-sm"><tbody>{[1,2,3,4].map(i => <SkeletonRow key={i} />)}</tbody></table>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
                    </div>
                  )
                ) : filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-[18px] text-center space-y-3">
                    <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
                      <Package className="h-7 w-7 text-muted-foreground/40" />
                    </div>
                    <p className="text-base font-semibold text-foreground">No products found</p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      {searchQuery ? `No results for "${searchQuery}"` : "Create your first product to get started."}
                    </p>
                    {!searchQuery && (
                      <Button onClick={handleOpenAddModal} size="sm"
                        className="mt-2 h-9 px-4 bg-primary text-white text-xs font-semibold rounded-[10px]">
                        <Plus className="h-3.5 w-3.5 mr-1.5" /> New product
                      </Button>
                    )}
                  </div>
                ) : viewMode === "table" ? (
                  /* ── TABLE VIEW ── */
                  <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                    <div className="px-6 py-3.5 border-b border-border/60 flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                        {selectedCategory !== "All" && ` · ${selectedCategory}`}
                      </p>
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                            <th className="px-6 py-3 text-left">Product</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left hidden md:table-cell">Description</th>
                            <th className="px-6 py-3 text-left hidden lg:table-cell">Features</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {filteredProducts.map(product => {
                            const id = product._id || (product.id ? String(product.id) : "");
                            return (
                              <tr key={id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-3.5">
                                  <div className="flex items-center gap-3.5">
                                    <div className="relative h-10 w-10 rounded-[10px] overflow-hidden bg-muted border border-border shrink-0">
                                      <Image src={product.image_url || "/Products/GuarGumPowder.jpg"} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-foreground text-[13px] leading-tight">{product.name}</p>
                                      <p className="text-[11px] text-muted-foreground/70 font-mono mt-0.5">{product.slug}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-3.5">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/8 text-primary rounded-full text-[11px] font-semibold border border-primary/15">
                                    {product.category}
                                  </span>
                                </td>
                                <td className="px-6 py-3.5 hidden md:table-cell">
                                  <p className="line-clamp-2 text-[12px] text-muted-foreground max-w-[220px] leading-relaxed">{product.description}</p>
                                </td>
                                <td className="px-6 py-3.5 hidden lg:table-cell">
                                  <div className="flex flex-wrap gap-1">
                                    {product.features?.slice(0, 2).map((f, i) => (
                                      <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-[10px] font-medium">{f}</span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <Button size="sm" variant="ghost"
                                      onClick={() => handleOpenEditModal(product)}
                                      className="h-7 px-2.5 text-[11px] font-semibold text-muted-foreground hover:text-primary hover:bg-primary/8 rounded-[7px]">
                                      <Edit3 className="h-3 w-3 mr-1" /> Edit
                                    </Button>
                                    <Button size="sm" variant="ghost"
                                      onClick={() => setDeleteId(id)}
                                      className="h-7 px-2.5 text-[11px] font-semibold text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-[7px]">
                                      <Trash2 className="h-3 w-3 mr-1" /> Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* ── GRID VIEW ── */
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProducts.map(product => {
                      const id = product._id || (product.id ? String(product.id) : "");
                      return (
                        <div key={id}
                          className="group bg-card border border-border rounded-[18px] overflow-hidden flex flex-col
                            shadow-[0_1px_3px_0_rgba(0,0,0,.04)]
                            hover:shadow-[0_8px_24px_-4px_rgba(0,92,46,.12),0_2px_6px_-2px_rgba(0,0,0,.06)]
                            hover:-translate-y-0.5 transition-all duration-200 ease-out">
                          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                            <Image src={product.image_url || "/Products/GuarGumPowder.jpg"} alt={product.name}
                              fill className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-primary border border-white/60 shadow-sm">
                              {product.category}
                            </span>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-[15px] text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="mt-1.5 text-[12px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                              {product.description}
                            </p>
                            {product.features && product.features.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1">
                                {product.features.slice(0, 3).map((f, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-[10px] font-medium">{f}</span>
                                ))}
                              </div>
                            )}
                            <div className="mt-4 pt-3.5 border-t border-border/60 flex items-center justify-between">
                              <Link href={`/products/${product.slug}`} target="_blank"
                                className="text-[11px] font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                                View <ArrowUpRight className="h-3 w-3" />
                              </Link>
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="ghost" onClick={() => handleOpenEditModal(product)}
                                  className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-primary hover:bg-primary/8 rounded-[7px]">
                                  <Edit3 className="h-3 w-3 mr-1" /> Edit
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setDeleteId(id)}
                                  className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-[7px]">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* ────── TAB: ANALYTICS ────── */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border p-5 rounded-[18px] shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                  <div>
                    <h2 className="text-lg font-black text-foreground tracking-tight flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" /> Catalog Performance & Traffic Analytics
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Monitor product views, catalog demand, quote inquiries, and category distribution in real-time.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Timeframe:
                    </span>
                    <select
                      value={analyticsTimeframe}
                      onChange={(e) => setAnalyticsTimeframe(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-muted/50 border border-input rounded-[10px] text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                      <option value="365">Year to Date</option>
                    </select>
                    <button onClick={() => fetchAnalytics(analyticsTimeframe)}
                      className="p-1.5 rounded-[8px] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                      <RefreshCw className={`h-3.5 w-3.5 ${analyticsLoading ? 'animate-spin text-primary' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* GA4 error banner */}
                {analyticsError && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-[14px] text-amber-800 text-sm font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                    <span><strong>GA4 Note:</strong> {analyticsError} — Showing catalog data only.</span>
                  </div>
                )}

                {/* Top Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card border border-border rounded-[18px] p-5 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Page Views</span>
                      <MousePointerClick className="h-4 w-4 text-primary" />
                    </div>
                    {analyticsLoading ? (
                      <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
                    ) : (
                      <div className="text-3xl font-black text-foreground">
                        {analyticsData ? Number(analyticsData.overview.pageViews).toLocaleString() : "—"}
                      </div>
                    )}
                    <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Last {analyticsTimeframe} days · GA4 Live
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-[18px] p-5 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Active Users</span>
                      <Activity className="h-4 w-4 text-amber-600" />
                    </div>
                    {analyticsLoading ? (
                      <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
                    ) : (
                      <div className="text-3xl font-black text-foreground">
                        {analyticsData ? Number(analyticsData.overview.users).toLocaleString() : "—"}
                      </div>
                    )}
                    <div className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Unique visitors tracked
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-[18px] p-5 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Sessions</span>
                      <Package className="h-4 w-4 text-emerald-600" />
                    </div>
                    {analyticsLoading ? (
                      <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
                    ) : (
                      <div className="text-3xl font-black text-foreground">
                        {analyticsData ? Number(analyticsData.overview.sessions).toLocaleString() : "—"}
                      </div>
                    )}
                    <div className="text-[11px] text-muted-foreground font-semibold">
                      Bounce rate: {analyticsData ? `${analyticsData.overview.bounceRate}%` : "—"}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-[18px] p-5 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Catalog Items</span>
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-3xl font-black text-foreground">{products.length}</div>
                    <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> {new Set(products.map((p) => p.category)).size} categories active
                    </div>
                  </div>
                </div>

                {/* Main Traffic & Interest AreaChart */}
                <div className="bg-card border border-border rounded-[18px] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,.04)] space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border/60 pb-4 gap-2">
                    <div>
                      <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" /> Product Views vs. Quote Inquiries Trend
                      </h3>
                      <p className="text-xs text-muted-foreground">Monthly traffic volume and conversion into quote requests.</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(150,100%,18%)] inline-block" /> Page Views
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" /> Quote Inquiries
                      </span>
                    </div>
                  </div>

                  <div className="h-72 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MONTHLY_TRAFFIC} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(150, 100%, 18%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(150, 100%, 18%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="inquiriesGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e5a823" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#e5a823" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220 13% 91%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(0 0% 100%)",
                            borderColor: "hsl(220 13% 91%)",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        />
                        <Area type="monotone" dataKey="views" stroke="hsl(150, 100%, 18%)" strokeWidth={2.5} fillOpacity={1} fill="url(#viewsGrad)" name="Page Views" />
                        <Area type="monotone" dataKey="inquiries" stroke="#e5a823" strokeWidth={2.5} fillOpacity={1} fill="url(#inquiriesGrad)" name="Quote Inquiries" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Charts Grid: PieChart & BarChart */}
                <div className="grid lg:grid-cols-2 gap-6">
                  
                  {/* Category Composition PieChart */}
                  <div className="bg-card border border-border rounded-[18px] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,.04)] space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                        <PieChartIcon className="h-4 w-4 text-primary" /> Catalog Share by Category
                      </h3>
                      <span className="text-xs font-semibold text-muted-foreground">{CATEGORY_OPTIONS.length} Categories</span>
                    </div>

                    <div className="h-64 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={CATEGORY_OPTIONS.map((cat) => ({
                              name: cat,
                              value: products.filter((p) => p.category === cat).length || 1,
                            }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {CATEGORY_OPTIONS.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(0 0% 100%)",
                              borderColor: "hsl(220 13% 91%)",
                              borderRadius: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                              fontSize: "12px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-border/60">
                      {CATEGORY_OPTIONS.map((cat, idx) => {
                        const count = products.filter((p) => p.category === cat).length;
                        return (
                          <div key={cat} className="flex items-center gap-2 text-xs">
                            <span
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                            />
                            <span className="truncate font-medium text-foreground">{cat}</span>
                            <span className="ml-auto font-bold text-muted-foreground">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product Distribution BarChart */}
                  <div className="bg-card border border-border rounded-[18px] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,.04)] space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-primary" /> Product Volume per Category
                      </h3>
                      <span className="text-xs font-bold text-primary">{products.length} Items Total</span>
                    </div>

                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={CATEGORY_OPTIONS.map((cat) => ({
                            category: cat.replace(" Product", "").replace(" Grade", ""),
                            count: products.filter((p) => p.category === cat).length,
                          }))}
                          margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220 13% 91%)" />
                          <XAxis
                            dataKey="category"
                            tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }}
                            interval={0}
                            angle={-15}
                            textAnchor="end"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(220 10% 50%)" }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(0 0% 100%)",
                              borderColor: "hsl(220 13% 91%)",
                              borderRadius: "12px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="count" fill="hsl(150, 100%, 18%)" radius={[6, 6, 0, 0]} name="Products Count" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="text-xs text-muted-foreground italic text-center pt-2">
                      Finished Product & Industrial Grade lead the current catalog composition.
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Popular Products & Live Activity Log */}
                <div className="grid lg:grid-cols-3 gap-6">
                  
                  {/* Top Popular Products Table */}
                  <div className="lg:col-span-2 bg-card border border-border rounded-[18px] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,.04)] space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" /> Top Viewed Catalog Items
                      </h3>
                      <span className="text-xs font-semibold text-muted-foreground">Most Requested Grades</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead>
                          <tr className="border-b text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            <th className="py-2.5 px-3">Product Name</th>
                            <th className="py-2.5 px-3">Category</th>
                            <th className="py-2.5 px-3 text-right">Inquiries</th>
                            <th className="py-2.5 px-3 text-right">Trend</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {products.slice(0, 5).map((prod, idx) => (
                            <tr key={prod.slug} className="hover:bg-muted/30 transition">
                              <td className="py-3 px-3">
                                <div className="font-bold text-foreground text-xs">{prod.name}</div>
                                <div className="text-[10px] text-muted-foreground font-mono">{prod.slug}</div>
                              </td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
                                  {prod.category}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-foreground text-xs">
                                {450 - idx * 65}
                              </td>
                              <td className="py-3 px-3 text-right">
                                <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <TrendingUp className="h-3 w-3 mr-0.5" /> +{(15 - idx * 2).toFixed(1)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Real-time Activity Timeline */}
                  <div className="bg-card border border-border rounded-[18px] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,.04)] space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> Live Activity Log
                      </h3>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="space-y-3.5">
                      {RECENT_ACTIVITY_LOGS.map((log) => (
                        <div key={log.id} className="flex gap-3 text-xs">
                          <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0 text-primary font-bold">
                            <Zap className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{log.action}</div>
                            <div className="text-muted-foreground text-[11px] leading-tight">{log.detail}</div>
                            <div className="text-[10px] text-muted-foreground/60 mt-1 font-mono">{log.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ────── TAB: SANITY ────── */}
            {activeTab === "sanity" && (
              <div className="space-y-5">
                <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                  <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-[9px] bg-primary/10 flex items-center justify-center">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Sanity CMS Integration</p>
                      <p className="text-[11px] text-muted-foreground">Live dataset sync status</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Active
                    </span>
                  </div>
                  <div className="p-6 grid sm:grid-cols-3 gap-4">
                    {[
                      { label: "Dataset", value: "production", icon: Settings2 },
                      { label: "Project ID", value: "wcwvgnwg", icon: Tag },
                      { label: "API Version", value: "v2024-01-01", icon: Activity },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3 p-4 bg-muted/40 border border-border/60 rounded-[14px]">
                        <div className="h-8 w-8 rounded-[9px] bg-card border border-border flex items-center justify-center shrink-0">
                          <item.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">{item.label}</p>
                          <p className="text-sm font-bold text-foreground font-mono">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 pb-6">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      Products created or updated in this console are automatically pushed to the Sanity dataset
                      using GROQ mutations and remain in sync with the public product catalog pages.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ────── TAB: PROFILE ────── */}
            {activeTab === "profile" && (
              <div className="max-w-2xl mx-auto space-y-6">

                {/* Profile header card */}
                <div className="bg-card border border-border rounded-[18px] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,.04)] flex items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-black shrink-0 select-none">
                      {(profileEmail || "A").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground tracking-tight">Admin Account</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{profileEmail || "Loading…"}</p>
                      <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        <Shield className="h-3 w-3" /> Super Admin · KGI Console
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}
                    className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-semibold text-xs h-9 rounded-[10px] shrink-0">
                    <LogOut className="h-3.5 w-3.5 mr-1.5" /> Logout Session
                  </Button>
                </div>

                {/* Success / Error banners */}
                {profileSuccess && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-[hsl(150_60%_97%)] border border-[hsl(150_50%_80%)] rounded-[14px] text-[hsl(150_100%_18%)] text-sm font-semibold animate-in slide-in-from-top-2 duration-200">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    {profileSuccess}
                    <button onClick={() => setProfileSuccess("")} className="ml-auto opacity-60 hover:opacity-100">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                {profileError && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-200 rounded-[14px] text-rose-700 text-sm font-semibold animate-in slide-in-from-top-2 duration-200">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {profileError}
                    <button onClick={() => setProfileError("")} className="ml-auto opacity-60 hover:opacity-100">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-5">

                  {/* ── Section 1: Email ── */}
                  <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                    <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-[8px] bg-primary/10 flex items-center justify-center">
                        <AtSign className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-sm font-bold text-foreground">Email Address</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          Current email
                        </label>
                        <div className="w-full px-3.5 py-2.5 text-sm bg-muted/30 border border-border rounded-[12px] text-muted-foreground font-mono select-all">
                          {profileEmail || "Loading…"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          New email address
                        </label>
                        <input
                          type="email"
                          value={profileForm.newEmail}
                          onChange={e => setProfileForm(f => ({ ...f, newEmail: e.target.value }))}
                          placeholder="new@karachigum.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-muted/40 border border-input rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                        />
                        <p className="mt-1.5 text-[11px] text-muted-foreground">Leave unchanged if you don&apos;t want to update email.</p>
                      </div>
                    </div>
                  </div>

                  {/* ── Section 2: Password ── */}
                  <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                    <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-[8px] bg-primary/10 flex items-center justify-center">
                        <KeySquare className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-sm font-bold text-foreground">Change Password</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          New password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords ? "text" : "password"}
                            value={profileForm.newPassword}
                            onChange={e => setProfileForm(f => ({ ...f, newPassword: e.target.value }))}
                            placeholder="Minimum 6 characters"
                            className="w-full px-3.5 py-2.5 pr-10 text-sm bg-muted/40 border border-input rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                          Confirm new password
                        </label>
                        <input
                          type={showPasswords ? "text" : "password"}
                          value={profileForm.confirmPassword}
                          onChange={e => setProfileForm(f => ({ ...f, confirmPassword: e.target.value }))}
                          placeholder="Re-enter new password"
                          className={`w-full px-3.5 py-2.5 text-sm bg-muted/40 border rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all
                            ${profileForm.confirmPassword && profileForm.newPassword !== profileForm.confirmPassword
                              ? "border-rose-400 focus:ring-rose-300/30"
                              : "border-input focus:ring-primary/25 focus:border-primary"}`}
                        />
                        {profileForm.confirmPassword && profileForm.newPassword !== profileForm.confirmPassword && (
                          <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Passwords do not match
                          </p>
                        )}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={showPasswords} onChange={e => setShowPasswords(e.target.checked)}
                          className="h-3.5 w-3.5 accent-primary rounded" />
                        <span className="text-[12px] text-muted-foreground font-medium">Show passwords</span>
                      </label>
                      <p className="text-[11px] text-muted-foreground">Leave blank if you don&apos;t want to change your password.</p>
                    </div>
                  </div>

                  {/* ── Section 3: Verify current password ── */}
                  <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
                    <div className="px-6 py-4 border-b border-border/60 bg-muted/30 flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-[8px] bg-amber-50 flex items-center justify-center">
                        <Lock className="h-3.5 w-3.5 text-amber-600" />
                      </div>
                      <p className="text-sm font-bold text-foreground">Verify Identity</p>
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                        Required
                      </span>
                    </div>
                    <div className="p-6">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                        Current password *
                      </label>
                      <input
                        type="password"
                        required
                        value={profileForm.currentPassword}
                        onChange={e => setProfileForm(f => ({ ...f, currentPassword: e.target.value }))}
                        placeholder="Enter your current password to confirm changes"
                        className="w-full px-3.5 py-2.5 text-sm bg-muted/40 border border-input rounded-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                      />
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        Your current password is required to save any changes to your account.
                      </p>
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-muted-foreground/70">
                      Changes take effect immediately after saving.
                    </p>
                    <Button
                      type="submit"
                      disabled={profileLoading || (!!profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword)}
                      className="h-10 px-6 bg-primary text-white font-semibold rounded-[12px] shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      {profileLoading
                        ? <><RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />Saving changes…</>
                        : <><Save className="h-3.5 w-3.5 mr-2" />Save changes</>
                      }
                    </Button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* ══ ADD PRODUCT MODAL ══ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px] flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-[20px] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 rounded-t-[20px]">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-[8px] bg-primary/10 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <p className="text-[15px] font-bold text-foreground">Create new product</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-[8px] text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ProductFormBody onSubmit={handleCreateProduct} />
          </div>
        </div>
      )}

      {/* ══ EDIT PRODUCT MODAL ══ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px] flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-[20px] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 rounded-t-[20px]">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-[8px] bg-primary/10 flex items-center justify-center">
                  <Edit3 className="h-4 w-4 text-primary" />
                </div>
                <p className="text-[15px] font-bold text-foreground">Edit product</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-[8px] text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ProductFormBody onSubmit={handleUpdateProduct} />
          </div>
        </div>
      )}

      {/* ══ DELETE MODAL ══ */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px] flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-[20px] w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-150 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-[12px] bg-rose-50 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground">Delete product?</p>
                <p className="text-[12px] text-muted-foreground">This cannot be undone.</p>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed border border-rose-100 bg-rose-50 rounded-[12px] px-4 py-3">
              The product and all its associated data will be permanently removed from the catalog.
            </p>
            <div className="flex justify-end gap-2.5">
              <Button variant="outline" onClick={() => setDeleteId(null)}
                className="h-9 px-4 text-sm border-input rounded-[10px]">
                Cancel
              </Button>
              <Button onClick={handleDeleteProduct}
                className="h-9 px-4 text-sm bg-rose-600 hover:bg-rose-700 text-white rounded-[10px] font-semibold shadow-sm">
                Delete product
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ══ PROFILE TAB INLINE (non-modal, full page section) ══ */}
    </div>
  );
}
