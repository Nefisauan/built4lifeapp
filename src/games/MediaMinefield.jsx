import { useState } from 'react'
import { ArrowLeft, Flag, CheckCircle, Clock, Trophy } from 'lucide-react'
import { socialPosts } from '../data/gameData'

export default function MediaMinefield({ onBack }) {
  const [started, setStarted] = useState(false)
  const [decisions, setDecisions] = useState({})
  const [revealed, setRevealed] = useState({})
  const [timeLeft, setTimeLeft] = useState(30)
  const [finished, setFinished] = useState(false)

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

  function decide(postId, flagged) {
    if (decisions[postId] !== undefined) return
    setDecisions(prev => ({ ...prev, [postId]: flagged }))
    setRevealed(prev => ({ ...prev, [postId]: true }))

    if (Object.keys(decisions).length + 1 >= socialPosts.length) {
      setFinished(true)
    }
  }

  function calcScore() {
    let correct = 0
    socialPosts.forEach(p => {
      if (decisions[p.id] !== undefined) {
        const userFlagged = decisions[p.id]
        if (userFlagged === p.shouldFlag) correct++
      }
    })
    return correct
  }

  function restart() {
    setDecisions({})
    setRevealed({})
    setTimeLeft(30)
    setStarted(false)
    setFinished(false)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 pb-20 text-center">
        <div className="text-6xl mb-4">📱</div>
        <h2 className="text-2xl font-bold text-white mb-2">Media Minefield</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
          A mock feed appears. You have 30 seconds to flag posts that could violate team rules or NIL compliance.
        </p>
        <div className="w-full max-w-xs space-y-2 mb-8 text-left">
          <div className="flex items-center gap-2 text-sm text-slate-300"><span className="text-red-400">🚩</span> Tap FLAG on risky posts</div>
          <div className="flex items-center gap-2 text-sm text-slate-300"><span className="text-green-400">✅</span> Tap SAFE on clean posts</div>
          <div className="flex items-center gap-2 text-sm text-slate-300"><span className="text-yellow-400">⚡</span> 30 seconds on the clock</div>
        </div>
        <button
          onClick={startGame}
          className="w-full max-w-xs py-4 rounded-2xl bg-electric text-navy-900 font-bold text-lg"
        >
          Scan the Feed
        </button>
        <button onClick={onBack} className="mt-3 text-slate-500 text-sm py-2">← Back</button>
      </div>
    )
  }

  if (finished) {
    const score = calcScore()
    const pct = Math.round((score / socialPosts.length) * 100)
    return (
      <div className="flex flex-col min-h-full pb-20 animate-fade-in">
        <div className="px-4 pt-10 pb-6 text-center">
          <Trophy size={48} className="text-yellow-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-1">Feed Review Complete</h2>
          <p className="text-slate-400 text-sm mb-4">{score}/{socialPosts.length} correct calls</p>
          <div className="text-5xl font-black text-electric mb-2">{pct}%</div>
          <p className="text-slate-400 text-sm">
            {pct === 100 ? 'Perfect compliance radar! 🏆' : pct >= 80 ? 'Sharp eye. Brand protected.' : pct >= 60 ? 'Getting there. Know your rules.' : 'Your compliance knowledge needs work.'}
          </p>
        </div>

        {/* Review each post */}
        <div className="px-4 space-y-3 mb-6">
          {socialPosts.map(post => {
            const userChoice = decisions[post.id]
            const wasCorrect = userChoice === post.shouldFlag
            const didDecide = userChoice !== undefined
            return (
              <div
                key={post.id}
                className={`p-3 rounded-xl border ${
                  !didDecide ? 'border-navy-600/60 bg-navy-800' :
                  wasCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">{post.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-400 text-xs font-medium">{post.user}</span>
                      {!didDecide && <span className="text-slate-600 text-xs">Not reviewed</span>}
                      {didDecide && wasCorrect && <span className="text-green-400 text-xs font-medium">✓ Correct</span>}
                      {didDecide && !wasCorrect && <span className="text-red-400 text-xs font-medium">✗ Missed</span>}
                    </div>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">{post.content}</p>
                    {post.shouldFlag && (
                      <p className="text-yellow-400 text-xs mt-1.5 leading-relaxed">⚠️ {post.reason}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-4">
          <button onClick={restart} className="w-full py-4 rounded-2xl bg-electric text-navy-900 font-bold mb-3">
            Scan Again
          </button>
          <button onClick={onBack} className="w-full py-2 text-slate-500 text-sm">← Games</button>
        </div>
      </div>
    )
  }

  const timerColor = timeLeft > 15 ? '#38BDF8' : timeLeft > 8 ? '#FBBF24' : '#EF4444'
  const decided = Object.keys(decisions).length

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-4 pt-10 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white text-sm font-semibold">Media Minefield</span>
            <div className="flex items-center gap-1.5" style={{ color: timerColor }}>
              <Clock size={13} />
              <span className="font-bold text-sm">{timeLeft}s</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%`, backgroundColor: timerColor }}
            />
          </div>
        </div>
      </div>

      <p className="text-center text-slate-500 text-xs mb-3">{decided}/{socialPosts.length} reviewed</p>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {socialPosts.map(post => {
          const userChoice = decisions[post.id]
          const hasDecided = userChoice !== undefined
          const wasCorrect = hasDecided && userChoice === post.shouldFlag

          return (
            <div
              key={post.id}
              className={`p-4 rounded-2xl bg-navy-800 border transition-all ${
                hasDecided
                  ? wasCorrect ? 'border-green-500/30' : 'border-red-500/30'
                  : 'border-navy-600/60'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-navy-700 flex items-center justify-center text-lg shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-electric text-xs font-medium">{post.user}</span>
                    <span className="text-slate-600 text-xs">{post.time}</span>
                  </div>
                  <p className="text-slate-200 text-sm mt-1 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <div className="mt-2 h-16 rounded-xl bg-navy-700 border border-navy-600/60 flex items-center justify-center text-2xl">
                      {post.image}
                    </div>
                  )}
                </div>
              </div>

              {revealed[post.id] ? (
                <div className={`flex items-center gap-2 text-xs ${wasCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {wasCorrect
                    ? <><CheckCircle size={13} /> {post.shouldFlag ? 'Correctly flagged!' : 'Correctly cleared!'}</>
                    : <><Flag size={13} /> {post.shouldFlag ? 'Should have been flagged.' : 'This post was actually safe.'}</>
                  }
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => decide(post.id, true)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold"
                  >
                    <Flag size={12} /> FLAG
                  </button>
                  <button
                    onClick={() => decide(post.id, false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold"
                  >
                    <CheckCircle size={12} /> SAFE
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
