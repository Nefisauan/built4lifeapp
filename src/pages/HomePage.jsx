import { useState } from 'react'
import { Zap, Plus, Settings2, Calendar, Trophy, ChevronDown, ChevronUp, X, Send, Camera } from 'lucide-react'
import Header from '../components/Header'
import MiniCalendar from '../components/MiniCalendar'
import { upcomingDates, quickActions } from '../data/upcomingDates'
import { alstonAward } from '../data/alstonData'


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

const CONTENT_TYPES = ['Day in the Life', 'Workout/Training', 'Q&A', 'Event Coverage', 'Campus Tour', 'Motivation', 'Other']
const CONTENT_RECIPIENT = 'corallee_alexander@byu.edu'

function ContentSignupModal({ onClose }) {
  const [tab, setTab] = useState('film')       // 'film' | 'suggest'
  const [submitted, setSubmitted] = useState(false)

  // Film form
  const [filmName, setFilmName] = useState('')
  const [filmSport, setFilmSport] = useState('')
  const [filmInsta, setFilmInsta] = useState('')
  const [filmTypes, setFilmTypes] = useState([])
  const [filmAvail, setFilmAvail] = useState('')

  // Suggest form
  const [suggestIdea, setSuggestIdea] = useState('')
  const [suggestType, setSuggestType] = useState('')
  const [suggestName, setSuggestName] = useState('')

  function toggleType(t) {
    setFilmTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  function submitFilm() {
    if (!filmName || !filmSport) return
    const subject = encodeURIComponent('Built4Life Content Creator Sign-Up')
    const body = encodeURIComponent(
      `Name: ${filmName}\nSport/Team: ${filmSport}\nInstagram: ${filmInsta || 'N/A'}\nContent Types: ${filmTypes.join(', ') || 'Any'}\nAvailability: ${filmAvail || 'Flexible'}`
    )
    window.open(`mailto:${CONTENT_RECIPIENT}?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  function submitSuggest() {
    if (!suggestIdea) return
    const subject = encodeURIComponent('Built4Life Content Idea Suggestion')
    const body = encodeURIComponent(
      `Idea: ${suggestIdea}\nType: ${suggestType || 'General'}\nFrom: ${suggestName || 'Anonymous'}`
    )
    window.open(`mailto:${CONTENT_RECIPIENT}?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-0">
      <div
        className="w-full max-w-lg bg-navy-800 rounded-t-3xl border-t border-navy-600/60 animate-slide-up"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Handle + header */}
        <div className="sticky top-0 bg-navy-800 pt-3 pb-0 px-5 z-10">
          <div className="w-10 h-1 rounded-full bg-navy-600 mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-electric" />
              <h3 className="text-white font-bold text-lg">Create with Built4Life</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-500">
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-navy-900 p-1 mb-5">
            {[['film', '🎬 Film with Us'], ['suggest', '💡 Suggest an Idea']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => { setTab(id); setSubmitted(false) }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tab === id ? 'bg-electric text-navy-900' : 'text-slate-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🙌</div>
              <p className="text-white font-bold text-lg mb-2">You're on the list!</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tab === 'film'
                  ? "We'll reach out soon to schedule filming. Keep an eye on your inbox!"
                  : "Your idea has been sent to the Built4Life content team. Thanks for pitching!"}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl bg-electric text-navy-900 font-bold text-sm"
              >
                Done
              </button>
            </div>
          ) : tab === 'film' ? (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed">
                Want to be featured on Built4Life's Instagram? Sign up to create content with us — we'll reach out to schedule a shoot.
              </p>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Full Name *</label>
                <input
                  value={filmName}
                  onChange={e => setFilmName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-navy-900 border border-navy-600/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-electric/50"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Sport / Team *</label>
                <input
                  value={filmSport}
                  onChange={e => setFilmSport(e.target.value)}
                  placeholder="e.g. Football, Women's Volleyball..."
                  className="w-full bg-navy-900 border border-navy-600/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-electric/50"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Instagram Handle</label>
                <input
                  value={filmInsta}
                  onChange={e => setFilmInsta(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full bg-navy-900 border border-navy-600/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-electric/50"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-2">Content I'd love to make</label>
                <div className="flex flex-wrap gap-2">
                  {CONTENT_TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        filmTypes.includes(t)
                          ? 'bg-electric/20 border-electric text-electric'
                          : 'bg-navy-900 border-navy-600/60 text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Availability</label>
                <input
                  value={filmAvail}
                  onChange={e => setFilmAvail(e.target.value)}
                  placeholder="e.g. Weekday afternoons, flexible..."
                  className="w-full bg-navy-900 border border-navy-600/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-electric/50"
                />
              </div>

              <button
                onClick={submitFilm}
                disabled={!filmName || !filmSport}
                className="w-full py-4 rounded-2xl bg-electric text-navy-900 font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Send size={16} /> Sign Me Up
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed">
                Have a great idea for Built4Life's Instagram? Pitch it — the best ideas get made.
              </p>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Your Idea *</label>
                <textarea
                  value={suggestIdea}
                  onChange={e => setSuggestIdea(e.target.value)}
                  placeholder="Describe your content idea..."
                  rows={4}
                  className="w-full bg-navy-900 border border-navy-600/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-electric/50 resize-none"
                />
              </div>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-2">Type of Post</label>
                <div className="flex flex-wrap gap-2">
                  {CONTENT_TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setSuggestType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        suggestType === t
                          ? 'bg-electric/20 border-electric text-electric'
                          : 'bg-navy-900 border-navy-600/60 text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Your Name (optional)</label>
                <input
                  value={suggestName}
                  onChange={e => setSuggestName(e.target.value)}
                  placeholder="Leave blank to stay anonymous"
                  className="w-full bg-navy-900 border border-navy-600/60 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-electric/50"
                />
              </div>

              <button
                onClick={submitSuggest}
                disabled={!suggestIdea}
                className="w-full py-4 rounded-2xl bg-electric text-navy-900 font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Send size={16} /> Pitch This Idea
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AlstonWidget() {
  const [expanded, setExpanded] = useState(false)
  const { title, subtitle, requirements, deadline } = alstonAward

  const completed = requirements.filter(r => r.current >= r.target).length
  const overall = Math.round((completed / requirements.length) * 100)

  const daysLeft = Math.max(
    0,
    Math.round((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
  )

  return (
    <div className="bg-navy-800 rounded-2xl border border-navy-600/40 overflow-hidden">
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-3 px-4 py-4 text-left no-select active:bg-navy-700 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-tan/15 border border-tan/30 flex items-center justify-center text-xl shrink-0">
          🏅
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">{title}</p>
          <p className="text-slate-500 text-xs truncate">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-tan font-bold text-sm">{overall}%</span>
          {expanded ? (
            <ChevronUp size={16} className="text-slate-500" />
          ) : (
            <ChevronDown size={16} className="text-slate-500" />
          )}
        </div>
      </button>

      {/* Overall progress bar */}
      <div className="px-4 pb-3">
        <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-tan to-electric rounded-full transition-all duration-500"
            style={{ width: `${overall}%` }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-1.5">
          {completed}/{requirements.length} requirements met · {daysLeft}d until deadline
        </p>
      </div>

      {/* Expanded requirements list */}
      {expanded && (
        <div className="border-t border-navy-600/40">
          {requirements.map((req, i) => {
            const pct = Math.min(100, Math.round((req.current / req.target) * 100))
            const done = req.current >= req.target

            let statusLabel = ''
            if (req.type === 'boolean') statusLabel = done ? 'Done' : 'Pending'
            else if (req.type === 'threshold') statusLabel = done ? '✓ Met' : 'Not met'
            else statusLabel = `${req.current}/${req.target}`

            return (
              <div
                key={req.id}
                className={`px-4 py-3 ${i < requirements.length - 1 ? 'border-b border-navy-600/30' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base shrink-0">{req.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white text-xs font-medium">{req.label}</p>
                      <span className={`text-xs font-bold ${done ? 'text-electric' : 'text-slate-500'}`}>
                        {statusLabel}
                      </span>
                    </div>
                    {req.type === 'progress' && (
                      <div className="h-1 bg-navy-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-electric' : 'bg-tan'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                    <p className="text-slate-500 text-[10px] mt-0.5">{req.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const [activeModal, setActiveModal] = useState(null)
  const [contentOpen, setContentOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening'

  const nextEvents = upcomingDates
    .filter(d => new Date(d.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)


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

        {/* Calendar widget */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-electric" />
              <h2 className="text-white font-bold text-base">On the Radar</h2>
            </div>
          </div>
          <MiniCalendar events={upcomingDates} />

          {/* Next 3 upcoming events */}
          <div className="mt-3 bg-navy-800 rounded-2xl border border-navy-600/40 overflow-hidden">
            {nextEvents.map((item, i) => {
              const daysAway = Math.round((new Date(item.date) - today) / (1000 * 60 * 60 * 24))
              const label = daysAway === 0 ? 'Today' : daysAway === 1 ? 'Tomorrow' : `In ${daysAway}d`
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i < nextEvents.length - 1 ? 'border-b border-navy-600/40' : ''}`}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.label}</p>
                    <p className="text-slate-500 text-xs">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ${item.color}`}>{label}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Create with Built4Life */}
        <section>
          <button
            onClick={() => setContentOpen(true)}
            className="w-full text-left bg-gradient-to-br from-cougar-bright via-cougar to-navy-800 rounded-2xl border border-electric/30 p-5 no-select active:scale-[0.98] transition-transform"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <Camera size={16} className="text-electric" />
                  <span className="text-electric text-xs font-bold tracking-wide uppercase">Built4Life Instagram</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight mb-1.5">
                  Create Content With Us 📸
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Sign up to film or pitch an idea for our Instagram. Your story deserves to be seen.
                </p>
              </div>
              <span className="text-3xl ml-3 shrink-0">🎬</span>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-electric/20 border border-electric/30 text-electric text-xs font-semibold">Film with Us</span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">Suggest an Idea</span>
            </div>
          </button>
        </section>

        {/* Alston Award Progress */}
        <section>
          <div className="flex items-center gap-2 mb-2.5">
            <Trophy size={14} className="text-tan" />
            <h2 className="text-white font-bold text-base">Alston Award</h2>
          </div>
          <AlstonWidget />
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
      {contentOpen && (
        <ContentSignupModal onClose={() => setContentOpen(false)} />
      )}
    </div>
  )
}
