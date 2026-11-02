import type { Grade, TopicKey, Question, MatchingQ } from '../data/types';
import { questionsFor, ALL_QUESTIONS } from '../data/questions';

export type QuizMode = 'mixed' | 'picture' | 'multiple' | 'truefalse' | 'matching';

/** The user's selection for a single question. */
export type Answer =
  | { kind: 'mc'; selected: number }
  | { kind: 'match'; picks: string[] };

export type TopicFilter = TopicKey | 'all';

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface MCItem {
  kind: 'mc';
  q: Question; // picture | multiple | truefalse
  options: string[]; // display order (shuffled)
  answerIndex: number; // index into options
  pictureId?: string; // for picture type
}

export interface MatchItem {
  kind: 'match';
  q: MatchingQ;
  lefts: string[]; // 'a' values, original order
  rights: string[]; // 'b' values, shuffled
  correctMap: Record<string, string>; // left -> correct right
}

export type Item = { kind: 'mc'; data: MCItem; points: 1 } | { kind: 'match'; data: MatchItem; points: number };

export interface Session {
  grade: Grade;
  topic: TopicFilter;
  mode: QuizMode;
  items: Item[];
  totalPoints: number;
}

function optionsFor(q: Question): string[] | null {
  if (q.type === 'multiple' || q.type === 'picture') return q.options;
  if (q.type === 'truefalse') return ['True', 'False'];
  return null;
}

export function buildQuiz(
  grade: Grade,
  topic: TopicFilter,
  mode: QuizMode,
  count: number,
): Session {
  const pool0 =
    topic === 'all'
      ? (grade === 'all' ? ALL_QUESTIONS : ALL_QUESTIONS.filter((q) => q.grades.includes(grade)))
      : questionsFor(grade, topic);
  let pool = pool0.filter((q) => {
    if (mode === 'mixed') return true;
    if (mode === 'picture') return q.type === 'picture';
    if (mode === 'multiple') return q.type === 'multiple';
    if (mode === 'truefalse') return q.type === 'truefalse';
    if (mode === 'matching') return q.type === 'matching';
    return true;
  });

  pool = shuffle(pool);
  const selected = pool.slice(0, Math.max(1, count));

  const items: Item[] = selected.map((q) => {
    if (q.type === 'matching') {
      const rights = shuffle(q.pairs.map((p) => p.b));
      const correctMap: Record<string, string> = {};
      q.pairs.forEach((p) => {
        correctMap[p.a] = p.b;
      });
      return {
        kind: 'match',
        data: { kind: 'match', q, lefts: q.pairs.map((p) => p.a), rights, correctMap },
        points: q.pairs.length,
      };
    }
    const opts = optionsFor(q) ?? [];
    // Shuffle options and remap the answer index.
    const indexed = opts.map((opt, i) => ({ opt, i }));
    const shuffled = shuffle(indexed);
    const options = shuffled.map((x) => x.opt);
    const answerIndex = shuffled.findIndex((x) => x.i === (q as any).answer) ?? 0;
    return {
      kind: 'mc',
      data: {
        kind: 'mc',
        q,
        options,
        answerIndex,
        pictureId: q.type === 'picture' ? q.pictureId : undefined,
      },
      points: 1,
    };
  });

  const totalPoints = items.reduce((s, it) => s + it.points, 0);
  return { grade, topic, mode, items, totalPoints };
}

export function verbalRating(pct: number): { label: string; color: string } {
  if (pct >= 90) return { label: 'Excellent!', color: '#16a34a' };
  if (pct >= 85) return { label: 'Very Satisfactory', color: '#22c55e' };
  if (pct >= 80) return { label: 'Satisfactory', color: '#0ea5e9' };
  if (pct >= 75) return { label: 'Fairly Satisfactory', color: '#eab308' };
  return { label: 'Keep Practicing!', color: '#f97316' };
}

export function pctOf(earned: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((earned / total) * 100);
}
