import { Home, Gamepad2, BookOpen, Star, LayoutGrid } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'play', label: 'Play', icon: Gamepad2 },
  { id: 'support', label: 'Support', icon: BookOpen },
  { id: 'spotlight', label: 'Spotlight', icon: Star },
  { id: 'more', label: 'All Tools', icon: LayoutGrid },
]

export default function Navigation({ activeTab, onTabChange }) {
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
      </div>
    </nav>
  )
}
