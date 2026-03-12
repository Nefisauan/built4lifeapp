import { Home, Gamepad2, BookOpen, Star, LayoutGrid, MessageSquare, Users } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'play', label: 'Play', icon: Gamepad2 },
  { id: 'support', label: 'Support', icon: BookOpen },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'more', label: 'More', icon: LayoutGrid },
]

export default function Navigation({ activeTab, onTabChange, onChatOpen }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900 border-t border-navy-600/30">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center py-2.5 px-2 min-w-0 flex-1 transition-all duration-150 ${
                isActive ? 'text-white' : 'text-slate-600'
              }`}
              aria-label={label}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.6}
                className="transition-all duration-150"
              />
              <span className={`text-[10px] mt-1 transition-all duration-150 ${
                isActive ? 'text-white font-semibold' : 'text-slate-600 font-normal'
              }`}>
                {label}
              </span>
            </button>
          )
        })}

        {/* Cosmo AI Tutor — center-prominent chat button */}
        <button
          onClick={onChatOpen}
          className="flex flex-col items-center justify-center py-2.5 px-2 min-w-0 flex-1 transition-all duration-150 text-electric"
          aria-label="Cosmo AI Tutor"
        >
          <div className="w-8 h-8 rounded-full bg-electric flex items-center justify-center -mt-5 mb-0.5 shadow-lg shadow-electric/30">
            <MessageSquare size={16} className="text-navy-900" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-semibold text-electric">Cosmo</span>
        </button>
      </div>
    </nav>
  )
}
