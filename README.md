# RideLab — interactive repository guide

This is the standalone web repository for RideLab, a Vietnamese browser-based
guide to the ride-hailing microservices system. It contains 14 lessons covering
authority boundaries, Trip lifecycle, request idempotency, matching,
reservation races, Outbox, delivery/dedup/retry, Saga, unknown payment outcomes,
cancellation, authentication, notification isolation and verification.

## Run

From the repository root:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. On systems where Python is named
`python3`, use that executable instead. No Node packages, build, Docker services
or credentials are required. Stop the server with Ctrl+C when finished.

The source viewer loads referenced files from the
[ride-hailing microservices repository](https://github.com/minhqng/ride-hailing-microservices-system).
Use HTTP rather than opening `index.html` through `file://` because ES modules
need HTTP access.

## Use

- **Học:** select a lesson, select timeline steps or use Back/Next. The active
  illustration and explanation change together. Mechanism illustrations include
  a pickup map and candidate filtering, Driver row-lock contention, transactional
  Outbox, queued messages and receipts, provider effects with a lost response,
  Saga compensation, cancellation tombstones and trace waterfalls. Finish explicitly with “Hoàn thành
  bài”; merely opening a lesson does not mark it complete.
- **Illustrations:** each step has three narrated phases and repeats
  automatically after 7.2 seconds of animation and a 1.2-second outcome hold.
  There is no bottom playback/seek/speed toolbar. Selecting a numbered phase
  jumps to that phase and continues the loop.
  Hidden tabs and dialogs pause movement; returning or closing the dialog
  resumes it. Reduced-motion mode stays static. “Phát lại” at the top restarts
  the lesson and its illustration. On phones the illustration can be panned
  horizontally to keep labels readable. Actors and the SVG stage persist across
  steps within the same illustration family; transitions between different
  families crossfade. All eight ride-journey steps use one shared scene.
  Its queue, driver and payment actors fade in when first involved, together
  with their routes; existing actors keep their positions.
- **Visible state:** each step shows a before/processing/outcome strip. Current
  actors are highlighted while the surroundings remain fixed. Verdicts appear
  after the related messages finish traveling; an uncertain outcome is distinct
  from a conflict. The examples model local state changes and delayed facts,
  including Driver reservation before Trip records it and a provider effect
  before the caller learns the result. Timing and state contracts live in
  [visual-state.mjs](visual-state.mjs), not in backend telemetry.
- **Beginner explanations:** every step has a plain Vietnamese title, context,
  three causal actions, an illustrative example, rationale, a takeaway and
  visible vocabulary definitions. Original technical explanations, identifiers
  and sources are retained in the final reading parts. The reading panel packs
  complete paragraphs into pages sized to its available height. Use its
  previous/next buttons or “Phần …” selector to read all content without a
  mouse wheel. Reading-page selection survives opening a source dialog.
  Search includes these explanations and definitions. Examples do not
  represent live users or runtime data.
- **Desktop layout:** the learning shell fits the viewport on desktop layouts
  defined by [viewport.css](viewport.css): sidebar, illustration, step timeline,
  reading parts and lesson navigation stay on screen. Only one course group
  opens at a time. Smaller screens and browser zoom retain normal page flow
  to preserve readable text. Other views and source-file dialogs may scroll.
- **Tạm dừng / Phát:** pauses the current illustration and resumes from its
  current position, without changing lesson steps. Closing a dialog or returning
  to the tab preserves a manual pause. Reduced-motion preference presents the
  illustration's final state; phase selection remains available.
- **Luyện tập:** fourteen scenario questions with explanatory feedback. The
  first answer for each question is saved; “Làm lại bộ câu hỏi” clears answers.
- **Bản đồ hệ thống:** select a service to inspect related sources and lessons.
  The graph is intentionally simplified; the text identifies omitted stores.
- **Tóm tắt:** review key invariants and use browser print/save as PDF.
- Search supports Vietnamese with or without diacritics. Ctrl+K / Cmd+K opens
  search; Left/Right changes steps; R restarts the lesson; Space pauses/resumes animation
  outside interactive controls. Escape closes a dialog.

Completion, answers and theme are kept in this browser's `localStorage` under
`ridelab-progress-v1`. Nothing is sent to a backend. “Đặt lại tiến độ” asks for
confirmation before clearing completion and answers. When storage is blocked,
the app keeps session state and reports that it cannot persist it.

These are **educational scenarios, not live telemetry or executable fault
injection**. Time estimates are reading estimates. Message/state snippets are
teaching summaries, not copied execution logs. Source files in the viewer are
fetched from the running checkout. The canonical contracts remain in
[the documentation index](../README.md); the lessons do not replace them.
Google Fonts supplies optional typography; local monospace and system fonts
are fallbacks if the network is unavailable.

## Maintain and verify

`course.mjs` owns lesson content, source paths, topology and quiz questions.
`app.mjs` renders the UI and owns browser state; `styles.css` owns responsive
layout and themes. `scenes.mjs` owns the educational SVG models, three-phase
storyboards and native Web Animations player; `scenes.css` styles that stage.
`beginner.mjs` owns the beginner explanations and vocabulary; `beginner.css`
owns their reading styles. `reader.mjs` lays out and navigates complete reading
fragments; `viewport.css` owns viewport sizing and compact spacing.
`visual-state.mjs` defines per-step visible state, milestone ordering, actor
focus and keyed SVG reconciliation. Keep it consistent with the lesson/source
contract when changing a scenario. Palette meanings include pending, success,
neutral, conflict and uncertainty; uncertainty must never be treated as failure.
The player uses a shared clock and cancels animations/listeners when leaving
the learning view. No backend service or public API is modified.

After editing lessons, run the content and source-link checks from the repo root:

```bash
node --test docs/learn/course.test.mjs docs/learn/scenes.test.mjs docs/learn/beginner.test.mjs docs/learn/visual-state.test.mjs
node --check docs/learn/app.mjs
node --check docs/learn/scenes.mjs
node --check docs/learn/beginner.mjs
node --check docs/learn/reader.mjs
node --check docs/learn/visual-state.mjs
```

Browser verification should include direct step links, Back/Next, source reads,
accent-insensitive and empty search, quiz feedback and reload persistence,
autoplay/reduced motion, automatic loops and outcome hold, phase selection,
dialog pause/resume, actual actor identity across steps, before/after values
around message arrival, delayed verdicts, rapid step changes, animation cleanup, theme, reset
confirmation and keyboard use. Verify every reading page preserves its text and
fits at 1366×768, 1440×900 and 1920×1080 without document scrolling; also verify
readability and navigation on mobile. The .NET suites verify the backend, not
this static UI.
