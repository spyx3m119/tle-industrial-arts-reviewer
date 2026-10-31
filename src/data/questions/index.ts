import type { Question, TopicKey, Grade } from '../types';
import { toolsQuestions } from './tools';
import { ohsQuestions } from './ohs';
import { eimQuestions } from './eim';
import { electronicsQuestions } from './electronics';
import { carpentryQuestions } from './carpentry';
import { masonryQuestions } from './masonry';
import { weldingQuestions } from './welding';
import { plumbingQuestions } from './plumbing';
import { automotiveQuestions } from './automotive';
import { handymanQuestions } from './handyman';
import { draftingQuestions } from './drafting';

export const ALL_QUESTIONS: Question[] = [
  ...toolsQuestions,
  ...ohsQuestions,
  ...eimQuestions,
  ...electronicsQuestions,
  ...carpentryQuestions,
  ...masonryQuestions,
  ...weldingQuestions,
  ...plumbingQuestions,
  ...automotiveQuestions,
  ...handymanQuestions,
  ...draftingQuestions,
];

// Sanity: ids must be unique.
{
  const seen = new Set<string>();
  const dupes: string[] = [];
  for (const q of ALL_QUESTIONS) {
    if (seen.has(q.id)) dupes.push(q.id);
    seen.add(q.id);
  }
  if (dupes.length) {
    // eslint-disable-next-line no-console
    console.warn('DUPLICATE QUESTION IDS:', dupes);
  }
}

export const QUESTIONS_BY_TOPIC: Record<TopicKey, Question[]> = {
  tools: toolsQuestions,
  ohs: ohsQuestions,
  eim: eimQuestions,
  electronics: electronicsQuestions,
  carpentry: carpentryQuestions,
  masonry: masonryQuestions,
  welding: weldingQuestions,
  plumbing: plumbingQuestions,
  automotive: automotiveQuestions,
  handyman: handymanQuestions,
  drafting: draftingQuestions,
};

export function questionsFor(grade: Grade, topic: TopicKey): Question[] {
  return ALL_QUESTIONS.filter((q) => q.topic === topic && q.grades.includes(grade));
}

export function countFor(grade: Grade, topic: TopicKey, typeFilter?: Question['type']): number {
  return questionsFor(grade, topic).filter((q) => !typeFilter || q.type === typeFilter).length;
}

export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;
