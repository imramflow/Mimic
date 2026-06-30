export function useSpeech() {
  const speak = (text, lang = 'en-US', rate = 0.9) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1
    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
  }

  const getVoices = (lang) => {
    return window.speechSynthesis.getVoices().filter(v => v.lang.startsWith(lang.slice(0,2)))
  }

  return { speak, stop, getVoices }
}
