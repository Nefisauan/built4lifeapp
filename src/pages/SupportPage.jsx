import { useState } from 'react'
import { X, Clock, ChevronRight, BookOpen } from 'lucide-react'
import { quickReads } from '../data/quickReads'

const categories = ['All', 'Nutrition', 'Recovery', 'Mental Health', 'NIL & Finance', 'Career', 'Academic']

function ArticleModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy-900 animate-slide-up">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5 flex items-start justify-between"
        style={{ background: 'linear-gradient(180deg, #001A3A 0%, #070C18 100%)' }}
      >
        <div className="flex-1 pr-4">
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${article.categoryBg} ${article.categoryColor} text-xs font-medium mb-2`}>
            {article.category}
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">{article.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-navy-700 border border-navy-500/60 flex items-center justify-center shrink-0"
        >
          <X size={16} className="text-slate-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <p className="text-slate-300 text-sm italic leading-relaxed">{article.summary}</p>
        <div className="w-full h-px bg-navy-600/60" />
        {article.content.map((line, i) => (
          <p key={i} className="text-slate-200 text-sm leading-relaxed">
            {line}
          </p>
        ))}
        <div className="flex flex-wrap gap-2 pt-2">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-navy-700 border border-navy-500/60 text-slate-400 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 pb-8">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-electric/20 border border-electric/30 text-electric font-semibold text-sm"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openArticle, setOpenArticle] = useState(null)

  const filtered = activeCategory === 'All'
    ? quickReads
    : quickReads.filter(a => a.category === activeCategory)

  return (
    <div className="flex flex-col min-h-full pb-20 animate-fade-in">
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
        style={{ background: 'linear-gradient(180deg, #001A3A 0%, #070C18 100%)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} className="text-electric" />
          <h1 className="text-2xl font-bold text-white">Support</h1>
        </div>
        <p className="text-slate-400 text-sm">Quick reads. Real knowledge. Under 2 minutes.</p>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-electric text-navy-900 font-semibold'
                  : 'bg-navy-700 text-slate-400 border border-navy-500/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="px-4 space-y-3">
        {filtered.map(article => (
          <button
            key={article.id}
            onClick={() => setOpenArticle(article)}
            className="w-full text-left p-4 rounded-2xl bg-navy-800 border border-navy-600/60 flex items-start gap-3 no-select"
          >
            <div className="text-3xl shrink-0 mt-0.5">{article.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium ${article.categoryColor} ${article.categoryBg} px-2 py-0.5 rounded-full`}>
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock size={10} />
                  <span className="text-xs">{article.readTime}</span>
                </div>
              </div>
              <p className="text-white font-semibold text-sm leading-tight mb-1">{article.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{article.summary}</p>
            </div>
            <ChevronRight size={16} className="text-slate-600 shrink-0 mt-2" />
          </button>
        ))}
      </div>

      {openArticle && (
        <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
      )}
    </div>
  )
}
