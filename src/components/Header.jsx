import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
]

export default function Header({ progress }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const switchLang = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('mimic_lang', code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = code
  }

  const totalXP = progress?.totalXP || 0
  const streak = progress?.streak || 0

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-4 z-50 mx-4 mb-6"
      style={{ backdropFilter: 'blur(24px)', borderRadius: 16 }}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa, #22d3ee)' }}
          >
            <span className="text-white font-black text-lg">M</span>
          </div>
          <div>
            <span className="text-white font-bold text-base">{t('app_name')}</span>
            <p className="text-[10px] text-white/30 -mt-0.5">{t('tagline')}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {location.pathname !== '/' && (
            <div className="flex items-center gap-3 mr-2">
              <div className="text-right">
                <p className="text-xs font-semibold text-white/80">{totalXP.toLocaleString()} XP</p>
                <p className="text-[10px] text-white/30">🔥 {streak} {t('days')}</p>
              </div>
            </div>
          )}

          <div className="flex gap-1">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  i18n.language === l.code
                    ? 'bg-white/15 text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  )
}
