import { ExternalLink, ChevronRight, Phone, MapPin, Globe, Shield, Heart, Briefcase, GraduationCap } from 'lucide-react'

const resources = [
  {
    section: 'Academic',
    icon: GraduationCap,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    items: [
      { label: 'Tutoring Center', detail: 'Free, on-demand subject tutoring', icon: '📖' },
      { label: 'Academic Advising', detail: 'Plan your degree path', icon: '🗺️' },
      { label: 'Testing Center', detail: 'Extended time & accommodations', icon: '📝' },
      { label: 'Writing Center', detail: 'Paper reviews & feedback', icon: '✍️' },
    ],
  },
  {
    section: 'Mental Health',
    icon: Heart,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    items: [
      { label: 'CAPS', detail: '(801) 422-3035 · Free & confidential', icon: '💜' },
      { label: 'Crisis Line', detail: '988 — 24/7 support', icon: '🆘' },
      { label: "Athlete Mental Health", detail: 'Sport-specific counseling', icon: '🧠' },
      { label: 'Meditation Rooms', detail: 'WSC quiet spaces', icon: '🧘' },
    ],
  },
  {
    section: 'Career & NIL',
    icon: Briefcase,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    items: [
      { label: 'Career Center', detail: '3rd floor Wilk · Free advising', icon: '🚀' },
      { label: 'NIL Compliance', detail: 'Disclose deals before signing', icon: '⚖️' },
      { label: 'LinkedIn Workshop', detail: 'Monthly free sessions', icon: '💼' },
      { label: 'Alumni Network', detail: 'Connect with BYU grads', icon: '🤝' },
    ],
  },
  {
    section: 'Safety & Reporting',
    icon: Shield,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    items: [
      { label: 'SafetyNet', detail: 'Anonymous concern reporting', icon: '🛡️' },
      { label: 'BYU Police', detail: '(801) 422-2222', icon: '🚔' },
      { label: 'Title IX Office', detail: 'Confidential, no retaliation', icon: '🔒' },
      { label: 'Ombudsman', detail: 'Neutral conflict resolution', icon: '⚖️' },
    ],
  },
]

const teamInfo = [
  { label: 'Version', value: '1.0.0' },
  { label: 'Built for', value: 'BYU Student-Athletes' },
  { label: 'Data security', value: 'No personal data stored' },
  { label: 'Feedback', value: 'athletics@byu.edu' },
]

export default function MorePage() {
  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
        style={{ background: 'linear-gradient(180deg, #001A3A 0%, #070C18 100%)' }}
      >
        <h1 className="text-2xl font-bold text-white mb-1">More</h1>
        <p className="text-slate-400 text-sm">Resources, contacts, and app info.</p>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* BYU brand strip */}
        <div
          className="p-4 rounded-2xl flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, #002E5D 0%, #001830 100%)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <span className="text-2xl font-black text-white">Y</span>
          </div>
          <div>
            <p className="text-white font-bold">BYU Athletics</p>
            <p className="text-slate-300 text-xs">Student-Athlete Resources</p>
          </div>
        </div>

        {/* Resource sections */}
        {resources.map(section => {
          const SectionIcon = section.icon
          return (
            <div key={section.section}>
              <div className="flex items-center gap-2 mb-2.5">
                <SectionIcon size={14} className={section.color} />
                <h2 className={`text-xs font-semibold uppercase tracking-wider ${section.color}`}>
                  {section.section}
                </h2>
              </div>
              <div className="space-y-1.5">
                {section.items.map(item => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-800 border border-navy-600/60"
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.detail}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-700 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* App info */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">About Built4Life</h2>
          <div className="rounded-xl bg-navy-800 border border-navy-600/60 divide-y divide-navy-600/60">
            {teamInfo.map(item => (
              <div key={item.label} className="flex items-center justify-between px-4 py-3">
                <span className="text-slate-400 text-sm">{item.label}</span>
                <span className="text-white text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-700 text-xs pb-2">
          Built with ❤️ for BYU Cougars.
        </p>
      </div>
    </div>
  )
}
