// ============================================================
//  Data model for the TLE Industrial Arts Reviewer
// ============================================================

export type Grade = 7 | 8 | 9 | 10 | 11 | 'all';

export type TopicKey =
  | 'tools'
  | 'ohs'
  | 'eim'
  | 'electronics'
  | 'carpentry'
  | 'masonry'
  | 'welding'
  | 'plumbing'
  | 'automotive'
  | 'handyman'
  | 'drafting';

export type QType = 'picture' | 'multiple' | 'truefalse' | 'matching';

export type Difficulty = 1 | 2 | 3;

export interface BaseQ {
  id: string;
  type: QType;
  grades: Grade[];
  topic: TopicKey;
  difficulty: Difficulty;
  explanation?: string;
}

/** Name the object shown in the picture (4 options). */
export interface PictureQ extends BaseQ {
  type: 'picture';
  pictureId: string;
  options: string[];
  answer: number; // index into options
}

/** Standard text multiple choice. */
export interface MultipleQ extends BaseQ {
  type: 'multiple';
  stem: string;
  options: string[];
  answer: number; // index into options
}

/** True / False. */
export interface TrueFalseQ extends BaseQ {
  type: 'truefalse';
  stem: string;
  answer: boolean;
}

/** Match each left item with the correct right item. */
export interface MatchingQ extends BaseQ {
  type: 'matching';
  stem: string;
  pairs: { a: string; b: string }[];
}

export type Question = PictureQ | MultipleQ | TrueFalseQ | MatchingQ;

// ---------- topic metadata ----------

export interface TopicMeta {
  key: TopicKey;
  label: string;
  short: string; // one-line description
  emoji: string;
  color: string; // accent color for the card
}

export const TOPICS: TopicMeta[] = [
  {
    key: 'tools',
    label: 'Hand & Power Tools',
    short: 'Identify, use and care for common shop tools.',
    emoji: '🔧',
    color: '#2563eb',
  },
  {
    key: 'ohs',
    label: 'Occupational Health & Safety',
    short: '5S, hazards, PPE, fire classes, first aid.',
    emoji: '🦺',
    color: '#dc2626',
  },
  {
    key: 'drafting',
    label: 'Technical Drafting & Mensuration',
    short: 'Drawing symbols, scales, measurement & calculation.',
    emoji: '📐',
    color: '#0891b2',
  },
  {
    key: 'eim',
    label: 'Electrical Installation & Maintenance',
    short: 'Wiring, tools, materials, symbols, color codes.',
    emoji: '⚡',
    color: '#eab308',
  },
  {
    key: 'electronics',
    label: 'Electronics',
    short: 'Components, soldering, resistors & circuits.',
    emoji: '🔌',
    color: '#7c3aed',
  },
  {
    key: 'carpentry',
    label: 'Carpentry & Woodworking',
    short: 'Wood joints, finishes, tools and materials.',
    emoji: '🪚',
    color: '#b45309',
  },
  {
    key: 'masonry',
    label: 'Masonry',
    short: 'Concrete mix, blocks, tools and terms.',
    emoji: '🧱',
    color: '#a16207',
  },
  {
    key: 'welding',
    label: 'Welding (SMAW)',
    short: 'Shielded Metal Arc Welding: electrodes, defects, safety.',
    emoji: '🔥',
    color: '#ea580c',
  },
  {
    key: 'plumbing',
    label: 'Plumbing',
    short: 'Pipes, fittings, valves and tools.',
    emoji: '🚰',
    color: '#0d9488',
  },
  {
    key: 'automotive',
    label: 'Automotive & Small Engine',
    short: 'Vehicle systems, fluids, tools.',
    emoji: '🚗',
    color: '#475569',
  },
  {
    key: 'handyman',
    label: 'Handyman & Home Maintenance',
    short: 'Everyday repairs and home/office upkeep.',
    emoji: '🧰',
    color: '#64748b',
  },
];

export const TOPIC_BY_KEY: Record<TopicKey, TopicMeta> = Object.fromEntries(
  TOPICS.map((t) => [t.key, t]),
) as Record<TopicKey, TopicMeta>;

export const GRADES: Grade[] = [7, 8, 9, 10, 11, 'all'];

export const GRADE_LABEL: Record<Grade, string> = {
  7: 'Grade 7 — Exploratory',
  8: 'Grade 8 — Exploratory',
  9: 'Grade 9 — Technical',
  10: 'Grade 10 — Technical',
  11: 'Grade 11 — TVL Specialization',
  all: 'All (Grade 7–11)',
};
