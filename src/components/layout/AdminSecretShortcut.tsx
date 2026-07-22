"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, KeyRound, Sparkles, X, ShieldAlert, CheckCircle2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSecretShortcut() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("admin@karachigum.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 1. Keyboard Shortcut (Desktop): Ctrl + Shift + A or Alt + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) ||
          (e.altKey && e.shiftKey && (e.key === "A" || e.key === "a"))) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    // 2. Custom Mobile Event: Triggered when tapping 3 times on logo/footer on touch screens
    const handleMobileSecret = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-admin-secret", handleMobileSecret);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-admin-secret", handleMobileSecret);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          router.push("/admin");
          router.refresh();
        }, 800);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Error connecting to auth server");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-background border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            <h2 className="text-lg font-bold tracking-tight">KGI Admin Console</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-primary-foreground/80 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="p-3 bg-muted/60 rounded-lg text-xs text-muted-foreground border flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary shrink-0" />
            <span>Secret Admin Portal (Desktop & Mobile Access)</span>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-200 text-rose-700 dark:text-rose-200 rounded-lg text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 text-emerald-700 dark:text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Access Granted! Opening Admin Dashboard...</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@karachigum.com"
              className="w-full px-3 py-2 bg-muted/40 border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-muted/40 border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <KeyRound className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || success} className="bg-primary text-primary-foreground font-bold">
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
