import { useState } from 'react'
import { ChevronRight, Bell, Calendar, Zap } from 'lucide-react'
import { upcomingDates, quickActions } from '../data/upcomingDates'

function getDaysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'TODAY'
  if (diff === 1) return 'Tomorrow'
  if (diff < 0) return null
  return `${diff}d`
}

function QuickActionModal({ action, onClose }) {
  const info = {
    tutor: {
      title: 'Book a Tutor',
      icon: '📖',
      steps: ['Visit byusa.byu.edu/academic-support', 'Select your subject', 'Book a free 1-hour session', 'Get matched within 24 hours'],
      color: 'border-blue-500/40',
      cta: 'Go to Tutoring Portal',
    },
    caps: {
      title: 'Counseling & Psychological Services',
      icon: '💬',
      steps: ['Call (801) 422-3035 anytime', 'Walk-in: 1420 WSC', 'All sessions are confidential', 'Crisis support available 24/7'],
      color: 'border-purple-500/40',
      cta: 'Call CAPS Now',
    },
    report: {
      title: 'Report a Concern',
      icon: '🛡️',
      steps: ['100% anonymous reporting available', 'Visit BYU\'s SafetyNet portal', 'You can report for yourself or a teammate', 'Retaliation is prohibited by policy'],
      color: 'border-orange-500/40',
      cta: 'Go to SafetyNet',
    },
    career: {
      title: 'Career Advising',
      icon: '🚀',
      steps: ['Free for all BYU student-athletes', 'Resume reviews, interview prep, networking', 'BYU Career & Internship Center: 3rd floor Wilk', 'Also available: on-demand virtual sessions'],
      color: 'border-emerald-500/40',
      cta: 'Book Career Advising',
    },
  }
  const data = info[action]
  if (!data) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-4 pb-8"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-lg bg-navy-800 rounded-2xl border ${data.color} p-6 animate-slide-up`}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-4xl mb-3 text-center">{data.icon}</div>
        <h3 className="text-xl font-bold text-white text-center mb-4">{data.title}</h3>
        <ul className="space-y-2 mb-6">
          {data.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-electric mt-0.5 shrink-0">→</span>
              {step}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-electric/20 border border-electric/30 text-electric font-semibold text-sm"
        >
          {data.cta}
        </button>
        <button onClick={onClose} className="w-full mt-2 py-2 text-slate-500 text-xs">
          Close
        </button>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState(null)

  const today = new Date()
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening'

  const visibleDates = upcomingDates
    .map(d => ({ ...d, daysLabel: getDaysUntil(d.date) }))
    .filter(d => d.daysLabel !== null)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: 'linear-gradient(180deg, #001A3A 0%, #070C18 100%)' }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-slate-400 text-sm">{greeting},</p>
            <h1 className="text-2xl font-bold text-white">
              Built<span className="text-electric">4</span>Life
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-navy-700 border border-navy-500/60 flex items-center justify-center">
              <Bell size={16} className="text-slate-400" />
            </div>
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-2">
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="px-4 space-y-6">
        {/* Quick Actions */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={15} className="text-electric" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(action => (
              <button
                key={action.id}
                onClick={() => setActiveModal(action.action)}
                className={`relative flex flex-col items-start p-4 rounded-2xl bg-gradient-to-br ${action.color} border ${action.border} no-select`}
              >
                <span className="text-2xl mb-2">{action.icon}</span>
                <span className="text-white font-semibold text-sm leading-tight">{action.label}</span>
                <span className="text-white/60 text-xs mt-0.5">{action.description}</span>
                <ChevronRight size={14} className="absolute top-3 right-3 text-white/40" />
              </button>
            ))}
          </div>
        </section>

        {/* Upcoming Dates */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} className="text-electric" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">On the Radar</h2>
          </div>
          <div className="space-y-2">
            {visibleDates.map(item => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl ${item.bg} border ${item.border}`}
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.label}</p>
                  <p className="text-slate-500 text-xs">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className={`shrink-0 px-2.5 py-1 rounded-lg ${item.bg} border ${item.border}`}>
                  <span className={`${item.color} text-xs font-bold`}>
                    {item.daysLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Tip */}
        <section>
          <div
            className="p-4 rounded-2xl border border-electric/20 glow-sm"
            style={{ background: 'linear-gradient(135deg, #001830 0%, #0D1526 100%)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="text-electric text-xs font-semibold uppercase tracking-wider">Daily Edge</span>
            </div>
            <p className="text-white text-sm font-medium leading-relaxed">
              "Champions aren't made in the games. They're made in the hours between."
            </p>
            <p className="text-slate-500 text-xs mt-1">— BYU Student-Athlete Resources</p>
          </div>
        </section>
      </div>

      {activeModal && (
        <QuickActionModal action={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  )
}
