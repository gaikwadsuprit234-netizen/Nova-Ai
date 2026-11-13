# NOVA AI 2.0 roadmap

Use `UNIFIED_FEATURE_SPEC_V2.md` as the feature source of truth.

## Current starter implementation
- React + TypeScript + Vite chat UI
- FastAPI backend
- Official API adapters for OpenAI, Gemini, Anthropic
- Explicit provider selection; no silent provider fallback
- Local conversation persistence
- `/api/capabilities` feature-state registry
- `/api/providers` configuration status
- Basic backend tests

## Implementation sequence
1. Authentication, user isolation, PostgreSQL migrations, conversation search and streaming.
2. Provider capability discovery, model catalog, comparison, usage accounting and hard budget limits.
3. Secure file upload, document extraction, vision and file-grounded citations.
4. Web search, source retrieval, citation verification and deep research workflow.
5. Projects, artifacts editor, previews and export pipeline.
6. Isolated deterministic data analyst.
7. Voice, audio transcription and text-to-speech.
8. Guided learning, custom assistants and scoped skills.
9. Coding agent and sandboxed website builder.
10. Agent orchestration, parallel subtasks, permissions and audit trail.
11. User-controlled memory, connectors/MCP, live data and scheduled tasks.
12. Security review, accessibility, observability, load tests and deployment.

Do not skip acceptance gates. Update capability status only after the feature is implemented and tested.
