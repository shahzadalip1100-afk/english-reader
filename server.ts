import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Comprehensive CORS middleware for AI Studio iframe environment
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-goog-api-key');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Body parser with 50MB limit to support image, audio, video & PDF uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to determine clean MIME type
function sanitizeMimeType(mime: string, filename?: string): string {
  if (mime && mime !== 'application/octet-stream') return mime;
  if (filename) {
    const ext = filename.toLowerCase().split('.').pop();
    if (ext === 'pdf') return 'application/pdf';
    if (ext === 'mp3') return 'audio/mp3';
    if (ext === 'wav') return 'audio/wav';
    if (ext === 'm4a') return 'audio/m4a';
    if (ext === 'ogg') return 'audio/ogg';
    if (ext === 'mp4') return 'video/mp4';
    if (ext === 'webm') return 'video/webm';
    if (ext === 'txt') return 'text/plain';
    if (['jpg', 'jpeg'].includes(ext || '')) return 'image/jpeg';
    if (ext === 'png') return 'image/png';
    if (ext === 'webp') return 'image/webp';
  }
  return 'image/jpeg';
}

// Resilient AI generation helper that handles high-demand 503/429 errors with fallback models
async function generateContentWithFallback(params: {
  contents: any;
  config?: any;
}) {
  const candidateModels = [
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash-lite'
  ];
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      console.warn(`Model ${model} failed, attempting next candidate. Reason:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError;
}

// API: Extract text & translations from multimodal files (Image, PDF, Audio, Video, Document)
app.post('/api/extract-multimodal', async (req, res) => {
  try {
    const { fileBase64, mimeType, filename, fileType } = req.body;

    if (!fileBase64) {
      return res.status(400).json({ error: 'File data is required' });
    }

    const cleanData = fileBase64.replace(/^data:[^;]+;base64,/, '');
    const cleanMime = sanitizeMimeType(mimeType, filename);

    let promptInstruction = `CRITICAL OCR & TRANSLATION REQUIREMENT:
You are an exact, 100% faithful Optical Character Recognition (OCR) and translation system.
Extract EVERY SINGLE English sentence and word EXACTLY as printed on this book page or document.

ABSOLUTE STRICT RULES:
1. VERBATIM EXTRACTION: Do NOT modify, alter, summarize, simplify, correct, paraphrase, or invent words. Extract the EXACT text from the page.
2. SENTENCE PRESERVATION: Keep every sentence as it appears on the page. Do not rewrite into simpler English.
3. ACCURATE URDU TRANSLATION: For each extracted sentence, provide a natural, grammatically correct and fluent Urdu translation (بامحاورہ اور سلیس اردو ترجمہ).
4. TITLE: Extract the lesson or book heading as the 'title' and its Urdu translation as 'urduTitle'.
5. ONLY if the image contains ZERO readable text (pure drawing/photo), describe the illustration in 2-3 simple sentences.
Return JSON with 'title', 'urduTitle', and 'sentences' array containing 'english' (verbatim) and 'urdu'.`;

    const response = await generateContentWithFallback({
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanData,
              mimeType: cleanMime,
            },
          },
          {
            text: promptInstruction,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'Exact title from the book page or document',
            },
            urduTitle: {
              type: Type.STRING,
              description: 'Urdu translation of the title',
            },
            sentences: {
              type: Type.ARRAY,
              description: 'List of exact verbatim English sentences with Urdu translations',
              items: {
                type: Type.OBJECT,
                properties: {
                  english: {
                    type: Type.STRING,
                    description: 'Exact verbatim English sentence from the page',
                  },
                  urdu: {
                    type: Type.STRING,
                    description: 'Accurate Urdu translation of this sentence',
                  },
                },
                required: ['english', 'urdu'],
              },
            },
          },
          required: ['title', 'urduTitle', 'sentences'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from AI model');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error extracting multimodal content:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to extract content from file',
    });
  }
});

// Exact image extraction endpoint
app.post('/api/extract-image-text', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 is required' });
    }

    const cleanData = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
    const cleanMime = mimeType || 'image/jpeg';

    const response = await generateContentWithFallback({
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanData,
              mimeType: cleanMime,
            },
          },
          {
            text: `CRITICAL INSTRUCTION: Perform 100% FAITHFUL, VERBATIM OCR text extraction. Do NOT modify, alter, summarize, or simplify the text on the book page in any way. Extract the exact sentences as printed on the book/page, and provide their natural Urdu translations.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            urduTitle: { type: Type.STRING },
            sentences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  english: { type: Type.STRING, description: 'Exact verbatim sentence from page' },
                  urdu: { type: Type.STRING, description: 'Urdu translation' },
                },
                required: ['english', 'urdu'],
              },
            },
          },
          required: ['title', 'urduTitle', 'sentences'],
        },
      },
    });

    return res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error in extract-image-text:', error);
    return res.status(500).json({ error: error?.message });
  }
});

