import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Dot color per event type — matches BYU app dot style
const DOT_COLOR = {
  academic: 'bg-tan',
  break: 'bg-electric',
  athletics: 'bg-electric',
  resource: 'bg-sky-300',
  community: 'bg-electric',
  career: 'bg-tan',
  urgent: 'bg-red-400',
}

function dotColor(event) {
  if (event.urgent) return DOT_COLOR.urgent
  return DOT_COLOR[event.type] ?? 'bg-electric'
}

export default function MiniCalendar({ events }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(today)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay()   // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const cells = []
  // Leading grey days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, inMonth: false, date: new Date(year, month - 1, daysInPrev - i) })
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(year, month, d) })
  }
  // Trailing days to fill last row
  const remaining = 7 - (cells.length % 7 || 7)
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, inMonth: false, date: new Date(year, month + 1, d) })
  }

  // Map events to YYYY-MM-DD keys
  function toKey(date) {
    return date.toISOString().slice(0, 10)
  }
  const eventMap = {}
  events.forEach(e => {
    const k = e.date
    if (!eventMap[k]) eventMap[k] = []
    eventMap[k].push(e)
  })

  const selectedKey = toKey(selected)
  const selectedEvents = eventMap[selectedKey] ?? []

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="bg-navy-800 rounded-2xl border border-navy-600/40 overflow-hidden">
      {/* Month navigation — matches BYU calendar header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-navy-600/40">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-navy-700 transition-colors"
        >
          <ChevronLeft size={16} className="text-slate-400" />
        </button>
        <span className="text-white font-semibold text-sm">{monthName}</span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-navy-700 transition-colors"
        >
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 px-2 pt-2">
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="text-center text-slate-500 text-xs font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 px-2 pb-3">
        {cells.map((cell, i) => {
          const key = toKey(cell.date)
          const cellEvents = eventMap[key] ?? []
          const isToday = toKey(cell.date) === toKey(today)
          const isSelected = key === selectedKey
          const hasEvents = cellEvents.length > 0

          return (
            <button
              key={i}
              onClick={() => cell.inMonth && setSelected(cell.date)}
              className={`flex flex-col items-center pt-1 pb-1.5 rounded-xl transition-all ${
                !cell.inMonth ? 'opacity-20 cursor-default' : 'cursor-pointer'
              }`}
            >
              {/* Date number */}
              <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                isToday && isSelected ? 'bg-electric text-navy-900 font-bold' :
                isToday ? 'bg-electric text-navy-900 font-bold' :
                isSelected ? 'bg-navy-600 text-white' :
                cell.inMonth ? 'text-white' : 'text-slate-600'
              }`}>
                {cell.day}
              </div>

              {/* Event dots — up to 3, matching BYU app */}
              <div className="flex gap-0.5 mt-0.5 h-1.5 items-center">
                {cellEvents.slice(0, 3).map((ev, di) => (
                  <div
                    key={di}
                    className={`w-1 h-1 rounded-full ${dotColor(ev)}`}
                  />
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected day events — shows below calendar like BYU app */}
      {selectedEvents.length > 0 && (
        <div className="border-t border-navy-600/40">
          {selectedEvents.map((ev, i) => (
            <div
              key={ev.id}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < selectedEvents.length - 1 ? 'border-b border-navy-600/40' : ''
              }`}
            >
              <span className="text-xl shrink-0">{ev.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{ev.label}</p>
                <p className="text-slate-500 text-xs">
                  {new Date(ev.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
              {ev.urgent && (
                <span className="text-red-400 text-xs font-semibold shrink-0">Urgent</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty selected day */}
      {selectedEvents.length === 0 && (
        <div className="border-t border-navy-600/40 px-4 py-3 text-center">
          <p className="text-slate-600 text-xs">No events on this day</p>
        </div>
      )}
    </div>
  )
}
