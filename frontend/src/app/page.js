"use client";

import Link from "next/link";
import {
  Sparkles,
  Wallet,
  PencilLine,
  Hotel,
  ShieldCheck,
  Globe,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";

// ─── Feature Data ──────────────────────────────────────────────────────────────
const features = [
  {
    icon: Sparkles,
    title: "AI Itinerary Generator",
    description:
      "Get a personalized, day-by-day travel plan built by AI — tailored to your destination, duration, and interests.",
    accent: "from-violet-500 to-indigo-500",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Wallet,
    title: "Smart Budget Estimation",
    description:
      "Receive a detailed cost breakdown covering flights, stays, food, and activities so you never overspend.",
    accent: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: PencilLine,
    title: "Editable Itinerary",
    description:
      "Swap, add, or regenerate any activity. Your trip, your rules — AI handles the heavy lifting.",
    accent: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Hotel,
    title: "Hotel Recommendations",
    description:
      "Curated accommodation options matched to your budget and location, with direct booking links.",
    accent: "from-sky-500 to-blue-500",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Multi-user System",
    description:
      "Each account is fully isolated with enterprise-grade auth. Your itineraries are yours alone.",
    accent: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

// ─── Destinations ticker ───────────────────────────────────────────────────────
const destinations = [
  "Tokyo", "Santorini", "Bali", "New York", "Paris",
  "Kyoto", "Maldives", "Barcelona", "Cape Town", "Dubai",
  "Lisbon", "Amalfi Coast", "Marrakech", "Sydney", "Iceland",
];

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-200 transition-shadow">
            <Globe className="w-4 h-4 text-white" />
          </span>
          <span className="font-semibold text-slate-800 tracking-tight text-[15px]">
            AI Travel Planner
          </span>
        </Link>

        {/* Nav actions */}
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-sm hover:shadow-indigo-200 transition-all"
          >
            Register
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 pt-24 pb-20 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_#e0e7ff_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,_#f3e8ff_0%,_transparent_70%)]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Badge */}
      <div className="relative mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        Powered by Advanced AI
      </div>

      {/* Headline */}
      <h1 className="relative text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight max-w-4xl">
        Plan Your{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
          Perfect Trip
        </span>{" "}
        with AI
      </h1>

      {/* Sub-heading */}
      <p className="relative mt-6 text-center text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed font-normal">
        Tell us where you want to go. Our AI builds a complete, personalized
        itinerary — day-by-day plans, budget breakdowns, hotel picks, and more —
        in seconds.
      </p>

      {/* CTAs */}
      <div className="relative mt-10 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
        >
          Get Started — it&apos;s free
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-700 text-base bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          Login to my account
        </Link>
      </div>

      {/* Destination ticker */}
      <div className="relative mt-16 w-full max-w-3xl overflow-hidden">
        <p className="text-center text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">
          Destinations our users love
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          {destinations.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600 shadow-sm"
            >
              <MapPin className="w-3 h-3 text-indigo-400" />
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="relative py-24 px-5 sm:px-8 bg-white">
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Your AI travel companion,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              end to end
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            From first idea to packed bags — we&apos;ve got every step covered.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, bg, iconColor }, i) => (
            <div
              key={title}
              className={`group relative rounded-2xl p-6 border border-slate-100 bg-white hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                // Last card span 2 cols on lg to fill 5-card grid neatly
                i === 4 ? "lg:col-span-1 sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Subtle bg accent on hover */}
              <div
                className={`absolute inset-0 rounded-2xl ${bg} opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
              />

              <div className="relative">
                <div
                  className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4 shadow-sm`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-[17px] mb-2 tracking-tight">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-indigo-500 to-violet-600 text-white overflow-hidden flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
            <div className="relative">
              <Globe className="w-8 h-8 text-white/80 mb-4" />
              <h3 className="font-bold text-xl mb-2">Ready to explore?</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Join thousands of travelers building smarter trips with AI.
              </p>
            </div>
            <Link
              href="/register"
              className="relative mt-6 inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-white text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors"
            >
              Start planning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-8 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Globe className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="text-sm font-semibold text-slate-700">
            AI Travel Planner
          </span>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} AI Travel Planner. All rights reserved.
        </p>
        <div className="flex gap-5 text-xs text-slate-400">
          <Link href="/privacy" className="hover:text-slate-600 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-600 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
