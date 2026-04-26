"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Wallet,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  MapPin,
  AlertTriangle,
  Compass,
} from "lucide-react";
import API from "@/services/api";

// ─── Budget category icons ────────────────────────────────────────────────────
const budgetIcons = {
  accommodation: "🏨",
  food: "🍽️",
  transport: "🚌",
  activities: "🎟️",
  flights: "✈️",
  shopping: "🛍️",
  miscellaneous: "💼",
  total: "💰",
};

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8f8f6] animate-pulse">
      <div className="h-16 bg-white border-b border-gray-100" />
      <div className="h-80 bg-gray-200 mx-0" />
      <div className="max-w-5xl mx-auto px-5 lg:px-10 py-10 space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-3xl bg-white border border-gray-100" />
        ))}
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, icon: Icon, iconBg = "bg-violet-50", iconColor = "text-violet-500", children }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-7 py-6 border-b border-gray-50">
        <div className={`w-9 h-9 rounded-2xl ${iconBg} flex items-center justify-center`}>
          <Icon size={16} className={iconColor} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <div className="p-7">{children}</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TripDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [trip, setTrip] = useState(null);
  const [regeneratingDay, setRegeneratingDay] = useState(null);

  const fetchTrip = async () => {
    try {
      const response = await API.get(`/trips/${id}`);
      setTrip(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddActivity = async (day) => {
  const newActivity = prompt("Enter new activity");
  if (!newActivity) return;
  try {
    const response = await API.put(`/trips/${id}/add-activity`, { day, activity: newActivity }); // ✅ added const
    setTrip(response.data);
  } catch (error) {
    console.log("FULL ERROR:", error);
  }
};

  const handleRemoveActivity = async (day, activity) => {
    console.log("REMOVE CLICKED");
    console.log("Day:", day);
    console.log("Activity:", activity);
    try {
      await API.put(`/trips/${id}/remove-activity`, { day, activity });
      fetchTrip();
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR DATA:", error.response?.data);
    }
  };

  const handleRegenerate = async (day) => {
    console.log("REGENERATE CLICKED");
    console.log("Day:", day);
    setRegeneratingDay(day);
    try {
      await API.put(`/trips/${id}/regenerate-day`, { day });
      fetchTrip();
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR DATA:", error.response?.data);
    } finally {
      setRegeneratingDay(null);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTrip();
  }, []);

  if (!trip) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-gray-900">

      {/* ── Sticky Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
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

      {/* ── Hero Image ─────────────────────────────────────────────────────── */}
      <div className="relative h-80 sm:h-96 overflow-hidden">
        <img
          src={`http://localhost:5000/api/images/${trip.destination}`}
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

        {/* Floating content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-5xl mx-auto w-full px-5 lg:px-10 pb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-medium text-white mb-4">
              <Sparkles size={11} />
              AI Smart Travel Plan
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {trip.destination}
            </h1>
            <div className="flex items-center gap-5 mt-4">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CalendarDays size={15} />
                {trip.days} Days
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Wallet size={15} />
                {trip.budgetType} Budget
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin size={15} />
                {trip.itinerary?.length || trip.days} day itinerary
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-5 lg:px-10 py-10 space-y-6">

        {/* ── Itinerary ── */}
        <Section title="Itinerary" icon={CalendarDays} iconBg="bg-violet-50" iconColor="text-violet-500">
          <div className="space-y-5">
            {trip.itinerary?.map((dayPlan) => (
              <div
                key={dayPlan.day}
                className="rounded-2xl border border-gray-100 overflow-hidden"
              >
                {/* Day header */}
                <div className="flex items-center justify-between px-5 py-4 bg-gray-50/70 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-violet-600">{dayPlan.day}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      Day {dayPlan.day}
                    </span>
                    <span className="text-xs text-gray-400 font-light">
                      {dayPlan.activities.length} activities
                    </span>
                  </div>

                  <button
                    onClick={() => handleRegenerate(dayPlan.day)}
                    disabled={regeneratingDay === dayPlan.day}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 transition disabled:opacity-60"
                  >
                    <RefreshCw
                      size={12}
                      className={regeneratingDay === dayPlan.day ? "animate-spin" : ""}
                    />
                    {regeneratingDay === dayPlan.day ? "Regenerating…" : "Regenerate"}
                  </button>
                </div>

                {/* Activities */}
                <div className="divide-y divide-gray-50">
                  {dayPlan.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-5 py-3.5 group hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {activity}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveActivity(dayPlan.day, activity)}
                        className="ml-4 shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add activity */}
                <div className="px-5 py-3.5 border-t border-gray-50">
                  <button
                    onClick={() => handleAddActivity(dayPlan.day)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-violet-600 transition-colors font-medium"
                  >
                    <div className="w-6 h-6 rounded-lg border border-dashed border-gray-300 hover:border-violet-400 flex items-center justify-center transition-colors">
                      <Plus size={12} />
                    </div>
                    Add activity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Budget ── */}
        <Section title="Budget Estimate" icon={Wallet} iconBg="bg-blue-50" iconColor="text-blue-500">
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.entries(trip.budgetEstimate || {}).map(([key, value]) => (
              <div
                key={key}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-colors ${
                  key === "total"
                    ? "border-violet-200 bg-violet-50/60 col-span-full sm:col-span-2"
                    : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {budgetIcons[key.toLowerCase()] || "💡"}
                  </span>
                  <span
                    className={`text-sm font-medium capitalize ${
                      key === "total" ? "text-violet-700" : "text-gray-700"
                    }`}
                  >
                    {key}
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    key === "total" ? "text-violet-700 text-base" : "text-gray-900"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Alerts ── */}
        <Section title="Travel Alerts" icon={AlertTriangle} iconBg="bg-amber-50" iconColor="text-amber-500">
          <div className="space-y-3">
            {trip.alerts?.length === 0 ? (
              <p className="text-sm text-gray-400 font-light">No alerts for this trip.</p>
            ) : (
              trip.alerts?.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 px-5 py-4"
                >
                  <div className="w-5 h-5 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={11} className="text-amber-600" />
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed font-light">
                    {alert}
                  </p>
                </div>
              ))
            )}
          </div>
        </Section>

      </main>
    </div>
  );
}
