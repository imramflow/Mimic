import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LANGUAGES } from '../content/languages'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function LanguagePicker({ onSelect }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSelect = (code) => {
    onSelect(code)
    navigate(`/levels/${code}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4"
    >
      <div className="text-center mb-10">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black gradient-text mb-3"
        >
          {t('select_language')}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-base"
        >
          {t('select_language_desc')}
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {LANGUAGES.map((lang) => (
          <motion.button
            key={lang.code}
            variants={item}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(lang.code)}
            className="glass glass-hover p-4 text-center cursor-pointer"
            style={{ borderRadius: 12 }}
          >
            <span className="text-3xl block mb-2">{lang.flag}</span>
            <p className="text-white font-semibold text-sm">{lang.name}</p>
            <p className="text-white/30 text-xs mt-0.5">{lang.native}</p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}
