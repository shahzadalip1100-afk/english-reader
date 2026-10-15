# Live AI Video Tutor Call Agent (لائیو ویڈیو کال انگلش ٹیچر)

An interactive, real-time video call feature allowing learners to call an animated AI English tutor for live spoken English practice, complete with two-way camera/mic controls, audio-reactive avatar video synthesis, live bilingual Urdu/English closed captions, and instant pronunciation corrections.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1 clarification:
> - **Avatar Visual Style**: Animated 3D AI teacher avatar with expressive facial gestures, blinking, and audio-reactive mouth synchronization.
> - **Learning Interaction**: Interactive voice conversation with synchronized English text, phonetic Urdu pronunciation, and Urdu translations/corrections.
> - **Hardware Controls**: Flexible two-way video call support allowing users to toggle their own camera and microphone or switch to voice-only mode.

- **Confirmed Decision 1**: Interactive video call interface featuring an animated AI teacher on the main stage with a picture-in-picture (PiP) user camera preview.
- **Confirmed Decision 2**: Live speech-to-text recognition via browser Web Speech API paired with server-side Gemini conversation logic for natural, educational spoken dialogue.
- **Confirmed Decision 3**: Real-time bilingual subtitle feed displaying English spoken dialogue alongside immediate Urdu translation and grammar coaching.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a dedicated "Live Video Call" mode where learners can tap a single call button to connect with an AI English teacher ("Miss Sarah" / "Ustad AI"). The AI speaks out loud with synchronized mouth animations and facial expressions while listening to the user's voice, responding in clear spoken English with Urdu support, and offering real-time pronunciation tips.
- **Target Audience / Persona**: Urdu-speaking children, students, and beginners who feel shy or lack conversational English practice partners at home and want a friendly, supportive environment to build speaking confidence.
- **Key Value**: Bridges the gap between passive reading/quizzes and active spoken fluency by simulating a real 1-on-1 video coaching session with instant Urdu comprehension aids.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Initiate Call**: The user clicks the prominent **"ویڈیو کال شروع کریں (Start Video Call)"** button in the top navigation or banner. A quick pre-call check modal lets them choose between Video Call (camera + mic) or Voice Call (mic only).
2. **Active Call Experience**:
   - **Main Screen (Tutor Stage)**: High-resolution animated video canvas featuring the AI teacher avatar with realistic breathing, blinking, and speech-synced lip movement.
   - **Picture-in-Picture (User Video)**: Draggable user webcam preview in the corner with a live audio level indicator and camera status.
   - **Live Subtitles & Urdu Coach**: Floating caption bar showing what is being said in English plus instant Urdu translation (اردو ترجمہ) and phonetic pronunciation.
   - **Topic Quick-Starters**: Optional prompt chips for beginners (e.g., "Daily Routines", "School & Friends", "Order Food", "Describe a Picture").
   - **Call Controls**: Mute microphone, flip/toggle camera, end call, and view live feedback ledger.
3. **Post-Call Summary & Scorecard**: Upon hanging up, a structured lesson summary appears showing duration, words spoken, grammar score, new vocabulary learned, and encouraging feedback in Urdu.

### Visual Identity & Theme (Adhering to Education Design Standard)
- **Aesthetic Direction**: High-trust, educational studio interface inspired by modern virtual classrooms and teleconferencing suites. Clean, distraction-free, and inviting.
- **Color Palette & Contrast**:
  - Dominant Canvas: Deep Midnight Slate (`#0B1120` and `#0F172A`) for the video theater to maximize contrast and eliminate eye strain.
  - Controls & Surfaces: Hairline glassmorphic controls (`rgba(255, 255, 255, 0.1)`) with frosted blur (`backdrop-blur-md`).
  - Active Call & Speech Accents: Emerald (`#10B981`) for active speech transmission, Azure (`#38BDF8`) for AI voice waveform, and Crimson (`#EF4444`) for the end-call control.
- **Typography & Hierarchy**:
  - Display & Headings: `Plus Jakarta Sans` for crisp English text, paired with `Noto Nastaliq Urdu` / `Jameel Noori` for elegant Urdu typography.
  - Subtitles & Captions: High-contrast white text on semi-transparent dark backing (`text-white font-medium drop-shadow-md`).
