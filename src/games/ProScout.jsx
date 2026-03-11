import { useState } from 'react'
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy } from 'lucide-react'
import { proScoutProfiles } from '../data/gameData'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default function ProScout({ onBack }) {
  const [profileIndex, setProfileIndex] = useState(0)
  const [profiles, setProfiles] = useState(deepClone(proScoutProfiles))
  const [timeLeft, setTimeLeft] = useState(60)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [foundItems, setFoundItems] = useState([])
  const [feedback, setFeedback] = useState(null)

  const profile = profiles[profileIndex]
  const totalErrors = profiles.reduce((acc, p) => acc + p.errors.length, 0)
  const totalFound = profiles.reduce((acc, p) => acc + p.errors.filter(e => e.found).length, 0)

  function startGame() {
    setStarted(true)
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer)
          setFinished(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  function tapError(errorId) {
    const updated = deepClone(profiles)
    const err = updated[profileIndex].errors.find(e => e.id === errorId)
    if (!err || err.found) return
    err.found = true
    setProfiles(updated)
    setFoundItems(prev => [...prev, errorId])
    setFeedback({ label: err.label, description: err.description })
    setTimeout(() => setFeedback(null), 2500)
  }

  function nextProfile() {
    if (profileIndex < profiles.length - 1) {
      setProfileIndex(i => i + 1)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setProfiles(deepClone(proScoutProfiles))
    setProfileIndex(0)
    setTimeLeft(60)
    setStarted(false)
    setFinished(false)
    setFoundItems([])
    setFeedback(null)
  }

  const pct = Math.round((timeLeft / 60) * 100)
  const timerColor = timeLeft > 20 ? '#38BDF8' : timeLeft > 10 ? '#C5A670' : '#EF4444'

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-white mb-2">The Pro Scout</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
          You have 60 seconds to review LinkedIn profiles and tap every mistake you find. Ready?
        </p>
        <div className="w-full max-w-xs space-y-2 mb-8 text-left">
          {['Unprofessional photos', 'Spelling errors', 'Missing sections', 'Weak headlines', 'No contact info'].map((tip, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="text-electric">→</span> {tip}
            </div>
          ))}
        </div>
        <button
          onClick={startGame}
          className="w-full max-w-xs py-4 rounded-2xl bg-electric text-navy-900 font-bold text-lg"
        >
          Start Scouting
        </button>
        <button onClick={onBack} className="mt-3 text-slate-500 text-sm py-2">← Back</button>
      </div>
    )
  }

  if (finished) {
    const score = Math.round((totalFound / totalErrors) * 100)
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center animate-fade-in">
        <Trophy size={56} className="text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-1">Scout Report</h2>
        <p className="text-slate-400 text-sm mb-6">
          Found {totalFound}/{totalErrors} issues
        </p>
        <div className="w-full max-w-xs p-5 rounded-2xl bg-navy-800 border border-navy-600/60 mb-6">
          <div className="text-5xl font-black text-electric mb-1">{score}%</div>
          <p className="text-slate-400 text-sm">
            {score === 100 ? 'Perfect Scout! 🏆' : score >= 70 ? 'Sharp eye! Almost there.' : score >= 40 ? 'Good start. Keep practicing.' : 'Rookie scout. Try again!'}
          </p>
        </div>
        <button onClick={restart} className="w-full max-w-xs py-4 rounded-2xl bg-electric text-navy-900 font-bold mb-3">
          Scout Again
        </button>
        <button onClick={onBack} className="text-slate-500 text-sm py-2">← Games</button>
      </div>
    )
  }

  const currentErrors = profile.errors.filter(e => !e.found)
  const allFoundOnPage = currentErrors.length === 0

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Game Header */}
      <div className="px-4 pt-10 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-semibold">Profile {profileIndex + 1}/{profiles.length}</span>
            <span className="font-bold text-sm" style={{ color: timerColor }}>{timeLeft}s</span>
          </div>
          <div className="w-full h-1.5 bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${pct}%`, backgroundColor: timerColor }}
            />
          </div>
        </div>
      </div>

      {/* Profile Card — tap targets */}
      <div className="relative mx-4 rounded-2xl bg-navy-800 border border-navy-600/60 overflow-hidden" style={{ minHeight: 360 }}>
        {/* Mock LinkedIn layout */}
        <div className="bg-gradient-to-r from-cougar-bright to-cougar p-4 pb-10">
          <p className="text-white/70 text-xs font-medium uppercase tracking-wider">LinkedIn Profile</p>
        </div>

        {/* Avatar area */}
        <div className="px-4 -mt-6 mb-3">
          <div className="w-16 h-16 rounded-full bg-navy-700 border-2 border-navy-800 flex items-center justify-center text-2xl">
            {profile.photo}
          </div>
        </div>

        {/* Content sections — each is a potential tap target */}
        <div className="px-4 pb-4 space-y-3">
          {/* Name / headline area */}
          <div className="relative">
            <div className="font-bold text-white">{profile.name}</div>
            <div className="text-xs text-slate-400">{profile.sport}</div>
          </div>

          {/* Tap targets rendered as overlay dots */}
          {profile.errors.map(err => (
            <button
              key={err.id}
              onClick={() => tapError(err.id)}
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                err.found
                  ? 'bg-electric/20 border-electric text-electric'
                  : 'bg-red-500/20 border-red-500/60 text-red-400 animate-pulse-slow'
              }`}
              style={{ left: `${err.x}%`, top: `${err.y + 60}px` }}
            >
              {err.found ? <CheckCircle size={14} /> : <XCircle size={14} />}
            </button>
          ))}

          {/* Static profile sections */}
          <div className="h-px bg-navy-600/60" />
          <div>
            <div className="text-xs text-slate-500 mb-1 font-medium">About</div>
            <div className="text-slate-400 text-xs leading-relaxed h-8 bg-navy-700 rounded animate-pulse-slow" />
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1 font-medium">Experience</div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded bg-navy-700" />
              <div className="flex-1 space-y-1">
                <div className="h-2 bg-navy-700 rounded w-3/4 animate-pulse-slow" />
                <div className="h-2 bg-navy-700 rounded w-1/2 animate-pulse-slow" />
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1 font-medium">Skills</div>
            <div className="h-6 bg-navy-700 rounded w-full animate-pulse-slow" />
          </div>
        </div>

        {/* Score overlay */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 border border-electric/30">
          <span className="text-electric text-xs font-bold">
            {profile.errors.filter(e => e.found).length}/{profile.errors.length} found
          </span>
        </div>
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-electric/15 border border-electric/30 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-electric shrink-0" />
            <div>
              <p className="text-electric text-xs font-semibold">{feedback.label}</p>
              <p className="text-slate-400 text-xs">{feedback.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hint list */}
      <div className="mx-4 mt-3 space-y-1.5">
        {profile.errors.map(err => (
          <div key={err.id} className={`flex items-center gap-2 text-xs ${err.found ? 'text-electric' : 'text-slate-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${err.found ? 'bg-electric' : 'bg-navy-600'}`} />
            {err.found ? err.label : '???'}
          </div>
        ))}
      </div>

      {allFoundOnPage && (
        <div className="mx-4 mt-4">
          <button
            onClick={nextProfile}
            className="w-full py-3 rounded-xl bg-electric text-navy-900 font-bold text-sm"
          >
            {profileIndex < profiles.length - 1 ? 'Next Profile →' : 'See Results →'}
          </button>
        </div>
      )}
    </div>
  )
}
