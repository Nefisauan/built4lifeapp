import { useState } from 'react'
import { ArrowLeft, Trophy, Eye, ChevronRight, Users, Star } from 'lucide-react'
import { guessWhoProAthletes, guessWhoBYUAthletes } from '../data/gameData'

// Shuffle array deterministically per round
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

const MAX_CLUES = 5
function pointsForClue(clueIndex) { return MAX_CLUES - clueIndex }

export default function GuessWhoIAm({ onBack }) {
  const [mode, setMode] = useState(null)           // 'pro' | 'byu' | null
  const [started, setStarted] = useState(false)
  const [deck, setDeck] = useState([])
  const [deckIndex, setDeckIndex] = useState(0)
  const [clueIndex, setClueIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])       // {name, correct, pointsEarned}
  const [finished, setFinished] = useState(false)
  const [shuffledChoices, setShuffledChoices] = useState([])

  const current = deck[deckIndex]

  function startGame(selectedMode) {
    const source = selectedMode === 'pro' ? guessWhoProAthletes : guessWhoBYUAthletes
    const shuffled = shuffle(source)
    setMode(selectedMode)
    setDeck(shuffled)
    setDeckIndex(0)
    setClueIndex(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setScore(0)
    setResults([])
    setFinished(false)
    setShuffledChoices(shuffle(shuffled[0].choices))
    setStarted(true)
  }

  function revealNextClue() {
    if (clueIndex < current.clues.length - 1) {
      setClueIndex(i => i + 1)
    }
  }

  function submitAnswer(choice) {
    if (answered) return
    const correct = choice === current.answer
    const pts = correct ? pointsForClue(clueIndex) : 0
    setSelectedAnswer(choice)
    setAnswered(true)
    setScore(s => s + pts)
    setResults(prev => [...prev, {
      name: current.name,
      correct,
      pointsEarned: pts,
      cluesUsed: clueIndex + 1,
    }])
  }

  function nextAthlete() {
    const nextIdx = deckIndex + 1
    if (nextIdx >= deck.length) {
      setFinished(true)
      return
    }
    setDeckIndex(nextIdx)
    setClueIndex(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setShuffledChoices(shuffle(deck[nextIdx].choices))
  }

  // ── Mode Select Screen ──────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="flex flex-col min-h-full pb-20 animate-fade-in">
        <div className="px-4 pt-10 pb-4 flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
            <ArrowLeft size={18} className="text-slate-400" />
          </button>
          <h2 className="text-white font-bold text-lg">Guess Who I Am</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10">
          <div className="text-6xl mb-4">🕵️</div>
          <h3 className="text-2xl font-bold text-white mb-2 text-center">Guess Who I Am</h3>
          <p className="text-slate-400 text-sm text-center mb-8 max-w-xs leading-relaxed">
            Progressive clues reveal a famous athlete. The fewer clues you need, the more points you earn.
          </p>

          <div className="w-full max-w-xs space-y-3 mb-8">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Clue 1</span>
              <span className="text-tan font-bold">5 pts</span>
              <span>Clue 2</span>
              <span className="text-tan font-bold">4 pts</span>
              <span>Clue 3</span>
              <span className="text-tan font-bold">3 pts</span>
              <span>…</span>
            </div>
            <p className="text-center text-slate-600 text-xs">Earlier = more points</p>
          </div>

          <div className="w-full max-w-xs space-y-3">
            <button
              onClick={() => startGame('pro')}
              className="w-full p-5 rounded-2xl text-left bg-gradient-to-br from-cougar to-navy-800 border border-electric/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <Star size={20} className="text-tan" />
                <span className="text-white font-bold text-base">Pro Athletes</span>
              </div>
              <p className="text-slate-400 text-sm">LeBron, Brady, Biles, Bolt, Curry, Phelps &amp; more.</p>
              <p className="text-electric text-xs mt-2">{guessWhoProAthletes.length} athletes →</p>
            </button>

            <button
              onClick={() => startGame('byu')}
              className="w-full p-5 rounded-2xl text-left bg-gradient-to-br from-cougar-light to-navy-800 border border-tan/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-black text-white">Y</span>
                <span className="text-white font-bold text-base">BYU Athletes</span>
              </div>
              <p className="text-slate-400 text-sm">Jimmer, Steve Young, Ty Detmer, Danny Ainge &amp; more.</p>
              <p className="text-tan text-xs mt-2">{guessWhoBYUAthletes.length} athletes →</p>
            </button>
          </div>

          <button onClick={onBack} className="mt-5 text-slate-500 text-sm py-2">← Games</button>
        </div>
      </div>
    )
  }

  // ── Results Screen ──────────────────────────────────────────────────────────
  if (finished) {
    const maxScore = deck.length * MAX_CLUES
    const pct = Math.round((score / maxScore) * 100)
    const correct = results.filter(r => r.correct).length

    return (
      <div className="flex flex-col min-h-full pb-20 animate-fade-in">
        <div className="px-4 pt-10 pb-6 text-center">
          <Trophy size={48} className="text-tan mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-1">
            {mode === 'pro' ? 'Pro Athlete' : 'BYU Athlete'} Results
          </h2>
          <p className="text-slate-400 text-sm mb-1">{correct}/{deck.length} correct</p>
          <div className="text-5xl font-black text-electric mt-3 mb-1">{score} pts</div>
          <div className="text-slate-500 text-xs">out of {maxScore} possible</div>
          <p className="text-slate-400 text-sm mt-2">
            {pct >= 80 ? '🏆 Scout-level knowledge!' : pct >= 60 ? '💪 Solid sports IQ.' : pct >= 40 ? '📚 Learning the legends.' : '🔍 Start following sports more!'}
          </p>
        </div>

        <div className="px-4 space-y-2 mb-6">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl border ${
                r.correct ? 'bg-electric/10 border-electric/20' : 'bg-navy-800 border-navy-600/60'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                r.correct ? 'bg-electric/20 text-electric' : 'bg-navy-700 text-slate-500'
              }`}>
                {r.correct ? `+${r.pointsEarned}` : '0'}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${r.correct ? 'text-white' : 'text-slate-500'}`}>{r.name}</p>
                <p className="text-slate-600 text-xs">{r.cluesUsed} clue{r.cluesUsed !== 1 ? 's' : ''} used</p>
              </div>
              <span className={`text-lg ${r.correct ? '' : 'grayscale opacity-40'}`}>
                {r.correct ? '✅' : '❌'}
              </span>
            </div>
          ))}
        </div>

        <div className="px-4 space-y-2">
          <button
            onClick={() => startGame(mode)}
            className="w-full py-4 rounded-2xl bg-electric text-navy-900 font-bold"
          >
            Play Again
          </button>
          <button
            onClick={() => { setStarted(false); setMode(null) }}
            className="w-full py-3 rounded-xl bg-navy-800 border border-navy-600/60 text-slate-300 font-medium text-sm"
          >
            Switch Mode
          </button>
          <button onClick={onBack} className="w-full py-2 text-slate-500 text-sm">← Games</button>
        </div>
      </div>
    )
  }

  // ── Main Game Screen ────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Header */}
      <div className="px-4 pt-10 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={18} className="text-slate-400" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-semibold">
                {mode === 'pro' ? '⭐ Pro Athletes' : '🔵 BYU Athletes'}
              </span>
              <span className="text-slate-600 text-xs">
                {deckIndex + 1}/{deck.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-tan text-sm font-bold">{score}</span>
              <span className="text-slate-600 text-xs">pts</span>
            </div>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1">
            {deck.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all ${
                  i < deckIndex ? 'bg-electric'
                  : i === deckIndex ? 'bg-electric/50'
                  : 'bg-navy-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sport badge */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{current.emoji}</span>
          <span className="text-slate-400 text-sm font-medium">{current.sport}</span>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tan/10 border border-tan/20">
            <span className="text-tan text-xs font-bold">{pointsForClue(clueIndex)} pts</span>
            <span className="text-slate-500 text-xs">if correct now</span>
          </div>
        </div>
      </div>

      {/* Clues stack */}
      <div className="px-4 space-y-2 mb-4">
        {current.clues.slice(0, clueIndex + 1).map((clue, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-xl border transition-all ${
              i === clueIndex
                ? 'bg-cougar/30 border-electric/30'
                : 'bg-navy-800 border-navy-600/40 opacity-60'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className={`text-xs font-bold shrink-0 mt-0.5 ${i === clueIndex ? 'text-electric' : 'text-slate-600'}`}>
                #{i + 1}
              </span>
              <p className={`text-sm leading-relaxed ${i === clueIndex ? 'text-white' : 'text-slate-500'}`}>
                {clue}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Answer revealed state */}
      {answered && (
        <div className={`mx-4 mb-4 p-4 rounded-2xl border animate-bounce-in ${
          selectedAnswer === current.answer
            ? 'bg-electric/10 border-electric/30'
            : 'bg-navy-800 border-navy-500/40'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{selectedAnswer === current.answer ? '✅' : '❌'}</span>
            <span className={`font-bold text-sm ${selectedAnswer === current.answer ? 'text-electric' : 'text-slate-400'}`}>
              {selectedAnswer === current.answer
                ? `Correct! +${pointsForClue(clueIndex)} pts`
                : `The answer was ${current.answer}`
              }
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">{current.funFact}</p>
        </div>
      )}

      {/* Multiple choice */}
      {!answered && (
        <div className="px-4 space-y-2 mb-4">
          {shuffledChoices.map(choice => (
            <button
              key={choice}
              onClick={() => submitAnswer(choice)}
              className="w-full text-left p-4 rounded-xl bg-navy-800 border border-navy-600/60 text-white text-sm font-medium active:scale-[0.98] transition-transform"
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="px-4 mt-auto space-y-2">
        {answered ? (
          <button
            onClick={nextAthlete}
            className="w-full py-4 rounded-2xl bg-electric text-navy-900 font-bold flex items-center justify-center gap-2"
          >
            {deckIndex + 1 < deck.length ? 'Next Athlete' : 'See Results'}
            <ChevronRight size={18} />
          </button>
        ) : (
          clueIndex < current.clues.length - 1 && (
            <button
              onClick={revealNextClue}
              className="w-full py-3 rounded-xl bg-navy-700 border border-navy-500/60 text-slate-300 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Eye size={15} className="text-slate-500" />
              Reveal Clue #{clueIndex + 2}
              <span className="text-slate-600 text-xs ml-1">(-1 pt potential)</span>
            </button>
          )
        )}
      </div>
    </div>
  )
}
