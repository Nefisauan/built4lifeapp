import { useState } from 'react'
import { ChevronLeft, ChevronRight, Award } from 'lucide-react'
import Header from '../components/Header'
import { spotlightAthletes } from '../data/spotlight'

export default function SpotlightPage() {
  const [index, setIndex] = useState(0)
  const athlete = spotlightAthletes[index]
  const initials = athlete.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      <Header title="Spotlight" />

      <p className="text-slate-400 text-sm px-5 pb-4">Athletes doing incredible things — beyond the field.</p>

      <div className="px-4 space-y-4">
        {/* Live indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="text-electric text-xs font-semibold uppercase tracking-wider">Athlete of the Week</span>
          </div>
          <span className="text-slate-500 text-xs">Week of Mar 11, 2026</span>
        </div>

        {/* Main card — matches BYU widget card style */}
        <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${athlete.color} border border-white/10`}>
          <div className="p-5 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{initials}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{athlete.name}</h2>
                <p className={`text-sm font-medium ${athlete.accentColor}`}>{athlete.sport}</p>
                <p className="text-white/50 text-xs mt-0.5">{athlete.position} · {athlete.year}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-black/20 border border-white/10">
              <Award size={15} className="text-tan mt-0.5 shrink-0" />
              <p className="text-white text-sm font-medium leading-tight">{athlete.achievement}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2 px-5 pb-4">
            {athlete.highlights.map((h, i) => (
              <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{h.icon}</span>
                  <span className="text-white/50 text-xs">{h.label}</span>
                </div>
                <p className="text-white text-xs font-semibold leading-tight">{h.value}</p>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5">
            <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
              <span>📚 {athlete.major}</span>
              <span>·</span>
              <span>📍 {athlete.hometown}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/25 border border-white/10">
              <p className="text-white/90 text-sm italic leading-relaxed">{athlete.quote}</p>
            </div>
          </div>
        </div>

        {/* Prev / dots / next */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-800 border border-navy-600/40 text-slate-400 text-sm disabled:opacity-30"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <div className="flex gap-2">
            {spotlightAthletes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'bg-electric w-5' : 'bg-navy-600 w-2'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex(i => Math.min(spotlightAthletes.length - 1, i + 1))}
            disabled={index === spotlightAthletes.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-800 border border-navy-600/40 text-slate-400 text-sm disabled:opacity-30"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>

        {/* Nominate */}
        <div className="bg-navy-800 rounded-2xl border border-navy-600/40 p-4 text-center">
          <p className="text-slate-400 text-xs mb-2">Know a teammate doing amazing things?</p>
          <button className="px-5 py-2 rounded-xl bg-electric/15 border border-electric/30 text-electric text-sm font-semibold">
            Nominate an Athlete ✨
          </button>
        </div>
      </div>
    </div>
  )
}
