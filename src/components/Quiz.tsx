import { useEffect, useState } from 'react';
import type { Session, Answer } from '../lib/quiz';
import { ToolIcon } from './ToolIcon';
import { TOOL_INFO } from '../data/toolInfo';

interface QuizProps {
  session: Session;
  index: number;
  answer: Answer | null;
  onSubmit: (a: Answer) => void;
  onNext: () => void;
}

export function Quiz({ session, index, answer, onSubmit, onNext }: QuizProps) {
  const [matchPicks, setMatchPicks] = useState<Record<number, string>>({});

  const item = session.items[index];
  const totalItems = session.items.length;
  // "Submitted" is derived from whether an answer already exists for this
  // question — never from stale local state carried across questions.
  const submitted = answer !== null;

  // Reset the in-progress matching picks whenever we move to a new question.
  useEffect(() => {
    setMatchPicks({});
  }, [index]);

  if (!item) return null;

  const progress = totalItems > 0 ? ((index + 1) / totalItems) * 100 : 0;

  // ---------- Multiple choice / picture / true-false ----------
  if (item.kind === 'mc') {
    const { q, options, answerIndex, pictureId } = item.data;
    const stem = q.type === 'picture' ? 'What tool or object is shown here?' : q.stem;
    const selected = answer?.kind === 'mc' ? answer.selected : null;
    const isCorrect = submitted && selected === answerIndex;

    return (
      <div className="quiz">
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="qmeta">
          <span className="pill">{index + 1} / {totalItems}</span>
          <span className="pill ghost">{q.type === 'picture' ? '🖼 Picture ID' : q.type === 'truefalse' ? 'True or False' : 'Multiple Choice'}</span>
        </div>

        {pictureId && (
          <div className="picture-frame">
            <ToolIcon id={pictureId} size={200} />
          </div>
        )}

        <h2 className="stem">{stem}</h2>

        <div className="options">
          {options.map((opt, i) => {
            const isSel = selected === i;
            const isAns = i === answerIndex;
            let cls = 'option';
            if (submitted) {
              if (isAns) cls += ' correct';
              else if (isSel) cls += ' wrong';
            }
            return (
              <button
                key={i}
                className={cls}
                disabled={submitted}
                onClick={() => {
                  if (submitted) return;
                  onSubmit({ kind: 'mc', selected: i });
                }}
              >
                <span className="opt-label">{opt}</span>
                {submitted && isAns && <span className="tick">✓</span>}
                {submitted && isSel && !isAns && <span className="tick wrong">✗</span>}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className={`feedback ${isCorrect ? 'good' : 'bad'}`}>
            <div className="feedback-head">{isCorrect ? 'Correct! 🎉' : 'Not quite'}</div>
            {q.explanation && <p>{q.explanation}</p>}
            {q.type === 'picture' && pictureId && TOOL_INFO[pictureId] && (
              <div className="tool-info">
                <div className="tool-info-row">
                  <span className="tool-info-label">Purpose</span>
                  <span className="tool-info-value">{TOOL_INFO[pictureId].purpose}</span>
                </div>
                {TOOL_INFO[pictureId].commonName && (
                  <div className="tool-info-row">
                    <span className="tool-info-label">Common name</span>
                    <span className="tool-info-value">{TOOL_INFO[pictureId].commonName}</span>
                  </div>
                )}
                {TOOL_INFO[pictureId].localName && (
                  <div className="tool-info-row">
                    <span className="tool-info-label">Local (Tagalog) name</span>
                    <span className="tool-info-value">{TOOL_INFO[pictureId].localName}</span>
                  </div>
                )}
              </div>
            )}
            <button className="btn primary" onClick={onNext}>
              {index + 1 >= totalItems ? 'See Results' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ---------- Matching ----------
  const { lefts, rights, correctMap } = item.data;
  const allPicked = !submitted && lefts.every((_, i) => matchPicks[i] !== undefined);
  const correctPairs = submitted
    ? lefts.filter((_, i) => matchPicks[i] === correctMap[lefts[i]]).length
    : 0;

  return (
    <div className="quiz">
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="qmeta">
        <span className="pill">{index + 1} / {totalItems}</span>
        <span className="pill ghost">Matching</span>
      </div>

      <h2 className="stem">{item.data.q.stem}</h2>
      <p className="match-hint">Pick the correct match for each item. Each choice is used once.</p>

      <div className="match-list">
        {lefts.map((left, i) => {
          const chosen = matchPicks[i];
          const isRight = submitted && chosen === correctMap[left];
          const isWrong = submitted && chosen !== undefined && chosen !== correctMap[left];
          return (
            <div key={i} className={`match-row ${submitted ? (isRight ? 'right' : isWrong ? 'wrong' : '') : ''}`}>
              <div className="match-left">{left}</div>
              <div className="match-rights">
                {rights.map((r) => {
                  const usedElsewhere =
                    Object.entries(matchPicks).some(
                      ([li, rv]) => Number(li) !== i && rv === r,
                    );
                  const isChoice = chosen === r;
                  const isCorrectChoice = submitted && r === correctMap[left];
                  let cls = 'right-btn';
                  if (isCorrectChoice) cls += ' correct';
                  else if (isChoice) cls += ' wrong';
                  else if (usedElsewhere) cls += ' used';
                  return (
                    <button
                      key={r}
                      className={cls}
                      disabled={submitted || (usedElsewhere && !isChoice)}
                      onClick={() =>
                        setMatchPicks((p) => ({ ...p, [i]: r }))
                      }
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          className="btn primary"
          disabled={!allPicked}
          onClick={() =>
            onSubmit({ kind: 'match', picks: lefts.map((_, i) => matchPicks[i] ?? '') })
          }
        >
          Check Matches
        </button>
      ) : (
        <div className={`feedback ${correctPairs === lefts.length ? 'good' : 'bad'}`}>
          <div className="feedback-head">
            {correctPairs === lefts.length
              ? 'All matched! 🎉'
              : `${correctPairs} of ${lefts.length} correct`}
          </div>
          {item.data.q.explanation && <p>{item.data.q.explanation}</p>}
          <button className="btn primary" onClick={onNext}>
            {index + 1 >= totalItems ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
