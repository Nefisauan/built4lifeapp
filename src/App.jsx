import { useState } from 'react'
import Navigation from './components/Navigation'
import ChatBot from './components/ChatBot'
import HomePage from './pages/HomePage'
import PlayPage from './pages/PlayPage'
import SupportPage from './pages/SupportPage'
import SpotlightPage from './pages/SpotlightPage'
import MorePage from './pages/MorePage'
import TeamPage from './pages/TeamPage'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [chatOpen, setChatOpen] = useState(false)

  const pages = {
    home: <HomePage />,
    play: <PlayPage />,
    support: <SupportPage />,
    spotlight: <SpotlightPage />,
    team: <TeamPage />,
    more: <MorePage />,
  }

  return (
    <div className="relative flex flex-col w-full min-h-screen max-w-lg mx-auto bg-navy-900 overflow-hidden">
      {/* Page content */}
      <main className="flex-1 overflow-y-auto overscroll-none" key={activeTab}>
        {pages[activeTab]}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} onChatOpen={() => setChatOpen(true)} />

      {/* AI Tutor Chatbot */}
      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