- **Interactive Feedback**:
  - Dynamic audio visualizer ring reacting to user mic input volume.
  - Smooth call ringing transition sound effect and visual pulse.
  - No decorative status pills; clean, functional control dock with unambiguous icons.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Animated Avatar vs. Video Streaming Server**:
  - *Chosen Approach*: Pure vector & Canvas-based 2.5D animated teacher avatar with canvas lip-sync and audio reactivity, paired with Web Speech synthesis and Web Speech recognition.
  - *Why*: Delivers zero-latency, lag-free video animation on any device without requiring expensive WebRTC streaming servers or high-bandwidth video rendering quotas.
  - *Alternatives Considered*: Prerecorded video clips (repetitive and lacks dynamic response) or cloud video generation APIs (costly, high latency unsuitable for live conversational back-and-forth).
- **Decision 2: Dual Mode (Video + Voice Only)**:
  - *Chosen Approach*: Allow learners to turn off camera at any moment or start call in voice-only mode.
  - *Why*: Accommodates cultural privacy preferences common in Urdu-speaking households while maintaining full educational immersion.
- **Decision 3: Server-Side Gemini Intelligence Proxy**:
  - *Chosen Approach*: Connect conversational turns to the existing `/api/chat` or dedicated `/api/video-agent/respond` endpoint in `server.ts` utilizing `gemini-3.8-flash`.
  - *Why*: Ensures prompt responses with educational persona guidelines (phonetic pronunciation, kind Urdu corrections, simple sentence structures).

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            User Browser Window                              │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        Navbar (Top Bar)                             │   │
│   │   Brand  ──  Nav Links (Library / Games / Video Tutor) ──  CTA      │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                 VideoCallModal / VideoAgentView                     │   │
│   │                                                                     │   │
│   │   ┌───────────────────────────────┐ ┌───────────────────────────┐   │   │
│   │   │      AI Tutor Stage           │ │   User Camera Feed (PiP)  │   │   │
│   │   │   - Canvas Avatar Engine      │ │   - MediaDevices getUserMedia││   │
│   │   │   - Audio Waveform Visualizer │ │   - Mic Audio Level Meter │   │   │
│   │   │   - Lip-Sync & Blink Loops    │ │   - Cam Toggle / Privacy  │   │   │
│   │   └──────────────┬────────────────┘ └─────────────┬─────────────┘   │   │
│   │                  │                                │                 │   │
│   │                  ▼                                ▼                 │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │           Live Captions & Bilingual Urdu Subtitle Bar       │   │   │
│   │   │       English: "How was your day at school today?"          │   │   │
│   │   │       اردو: "آج آپ کا سکول میں دن کیسا گزرا؟"               │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │                      Call Control Dock                      │   │   │
│   │   │  [Mic Mute]  [Camera Toggle]  [Urdu Guide]  [End Call Red]  │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │              Audio & Speech Services (Web APIs)                     │   │
│   │   - SpeechRecognition (Live User Voice Input)                       │   │
│   │   - SpeechSynthesis (Tutor Spoken Voice with Lip Sync Events)       │   │
│   │   - Web Audio API AnalyserNode (Audio Reactivity)                   │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │ POST /api/video-agent/respond
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Node.js Server (server.ts)                       │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │    POST /api/video-agent/respond                                    │   │
│   │    - Context: Student voice transcription & conversation history    │   │
│   │    - Call Gemini 3.8 Flash model via generateContentWithFallback    │   │
│   │    - Output: { replyEnglish, replyUrdu, correctionNote, mood }      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
```typescript
export interface VideoAgentMessage {
  id: string;
  sender: 'tutor' | 'user';
  textEnglish: string;
  textUrdu?: string;
  pronunciationHint?: string;
  timestamp: number;
}

export interface VideoCallSessionState {
  isActive: boolean;
  isConnecting: boolean;
  isMuted: boolean;
  isVideoEnabled: boolean;
  callDurationSeconds: number;
  tutorMood: 'greeting' | 'speaking' | 'listening' | 'encouraging';
  currentTopic: string;
  messages: VideoAgentMessage[];
}
```

### Interactive Component & State Mapping
- `VideoCallModal.tsx`: Main full-screen call room handling `getUserMedia` stream, microphone permission requests, timer ticker, and layout switches.
- `AITutorAvatarCanvas.tsx`: High-performance HTML5 Canvas rendering the expressive teacher avatar with blinking, head-tilt, breathing, and real-time mouth opening synced to speech volume.
- `CallControlDock.tsx`: Accessible controls with clear icons and tooltips for mic mute, camera toggle, subtitle toggle, topic switcher, and call termination.
- `CallSummaryModal.tsx`: Post-call performance card summarizing speaking duration, topics covered, and positive reinforcement in Urdu.
