import { useState, useRef } from 'react'
import { ArrowLeft, Trophy, DollarSign } from 'lucide-react'
import { budgetScenarios } from '../data/gameData'

export default function BudgetBlitz({ onBack }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [swipeDir, setSwipeDir] = useState(null)
  const [outcome, setOutcome] = useState(null)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)
  const startX = useRef(null)
  const cardRef = useRef(null)

  const scenario = budgetScenarios[index]

  function handleSwipe(dir) {
    if (swipeDir) return
    setSwipeDir(dir)
    const result = dir === 'right' ? scenario.rightOutcome : scenario.leftOutcome
    setOutcome(result)
    if (result.type === 'success') setScore(s => s + 1)
    setTimeout(() => {
      setSwipeDir(null)
      setOutcome(null)
      if (index + 1 >= budgetScenarios.length) {
        setFinished(true)
      } else {
        setIndex(i => i + 1)
      }
    }, 2800)
  }

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX
  }
  function onTouchEnd(e) {
    if (startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (Math.abs(dx) > 60) handleSwipe(dx > 0 ? 'right' : 'left')
    startX.current = null
  }

  function restart() {
    setIndex(0)
    setScore(0)
    setSwipeDir(null)
    setOutcome(null)
    setFinished(false)
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center">
        <div className="text-6xl mb-4">💰</div>
        <h2 className="text-2xl font-bold text-white mb-2">Budget Blitz</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
          Real financial scenarios. Swipe right to spend, swipe left to save. Learn from every decision.
        </p>
        <div className="flex items-center gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl mb-1">👈</div>
            <div className="text-xs text-blue-400 font-medium">Swipe Left</div>
            <div className="text-xs text-slate-500">Save / Pass</div>
          </div>
          <div className="w-px h-10 bg-navy-600" />
          <div className="text-center">
            <div className="text-2xl mb-1">👉</div>
            <div className="text-xs text-green-400 font-medium">Swipe Right</div>
            <div className="text-xs text-slate-500">Spend / Go</div>
          </div>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="w-full max-w-xs py-4 rounded-2xl bg-electric text-navy-900 font-bold text-lg"
        >
          Start Blitz
        </button>
        <button onClick={onBack} className="mt-3 text-slate-500 text-sm py-2">← Back</button>
      </div>
    )
  }

  if (finished) {
    const pct = Math.round((score / budgetScenarios.length) * 100)
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center animate-fade-in">
        <Trophy size={56} className="text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-1">Budget Blitz Complete</h2>
        <p className="text-slate-400 text-sm mb-6">
          {score}/{budgetScenarios.length} smart decisions
        </p>
        <div className="w-full max-w-xs p-5 rounded-2xl bg-navy-800 border border-navy-600/60 mb-6">
          <div className="text-5xl font-black text-electric mb-1">{pct}%</div>
          <p className="text-slate-400 text-sm">
            {pct === 100 ? 'Future CFO energy. 🏆' : pct >= 70 ? 'Financially aware. Keep it up.' : pct >= 40 ? 'Learning the ropes. Good start.' : 'Time to level up that money IQ.'}
          </p>
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
      <div className="px-4 pt-10 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-semibold">Budget Blitz</span>
            <div className="flex items-center gap-1 text-electric text-sm font-bold">
              <DollarSign size={14} />
              {score} smart
            </div>
          </div>
          <div className="flex gap-1">
            {budgetScenarios.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full ${i < index ? 'bg-electric' : i === index ? 'bg-electric/50' : 'bg-navy-700'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress label */}
      <p className="text-center text-slate-500 text-xs mt-1 mb-4">
        Scenario {index + 1} of {budgetScenarios.length}
      </p>

      {/* Swipe hints */}
      <div className="flex items-center justify-between px-8 mb-2">
        <span className="text-blue-400 text-xs font-medium opacity-60">← Save</span>
        <span className="text-green-400 text-xs font-medium opacity-60">Spend →</span>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center px-4">
        <div
          ref={cardRef}
          className={`w-full p-6 rounded-3xl bg-navy-800 border border-navy-600/60 no-select ${
            swipeDir === 'left' ? 'animate-swipe-left' : swipeDir === 'right' ? 'animate-swipe-right' : ''
          }`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="text-center text-5xl mb-5">{scenario.emoji}</div>
          <p className="text-white text-base font-medium leading-relaxed text-center mb-6">
            {scenario.scenario}
          </p>

          {/* Tap buttons (for desktop / fallback) */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSwipe('left')}
              className="flex-1 py-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm font-semibold"
              disabled={!!swipeDir}
            >
              {scenario.choices.swipeLeft.label}
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="flex-1 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-semibold"
              disabled={!!swipeDir}
            >
              {scenario.choices.swipeRight.label}
            </button>
          </div>

          <p className="text-center text-slate-600 text-xs mt-3">or swipe the card</p>
        </div>
      </div>

      {/* Outcome reveal */}
      {outcome && (
        <div className={`mx-4 mt-4 p-4 rounded-2xl border animate-slide-up ${
          outcome.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
          outcome.type === 'danger' ? 'bg-red-500/10 border-red-500/30' :
          outcome.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
          'bg-navy-700 border-navy-600/60'
        }`}>
          <p className={`font-bold text-sm mb-1 ${
            outcome.type === 'success' ? 'text-green-400' :
            outcome.type === 'danger' ? 'text-red-400' :
            outcome.type === 'warning' ? 'text-yellow-400' :
            'text-electric'
          }`}>{outcome.title}</p>
          <p className="text-slate-300 text-xs leading-relaxed">{outcome.message}</p>
        </div>
      )}
    </div>
  )
}
