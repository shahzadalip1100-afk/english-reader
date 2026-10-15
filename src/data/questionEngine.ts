/**
 * High-performance Question Generator Engine
 * Generates 20 dedicated, rich questions for any of the 100 Grammar & Spoken Games.
 * Covers:
 * - 12 Tenses Games (تمام 12 ٹینسز)
 * - 13 Daily Spoken & Dialogue Games (روزمرہ بول چال)
 * - 75 In-depth Grammar Pillars (اجزائے کلام، حروف جار، حروف تنکیر، جملے کی ساخت، مجہول، ڈائریکٹ ان ڈائریکٹ، کنڈیشنلز، چیمپئن شپ)
 */

import { GameQuestion } from './games100';
import { getTensesQuestions } from './questions/tensesQuestions';
import { getSpokenQuestions } from './questions/spokenQuestions';
import { getGrammarPillarsQuestions } from './questions/grammarPillarsQuestions';

/**
 * Returns exactly 20 authentic, pedagogical questions for any given game ID (1 to 100).
 */
export function get20QuestionsForGame(gameId: number): GameQuestion[] {
  // Games 1 to 12: 12 Tenses Games
  if (gameId >= 1 && gameId <= 12) {
    return getTensesQuestions(gameId);
  }

  // Games 13 to 25: Daily Spoken English & Conversations
  if (gameId >= 13 && gameId <= 25) {
    return getSpokenQuestions(gameId);
  }

  // Games 26 to 100: Comprehensive Grammar Pillars & Grand Championship
  return getGrammarPillarsQuestions(gameId);
}
