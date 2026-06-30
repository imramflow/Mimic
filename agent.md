# Mimic — Language Learning App

## Project Info
- **Name:** Mimic
- **Path:** /home/xred/Desktop/Work/mimic
- **Description:** Language learning app with a sarcastic SVG professor. 32 languages, 6 levels (A1→C2), 10 exercise types. All browser-based, no backend.
- **Language:** React + Vite
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Speech:** Web Speech API (TTS + recognition, no API keys)
- **State:** localStorage for progress
- **Content:** Auto-generated from `scripts/generate-lessons.js`, stored in `src/content/lessons.js`
- **Deploy:** GitHub Pages via `npm run deploy`

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run generate-lessons` — Regenerate all lesson data
- `npm run deploy` — Build + push to GitHub Pages

## Design System
- Dark theme with glassmorphism
- Gradient accents: rose-400 → purple-500 → cyan-400
- Professor Mimic: Animated SVG with 10 moods (idle, happy, sad, angry, surprised, sneaky, excited, bored, trap, proud)
- Floating gradient orbs background + grid overlay
- Emoji-based expressions and accessories

## Communication
- Always reply in Arabic when the user speaks Arabic
- Never commit stats.html or any private tracking pages
- Never create/update README unless explicitly asked

## Content Structure
- `src/content/languages.js` — Language definitions (32 languages) + level info
- `src/content/lessons.js` — Auto-generated lessons for all languages × levels
- Each level has 10-25 thematic units
- Each unit has 8 exercises of 10 types

## Exercise Types
1. MultipleChoice — Pick the right answer
2. FillBlank — Type the missing word
3. DragMatch — Match pairs by tapping left then right
4. ListenType — Hear audio, type what you heard
5. SpeakPractice — Listen then say it (speech recognition)
6. ReverseTeach — Explain a concept back to Mimic
7. TrapQuestion — Deceptively easy question with a "gotcha"
8. SpeedRound — 30 seconds timed challenge
9. PlotTwist — Story context shifts mid-lesson
10. MemoryPalace — Explore a room to find hidden words

## Key Files
- `src/App.jsx` — Router + global state
- `src/components/ProfessorMimic.jsx` — SVG character
- `src/components/LessonPlayer.jsx` — Master lesson renderer
- `src/components/exercises/*.jsx` — 10 exercise components
- `src/hooks/useSpeech.js` — Text-to-speech
- `src/hooks/useSpeechRecog.js` — Speech recognition
- `src/i18n/` — EN/FR/AR translations
- `scripts/generate-lessons.js` — Lesson data generator
