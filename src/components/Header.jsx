import { Menu, Search } from 'lucide-react'

export default function Header({ title = 'Built4Life', rightElement }) {
  return (
    <div className="flex items-center justify-between px-5 pt-14 pb-4">
      <button className="w-9 h-9 flex items-center justify-center">
        <Menu size={22} className="text-white" strokeWidth={2} />
      </button>

      <h1 className="text-white font-bold text-xl tracking-wide">{title}</h1>

      <div className="w-9 h-9 flex items-center justify-center">
        {rightElement ?? <Search size={20} className="text-white" strokeWidth={2} />}
      </div>
    </div>
  )
}
