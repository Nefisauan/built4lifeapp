import Header from '../components/Header'
import { ExternalLink } from 'lucide-react'

const STAFF = [
  {
    id: 1,
    name: 'Trevor Wilson',
    title: 'Director of Built4Life Center',
    subtitle: 'Sr. Associate Athletic Director — Student-Athlete Ecosystem',
    emoji: '🏛️',
    color: 'border-electric/30',
    bg: 'bg-electric/10',
  },
  {
    id: 2,
    name: 'Gary Veron',
    title: 'Director of Built4Life Program',
    subtitle: 'Associate Athletic Director for Student-Athlete Experience',
    emoji: '🎯',
    color: 'border-tan/30',
    bg: 'bg-tan/10',
  },
  {
    id: 3,
    name: 'Jasen Ah You',
    title: 'Football Academics Director',
    subtitle: 'Assistant Athletic Director for Football Academics',
    emoji: '📚',
    color: 'border-electric/30',
    bg: 'bg-electric/10',
  },
  {
    id: 4,
    name: 'Billy Nixon',
    title: 'Co-Founder',
    subtitle: 'Director of Player Experience & Equipment Operations',
    emoji: '🤝',
    color: 'border-tan/30',
    bg: 'bg-tan/10',
  },
]

const PILLARS = [
  { icon: '🎓', label: 'Academic Support', desc: 'Tutoring, advising, and academic planning' },
  { icon: '💼', label: 'Career Development', desc: 'NIL education, networking, and career prep' },
  { icon: '💬', label: 'Wellness & Mental Health', desc: 'CAPS referrals and wellbeing support' },
  { icon: '🏆', label: 'Leadership', desc: 'Life skills and character development' },
  { icon: '🌐', label: 'Community & Belonging', desc: 'Inclusion initiatives and cultural events' },
  { icon: '🏠', label: 'Housing & Honor Code', desc: 'Compliance support and student life' },
]

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-full pb-24 animate-fade-in">
      <Header title="Built4Life Team" />

      {/* Hero section */}
      <div className="px-5 pb-5">
        <div className="bg-gradient-to-br from-cougar to-navy-800 rounded-2xl border border-electric/20 p-5">
          <div className="text-4xl mb-3">🐾</div>
          <h2 className="text-white font-bold text-lg mb-1">Built4Life Center</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            BYU's comprehensive support program for student-athletes — built to help you
            thrive academically, professionally, and personally throughout your BYU career.
          </p>
          <a
            href="https://byucougars.com/sports/built4life-center"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-electric text-sm font-semibold"
          >
            Visit Built4Life <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="px-4 space-y-5">

        {/* Staff */}
        <section>
          <h2 className="text-white font-bold text-base mb-3 px-1">Our Team</h2>
          <div className="space-y-2.5">
            {STAFF.map(person => (
              <div
                key={person.id}
                className={`bg-navy-800 rounded-2xl border ${person.color} p-4 flex items-center gap-4`}
              >
                <div className={`w-12 h-12 rounded-xl ${person.bg} border ${person.color} flex items-center justify-center text-2xl shrink-0`}>
                  {person.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{person.name}</p>
                  <p className="text-electric text-xs font-medium">{person.title}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{person.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs text-center mt-3">
            Full staff directory →{' '}
            <a
              href="https://byucougars.com/staff-directory/department/built4life-center"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric"
            >
              byucougars.com
            </a>
          </p>
        </section>

        {/* What we do */}
        <section>
          <h2 className="text-white font-bold text-base mb-3 px-1">What We Do</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {PILLARS.map(p => (
              <div
                key={p.label}
                className="bg-navy-800 rounded-2xl border border-navy-600/40 p-4"
              >
                <div className="text-2xl mb-2">{p.icon}</div>
                <p className="text-white font-semibold text-xs mb-1">{p.label}</p>
                <p className="text-slate-500 text-[10px] leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="bg-navy-800 rounded-2xl border border-navy-600/40 p-4">
            <p className="text-white font-bold text-sm mb-3">Get in Touch</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <p className="text-slate-300 text-sm">Student Athlete Building (SAB) — BYU Campus</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🌐</span>
                <a
                  href="https://byucougars.com/sports/built4life-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric text-sm"
                >
                  byucougars.com/built4life
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
