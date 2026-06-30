import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function ProgressDashboard({ progress }) {
  const { t } = useTranslation()

  const totalXP = progress?.totalXP || 0
  const streak = progress?.streak || 0
  const lastActive = progress?.lastActive || null
  const level = Math.floor(totalXP / 500) + 1
  const nextLevelXP = level * 500

  // Check streak
  if (lastActive) {
    const today = new Date().toDateString()
    const last = new Date(lastActive).toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    if (last !== today && last !== yesterday) {
      // streak broken — but we keep it stored
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        className="glass p-4 text-center"
      >
        <p className="text-2xl font-black gradient-text">{totalXP.toLocaleString()}</p>
        <p className="text-white/30 text-xs mt-1">{t('xp')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass p-4 text-center"
      >
        <p className="text-2xl font-black text-cyan-400">Lv.{level}</p>
        <p className="text-white/30 text-xs mt-1">{t('level')}</p>
        <div className="h-1 mt-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(totalXP % 500) / 5}%`,
              background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-4 text-center"
      >
        <p className="text-2xl font-black text-amber-400">
          {streak > 0 ? `🔥 ${streak}` : '0'}
        </p>
        <p className="text-white/30 text-xs mt-1">{t('days')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass p-4 text-center"
      >
        <p className="text-2xl font-black text-rose-400">
          {Object.values(progress?.languages || {}).reduce((sum, l) => {
            return sum + Object.values(l).reduce((s, u) => s + (u?.filter?.(x => x.completed)?.length || 0), 0)
          }, 0)}
        </p>
        <p className="text-white/30 text-xs mt-1">{t('completed')}</p>
      </motion.div>
    </div>
  )
}
