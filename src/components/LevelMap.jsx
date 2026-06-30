import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { LEVEL_INFO } from '../content/languages'

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function LevelMap({ progress }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { lang } = useParams()

  const langProgress = progress?.[lang] || {}

  const getLevelStatus = (level) => {
    const units = langProgress[level]
    if (!units || units.length === 0) return 'locked'
    const completed = units.filter(u => u.completed).length
    if (completed === 0) return 'locked'
    if (completed < 50) return 'in_progress'
    return 'completed'
  }

  const getLevelProgress = (level) => {
    const units = langProgress[level] || []
    if (units.length === 0) return 0
    return Math.round((units.filter(u => u.completed).length / 50) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-black gradient-text mb-2"
        >
          {t('levels')}
        </motion.h1>
      </motion.div>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#22d3ee] via-[#a78bfa] to-[#f472b6] opacity-20 -translate-x-1/2 hidden md:block" />

        <div className="space-y-4">
          {LEVELS.map((level, idx) => {
            const info = LEVEL_INFO[level]
            const status = getLevelStatus(level)
            const pct = getLevelProgress(level)

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <div
                  onClick={() => status !== 'locked' && navigate(`/lessons/${lang}/${level}`)}
                  className={`glass glass-hover p-5 w-full md:w-[380px] cursor-pointer transition-all ${
                    status === 'locked' ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                  style={{
                    borderLeft: status !== 'locked' ? `3px solid ${info.color}` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-lg font-black"
                        style={{ color: info.color }}
                      >
                        {level}
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm">{info.name}</p>
                        <p className="text-white/30 text-xs">{info.desc}</p>
                      </div>
                    </div>
                    {status === 'completed' && <span className="text-lg">✅</span>}
                    {status === 'locked' && <span className="text-lg">🔒</span>}
                    {status === 'in_progress' && (
                      <span className="text-sm font-bold text-white/50">{pct}%</span>
                    )}
                  </div>

                  {status !== 'locked' && (
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${info.color}, ${info.color}88)` }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
