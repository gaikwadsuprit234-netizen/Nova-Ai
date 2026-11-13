# NOVA AI 2.0 — Build Instruction for VS Code AI Agent

Read `README.md`, `AGENTS.md`, and `docs/UNIFIED_FEATURE_SPEC_V2.md` first.

The goal is to evolve this starter into NOVA AI: one original unified AI workspace with capabilities inspired by the public user-facing workflows of ChatGPT, Gemini, and Claude. Do not clone proprietary code, use competitor logos, or claim affiliation.

## Non-negotiable rules
- Inspect the repository and run existing tests before editing.
- Preserve current working behavior.
- Implement one milestone at a time; do not generate a giant untested code dump.
- The capability registry is the source of truth. Never display a planned capability as working.
- Do not fabricate search results, citations, live data, files, model support, or task completion.
- Keep all provider keys server-side.
- Never silently switch models/providers or make paid API calls outside the user's budget/consent.
- Require explicit approval for consequential actions.
- Never execute uploaded/generated code on the main API server.
- Add tests for every new backend feature and meaningful frontend flow.

## Required unified experience
Build an original NOVA interface with:
- Left navigation: Chat, Search, Projects, Research, Library, Data Analyst, Coding, Agents, Tasks, Skills, Settings.
- Central conversation with streaming, stop, regenerate, edit, copy, export and provider/model attribution.
- Composer controls for attachments, voice, web search, deep research, model selection and send.
- Context panel for sources, files, plans, artifacts and charts.
- Responsive mobile navigation and accessible keyboard interactions.
- A capability center that reads `/api/capabilities` and visibly distinguishes available, needs_setup, beta, planned, unavailable.
- A provider/model center that reads actual configured provider state.

## Implementation order
Follow the 12 delivery phases in `docs/UNIFIED_FEATURE_SPEC_V2.md` and `docs/ROADMAP.md`. At the end of each phase:
1. List files changed.
2. Explain behavior implemented.
3. Report tests run and exact results.
4. List features still planned or blocked.
5. State required credentials and expected cost.
6. Do not start the next phase until asked or explicitly authorized.

Start now with a repository audit and report which current tests/build checks pass. Then propose the smallest next implementation milestone. Do not claim the full product is finished.
