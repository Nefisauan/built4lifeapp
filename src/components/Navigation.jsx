import { Home, Gamepad2, BookOpen, Star, MoreHorizontal } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'play', label: 'Play', icon: Gamepad2 },
  { id: 'support', label: 'Support', icon: BookOpen },
  { id: 'spotlight', label: 'Spotlight', icon: Star },
  { id: 'more', label: 'More', icon: MoreHorizontal },
]

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-navy-800 border-t border-navy-600/60 pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around px-1">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center justify-center py-3 px-3 min-w-0 flex-1 transition-all duration-200 ${
                isActive ? 'text-electric' : 'text-slate-500'
              }`}
              aria-label={label}
            >
              <div className={`relative flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-electric/10' : ''
              }`}>
                <Icon
                  size={isActive ? 22 : 20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-all duration-200"
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-electric" />
                )}
              </div>
              <span className={`text-[10px] font-medium mt-0.5 transition-all duration-200 ${
                isActive ? 'text-electric' : 'text-slate-600'
              }`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
