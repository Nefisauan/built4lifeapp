import { useState } from 'react'
import { ChevronRight, Calendar, Zap, Plus, Settings2 } from 'lucide-react'
import Header from '../components/Header'
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
      cta: 'Go to Tutoring Portal',
    },
    caps: {
      title: 'Counseling & Psychological Services',
      icon: '💬',
      steps: ['Call (801) 422-3035 anytime', 'Walk-in: 1420 WSC', 'All sessions are confidential', 'Crisis support available 24/7'],
      cta: 'Call CAPS Now',
    },
    report: {
      title: 'Report a Concern',
      icon: '🛡️',
      steps: ['100% anonymous reporting available', 'Visit BYU\'s SafetyNet portal', 'You can report for yourself or a teammate', 'Retaliation is prohibited by policy'],
      cta: 'Go to SafetyNet',
    },
    career: {
      title: 'Career Advising',
      icon: '🚀',
      steps: ['Free for all BYU student-athletes', 'Resume reviews, interview prep, networking', 'BYU Career & Internship Center: 3rd floor Wilk', 'Also available: on-demand virtual sessions'],
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
        className="w-full max-w-lg bg-navy-800 rounded-2xl border border-navy-600/60 p-6 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-4xl mb-3 text-center">{data.icon}</div>
        <h3 className="text-xl font-bold text-white text-center mb-4">{data.title}</h3>
        <ul className="space-y-3 mb-6">
          {data.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="w-5 h-5 rounded-full bg-electric/20 border border-electric/30 text-electric text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-electric text-navy-900 font-bold text-sm"
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
      <Header />

      {/* Greeting */}
      <div className="px-5 pb-4">
        <p className="text-slate-400 text-sm">{greeting},</p>
        <p className="text-white font-semibold text-base">
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="px-4 space-y-5">

        {/* Quick Actions widget */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-electric" />
              <h2 className="text-white font-bold text-base">Quick Actions</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-navy-600 text-slate-400 text-xs">
                <Plus size={11} /> Add
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-navy-600 text-slate-400 text-xs">
                <Settings2 size={11} /> Edit
              </button>
            </div>
          </div>

          <div className="bg-navy-800 rounded-2xl overflow-hidden border border-navy-600/40">
            {quickActions.map((action, i) => (
              <button
                key={action.id}
                onClick={() => setActiveModal(action.action)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 text-left no-select active:bg-navy-700 transition-colors ${
                  i < quickActions.length - 1 ? 'border-b border-navy-600/40' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-navy-700 border border-navy-500/50 flex items-center justify-center text-xl shrink-0">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{action.label}</p>
                  <p className="text-slate-500 text-xs">{action.description}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-electric/15 border border-electric/30 flex items-center justify-center shrink-0">
                  <Plus size={12} className="text-electric" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Upcoming Dates widget */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-electric" />
              <h2 className="text-white font-bold text-base">On the Radar</h2>
            </div>
            <button className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-navy-600 text-slate-400 text-xs">
              <Settings2 size={11} /> Edit
            </button>
          </div>

          <div className="bg-navy-800 rounded-2xl overflow-hidden border border-navy-600/40">
            {visibleDates.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  i < visibleDates.length - 1 ? 'border-b border-navy-600/40' : ''
                }`}
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.label}</p>
                  <p className="text-slate-500 text-xs">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg ${item.bg} ${item.color} border ${item.border}`}>
                  {item.daysLabel}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Edge widget */}
        <section>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-sm">⚡</span>
            <h2 className="text-white font-bold text-base">Daily Edge</h2>
          </div>
          <div className="bg-navy-800 rounded-2xl border border-navy-600/40 p-4">
            <p className="text-white text-sm font-medium leading-relaxed">
              "Champions aren't made in the games. They're made in the hours between."
            </p>
            <p className="text-slate-500 text-xs mt-2">— BYU Student-Athlete Resources</p>
          </div>
        </section>

      </div>

      {activeModal && (
        <QuickActionModal action={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  )
}
