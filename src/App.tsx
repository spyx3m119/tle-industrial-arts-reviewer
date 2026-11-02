import { useMemo, useState } from 'react';
import type { Grade, TopicKey, Question } from './data/types';
import { GRADES, GRADE_LABEL, TOPICS } from './data/types';
import { countFor, ALL_QUESTIONS } from './data/questions';
import { buildQuiz, type Session, type QuizMode, type Item, type Answer } from './lib/quiz';
import { ToolIcon } from './components/ToolIcon';
import { Quiz } from './components/Quiz';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Result } from './components/Result';
import { TOOL_ATTRIBUTIONS, LICENSE_SUMMARY } from './data/attributions';

type Screen = 'home' | 'topics' | 'quiz' | 'result' | 'review' | 'credits';

const QUESTIONS_PER_QUIZ = 15;

// Maps a quiz mode to the underlying question type used for filtering/counts.
const MODE_TYPE: Record<QuizMode, Question['type'] | undefined> = {
  mixed: undefined,
  picture: 'picture',
  multiple: 'multiple',
  truefalse: 'truefalse',
  matching: 'matching',
};

const MODE_PILLS: { mode: QuizMode; label: string }[] = [
  { mode: 'mixed', label: '🎲 Mixed' },
  { mode: 'picture', label: '🖼 Picture ID' },
  { mode: 'multiple', label: '• Multiple Choice' },
  { mode: 'truefalse', label: '✓/✗ True-False' },
  { mode: 'matching', label: '🔗 Matching' },
];

