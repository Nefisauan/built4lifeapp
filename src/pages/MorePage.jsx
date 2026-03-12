import { useState } from 'react'
import { ChevronRight, Plus, Search } from 'lucide-react'
import Header from '../components/Header'

const allTools = [
  { id: 1, label: 'Academic Advising', icon: '🗺️', category: 'Academic' },
  { id: 2, label: 'Book a Tutor', icon: '📖', category: 'Academic' },
  { id: 3, label: 'Testing Center', icon: '📝', category: 'Academic' },
  { id: 4, label: 'Writing Center', icon: '✍️', category: 'Academic' },
  { id: 5, label: 'CAPS — Counseling', icon: '💬', category: 'Wellness', detail: '(801) 422-3035 · Free' },
  { id: 6, label: 'Crisis Line', icon: '🆘', category: 'Wellness', detail: '988 — 24/7' },
  { id: 7, label: 'Athlete Mental Health', icon: '🧠', category: 'Wellness' },
  { id: 8, label: 'Meditation Rooms', icon: '🧘', category: 'Wellness', detail: 'WSC quiet spaces' },
  { id: 9, label: 'Career Center', icon: '🚀', category: 'Career', detail: '3rd floor Wilk' },
  { id: 10, label: 'NIL Compliance', icon: '⚖️', category: 'Career', detail: 'Disclose before signing' },
  { id: 11, label: 'LinkedIn Workshop', icon: '💼', category: 'Career', detail: 'Monthly — free' },
  { id: 12, label: 'Alumni Network', icon: '🤝', category: 'Career' },
  { id: 13, label: 'SafetyNet', icon: '🛡️', category: 'Campus', detail: 'Anonymous reporting' },
  { id: 14, label: 'BYU Police', icon: '🚔', category: 'Campus', detail: '(801) 422-2222' },
  { id: 15, label: 'Title IX Office', icon: '🔒', category: 'Campus', detail: 'Confidential' },
  { id: 16, label: 'Ombudsman', icon: '⚖️', category: 'Campus', detail: 'Conflict resolution' },
  { id: 17, label: 'Cougar Cash', icon: '💳', category: 'Financial' },
  { id: 18, label: 'My Financial Center', icon: '📊', category: 'Financial' },
  { id: 19, label: 'Scholarship Info', icon: '🎓', category: 'Financial' },
  { id: 20, label: 'BYU Homepage', icon: '🌐', category: 'Campus' },
]

const filters = ['All', 'Academic', 'Wellness', 'Career', 'Campus', 'Financial']

export default function MorePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  const visible = allTools.filter(t => {
    const matchFilter = activeFilter === 'All' || t.category === activeFilter
    const matchSearch = t.label.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      <Header title="All Tools" rightElement={null} />

      {/* Search bar — matches BYU All Tools exactly */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-navy-800 border border-navy-600/40 rounded-xl px-3 py-2.5">
          <Search size={15} className="text-slate-500 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Filter pills — matches BYU "Filter By:" */}
      <div className="px-4 mb-4">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Filter By:</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                activeFilter === f
                  ? 'bg-electric text-navy-900 border-electric font-semibold'
                  : 'bg-transparent text-slate-300 border-navy-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tool list — matches BYU All Tools row style exactly */}
      <div className="mx-4 bg-navy-800 rounded-2xl border border-navy-600/40 overflow-hidden">
        {visible.map((tool, i) => (
          <button
            key={tool.id}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left no-select active:bg-navy-700 transition-colors ${
              i < visible.length - 1 ? 'border-b border-navy-600/40' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-navy-700 border border-navy-500/40 flex items-center justify-center text-lg shrink-0">
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{tool.label}</p>
              {tool.detail && <p className="text-slate-500 text-xs">{tool.detail}</p>}
            </div>
            <div className="w-6 h-6 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0">
              <Plus size={12} className="text-electric" />
            </div>
          </button>
        ))}

        {visible.length === 0 && (
          <div className="py-8 text-center text-slate-500 text-sm">
            No tools found
          </div>
        )}
      </div>

      {/* App info */}
      <div className="mx-4 mt-4 bg-navy-800 rounded-2xl border border-navy-600/40 divide-y divide-navy-600/40">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-slate-400 text-sm">Version</span>
          <span className="text-white text-sm font-medium">1.0.0</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-slate-400 text-sm">Built for</span>
          <span className="text-white text-sm font-medium">BYU Student-Athletes</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-slate-400 text-sm">Feedback</span>
          <span className="text-electric text-sm font-medium">athletics@byu.edu</span>
        </div>
      </div>
    </div>
  )
}
