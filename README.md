# TLE Industrial Arts — Competition Reviewer

A self-hosted quiz web app for the **DepEd TLE – Industrial Arts** competition (Grades 7–11).
Practice tool/object identification, safety, electrical, electronics, carpentry, masonry,
welding, plumbing, automotive, handyman, drafting & mensuration — with immediate feedback
and explanations after every answer.

Built as a **fully static site** (no backend, no database), so it deploys anywhere that
serves static files — including **Coolify**.

---

## Features

- **Grade 7 → 11**, organized by grade → topic → quiz.
- **Grade 7 Level 1 = picture identification** of tools/objects using real, self-hosted
  photos sourced from Wikimedia Commons (CC0 / Public Domain / CC-BY / CC-BY-SA), with
  inline-SVG fallback for a couple of tools.
- **Four question types:** Picture ID, Multiple Choice, True/False, Matching.
- **Question-type selector** on the topic screen (Mixed · Picture ID · Multiple Choice ·
  True-False · Matching) so students can drill one format at a time.
- Immediate **correct/incorrect feedback with an explanation** for every question.
- **Results screen** with an animated score ring and a DepEd-style verbal rating
  (Excellent / Very Satisfactory / Satisfactory / Fairly Satisfactory / Keep Practicing!).
- **Review mode** to re-read every question and your answers after a quiz.
- **Photo credits & licenses** screen (in-app) listing all 36 images and their creators.
- Mobile-friendly, single-column layout.

---

## Tech stack

- **Vite + React 19 + TypeScript**
- Build output: static files in `dist/`
- `vite.config.ts` sets `base: './'` so the app works from **any sub-path**
  (e.g. `https://your-app.coolify.example/` or `/reviewer/`).

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build + preview:

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally
```

---

## Deploy to Coolify (static site)

This app is a static build — use Coolify's **Static** build preset.

1. Push this repo to GitHub/GitLab.
2. In Coolify, create a new resource and point it at the repo.
3. Set the build settings:

   | Field             | Value                     |
   | ----------------- | ------------------------- |
   | Build Command     | `npm ci && npm run build` |
   | Output Directory  | `dist`                    |
   | Start Command     | *(none — static, no process)* |

   In Coolify's UI this is the **"Static"** preset. If asked for a build preset, choose
   **Static**; it already uses `npm ci && npm run build` and publishes `dist`.

4. Deploy. Coolify serves the `dist/` folder over HTTP.

> The app is already configured with `base: './'`, so it works whether Coolify serves it at
> the domain root or under a sub-path. No code changes are needed.

---

## Adding or editing questions

All questions live in `src/data/questions/` — one file per topic. Each question is a plain
object; no build step is needed to add content, just edit the array and rebuild.

```ts
{
  id: 'unique_id',
  type: 'multiple',            // 'picture' | 'multiple' | 'truefalse' | 'matching'
  grades: [7, 8, 9, 10, 11],   // which grades this appears in
  topic: 'eim',                // must match a key in TopicKey
  difficulty: 1,               // 1 (easy) … 3 (hard)
  stem: 'What does a multitester measure?',
  options: ['Voltage', 'Weight', 'Length', 'Color'],
  answer: 0,                   // index of the correct option
  explanation: 'A multitester measures electrical values like voltage and continuity.'
}
```

- **Picture ID:** `type: 'picture'` + `pictureId` referencing an icon in
  `src/data/toolIcons.tsx` (add a new inline-SVG icon there to draw a new picture) or a
  file in `src/assets/tools/` (add a new photo there and it is auto-picked up by
  `src/data/toolImages.ts`).
- **True/False:** `type: 'truefalse'` + `answer: true | false`.
- **Matching:** `type: 'matching'` + `pairs: [{ a, b }, ...]`.

A sanity check in `src/data/questions/index.ts` warns in the console if two questions share
an `id`. `src/data/attributions.ts` holds the per-image credit data — update it when you
swap or add a photo (license attribution is required for CC-BY / CC-BY-SA).

### Grading note

Questions are tagged with the grades they belong to. A topic that isn't part of a grade's
curriculum shows **"Not yet for Grade X"** and is disabled — this is intentional (e.g.
Welding/Automotive are senior-level topics).

---

## Project structure

```
src/
  App.tsx                 # screens: home → topics → quiz → result → review → credits
  components/
    Quiz.tsx              # quiz engine (all 4 question types)
    Result.tsx            # score ring + verbal rating
    ToolIcon.tsx          # renders a real photo if available, else inline-SVG
    ErrorBoundary.tsx     # catches render errors instead of a blank screen
  data/
    types.ts              # data model (Grade, TopicKey, Question, ...)
    toolIcons.tsx         # 38 inline-SVG tool icons (fallbacks)
    toolImages.ts         # eager glob of self-hosted tool photos
    attributions.ts       # per-image credit data (36 photos, Wikimedia Commons)
    questions/            # one bank per topic + barrel index.ts
  lib/quiz.ts             # builds a shuffled quiz, scoring, rating scale
src/assets/tools/         # 36 self-hosted tool photos
```

---

## Image credits

Tool photos are self-hosted from **Wikimedia Commons** under CC0, Public Domain, CC-BY and
CC-BY-SA licenses. Full per-image attribution is shown in the in-app
**"Tool photo credits & licenses"** screen (Home → credits button), and in
`src/data/attributions.ts`. When swapping or adding a photo, update that file so the
CC-BY / CC-BY-SA creators remain credited.

---

## License

For educational / competition-review use.
