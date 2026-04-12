"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  Package,
  Star,
  Settings,
  Images,
  LogOut,
  Zap,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#070A11] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>


      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-[70] bg-[#0D1117] border-r border-white/5 flex flex-col transition-all duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-20" : "w-72"}`}
      >
        {/* Brand + Collapse Toggle */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <h2 className="font-bold text-white text-sm whitespace-nowrap">
                    Bondhu Motor
                  </h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">
                    Admin Panel
                  </p>
                </div>
              )}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl text-sm font-medium transition-all ${
                  collapsed ? "px-3 py-3 justify-center" : "px-4 py-3"
                } ${
                  isActive
                    ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-3 border-t border-white/5">
          {!collapsed && (
            <div className="px-4 py-2 mb-2">
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            title={collapsed ? "Sign Out" : undefined}
            className={`flex items-center gap-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full ${
              collapsed ? "px-3 py-3 justify-center" : "px-4 py-3"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0D1117]">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-white font-bold text-sm">Bondhu Motor Admin</h2>
          <div className="w-10" />
        </div>

        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="p-6 lg:p-10"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
