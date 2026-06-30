import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Header from './components/Header'
import LanguagePicker from './components/LanguagePicker'
import LevelMap from './components/LevelMap'
import LessonPlayer from './components/LessonPlayer'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const { i18n } = useTranslation()
  const [targetLang, setTargetLang] = useLocalStorage('mimic_target', null)
  const [progress, setProgress] = useLocalStorage('mimic_progress', {
    totalXP: 0,
    streak: 0,
    lastActive: null,
    languages: {},
  })

  useEffect(() => {
    const saved = localStorage.getItem('mimic_lang') || 'en'
    i18n.changeLanguage(saved)
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = saved
  }, [i18n])

  const handleSelectLanguage = (code) => {
    setTargetLang(code)
  }

  return (
    <BrowserRouter basename="/Mimic">
      <div className="min-h-screen relative">
        <div className="orb-1" />
        <div className="orb-2" />

        {/* Grid overlay */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M 0 0 L 60 0 M 0 30 L 60 30 M 0 60 L 60 60 M 0 0 L 0 60 M 30 0 L 30 60 M 60 0 L 60 60'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 pb-16">
          <Header progress={progress} />

          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={<LanguagePicker onSelect={handleSelectLanguage} />}
              />
              <Route
                path="/levels/:lang"
                element={<LevelMap progress={progress?.languages} />}
              />
              <Route
                path="/lessons/:lang/:level"
                element={
                  <LessonPlayer
                    progress={progress}
                    setProgress={setProgress}
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  )
}
