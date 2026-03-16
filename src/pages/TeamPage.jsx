import { useState } from 'react'
import Header from '../components/Header'
import { ExternalLink, Mail, Phone, ChevronDown, ChevronUp, Clock } from 'lucide-react'

// ── Staff organized by category ────────────────────────────────────────────

const LEADERSHIP = [
  {
    name: 'Trevor Wilson',
    title: 'Director & Associate Dean of Student-Athletes',
    email: 'trevor_wilson@byu.edu',
    phone: '801-422-5305',
    emoji: '🏛️',
  },
  {
    name: 'Gary Veron',
    title: 'Associate AD — Student-Athlete Experience & Built4Life',
    email: 'gary_veron@byu.edu',
    phone: '801-422-6962',
    emoji: '🎯',
  },
  {
    name: 'Whitney Johnson Catt',
    title: 'Associate AD — Development, Diversity & Inclusion',
    email: 'whitney_johnson@byu.edu',
    phone: '801-422-4636',
    emoji: '🌐',
  },
  {
    name: 'Nycole Larsen',
    title: 'Assistant AD — Olympic Sport Academics',
    email: 'nycole_larsen@byu.edu',
    phone: '801-422-9750',
    emoji: '📊',
  },
  {
    name: 'Jasen Ah You',
    title: 'Assistant AD — Football Academics',
    email: 'jasen_ahyou@byu.edu',
    phone: '801-205-2925',
    emoji: '🏈',
  },
]

const MENTAL_HEALTH = [
  {
    name: 'Holly Binks, CMHC',
    title: 'Assistant AD — Clinical Mental Health',
    email: 'holly.binks@byu.edu',
    phone: '208-705-3872',
    emoji: '💙',
  },
  {
    name: 'Craig Manning',
    title: 'Associate AD — Mental Performance',
    email: 'craig_manning@byu.edu',
    phone: '801-422-4464',
    emoji: '🧠',
  },
  {
    name: 'Bobby Low, PhD, EdSp',
    title: 'Assistant AD — Mental Performance',
    email: 'Bobby.Low@byu.edu',
    phone: '801-422-4636',
    emoji: '🎯',
  },
  {
    name: 'Braden J. Brown, PhD',
    title: 'Mental Health & Mental Performance Counselor',
    email: null,
    phone: null,
    emoji: '💬',
  },
  {
    name: 'Dylan Heaton',
    title: 'Assistant Mental Performance Coach',
    email: null,
    phone: null,
    emoji: '⚡',
  },
]

const CAREER = [
  {
    name: 'Will Tenney',
    title: 'Career Director & Advisor',
    email: 'william_tenney@byu.edu',
    phone: '801-422-0152',
    emoji: '💼',
  },
  {
    name: 'Corallee Alexander',
    title: 'Student-Athlete Experience Coordinator',
    email: 'corallee_alexander@byu.edu',
    phone: '801-422-5417',
    emoji: '🤝',
  },
  {
    name: 'Darren Larsen',
    title: 'NCAA Financial Aid Counselor',
    email: 'darren_larsen@byu.edu',
    phone: '801-691-3847',
    emoji: '📋',
  },
]

const ACADEMICS = [
  { name: 'Jessica Mullen', title: "Academic Advisor — Men's & Women's Basketball", emoji: '🏀' },
  { name: 'Ray Stewart', title: 'Football Academic Coordinator', emoji: '🏈' },
  { name: 'Jim Hamblin', title: "Learning Specialist (Football); Academic Advisor (Golf)", emoji: '📚' },
  { name: 'Bryan Walker', title: 'Academic Advisor — Volleyball, Softball, Swim & Dive, Soccer, Gymnastics & Baseball', emoji: '🏐' },
  { name: 'Sandy Thomas', title: 'Academic Advisor — Football', emoji: '📝' },
  { name: 'Julie Tucker', title: "Academic Advisor — Baseball, Softball, Women's Volleyball, Tennis & Cross-Country", emoji: '🎾' },
  { name: 'Sarah Maddox', title: "Academic Advisor — Track & Field, Men's Cross Country", emoji: '🏃' },
  { name: 'Sia Gomez', title: 'Academic Advisor — Gymnastics, Soccer, Swim & Dive', emoji: '🤸' },
  { name: 'Georgi Ana Brown', title: 'Tutor Coordinator; Learning Specialist (Olympic Sports)', emoji: '🎓' },
  { name: 'Jessica Sousa', title: 'Learning Specialist — Olympic Sports', emoji: '📖' },
]

