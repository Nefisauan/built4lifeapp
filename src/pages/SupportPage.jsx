import { useState } from 'react'
import { X, Clock, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import { quickReads } from '../data/quickReads'

const categories = ['All', 'Nutrition', 'Recovery', 'Mental Health', 'NIL & Finance', 'Career', 'Academic']

function ArticleModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-navy-900 animate-slide-up">
      <div className="flex items-start justify-between px-5 pt-14 pb-5">
        <div className="flex-1 pr-4">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full ${article.categoryBg} ${article.categoryColor} text-xs font-medium mb-2`}>
            {article.category}
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">{article.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-navy-800 border border-navy-600/60 flex items-center justify-center shrink-0 mt-1"
        >
          <X size={16} className="text-slate-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4">
        <p className="text-slate-300 text-sm italic leading-relaxed">{article.summary}</p>
        <div className="w-full h-px bg-navy-600/60" />
        {article.content.map((line, i) => (
          <p key={i} className="text-slate-200 text-sm leading-relaxed">{line}</p>
        ))}
        <div className="flex flex-wrap gap-2 pt-2 pb-4">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-navy-800 border border-navy-600/60 text-slate-400 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 pb-8">
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-electric text-navy-900 font-bold text-sm"
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
      <Header title="Support" />

      <p className="text-slate-400 text-sm px-5 pb-4">Quick reads. Real knowledge. Under 2 min.</p>

      {/* Filter pills — matches BYU "Filter By" style */}
      <div className="px-4 mb-4">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Filter By:</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                activeCategory === cat
                  ? 'bg-electric text-navy-900 border-electric font-semibold'
                  : 'bg-transparent text-slate-300 border-navy-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles — list row style matching BYU All Tools */}
      <div className="px-4 bg-navy-800 rounded-2xl mx-4 border border-navy-600/40 overflow-hidden">
        {filtered.map((article, i) => (
          <button
            key={article.id}
            onClick={() => setOpenArticle(article)}
            className={`w-full flex items-center gap-3 px-0 py-3.5 text-left no-select active:bg-navy-700 transition-colors ${
              i < filtered.length - 1 ? 'border-b border-navy-600/40' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center text-xl shrink-0 ml-0">
              {article.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-medium ${article.categoryColor}`}>{article.category}</span>
                <span className="text-slate-600 text-xs">·</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock size={9} />
                  <span className="text-xs">{article.readTime}</span>
                </div>
              </div>
              <p className="text-white font-semibold text-sm leading-tight">{article.title}</p>
            </div>
            <ChevronRight size={15} className="text-slate-600 shrink-0 mr-0" />
          </button>
        ))}
      </div>

      {openArticle && (
        <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
      )}
    </div>
  )
}
