import { useState } from 'react'
import { Gamepad2 } from 'lucide-react'
import ProScout from '../games/ProScout'
import BudgetBlitz from '../games/BudgetBlitz'
import MediaMinefield from '../games/MediaMinefield'
import TheNetworker from '../games/TheNetworker'

const games = [
  {
    id: 'scout',
    title: 'The Pro Scout',
    tagline: '60-Second LinkedIn Speedrun',
    description: 'Review a sample LinkedIn profile and tap the errors before time runs out.',
    emoji: '🔍',
    color: 'from-blue-900 to-navy-800',
    border: 'border-blue-500/20',
    badge: 'Career Ready',
    badgeColor: 'text-blue-400 bg-blue-400/10',
    difficulty: '⚡ Easy',
  },
  {
    id: 'budget',
    title: 'Budget Blitz',
    tagline: 'Swipe on Real Money Decisions',
    description: 'Scenarios pop up. Swipe left to save, swipe right to spend. Learn from every choice.',
    emoji: '💰',
    color: 'from-green-900 to-navy-800',
    border: 'border-green-500/20',
    badge: 'Financial IQ',
    badgeColor: 'text-green-400 bg-green-400/10',
    difficulty: '⚡⚡ Medium',
  },
  {
    id: 'minefield',
    title: 'Media Minefield',
    tagline: '30 Seconds to Scan the Feed',
    description: 'A mock social feed appears. Flag posts that violate team rules or NIL compliance.',
    emoji: '📱',
    color: 'from-red-900 to-navy-800',
    border: 'border-red-500/20',
    badge: 'Brand Protection',
    badgeColor: 'text-red-400 bg-red-400/10',
    difficulty: '⚡⚡⚡ Hard',
  },
  {
    id: 'networker',
    title: 'The Networker',
    tagline: 'Match Alumni to Industries',
    description: 'Connect BYU alumni mentors to their industries and build your professional network awareness.',
    emoji: '🤝',
    color: 'from-purple-900 to-navy-800',
    border: 'border-purple-500/20',
    badge: 'Post-Grad Prep',
    badgeColor: 'text-purple-400 bg-purple-400/10',
    difficulty: '⚡ Easy',
  },
]

export default function PlayPage() {
  const [activeGame, setActiveGame] = useState(null)

  if (activeGame === 'scout') return <ProScout onBack={() => setActiveGame(null)} />
  if (activeGame === 'budget') return <BudgetBlitz onBack={() => setActiveGame(null)} />
  if (activeGame === 'minefield') return <MediaMinefield onBack={() => setActiveGame(null)} />
  if (activeGame === 'networker') return <TheNetworker onBack={() => setActiveGame(null)} />

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
        style={{ background: 'linear-gradient(180deg, #001A3A 0%, #070C18 100%)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Gamepad2 size={18} className="text-electric" />
          <h1 className="text-2xl font-bold text-white">Play</h1>
        </div>
        <p className="text-slate-400 text-sm">Real skills. No homework. Under 60 seconds.</p>
      </div>

      {/* Stats bar */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-navy-800 border border-navy-600/60 flex items-center justify-around">
        <div className="text-center">
          <div className="text-xl font-bold text-electric">4</div>
          <div className="text-slate-500 text-xs">Games</div>
        </div>
        <div className="w-px h-8 bg-navy-600" />
        <div className="text-center">
          <div className="text-xl font-bold text-electric">&lt;60s</div>
          <div className="text-slate-500 text-xs">Each</div>
        </div>
        <div className="w-px h-8 bg-navy-600" />
        <div className="text-center">
          <div className="text-xl font-bold text-electric">0</div>
          <div className="text-slate-500 text-xs">GPA Impact</div>
        </div>
      </div>

      {/* Game Cards */}
      <div className="px-4 mt-5 space-y-3">
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            className={`w-full text-left p-5 rounded-2xl bg-gradient-to-br ${game.color} border ${game.border} no-select`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{game.emoji}</div>
                <div>
                  <h3 className="text-white font-bold text-base">{game.title}</h3>
                  <p className="text-slate-400 text-xs">{game.tagline}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${game.badgeColor}`}>
                {game.badge}
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{game.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-xs">{game.difficulty}</span>
              <span className="text-electric text-xs font-semibold">Play →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
