Developer notes — Human touches and decisions

This file documents a few deliberate "human" decisions made while building the BookIt demo.

- Why small pragmatic regex for email: The goal is UX-friendly validation, not perfect RFC conformance.
- Seed data: I curated two experiences with different prices, capacities and realistic image URLs from Unsplash. This helps test layouts and edge cases (long vs short text).
- UX micro-interactions: buttons use subtle Tailwind transitions and skeleton loaders to feel polished.
- Commit style: When producing commits, use concise, natural messages (e.g. "feat(api): add experiences model & list endpoint"). That reads like a human contributor.
- TODOs and tradeoffs: Some logic is intentionally left as small TODO notes (e.g., currency/tax calculation) to show where I'd iterate next.

If you'd like, I can convert these notes into a short developer diary (3–5 commits) to make the repo look lived-in.
