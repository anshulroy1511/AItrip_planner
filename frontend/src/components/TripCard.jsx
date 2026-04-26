"use client";

import Link from "next/link";
import { CalendarDays, Wallet, MapPin, ArrowRight } from "lucide-react";

export default function TripCard({ trip }) {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={`http://localhost:5000/api/images/${trip.destination}`}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700">
          {trip.budgetType}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {trip.destination}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            AI-crafted itinerary
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays size={14} />
              {trip.days} day trip
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Wallet size={14} />
              {trip.budgetType} budget
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} />
              {new Date(trip.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/trip/${trip._id}`}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white transition"
        >
          View Trip
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}