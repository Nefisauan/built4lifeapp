import { useState } from 'react'
import { ArrowLeft, Trophy, Check } from 'lucide-react'
import { alumniCards, industryCards } from '../data/gameData'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default function TheNetworker({ onBack }) {
  const [started, setStarted] = useState(false)
  const [alumni, setAlumni] = useState(deepClone(alumniCards))
  const [industries, setIndustries] = useState(deepClone(industryCards))
  const [selectedAlumni, setSelectedAlumni] = useState(null)
  const [matches, setMatches] = useState([])
  const [wrong, setWrong] = useState(null)
  const [finished, setFinished] = useState(false)

  const unmatched = alumni.filter(a => !a.matched)
  const unmatchedIndustries = industries.filter(i => !i.matched)

  function selectAlumnus(id) {
    if (selectedAlumni === id) {
      setSelectedAlumni(null)
    } else {
      setSelectedAlumni(id)
    }
  }

  function selectIndustry(industryLabel) {
    if (!selectedAlumni) return
    const alumnus = alumni.find(a => a.id === selectedAlumni)
    if (!alumnus) return

    if (alumnus.industry === industryLabel) {
      // Correct match
      const newAlumni = alumni.map(a => a.id === selectedAlumni ? { ...a, matched: true } : a)
      const newIndustries = industries.map(i => i.label === industryLabel ? { ...i, matched: true } : i)
      setAlumni(newAlumni)
      setIndustries(newIndustries)
      setMatches(prev => [...prev, selectedAlumni])
      setSelectedAlumni(null)
      setWrong(null)

      if (newAlumni.filter(a => !a.matched).length === 0) {
        setFinished(true)
      }
    } else {
      // Wrong
      setWrong({ alumni: selectedAlumni, industry: industryLabel })
      setTimeout(() => {
        setWrong(null)
        setSelectedAlumni(null)
      }, 1000)
    }
  }

  function restart() {
    setAlumni(deepClone(alumniCards))
    setIndustries(deepClone(industryCards))
    setSelectedAlumni(null)
    setMatches([])
    setWrong(null)
    setFinished(false)
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center">
        <div className="text-6xl mb-4">🤝</div>
        <h2 className="text-2xl font-bold text-white mb-2">The Networker</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
          Connect BYU Alumni mentors to their industries. Build your mental map of who's out there and where they landed.
        </p>
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs mb-8">
          {alumniCards.slice(0, 4).map(a => (
            <div key={a.id} className="p-3 rounded-xl bg-navy-800 border border-navy-600/60 text-left">
              <div className="text-2xl mb-1">{a.emoji}</div>
              <p className="text-white text-xs font-medium">{a.name}</p>
              <p className="text-slate-500 text-xs">{a.hint}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStarted(true)}
          className="w-full max-w-xs py-4 rounded-2xl bg-electric text-navy-900 font-bold text-lg"
        >
          Start Networking
        </button>
        <button onClick={onBack} className="mt-3 text-slate-500 text-sm py-2">← Back</button>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center animate-fade-in">
        <Trophy size={56} className="text-tan mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Network Complete!</h2>
        <p className="text-slate-400 text-sm mb-6">You matched all {alumniCards.length} alumni. 🎉</p>
        <div className="w-full max-w-xs space-y-2 mb-8">
          {alumniCards.map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-navy-800 border border-electric/20">
              <div className="text-2xl">{a.emoji}</div>
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-medium">{a.name}</p>
                <p className="text-slate-400 text-xs">{a.hint}</p>
              </div>
              <Check size={16} className="text-electric shrink-0" />
            </div>
          ))}
        </div>
        <button onClick={restart} className="w-full max-w-xs py-4 rounded-2xl bg-electric text-navy-900 font-bold mb-3">
          Play Again
        </button>
        <button onClick={onBack} className="text-slate-500 text-sm py-2">← Games</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold">The Networker</span>
            <span className="text-electric text-sm font-bold">{matches.length}/{alumniCards.length} matched</span>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-500 text-xs mb-4 px-4">
        {selectedAlumni
          ? `Selected: ${alumni.find(a => a.id === selectedAlumni)?.name} — now tap their industry`
          : 'Tap an alumni to select, then match to their industry'
        }
      </p>

      {/* Two column layout */}
      <div className="flex-1 px-4 flex gap-3">
        {/* Alumni column */}
        <div className="flex-1 space-y-2">
          <p className="text-slate-500 text-xs font-medium text-center mb-2 uppercase tracking-wider">Alumni</p>
          {alumni.map(a => (
            <button
              key={a.id}
              onClick={() => !a.matched && selectAlumnus(a.id)}
              disabled={a.matched}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                a.matched
                  ? 'bg-electric/10 border-electric/30 opacity-60'
                  : selectedAlumni === a.id
                  ? 'bg-electric/15 border-electric text-white'
                  : wrong?.alumni === a.id
                  ? 'bg-red-500/15 border-red-500/40'
                  : 'bg-navy-800 border-navy-600/60'
              }`}
            >
              <div className="text-xl mb-1">{a.emoji}</div>
              <p className={`text-xs font-medium leading-tight ${a.matched ? 'text-electric' : 'text-white'}`}>{a.name}</p>
              <p className="text-slate-500 text-xs leading-tight mt-0.5">{a.hint}</p>
              {a.matched && <Check size={12} className="text-green-400 mt-1" />}
            </button>
          ))}
        </div>

        {/* Industry column */}
        <div className="flex-1 space-y-2">
          <p className="text-slate-500 text-xs font-medium text-center mb-2 uppercase tracking-wider">Industry</p>
          {industries.map(ind => (
            <button
              key={ind.id}
              onClick={() => !ind.matched && selectIndustry(ind.label)}
              disabled={ind.matched}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                ind.matched
                  ? 'bg-electric/10 border-electric/30 opacity-60'
                  : wrong?.industry === ind.label
                  ? 'bg-red-500/15 border-red-500/40 scale-95'
                  : selectedAlumni
                  ? 'bg-navy-700 border-electric/40 text-white'
                  : 'bg-navy-800 border-navy-600/60 text-slate-400'
              }`}
            >
              <div className="text-xl mb-1">{ind.emoji}</div>
              <p className={`text-xs font-medium ${ind.matched ? 'text-electric' : 'text-white'}`}>{ind.label}</p>
              {ind.matched && <Check size={12} className="text-electric mt-1" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