// API: Instant Lookup for 100,000+ Vocabulary Words
app.post('/api/lookup-word', async (req, res) => {
  try {
    const { word } = req.body;
    if (!word || typeof word !== 'string') {
      return res.status(400).json({ error: 'Word is required' });
    }

    const response = await generateContentWithFallback({
      contents: `Provide the dictionary definition for the English word "${word.trim()}". Return JSON with word, urdu (meaning in Urdu), transliteration (phonetic pronunciation written in Urdu letters e.g. ایپل for Apple), partOfSpeech (noun, verb, adjective, etc.), example (simple English sentence for kids), category (Animals, Nature, Science, Daily Life, School, Actions, etc.).`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            urdu: { type: Type.STRING },
            transliteration: { type: Type.STRING },
            partOfSpeech: { type: Type.STRING },
            example: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ['word', 'urdu', 'transliteration', 'partOfSpeech', 'example', 'category'],
        },
      },
    });

    return res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error looking up word:', error);
    return res.status(500).json({ error: error?.message || 'Lookup failed' });
  }
});

// API: AI Teacher Chat (ChatGPT-like Assistant for Kids and Parents with Multimodal Attachments)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message, attachments } = req.body;

    const systemInstruction = `You are "Ustad AI (استاد اے آئی)", a warm, encouraging, child-friendly English teacher and Urdu mentor. 
Your goal is to help Pakistani and Urdu-speaking children, students, and parents learn English reading, phonics, vocabulary, word meanings, and grammar.

Multimodal Capabilities:
- If the user sends an Image, Document/PDF, Audio recording, or Video clip:
  1. Carefully inspect the attached file.
  2. Extract any English words/sentences or transcribe the speech.
  3. Provide the accurate pronunciation guide in Urdu (تلفظ) and natural Urdu translation (اردو ترجمہ).
  4. Explain any difficult vocabulary words clearly so children can learn them easily.

Guidelines:
1. Always be polite, encouraging, and clear.
2. When answering questions about an English word, provide:
   - The English word (in English, left-to-right)
   - Urdu phonetic pronunciation/transliteration (تلفظ) in Urdu script
   - Urdu meaning (الفاظ و معنی)
   - A simple example sentence suitable for primary school children
3. If asked to write a story or sentence, provide both the English text and its Urdu translation.
4. Format responses cleanly with headings or bullet points so children can read easily.
5. If the user talks in Urdu, reply warmly in Urdu with English learning tips. If they speak in English, explain clearly and include Urdu support.`;

    let contents: any[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      // Find the first message with role 'user' so contents always starts with 'user'
      const firstUserIndex = messages.findIndex((m: any) => m.role === 'user');
      const validMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

      let lastRole: string | null = null;

      for (const m of validMessages) {
        const parts: any[] = [];

        // Check if message has multimodal attachments (images, pdfs, audio, video)
        if (Array.isArray(m.attachments) && m.attachments.length > 0) {
          for (const att of m.attachments) {
            if (att.base64) {
              const cleanBase64 = att.base64.replace(/^data:[^;]+;base64,/, '');
              const cleanMime = sanitizeMimeType(att.mimeType, att.name);
              parts.push({
                inlineData: {
                  data: cleanBase64,
                  mimeType: cleanMime,
                },
              });
            }
          }
        }

        const msgText = m.content || m.text || '';
        if (msgText || parts.length === 0) {
          parts.push({ text: msgText || 'Please analyze this for English reading.' });
        }

        const role = m.role === 'user' ? 'user' : 'model';

        // Ensure strict alternating roles: if two messages have the same role, merge parts
        if (role === lastRole && contents.length > 0) {
          contents[contents.length - 1].parts.push(...parts);
        } else {
          contents.push({ role, parts });
          lastRole = role;
        }
      }

      // Safety check: ensure first turn is 'user'
      if (contents.length === 0 || contents[0].role !== 'user') {
        const lastUser = messages.slice().reverse().find((m: any) => m.role === 'user');
        contents = [{
          role: 'user',
          parts: [{ text: lastUser?.content || 'Hello Ustad AI, teach me English reading.' }]
        }];
      }
    } else if (message) {
      const parts: any[] = [];
      if (Array.isArray(attachments) && attachments.length > 0) {
        for (const att of attachments) {
          if (att.base64) {
            const cleanBase64 = att.base64.replace(/^data:[^;]+;base64,/, '');
            const cleanMime = sanitizeMimeType(att.mimeType, att.name);
            parts.push({
              inlineData: {
                data: cleanBase64,
                mimeType: cleanMime,
              },
            });
          }
        }
      }
      parts.push({ text: message });
      contents = [{ role: 'user', parts }];
    } else {
      return res.status(400).json({ error: 'Message or messages array is required' });
    }

    const response = await generateContentWithFallback({
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'معذرت، میں ابھی جواب تیار نہیں کر سکا۔ برائے مہربانی دوبارہ پوچھیں۔';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate chat response',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
