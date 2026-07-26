# Product analytics events

Every event below is captured with PostHog. Client events go through
`instrumentation-client.ts` (proxied via `/ingest`); server events go through
`lib/posthog-server.ts` and are stitched to the client session by the
`X-POSTHOG-DISTINCT-ID` header the form sends with `/api/submit`.

## The funnel

| # | Event | Fires when | Where |
|---|-------|-----------|-------|
| 1 | `$pageview` | Any page load **or** App Router client-side navigation | `components/PostHogPageView.tsx` |
| 2 | `cta_clicked` | Hero "Write my speech" button (`location: 'hero'`) | `components/Hero.tsx` |
| 3 | `question_viewed` | User lands on a question. Fires for Q1 on page load, so it doubles as "saw the form" | `app/form/useFormState.ts` |
| 4 | `form_started` | First real interaction — typing an answer or skipping | `app/form/useFormState.ts` |
| 5 | `question_answered` | User advances past a question with a valid answer | `app/form/useFormState.ts` |
| 6 | `checkpoint_reached` | All 7 core questions done | `app/form/useFormState.ts` |
| 7 | `checkpoint_finish_now_selected` / `checkpoint_add_more_detail_selected` | The checkpoint choice | `app/form/useFormState.ts` |
| 8 | `form_submitted` | Submission fires | `app/form/useFormSubmission.ts` |
| 9 | `speech_generation_completed` / `speech_generation_failed` | Model returned / errored (server-side truth) | `app/api/submit/route.ts` |
| 10 | `speech_ready_viewed` | Speech is on screen | `app/form/useFormState.ts` |
| 11 | `speech_unlocked` | "Access Now" clicked | `components/fake_document/ResultContent.tsx` |
| 12 | `speech_copied` / `speech_pdf_downloaded` | Export actions | `components/fake_document/ResultContent.tsx` |

## Drop-off / friction events

| Event | Meaning |
|-------|---------|
| `form_abandoned` | Tab closed or navigated away mid-form. Carries the question they died on. Sent via `sendBeacon` |
| `question_skipped` | Skippable question passed over without an answer |
| `question_validation_failed` | "Next" pressed with an invalid/empty required answer — a wall, not a choice |
| `question_back` | Navigated backwards (re-reading a question they couldn't answer) |
| `form_submit_blocked` | Reached the end but validation rejected the submission |
| `speech_generation_client_failed` | Generation failed *as the user experienced it* — includes rate limits, network drops, and bad responses the server-side event never sees. `failure_reason` is `safety_block` / `model_overloaded` / `other` |

## Properties

Every question-level event (`question_viewed`, `question_answered`,
`question_skipped`, `question_validation_failed`, `question_back`,
`form_started`, `form_abandoned`) carries:

- `question_short_name` — e.g. `funnyStory`. **Break down by this, not by index** — it survives a reorder of `questions`.
- `question_index` (0-based) / `question_number` (1-based)
- `question_type`, `is_bonus_question`, `is_skippable`

Plus, where relevant: `time_on_question_ms`, `answer_length`,
`options_selected`, `questions_answered`, `questions_skipped`,
`skipped_questions`, `time_in_form_ms`, `included_bonus_questions`.

## Reading it in PostHog

**How many people came and started:** funnel of `$pageview` →
`question_viewed` → `form_started` → `form_submitted` → `speech_ready_viewed`
→ `speech_unlocked`.

**Which question they drop off at:** trend of `question_viewed`, unique users,
broken down by `question_short_name`. The step-down between bars is the
per-question drop-off. Note Q1 is inflated because the form sits on the
homepage — that's the "saw it but never engaged" population, which is the
number you want at the top.

**Why they drop off there:** for a suspect question, compare
`question_answered` vs `question_skipped` vs `question_validation_failed` on
the same `question_short_name`, and look at median `time_on_question_ms`. A
long time plus a skip means the question is hard; a validation failure means
it's unclear.

**Whether the bonus round costs conversions:** compare
`speech_ready_viewed` rates split by `included_bonus_questions`.
