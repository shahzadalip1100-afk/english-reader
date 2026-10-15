/**
 * Web Speech API speech synthesis utility for children's reading.
 * 100% client-side and completely functional offline.
 */

export interface SpeechOptions {
  rate?: number; // 0.7 for slow phonics, 1.0 for normal
  pitch?: number;
  onWordBoundary?: (wordIndex: number, charIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Check if browser supports speech synthesis
 */
export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

/**
 * Get preferred English voice
 */
function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer natural English voices (Google US English, Samantha, Daniel, etc.)
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));
  const preferred = englishVoices.find(v => 
    v.name.includes('Natural') || 
    v.name.includes('Google') || 
    v.name.includes('Samantha') || 
    v.name.includes('Karen') ||
    v.name.includes('Zira')
  );
  return preferred || englishVoices[0] || null;
}

/**
 * Stop any ongoing speech
 */
export function stopSpeech(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  } catch (e) {
    console.error('Speech cancel error:', e);
  }
}

/**
 * Speak an English word with clear articulation
 */
export function speakWord(word: string, rate: number = 0.85): void {
  if (!isSpeechSupported() || !word.trim()) return;
  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(word.trim());
  utterance.lang = 'en-US';
  utterance.rate = rate; // slightly slower for clear phonics
  utterance.pitch = 1.05; // slightly friendly kid pitch

  const voice = getEnglishVoice();
  if (voice) utterance.voice = voice;

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to speak word', err);
  }
}

/**
 * Speak a full sentence with word boundary tracking for karaoke highlighting
 */
export function speakSentence(
  text: string,
  options: SpeechOptions = {}
): void {
  if (!isSpeechSupported() || !text.trim()) {
    options.onEnd?.();
    return;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options.rate ?? 0.85;
  utterance.pitch = 1.05;

  const voice = getEnglishVoice();
  if (voice) utterance.voice = voice;

  // Track word boundary
  if (options.onWordBoundary) {
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        // Calculate which word token this charIndex corresponds to
        const textUpToChar = text.substring(0, event.charIndex);
        const wordsBefore = textUpToChar.trim() ? textUpToChar.trim().split(/\s+/).length : 0;
        options.onWordBoundary!(wordsBefore, event.charIndex);
      }
    };
  }

  utterance.onend = () => {
    activeUtterance = null;
    options.onEnd?.();
  };

  utterance.onerror = (err) => {
    activeUtterance = null;
    options.onError?.(err);
  };

  activeUtterance = utterance;

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Failed to speak sentence', err);
    options.onEnd?.();
  }
}
