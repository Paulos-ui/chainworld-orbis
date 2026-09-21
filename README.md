# ChainWorld

**The chain becomes place.** ChainWorld is a live Web3 world that translates on-chain activity into a continuous generated environment using Visko Orbis Stable.

Built for the **Visko Orbis Online Challenge — September 2026**.

## Vision

Blockchains are typically experienced through hashes, tables, charts and explorers. ChainWorld asks a different question: what if on-chain activity had spatial consequence? A transfer becomes a moving resource, a mint creates an artifact, governance reshapes shared infrastructure, and contract execution changes architecture—all inside one continuous world.

The important distinction is continuity. ChainWorld does not request a new disconnected clip for every event. It keeps an Orbis generation alive and **steers the existing world** as state changes arrive.

## Architecture

```text
Wallet / chain event
       ↓
ChainWorld event interpreter
       ↓
Continuity-aware world-state prompt
       ↓
Visko Orbis Stable via Reactor
       ↓
Continuous live generated world
```

The current challenge build includes an EIP-1193 wallet connection, a world-event engine, four event instruments for a deterministic judge demo, an event ledger, and the original Orbis session lifecycle / cleanup logic from the official starter.

## Event language

- **Wallet** → an ivory gateway opens and binds a participant to the world.
- **Transfer** → amber matter moves between districts.
- **Mint** → a new sculptural artifact assembles in place.
- **Governance** → shared infrastructure physically reconfigures.
- **Contract** → a precise mechanical transformation moves through a district.

The visual system deliberately avoids generic neon/cyberpunk Web3 imagery. ChainWorld uses mineral architecture, warm ledger light, water, ceramic surfaces and cartographic notation so the product has a distinct visual identity.

## Run locally

Requirements: Node.js 20+, npm, and a Reactor API key with access to Orbis Stable.

```bash
npm install
cp .env.example .env.local
```

Set:

```env
REACTOR_API_KEY=your_key_here
```

`GEMINI_API_KEY` is optional and only required by the starter's Nano Banana endpoints.

Then:

```bash
npm run dev
```

Open http://localhost:3000.

## Judge demo flow

1. Scroll through the opening narrative to the live console.
2. Connect an injected wallet such as MetaMask.
3. Click **Connect Orbis**.
4. Click **Initialize world** to generate ChainWorld's genesis state.
5. Trigger Transfer, Mint, Governance, and Contract events.
6. Keep **Auto-Steer** enabled: each event updates the running Orbis prompt and visibly evolves the same world.
7. Continue scrolling to the integrated About / system documentation.

## Motion concept

The site treats scroll like moving through a physical ledger. The hero is a layered mineral data-landscape; the About section pins in place while scroll progress rotates an orbital state-map and advances through the project's three conceptual chapters. Motion is tied to system state and narrative progression rather than decorative entrance animations. Reduced-motion preferences are respected.

## Security

`REACTOR_API_KEY` is server-side only and `.env.local` is ignored by Git. The browser requests a session-scoped JWT from `/api/token`; the API key is never sent to the client. The starter's session cleanup routes are preserved.

## Stack

- Next.js 16 / App Router
- React 19 + TypeScript
- Reactor JavaScript SDK + Visko Orbis Stable
- EIP-1193 wallet integration
- Custom CSS motion / scroll-state system

## Repository

Built by [paulos-ui](https://github.com/paulos-ui) from Visko's official Orbis Online Hackathon starter.
