/**
 * 100 Comprehensive English Grammar & Spoken Games
 * Fully categorized across:
 * - 12 Tenses Games (تمام 12 ٹینسز)
 * - Daily Spoken English & Conversations (روزمرہ بول چال)
 * - Parts of Speech (اجزائے کلام)
 * - Articles & Determiners (حروف تنکیر و اشارے)
 * - Prepositions in Depth (حروف جار)
 * - Sentence Structure & Mechanics (جملے کی ساخت)
 * - Active & Passive Voice / Direct & Indirect Speech (معروف و مجہول)
 * - Conditionals (شرطیہ جملے)
 * - Advanced Grammar & Grand Championship (ایڈوانس گرائمر اور گولڈ ٹرافی)
 * 
 * Every game has 20 dedicated questions and its own dedicated launcher button!
 */

import { GRAMMAR_TOPICS_100, GrammarCategory, GrammarTopicMeta } from './grammarDatabase';
import { get20QuestionsForGame } from './questionEngine';

export type GameCategory = GrammarCategory | 'all';

export interface GameQuestion {
  id: string;
  type: 'sentence-unscramble' | 'fill-blank' | 'multiple-choice' | 'audio-pick';
  prompt: string;
  urduPrompt: string;
  options?: string[];
  wordsToArrange?: string[];
  correctAnswer: string;
  urduMeaning?: string;
  audioText?: string;
  hintUrdu?: string;
}

export interface GameDefinition {
  id: number;
  slug: string;
  title: string;
  urduTitle: string;
  category: GrammarCategory;
  categoryUrdu: string;
  difficulty: 'Easy' | 'Medium' | 'Challenge';
  descriptionUrdu: string;
  descriptionEng: string;
  badgeColor: string;
  ruleUrdu: string;
  questions: GameQuestion[];
}

// Assemble all 100 games from grammar database, each having 20 questions
export const ALL_100_GAMES: GameDefinition[] = GRAMMAR_TOPICS_100.map((topic) => ({
  id: topic.id,
  slug: `game-${topic.id}-${topic.category}`,
  title: topic.title,
  urduTitle: topic.urduTitle,
  category: topic.category,
  categoryUrdu: topic.categoryUrdu,
  difficulty: topic.difficulty,
  descriptionUrdu: topic.descriptionUrdu,
  descriptionEng: topic.descriptionEng,
  badgeColor: topic.badgeColor,
  ruleUrdu: topic.ruleUrdu,
  questions: get20QuestionsForGame(topic.id)
}));

export function getGameById(id: number): GameDefinition | undefined {
  return ALL_100_GAMES.find(g => g.id === id);
}

export function getGamesByCategory(category: GameCategory): GameDefinition[] {
  if (category === 'all') return ALL_100_GAMES;
  return ALL_100_GAMES.filter(g => g.category === category);
}
