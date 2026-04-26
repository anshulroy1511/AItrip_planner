"use client";

import { useState } from "react";
import API from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Globe, ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/auth/register", formData);
      toast.success("Registration successful!");
      console.log(response.data);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 antialiased relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_-10%,_#e0e7ff_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_100%,_#f3e8ff_0%,_transparent_65%)] pointer-events-none" />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Left brand panel (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between p-12 relative">
        {/* Home icon */}
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-300 transition-shadow">
            <Globe className="w-5 h-5 text-white" />
          </span>
          <span className="font-semibold text-slate-800 text-[15px] tracking-tight">
            AI Travel Planner
          </span>
        </Link>

        {/* Center quote */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide">
            ✦ Start your journey today
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Your dream trip is{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              one plan away.
            </span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-sm">
            Generate a full day-by-day itinerary, budget breakdown, and hotel
            picks — in seconds. Completely personalized to you.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {["bg-violet-400", "bg-indigo-400", "bg-sky-400", "bg-emerald-400"].map(
                (c, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">2,400+</span> travelers
              planning smarter
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} AI Travel Planner · Free to get started
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-10 py-10 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 w-full">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <Globe className="w-4 h-4 text-white" />
            </span>
            <span className="font-semibold text-slate-800 text-[15px] tracking-tight">
              AI Travel Planner
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl shadow-xl shadow-slate-100 p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create your account
              </h1>
              <p className="text-slate-500 text-sm mt-1.5">
                Free forever · No credit card required
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-400">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login link */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Login instead
            </Link>
          </div>

          {/* Terms note */}
          <p className="text-center text-xs text-slate-400 mt-5 leading-relaxed">
            By registering, you agree to our{" "}
            <Link href="/terms" className="text-slate-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-slate-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
