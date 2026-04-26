"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import toast from "react-hot-toast";
import {
  Sparkles,
  MapPin,
  CalendarDays,
  Wallet,
  ArrowLeft,
  ArrowRight,
  Compass,
  Zap,
  Globe,
  Shield,
} from "lucide-react";

const INTEREST_OPTIONS = [
  { label: "Food", emoji: "🍜" },
  { label: "Culture", emoji: "🏛️" },
  { label: "Adventure", emoji: "⛰️" },
  { label: "Shopping", emoji: "🛍️" },
  { label: "Nature", emoji: "🌿" },
  { label: "Nightlife", emoji: "🎶" },
];

const BUDGET_OPTIONS = [
  { value: "Low", label: "Budget", desc: "Hostels & street food" },
  { value: "Medium", label: "Comfort", desc: "Hotels & restaurants" },
  { value: "High", label: "Luxury", desc: "5-star & fine dining" },
];

export default function CreateTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budgetType: "Medium",
    interests: [],
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleInterestToggle = (interest) =>
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));

  const handleBudget = (value) =>
    setFormData((prev) => ({ ...prev, budgetType: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.interests.length === 0)
      return toast.error("Please select at least one interest");
    try {
      setLoading(true);
      const response = await API.post("/trips", {
        ...formData,
        days: Number(formData.days),
      });
      toast.success("Trip created successfully!");
      router.push(`/trip/${response.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Trip creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-gray-900">

      {/* ── Sticky Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center">
                <Compass size={16} className="text-white" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-gray-900">
                Wayfarer
              </span>
            </div>

            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
            >
              <ArrowLeft size={14} />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-10 pt-2">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-600 w-fit">
              <Sparkles size={12} />
              AI Powered Planning
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Plan your next
                <span className="block bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                  journey.
                </span>
              </h1>
              <p className="mt-5 text-[16px] text-gray-400 font-light leading-relaxed max-w-sm">
                Generate a complete AI-powered itinerary with hotels, budget
                estimation, travel alerts, and personalised recommendations.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Zap, title: "Smart itineraries", desc: "Day-by-day plans tailored to your style" },
                { icon: Wallet, title: "Budget estimation", desc: "Realistic costs, no surprises" },
                { icon: MapPin, title: "Local gems", desc: "Curated spots off the tourist trail" },
                { icon: Globe, title: "Multi-destination", desc: "Optimised routes across cities" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:border-violet-200 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
                    <Icon size={14} className="text-violet-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-6 flex-wrap">
              {[
                { icon: Zap, label: "Instant generation" },
                { icon: Globe, label: "150+ destinations" },
                { icon: Shield, label: "Personalised & private" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Icon size={12} className="text-violet-300" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Form card ── */}
          <div className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                Create new trip
              </h2>
              <p className="mt-1.5 text-sm text-gray-400 font-light">
                Fill in your preferences and let AI plan the rest.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Destination */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin size={14} className="text-violet-500" />
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g. Tokyo, Bali, Leh-Ladakh…"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50 focus:bg-white"
                />
              </div>

              {/* Days */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CalendarDays size={14} className="text-violet-500" />
                  Number of days
                </label>
                <input
                  type="number"
                  name="days"
                  placeholder="e.g. 7"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-50 focus:bg-white"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

              {/* Budget */}
              <div className="space-y-2.5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Wallet size={14} className="text-violet-500" />
                  Budget level
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {BUDGET_OPTIONS.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleBudget(value)}
                      className={`flex flex-col items-center gap-1 rounded-2xl border px-3 py-3.5 text-center transition-all duration-150 ${
                        formData.budgetType === value
                          ? "border-violet-400 bg-violet-50 shadow-[0_0_0_3px_rgba(139,92,246,0.1)]"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          formData.budgetType === value ? "text-violet-700" : "text-gray-700"
                        }`}
                      >
                        {label}
                      </span>
                      <span className="text-[10px] text-gray-400 font-light leading-tight">
                        {desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

              {/* Interests */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Sparkles size={14} className="text-violet-500" />
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map(({ label, emoji }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleInterestToggle(label)}
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ${
                        formData.interests.includes(label)
                          ? "border-violet-500 bg-violet-500 text-white shadow-md shadow-violet-200"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      <span className="text-sm">{emoji}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-2xl bg-gray-900 py-4 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-900/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white/60"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Crafting your itinerary…
                    </>
                  ) : (
                    <>
                      Generate AI travel plan
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-0.5 transition-transform duration-150"
                      />
                    </>
                  )}
                </span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
