import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Award } from 'lucide-react'
import { spotlightAthletes } from '../data/spotlight'

export default function SpotlightPage() {
  const [index, setIndex] = useState(0)
  const athlete = spotlightAthletes[index]

  const initials = athlete.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
        style={{ background: 'linear-gradient(180deg, #001A3A 0%, #070C18 100%)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Star size={18} className="text-electric fill-electric" />
          <h1 className="text-2xl font-bold text-white">Spotlight</h1>
        </div>
        <p className="text-slate-400 text-sm">Athletes doing incredible things — beyond the field.</p>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Week label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-electric text-xs font-semibold uppercase tracking-wider">Athlete of the Week</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            Week of Mar 11, 2026
          </div>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-3xl overflow-hidden bg-gradient-to-br ${athlete.color} border border-white/10 glow-blue`}
        >
          {/* Avatar + Name */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{initials}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{athlete.name}</h2>
                <p className={`text-sm font-medium ${athlete.accentColor}`}>{athlete.sport}</p>
                <p className="text-slate-400 text-xs mt-0.5">{athlete.position} · {athlete.year}</p>
              </div>
            </div>

            {/* Achievement banner */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-white/10 border border-white/10">
              <Award size={16} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-white text-sm font-medium leading-tight">{athlete.achievement}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 px-6 pb-4">
            {athlete.highlights.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-black/20 border border-white/10"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{h.icon}</span>
                  <span className="text-slate-400 text-xs font-medium">{h.label}</span>
                </div>
                <p className="text-white text-xs font-semibold leading-tight">{h.value}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="px-6 pb-5">
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <span>📚 {athlete.major}</span>
              <span>📍 {athlete.hometown}</span>
            </div>

            {/* Quote */}
            <div className="p-4 rounded-xl bg-black/25 border border-white/10">
              <p className="text-white/90 text-sm italic leading-relaxed">{athlete.quote}</p>
            </div>
          </div>
        </div>

        {/* Navigation between athletes */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-800 border border-navy-600/60 text-slate-400 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} />
            Previous
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {spotlightAthletes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? 'bg-electric w-5' : 'bg-navy-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIndex(i => Math.min(spotlightAthletes.length - 1, i + 1))}
            disabled={index === spotlightAthletes.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-800 border border-navy-600/60 text-slate-400 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Nominate CTA */}
        <div className="p-4 rounded-2xl bg-navy-800 border border-electric/20 text-center">
          <p className="text-slate-400 text-xs mb-2">Know a teammate doing amazing things?</p>
          <button className="px-5 py-2 rounded-xl bg-electric/15 border border-electric/30 text-electric text-sm font-semibold">
            Nominate an Athlete ✨
          </button>
        </div>
      </div>
    </div>
  )
}
