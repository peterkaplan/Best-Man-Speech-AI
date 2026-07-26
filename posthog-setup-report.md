> Original output of the PostHog setup wizard, kept for the dashboard links
> below. The event list here is only the first 10 events — see
> [analytics-events.md](./analytics-events.md) for the current, complete set.

<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into Best Man Speech AI. The app previously had an outdated PostHog initialization via a `PostHogProvider` component using an incorrect environment variable name. This has been replaced with the recommended `instrumentation-client.ts` approach for Next.js 15.3+. A reverse proxy has been configured in `next.config.mjs` so analytics events are not blocked by ad blockers. Server-side tracking via `posthog-node` has been added to the speech generation API route to capture generation success and failure events correlated with client sessions. Ten events now track the full user journey from landing page CTA through speech generation, unlock, and export.

| Event | Description | File |
|-------|-------------|------|
| `cta_clicked` | User clicks the 'Write my speech' hero CTA button. | `components/Hero.tsx` |
| `checkpoint_reached` | User completes all core questions and reaches the mid-form checkpoint. | `app/form/useFormState.ts` |
| `checkpoint_finish_now_selected` | User chooses to generate the speech immediately at the checkpoint. | `app/form/useFormState.ts` |
| `checkpoint_add_more_detail_selected` | User opts in to the bonus questions for a more personalized speech. | `app/form/useFormState.ts` |
| `form_submitted` | User submits the completed form to request speech generation. | `app/form/useFormSubmission.ts` |
| `speech_generation_completed` | AI successfully generates the speech on the server. | `app/api/submit/route.ts` |
| `speech_generation_failed` | AI fails to generate the speech due to an error. | `app/api/submit/route.ts` |
| `speech_unlocked` | User clicks 'Access Now' to reveal the full speech text. | `components/fake_document/ResultContent.tsx` |
| `speech_copied` | User copies the generated speech text to the clipboard. | `components/fake_document/ResultContent.tsx` |
| `speech_pdf_downloaded` | User downloads the generated speech as a PDF. | `components/fake_document/ResultContent.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/88416/dashboard/1907692)
- [Speech generation funnel (wizard)](https://us.posthog.com/project/88416/insights/QNvaEKIy)
- [Speech unlock & export actions (wizard)](https://us.posthog.com/project/88416/insights/zgNqFcC8)
- [Checkpoint choices (wizard)](https://us.posthog.com/project/88416/insights/hWKUHrUR)
- [CTA clicks over time (wizard)](https://us.posthog.com/project/88416/insights/UpX5T7ST)
- [Speech generation success vs failure (wizard)](https://us.posthog.com/project/88416/insights/Fh32d3Rg)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
