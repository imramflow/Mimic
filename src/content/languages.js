export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', tts: 'en-US', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', tts: 'fr-FR', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', tts: 'ar-SA', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', tts: 'es-ES', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', tts: 'it-IT', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', tts: 'de-DE', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹', tts: 'pt-PT', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', tts: 'ru-RU', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', tts: 'ja-JP', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳', tts: 'zh-CN', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', tts: 'ko-KR', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷', tts: 'tr-TR', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱', tts: 'nl-NL', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱', tts: 'pl-PL', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪', tts: 'sv-SE', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰', tts: 'da-DK', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴', tts: 'nb-NO', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮', tts: 'fi-FI', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷', tts: 'el-GR', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'he', name: 'Hebrew', native: 'עברית', flag: '🇮🇱', tts: 'he-IL', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', tts: 'hi-IN', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭', tts: 'th-TH', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳', tts: 'vi-VN', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩', tts: 'id-ID', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿', tts: 'cs-CZ', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺', tts: 'hu-HU', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴', tts: 'ro-RO', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦', tts: 'uk-UA', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷', tts: 'fa-IR', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', tts: 'ur-PK', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾', tts: 'ms-MY', levels: ['A1','A2','B1','B2','C1','C2'] },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇹🇿', tts: 'sw-TZ', levels: ['A1','A2','B1','B2','C1','C2'] },
]

export const LEVEL_INFO = {
  A1: { name: 'Survival Mode', color: '#22d3ee', desc: 'Basic words, greetings, emergencies' },
  A2: { name: 'Detective', color: '#2dd4bf', desc: 'Questions, descriptions, simple conversations' },
  B1: { name: 'Debate Club', color: '#fbbf24', desc: 'Opinions, arguments, storytelling' },
  B2: { name: 'Time Traveler', color: '#fb923c', desc: 'All tenses, formal language, idioms' },
  C1: { name: 'Undercover', color: '#f472b6', desc: 'Slang, sarcasm, cultural fluency' },
  C2: { name: 'The Professor', color: '#a78bfa', desc: 'Teach Mimic. True mastery.' },
}

export function getLangVoiceCode(code) {
  return LANGUAGES.find(l => l.code === code)?.tts || 'en-US'
}

export function getLevelTheme(level) {
  return LEVEL_INFO[level] || LEVEL_INFO.A1
}
