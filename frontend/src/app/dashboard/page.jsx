"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/services/api";
import {
  Plus,
  MapPin,
  CalendarDays,
  Wallet,
  Sparkles,
  LogOut,
  Compass,
  TrendingUp,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import TripCard from "@/components/TripCard";

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-gray-100" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-2/3" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        <div className="h-3 bg-gray-100 rounded-full w-3/4" />
        <div className="h-10 bg-gray-100 rounded-2xl mt-4" />
      </div>
    </div>
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTrips = async () => {
    try {
      const response = await API.get("/trips/dashboard");
      setTrips(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTrips();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-gray-900">

      {/* ── Sticky Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center">
                <Compass size={16} className="text-white" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-gray-900">
                Wayfarer
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/create-trip"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 shadow-sm"
              >
                <Plus size={15} />
                New Trip
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-violet-500 mb-1">
                Welcome back 👋
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                My Travel Dashboard
              </h1>
              <p className="mt-2 text-gray-400 font-light text-[15px]">
                Manage your AI-generated trips, budgets, hotels, and itinerary
                updates.
              </p>
            </div>

            {/* Live stats */}
            {!loading && trips.length > 0 && (
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {trips.length}
                  </p>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    Total trips
                  </p>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {trips.reduce((acc, t) => acc + (t.days || 0), 0)}
                  </p>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    Days planned
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-5 lg:px-10 py-10 space-y-8">

        {/* AI Recommendation banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-500 to-indigo-500 p-6 sm:p-8 shadow-lg shadow-violet-200">
          {/* decorative orbs */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-white/90">
                  AI Recommendation
                </p>
                <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Live
                </span>
              </div>
              <p className="text-white/75 text-sm font-light leading-relaxed">
                Based on your recent trips,{" "}
                <span className="text-white font-medium">Tokyo</span> and{" "}
                <span className="text-white font-medium">Bali</span> are
                trending destinations for your interests.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-white/60 text-xs shrink-0 mt-1">
              <TrendingUp size={13} />
              Personalised
            </div>
          </div>
        </div>

        {/* Grid area */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : trips.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20 px-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mb-5">
              <Globe size={28} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              No trips yet
            </h2>
            <p className="mt-2 text-sm text-gray-400 font-light max-w-xs">
              Start planning your first AI-powered journey and explore the world.
            </p>
            <Link
              href="/create-trip"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 shadow-sm"
            >
              <Plus size={16} />
              Create your first trip
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400 font-light">
                {trips.length} {trips.length === 1 ? "trip" : "trips"} found
              </p>
              {/* Mobile new-trip button */}
              <Link
                href="/create-trip"
                className="sm:hidden inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              >
                <Plus size={14} />
                New
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
  {trips.map((trip) => (
    <TripCard key={trip._id} trip={trip} />
  ))}
</div>
          </>
        )}
      </main>
    </div>
  );
}