function computeEarned(session: Session, answers: (Answer | null)[]): number {
  return answers.reduce((sum, a, i) => {
    if (!a || !session.items[i]) return sum;
    const item = session.items[i] as Item;
    if (item.kind === 'mc') {
      const mc = item.data;
      return sum + (a.kind === 'mc' && a.selected === mc.answerIndex ? 1 : 0);
    }
    // matching
    const m = item.data;
    const picks = a.kind === 'match' ? a.picks : [];
    let earned = 0;
    m.lefts.forEach((left, li) => {
      if (picks[li] === m.correctMap[left]) earned += 1;
    });
    return sum + earned;
  }, 0);
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [grade, setGrade] = useState<Grade>(7);
  const [session, setSession] = useState<Session | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>([]);
  const [mode, setMode] = useState<QuizMode>('mixed');

  const earned = useMemo(
    () => (session ? computeEarned(session, answers) : 0),
    [session, answers],
  );

  const gradeTotal = useMemo(
    () => (grade === 'all' ? ALL_QUESTIONS.length : ALL_QUESTIONS.filter((q) => q.grades.includes(grade)).length),
    [grade],
  );

  function startQuiz(g: Grade, t: TopicKey | 'all', mode: QuizMode) {
    const count = mode === 'picture' ? Infinity : QUESTIONS_PER_QUIZ;
    const s = buildQuiz(g, t, mode, count);
    setSession(s);
    setIndex(0);
    setAnswers(new Array(s.items.length).fill(null));
    setScreen('quiz');
  }

  function submitCurrent(a: Answer) {
    setAnswers((prev) => {
      const next = prev.slice();
      next[index] = a;
      return next;
    });
  }

  function next() {
    if (!session) return;
    if (index + 1 >= session.items.length) {
      setScreen('result');
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goTopics() {
    setScreen('topics');
  }

  // ---------------- HOME ----------------
  if (screen === 'home') {
    return (
      <div className="screen home">
        <div className="hero-badge">🧰 TLE Reviewer</div>
        <h1 className="hero-title">Industrial Arts<br />Competition Reviewer</h1>
        <p className="hero-sub">
          A focused quiz app for the DepEd TLE – Industrial Arts competition
          (Grades 7–11). Practice tool identification, safety, electrical,
          welding, masonry, plumbing, automotive and more.
        </p>

        <h2 className="section-label">Choose your grade</h2>
        <div className="grade-grid">
          {GRADES.map((g) => (
            <button
              key={g}
              className={`grade-card ${g === grade ? 'active' : ''}`}
              onClick={() => {
                setGrade(g);
                setScreen('topics');
              }}
            >
              <span className="grade-num">{g}</span>
              <span className="grade-name">{GRADE_LABEL[g]}</span>
            </button>
          ))}
        </div>

        <p className="footer-note">
          Practice tool &amp; object identification · Multiple choice · True/False · Matching
        </p>
        <button className="btn ghost small" onClick={() => setScreen('credits')}>
          📷 Tool photo credits &amp; licenses
        </button>
      </div>
    );
  }

  // ---------------- TOPIC SELECT ----------------
  if (screen === 'topics') {
    return (
      <div className="screen topics">
        <header className="topbar">
          <button className="btn ghost small" onClick={() => setScreen('home')}>← Grades</button>
          <div className="topbar-grade">
            <span className="grade-chip">{grade === 'all' ? 'All' : grade}</span>
            <span>{GRADE_LABEL[grade]}</span>
          </div>
        </header>

        <h2 className="section-label">Pick a topic</h2>

        <div className="mode-pills">
          {MODE_PILLS.map((m) => (
            <button
              key={m.mode}
              className={`mode-pill ${m.mode === mode ? 'active' : ''}`}
              onClick={() => setMode(m.mode)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="topic-grid">
          {TOPICS.map((t) => {
            const n = countFor(grade, t.key, MODE_TYPE[mode]);
            const empty = n === 0;
            return (
              <button
                key={t.key}
                className="topic-card"
                style={{ ['--accent' as any]: t.color }}
                disabled={empty}
                onClick={() => {
                  startQuiz(grade, t.key, mode);
                }}
              >
                <span className="topic-emoji">{t.emoji}</span>
                <span className="topic-label">{t.label}</span>
                <span className="topic-short">{t.short}</span>
                <span className="topic-count">{empty ? 'Not yet available' : n + ' questions'}</span>
              </button>
            );
          })}
        </div>

        <button
          className="mixed-card"
          onClick={() => startQuiz(grade, 'all', mode)}
        >
          🎲 <strong>All Topics</strong> — {mode === 'mixed' ? 'random questions from every topic' : 'every topic, ' + mode + ' questions only'}
          <span className="mixed-count">{gradeTotal} questions · all topics</span>
        </button>
      </div>
    );
  }

  // ---------------- QUIZ ----------------
  if (screen === 'quiz' && session) {
    const item = session.items[index];
    const currentAnswer = answers[index] ?? null;
    return (
      <div className="screen quiz-screen">
        <header className="topbar">
          <button className="btn ghost small" onClick={() => setScreen('topics')}>✕ Quit</button>
          <div className="topbar-grade">
            <span className="grade-chip">{item && item.kind === 'mc' ? item.data.q.topic : session.topic}</span>
            <span>Grade {grade === 'all' ? '7–11' : grade}</span>
          </div>
        </header>
        <ErrorBoundary>
          <Quiz
            session={session}
            index={index}
            answer={currentAnswer}
            onSubmit={submitCurrent}
            onNext={() => {
              next();
            }}
          />
        </ErrorBoundary>
      </div>
    );
  }

  // ---------------- REVIEW ----------------
  if (screen === 'review' && session) {
    return (
      <div className="screen review">
        <header className="topbar">
          <button className="btn ghost small" onClick={() => setScreen('result')}>← Results</button>
          <div className="topbar-grade"><span>{earned}/{session.totalPoints} pts</span></div>
        </header>
        <h2 className="section-label">Review all answers</h2>
        <div className="review-list">
          {session.items.map((it, i) => (
            <ReviewCard key={i} item={it} answer={answers[i]} />
          ))}
        </div>
        <div className="review-actions">
          <button className="btn primary" onClick={() => setScreen('result')}>Back to Results</button>
          <button className="btn" onClick={() => startQuiz(session.grade, session.topic, session.mode)}>Try Again</button>
        </div>
      </div>
    );
  }

  // ---------------- CREDITS ----------------
  if (screen === 'credits') {
    const licenseKeys = Object.keys(LICENSE_SUMMARY).sort();
    const byLicense: Record<string, typeof TOOL_ATTRIBUTIONS> = {};
    for (const a of TOOL_ATTRIBUTIONS) {
      const k = a.license || 'Unknown';
      (byLicense[k] ??= []).push(a);
    }
    return (
      <div className="screen credits">
        <header className="topbar">
          <button className="btn ghost small" onClick={() => setScreen('home')}>← Back</button>
          <div className="topbar-grade"><span>Photo credits</span></div>
        </header>

        <h2 className="section-label">Tool photos</h2>
        <p className="footer-note">
          Real tool photos are self-hosted from <strong>Wikimedia Commons</strong> and released
          under public-domain or Creative-Commons licenses. Where a license requires attribution
          (CC-BY / CC-BY-SA), the creator and license are listed below. Tapping a title opens the
          original file page on Wikimedia Commons.
        </p>

        <div className="credit-summ">
          {licenseKeys.map((k) => (
            <span key={k} className="credit-chip">{k} · {LICENSE_SUMMARY[k]}</span>
          ))}
        </div>

        {licenseKeys.map((k) => (
          <div key={k} className="credit-group">
            <h3 className="credit-group-title">{k} <span>({byLicense[k].length})</span></h3>
            <ul className="credit-list">
              {byLicense[k].map((a) => (
                <li key={a.toolId}>
                  <span className="credit-tool">{a.toolId.replace(/_/g, ' ')}</span>
                  {a.url ? (
                    <a className="credit-link" href={a.url} target="_blank" rel="noopener noreferrer">
                      {a.title || a.file}
                    </a>
                  ) : (
                    <span className="credit-link plain">{a.title || a.file}</span>
                  )}
                  {a.artist && <span className="credit-by">by {a.artist}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="footer-note" style={{ marginTop: 18 }}>
          Illustrations shown for a few tools (where no clear, freely-licensed photo was
          available) are original inline SVG.
        </p>
      </div>
    );
  }

  // ---------------- RESULT ----------------
  if (screen === 'result' && session) {
    return (
      <div className="screen">
        <Result
          session={session}
          earned={earned}
          total={session.totalPoints}
          onReview={() => setScreen('review')}
          onRetry={() => startQuiz(session.grade, session.topic, session.mode)}
          onTopics={goTopics}
          onHome={() => setScreen('home')}
        />
      </div>
    );
  }

  return null;
}

// ---------------- Review card ----------------
function ReviewCard({ item, answer }: { item: Item; answer: Answer | null }) {
  if (item.kind === 'mc') {
    const mc = item.data;
    const q = mc.q;
    const selected = answer?.kind === 'mc' ? answer.selected : null;
    const isCorrect = selected === mc.answerIndex;
    const isAnswered = answer !== null;
    return (
      <div className={`review-card ${isAnswered ? (isCorrect ? 'correct' : 'wrong') : 'skipped'}`}>
        <div className="review-q">
          {q.type === 'picture' && mc.pictureId && (
            <div className="review-pic"><ToolIcon id={mc.pictureId} size={96} /></div>
          )}
          <div>
            <div className="review-stem">
              <span className="review-badge">{q.type === 'picture' ? '🖼' : q.type === 'truefalse' ? '✓/✗' : q.type === 'matching' ? '🔗' : '•'}</span>
              {q.type === 'picture' ? 'Name this tool/object' : q.stem}
            </div>
            <div className="review-opts">
              {mc.options.map((opt, oi) => {
                const isSel = oi === selected;
                const isAns = oi === mc.answerIndex;
                let cls = 'ropt';
                if (isAns) cls += ' ans';
                if (isSel && !isAns) cls += ' sel-wrong';
                return (
                  <span key={oi} className={cls}>
                    {isSel && !isAns ? 'Your answer: ' : ''}{isAns ? '✓ ' : ''}{opt}
                  </span>
                );
              })}
            </div>
            {q.explanation && <p className="review-exp">{q.explanation}</p>}
          </div>
        </div>
      </div>
    );
  }

  // matching
  const m = item.data;
  const picks = answer?.kind === 'match' ? answer.picks : [];
  return (
    <div className="review-card match-review">
      <div className="review-stem">{m.q.stem}</div>
      <div className="match-review-list">
        {m.lefts.map((left, li) => {
          const correct = m.correctMap[left];
          const chosen = picks[li];
          const ok = chosen === correct;
          return (
            <div key={li} className={`mrow ${chosen === undefined ? 'skipped' : ok ? 'correct' : 'wrong'}`}>
              <span>{left}</span>
              <span className="marrow">→</span>
              {chosen === undefined ? (
                <span className="mmissed">no answer — {correct}</span>
              ) : ok ? (
                <span>{chosen}</span>
              ) : (
                <span className="mwrong">{chosen} <em>(correct: {correct})</em></span>
              )}
            </div>
          );
        })}
      </div>
      {m.q.explanation && <p className="review-exp">{m.q.explanation}</p>}
    </div>
  );
}