// ── Sub-components ──────────────────────────────────────────────────────────

function StaffCard({ person, accent = 'electric' }) {
  const borderColor = accent === 'tan' ? 'border-tan/30' : accent === 'sky' ? 'border-sky-300/30' : 'border-electric/30'
  const bgColor = accent === 'tan' ? 'bg-tan/10' : accent === 'sky' ? 'bg-sky-300/10' : 'bg-electric/10'

  return (
    <div className={`bg-navy-800 rounded-2xl border ${borderColor} p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${bgColor} border ${borderColor} flex items-center justify-center text-xl shrink-0`}>
          {person.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-snug">{person.name}</p>
          <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">{person.title}</p>
        </div>
      </div>
      {(person.email || person.phone) && (
        <div className="space-y-1.5 pl-1">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="flex items-center gap-2 text-electric text-xs"
            >
              <Mail size={12} className="shrink-0" />
              {person.email}
            </a>
          )}
          {person.phone && (
            <a
              href={`tel:${person.phone.replace(/-/g, '')}`}
              className="flex items-center gap-2 text-slate-400 text-xs"
            >
              <Phone size={12} className="shrink-0" />
              {person.phone}
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function AdvisorRow({ person, last }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 ${!last ? 'border-b border-navy-600/30' : ''}`}>
      <span className="text-lg shrink-0 mt-0.5">{person.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">{person.name}</p>
        <p className="text-slate-500 text-xs leading-snug">{person.title}</p>
      </div>
    </div>
  )
}

function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-1 mb-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <h2 className="text-white font-bold text-base">{title}</h2>
        </div>
        {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
      </button>
      {open && children}
    </section>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <Header title="Built4Life Team" />

      {/* Hero */}
      <div className="px-4 pb-5">
        <div className="bg-gradient-to-br from-cougar to-navy-800 rounded-2xl border border-electric/20 p-5">
          <div className="text-4xl mb-3">🐾</div>
          <h2 className="text-white font-bold text-lg mb-1">Built4Life Center</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            BYU's comprehensive support center for student-athletes — here to help you
            thrive academically, professionally, and personally.
          </p>
          <a
            href="https://b4lsac.byu.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-electric text-sm font-semibold"
          >
            b4lsac.byu.edu <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Hours card */}
      <div className="px-4 pb-5">
        <div className="bg-navy-800 rounded-2xl border border-electric/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-electric" />
            <h3 className="text-white font-bold text-sm">Center Hours</h3>
          </div>
          <div className="space-y-2">
            {[
              { days: 'Monday – Friday', hours: '7:00 am – 12:00 am' },
              { days: 'Saturday', hours: '9:00 am – 3:00 pm' },
              { days: 'Sunday', hours: 'Closed' },
            ].map(({ days, hours }) => (
              <div key={days} className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">{days}</span>
                <span className={`text-xs font-semibold ${hours === 'Closed' ? 'text-slate-500' : 'text-electric'}`}>{hours}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-navy-600/40">
            <a href="tel:8014224636" className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Phone size={11} className="shrink-0" />
              801-422-4636
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">

        {/* Leadership */}
        <Section title="Leadership" icon="🏛️" defaultOpen={true}>
          <div className="space-y-2.5">
            {LEADERSHIP.map(p => <StaffCard key={p.name} person={p} accent="electric" />)}
          </div>
        </Section>

        {/* Mental Health & Performance */}
        <Section title="Mental Health & Performance" icon="🧠" defaultOpen={true}>
          <div className="space-y-2.5">
            {MENTAL_HEALTH.map(p => <StaffCard key={p.name} person={p} accent="sky" />)}
          </div>
        </Section>

        {/* Career & Experience */}
        <Section title="Career & Experience" icon="💼" defaultOpen={true}>
          <div className="space-y-2.5">
            {CAREER.map(p => <StaffCard key={p.name} person={p} accent="tan" />)}
          </div>
        </Section>

        {/* Academic Advisors */}
        <Section title="Academic Advisors" icon="📚" defaultOpen={false}>
          <div className="bg-navy-800 rounded-2xl border border-navy-600/40 overflow-hidden">
            {ACADEMICS.map((p, i) => (
              <AdvisorRow key={p.name} person={p} last={i === ACADEMICS.length - 1} />
            ))}
          </div>
        </Section>

        {/* Full directory link */}
        <div className="pb-2">
          <a
            href="https://b4lsac.byu.edu/built4life-team"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-navy-800 border border-navy-600/40 text-electric text-sm font-semibold"
          >
            Full Team Directory <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  )
}
