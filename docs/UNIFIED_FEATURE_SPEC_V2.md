# NOVA AI 2.0 — Unified Multi-Model Product Specification

**Product promise:** one assistant workspace that brings together the strongest publicly documented user-facing workflows associated with ChatGPT, Google Gemini, and Claude, while clearly showing which provider, model, tool, and integration actually performed each task.

This is an independent product. Do not copy proprietary source code, private model behavior, branding, or claim official affiliation with OpenAI, Google, or Anthropic.

## Product principles
1. One unified interface; task modes are workflows, not separate disconnected chatbots.
2. Route by capability, quality, latency, privacy, user preference, and budget.
3. Never claim a capability is available unless its backend integration is configured and tested.
4. Never invent citations, live information, generated files, tool results, or completed actions.
5. Never silently switch to another provider or incur paid API usage.
6. Ask permission before consequential external actions, file changes, purchases, messages, or computer control.
7. Show provider/model attribution, tool activity, source provenance, timestamps, and cost/usage where possible.
8. User controls memory, connected services, data retention, and permissions.

## Unified feature catalogue

### A. Core assistant and conversation
- Multi-turn conversation with context management and long-context summarization.
- Streaming output, stop, continue, regenerate, edit-and-resubmit, copy, share, export, rename, archive, delete, search history.
- Markdown, tables, math, code blocks, syntax highlighting, citations, downloadable artifacts.
- Response styles: concise, detailed, step-by-step, teaching, professional, creative.
- Direct-answer-first behavior; clarify only when essential; state uncertainty.
- Model picker with provider, model, capability tags, context window and availability.
- Compare responses from multiple models; side-by-side critique and optional synthesis.
- Conversation branching and retry with another model.

### B. Smart model routing
- Provider adapters: OpenAI, Google Gemini, Anthropic Claude.
- Capability registry: text, reasoning, vision, audio input/output, image generation, tool calling, structured output, context limits.
- Routing policy considers task type, configured provider/model, capability match, latency, availability, user preference, budget ceiling, and data policy.
- Explicit routing explanation and actual provider/model attribution.
- User can pin a model, disable a provider, set maximum spend, or require free/local-only operation.
- No silent fallback. If chosen provider is unavailable or unconfigured, explain and ask before switching.
- Do not assume consumer subscriptions grant API access.

### C. Search, research and knowledge
- Web search with query planning, source retrieval, publication dates, snippets, URLs and provenance.
- Cite claims to retrieved sources; distinguish primary sources, secondary reporting, and opinion.
- Deep Research: plan questions, search multiple sources, open and extract relevant passages, compare evidence, detect conflicts, synthesize a report, cite each key claim.
- Research controls: scope, recency, allowed domains, excluded domains, citation style, source count, depth.
- Research progress log, cancel/resume, downloadable report.
- User-provided knowledge sources and project-specific files.
- Retrieval-augmented generation with document-level access controls.
- Search must fail honestly if no search provider is configured; never fabricate citations.

### D. Files, vision and multimodal
- Upload PDF, DOCX, PPTX, TXT, Markdown, CSV, XLSX, images and supported audio.
- Extract text/tables, summarize, compare, answer questions grounded in files, quote with page/section references where available.
- Image understanding: screenshots, diagrams, charts, photos, UI feedback, OCR and visual question answering.
- File size/type validation, malware scanning, isolated storage, per-user authorization, retention and deletion.
- Preserve originals; create derived outputs separately.
- Unsupported/corrupt files produce clear errors.

### E. Image, video and creative generation
- Image generation and image editing through a configured authorized provider.
- Prompt refinement, aspect ratio/size controls, multiple variants, revision history.
- Video generation only when an approved provider/API actually supports it for the account.
- Never label a text mockup as an actual generated image/video.
- Provide clear unavailable state when provider capability/API access is missing.

### F. Voice and audio
- Speech-to-text input, transcript preview/edit, voice conversation, text-to-speech output.
- Playback controls, mute, interrupt, voice selection, language selection.
- Audio upload transcription and summarization when supported.
- Clear mic permissions and recording indicators; no covert recording.
- Handle provider latency, disconnections, and unsupported languages honestly.

### G. Learning and tutoring
- Guided learning mode with skill/level adaptation.
- Step-by-step explanations, Socratic hints, quizzes, flashcards, practice sets, spaced review.
- Explain code/math/science with examples and checks for understanding.
- User-selected difficulty and learning objectives.
- Do not claim grades or credentials that were not earned.

### H. Artifacts and collaborative workspace
- Side-by-side editor for documents, code, plans, diagrams and data outputs.
- Create/edit artifacts with version history and diffs.
- Preview HTML/CSS/JS and safe interactive visualizations in sandboxed frames.
- Export supported files (Markdown, TXT, CSV, XLSX, PDF, DOCX, PPTX as implemented).
- Interactive charts, tables, flow diagrams and prototypes.
- Clearly separate preview content from production deployment.

### I. Data analyst
- CSV/XLSX upload, schema inspection, missing-value and type validation.
- Deterministic calculations using isolated worker processes.
- Descriptive statistics, filtering, grouping, joins, correlations and appropriate tests.
- Chart generation, pivot summaries, data cleaning and export.
- Show assumptions, formulas, row counts, warnings and reproducibility details.
- Never use model-generated numbers as a substitute for actual computation.

