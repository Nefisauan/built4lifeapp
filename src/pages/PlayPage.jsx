import { useState } from 'react'
import Header from '../components/Header'
import ProScout from '../games/ProScout'
import BudgetBlitz from '../games/BudgetBlitz'
import MediaMinefield from '../games/MediaMinefield'
import TheNetworker from '../games/TheNetworker'
import GuessWhoIAm from '../games/GuessWhoIAm'

const games = [
  {
    id: 'guesswho',
    title: 'Guess Who I Am',
    tagline: 'Pro Athletes + BYU Legends',
    description: 'Progressive clues reveal a famous athlete. Guess early for max points. Two modes: Pro Athletes and BYU Athletes.',
    emoji: '🕵️',
    color: 'from-cougar to-navy-800',
    border: 'border-tan/25',
    badge: 'Sports IQ',
    badgeColor: 'text-tan bg-tan/10',
    difficulty: '⚡⚡ Medium',
    isNew: true,
  },
  {
    id: 'scout',
    title: 'The Pro Scout',
    tagline: '60-Second LinkedIn Speedrun',
    description: 'Review a sample LinkedIn profile and tap the errors before time runs out.',
    emoji: '🔍',
    color: 'from-cougar-bright to-navy-800',
    border: 'border-electric/20',
    badge: 'Career Ready',
    badgeColor: 'text-electric bg-electric/10',
    difficulty: '⚡ Easy',
    isNew: false,
  },
  {
    id: 'budget',
    title: 'Budget Blitz',
    tagline: 'Swipe on Real Money Decisions',
    description: 'Scenarios pop up. Swipe left to save, swipe right to spend. Learn from every choice.',
    emoji: '💰',
    color: 'from-navy-700 to-navy-900',
    border: 'border-electric/15',
    badge: 'Financial IQ',
    badgeColor: 'text-electric bg-electric/10',
    difficulty: '⚡⚡ Medium',
    isNew: false,
  },
  {
    id: 'minefield',
    title: 'Media Minefield',
    tagline: '30 Seconds to Scan the Feed',
    description: 'A mock social feed appears. Flag posts that violate team rules or NIL compliance.',
    emoji: '📱',
    color: 'from-cougar-light to-navy-800',
    border: 'border-sky-300/20',
    badge: 'Brand Protection',
    badgeColor: 'text-sky-300 bg-sky-300/10',
    difficulty: '⚡⚡⚡ Hard',
    isNew: false,
  },
  {
    id: 'networker',
    title: 'The Networker',
    tagline: 'Match Alumni to Industries',
    description: 'Connect BYU alumni mentors to their industries and build your professional network awareness.',
    emoji: '🤝',
    color: 'from-navy-600 to-navy-900',
    border: 'border-electric/15',
    badge: 'Post-Grad Prep',
    badgeColor: 'text-electric bg-electric/10',
    difficulty: '⚡ Easy',
    isNew: false,
  },
]

export default function PlayPage() {
  const [activeGame, setActiveGame] = useState(null)

  if (activeGame === 'guesswho') return <GuessWhoIAm onBack={() => setActiveGame(null)} />
  if (activeGame === 'scout') return <ProScout onBack={() => setActiveGame(null)} />
  if (activeGame === 'budget') return <BudgetBlitz onBack={() => setActiveGame(null)} />
  if (activeGame === 'minefield') return <MediaMinefield onBack={() => setActiveGame(null)} />
  if (activeGame === 'networker') return <TheNetworker onBack={() => setActiveGame(null)} />

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      <Header title="Play" />

      <p className="text-slate-400 text-sm px-5 pb-4">Real skills. No homework. Under 60 seconds.</p>

      {/* Stats bar */}
      <div className="mx-4 mb-4 bg-navy-800 rounded-2xl border border-navy-600/40 flex items-center justify-around py-3">
        <div className="text-center">
          <div className="text-xl font-bold text-electric">{games.length}</div>
          <div className="text-slate-500 text-xs">Games</div>
        </div>
        <div className="w-px h-7 bg-navy-600/60" />
        <div className="text-center">
          <div className="text-xl font-bold text-electric">&lt;60s</div>
          <div className="text-slate-500 text-xs">Each</div>
        </div>
        <div className="w-px h-7 bg-navy-600/60" />
        <div className="text-center">
          <div className="text-xl font-bold text-electric">0</div>
          <div className="text-slate-500 text-xs">GPA Impact</div>
        </div>
      </div>

      {/* Game list — card style matching BYU widget cards */}
      <div className="px-4 space-y-3">
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`w-full text-left p-5 rounded-2xl bg-gradient-to-br ${game.color} border ${game.border} no-select relative`}
          >
            {game.isNew && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-tan text-navy-900 text-xs font-bold">
                NEW
              </div>
            )}
            <div className="flex items-start gap-3 mb-3">
              <div className="text-4xl shrink-0">{game.emoji}</div>
              <div className="flex-1 pr-8">
                <h3 className="text-white font-bold text-base">{game.title}</h3>
                <p className="text-slate-400 text-xs">{game.tagline}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{game.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${game.badgeColor}`}>
                  {game.badge}
                </span>
                <span className="text-slate-600 text-xs">{game.difficulty}</span>
              </div>
              <span className="text-electric text-xs font-semibold">Play →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
