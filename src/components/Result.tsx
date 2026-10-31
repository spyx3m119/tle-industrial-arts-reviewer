import type { Session } from '../lib/quiz';
import { verbalRating } from '../lib/quiz';
import { TOPIC_BY_KEY } from '../data/types';

interface ResultProps {
  session: Session;
  earned: number;
  total: number;
  onReview: () => void;
  onRetry: () => void;
  onTopics: () => void;
  onHome: () => void;
}

export function Result({ session, earned, total, onReview, onRetry, onTopics, onHome }: ResultProps) {
  const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
  const rating = verbalRating(pct);
  const circumference = 2 * Math.PI * 52;
  const dash = (pct / 100) * circumference;

  return (
    <div className="result">
      <div className="score-ring" style={{ ['--ring' as any]: rating.color }}>
        <svg viewBox="0 0 120 120" width="140" height="140">
          <circle cx="60" cy="60" r="52" className="ring-bg" />
          <circle
            cx="60"
            cy="60"
            r="52"
            className="ring-fg"
            style={{
              strokeDasharray: `${dash} ${circumference}`,
            }}
          />
          <text x="60" y="56" className="ring-pct">{pct}%</text>
          <text x="60" y="76" className="ring-sub">{earned}/{total} pts</text>
        </svg>
      </div>

      <h1 className="result-title" style={{ color: rating.color }}>{rating.label}</h1>
      <p className="result-topic">
        {session.topic === 'all'
          ? '🧰 Mixed Practice · All Topics'
          : `${TOPIC_BY_KEY[session.topic].emoji} ${TOPIC_BY_KEY[session.topic].label} · Grade ${session.grade}`}
      </p>

      <div className="result-actions">
        <button className="btn primary" onClick={onReview}>Review Answers</button>
        <button className="btn" onClick={onRetry}>Try Again</button>
        <button className="btn" onClick={onTopics}>Other Topics</button>
        <button className="btn ghost" onClick={onHome}>Home</button>
      </div>
    </div>
  );
}