### J. Coding agent and website builder
- Code explanation, debugging, refactoring, tests, code review and documentation.
- Multi-file project generation with tree view, diff review, version snapshots and rollback.
- Run commands only inside isolated, resource-limited sandboxes with network disabled by default.
- Website builder: generate project, preview, iterate, test responsiveness, export ZIP.
- Never execute untrusted code on the main API server or expose host secrets.
- Require approval for file overwrite, deletion, deployment, or external publishing.

### K. Autonomous agent and parallel tasks
- Task decomposition, visible plan, bounded tool registry and progress events.
- Parallel independent subtasks with concurrency limits.
- Pause, cancel, resume, retry and human checkpoints.
- Tool permission scopes, approval gates, audit logs and execution timeouts.
- Idempotency and recovery for retried actions.
- No arbitrary shell, unrestricted browser, or computer control by default.
- Consequential actions require explicit approval immediately before execution.

### L. Projects, memory and personalization
- Projects with instructions, conversations, files and shared context.
- Optional user-controlled memory: inspect, edit, disable, export and delete.
- Do not silently save sensitive information or infer sensitive traits.
- Preferences: language, response length, tone, default model, theme, tool permissions and spending limits.
- Context isolation between projects and users.

### M. Connectors, skills and integrations
- Connector framework for user-authorized external services.
- MCP-compatible integration layer where implemented and security-reviewed.
- Skills as versioned, scoped instruction/tool packages.
- OAuth/token storage server-side; least privilege and revocation.
- Connector actions display requested permissions and require confirmation when consequential.
- Do not imply a connector exists before it is installed and configured.

### N. Live intelligence
- Pluggable APIs for weather, sports/cricket, news, currency, finance and other current data.
- Show source, timestamp, timezone, freshness and stale/unavailable state.
- Use official/licensed APIs where possible and respect provider terms.
- Never invent live scores, prices, schedules or forecasts.

### O. Scheduled tasks and notifications
- One-time and recurring tasks with explicit timezone and schedule preview.
- Conditional monitoring only with user-defined trigger, cadence and delivery channel.
- Pause, edit, disable and delete controls.
- Show last run, next run, failures and audit history.
- Require confirmation before external side effects.

### P. Identity, privacy, security and operations
- Authentication, session management, per-user authorization and project isolation.
- PostgreSQL migrations, backups, retention policies and deletion workflows.
- Server-side secrets, encryption in transit/at rest, secure uploads, rate limits and abuse protection.
- Validate inputs; defend against prompt injection, SSRF, XSS, CSRF and SQL injection.
- Observability: structured logs, traces, errors, latency, provider usage and spend.
- Budget quotas and hard limits; no surprise API spending.
- Accessibility, keyboard navigation, responsive layouts and localization.

## UI direction: unified blend
Do not reproduce any competitor's exact screen. Use a coherent original NOVA design:
- ChatGPT-inspired clarity: clean conversation canvas, composer tools, history and model controls.
- Claude-inspired focus: spacious typography, artifact side panel, visible plans and approval checkpoints.
- Gemini-inspired multimodal workspace: prominent file/image/voice entry, creative tools and contextual side panels.
- Left navigation: New chat, Search, Projects, Research, Library, Data Analyst, Coding, Agents, Tasks, Skills, Settings.
- Main chat: message stream, source cards, tool activity, artifact preview, model attribution.
- Composer: attach, image, voice, web search, research, model selector, send/stop.
- Right contextual panel: sources, files, artifact, plan, data chart, or task details.
- Mobile: collapsible navigation and panels; all core actions remain reachable.
- Theme: dark-first with light theme; accessible contrast and keyboard focus.

## Capability states (mandatory)
Every feature must be labelled one of:
- `available`: implemented, configured, and integration-tested.
- `needs_setup`: implemented but missing credentials/permissions.
- `beta`: implemented with known limitations.
- `planned`: not implemented.
- `unavailable`: unsupported by current provider/account/environment.

Never show a planned feature as operational. The frontend must render feature state from backend capability metadata, not hardcoded marketing labels.

## Acceptance gates
A feature is complete only when:
1. Backend implementation exists.
2. Required credentials/configuration are validated.
3. Permission and failure states exist.
4. Automated tests cover success and failure.
5. UI reflects true capability state.
6. Documentation explains setup, cost, privacy and limitations.
7. End-to-end test passes against a real integration where feasible.

## Delivery order
1. Foundation, auth, migrations, chat history and streaming.
2. Provider adapters, capability registry, model catalog and budget guardrails.
3. File uploads, vision and document-grounded answers.
4. Web search, citations and deep research.
5. Projects, artifact editor and exports.
6. Data analyst with isolated computation.
7. Voice and audio.
8. Learning mode and custom assistants/skills.
9. Coding agent and sandboxed website builder.
10. Agent orchestration, parallel tasks, approvals and audit trail.
11. Memory, connectors, scheduled tasks and live data.
12. Security, accessibility, observability and production deployment.

## Public feature references reviewed
- OpenAI ChatGPT capabilities: https://help.openai.com/en/articles/9260256-chatgpt-capabilities-overview
- OpenAI ChatGPT release notes: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- Google Gemini quick-start guide: https://services.google.com/fh/files/misc/quick_start_guide_to_google_ai.pdf
- Anthropic Claude product overview: https://claude.com/product/overview

Feature availability changes frequently and varies by plan, region, product surface and API access. Treat these as inspiration for capability categories, not guarantees of API parity.
