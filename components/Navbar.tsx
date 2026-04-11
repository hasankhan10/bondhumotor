"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bolt, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "TARMAC Scooters" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-card xl:rounded-full xl:mx-12 xl:mt-4 py-3"
          : "bg-transparent py-5"
      )}
    >
      {/* 
        Using grid grid-cols-3 on desktop to properly center the middle navigation 
        regardless of the width of left/right elements.
      */}
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* Left: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-card-bg/50 group-hover:bg-brand-blue/20 transition-colors border border-card-border group-hover:border-brand-blue/50">
              <Bolt className="w-5 h-5 text-brand-blue group-hover:text-brand-green transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-tight tracking-wide text-text-primary">
                BONDHU <span className="text-gradient">MOTOR</span>
              </span>
              <span className="text-[10px] text-text-muted tracking-widest uppercase">
                Tarmac Showroom
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-blue relative py-2",
                pathname === link.href ? "text-brand-blue" : "text-text-body"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-green rounded-full shadow-glow-blue"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center justify-end gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full bg-card-bg/50 border border-card-border text-text-primary hover:text-brand-blue hover:border-brand-blue/50 transition-all focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
            {!mounted && <div className="w-4 h-4" />}
          </button>
          
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full glass-card border border-brand-green/30 text-brand-green font-medium text-sm hover:bg-brand-green hover:text-gray-900 transition-all duration-300 shadow-glow-green"
          >
            Book Test Ride
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex flex-1 justify-end md:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-text-body"
          >
            {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            {!mounted && <div className="w-5 h-5" />}
          </button>
          <button
            className="p-2 text-text-body hover:text-text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass-card mx-4 mt-2 rounded-2xl p-4 flex flex-col gap-4 shadow-xl z-50 md:hidden border border-card-border"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "p-3 rounded-xl transition-colors font-medium",
                  pathname === link.href
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-text-body hover:bg-card-bg"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 text-center p-3 rounded-xl bg-brand-green text-gray-900 font-bold"
            >
              Book Test Ride
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
