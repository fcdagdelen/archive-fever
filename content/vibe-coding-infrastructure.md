---
title: "Vibe Coding Infrastructure: A Complete Guide for AI-Native Applications"
date: 2025-01-03
tags:
  - applied/ai-native-development
  - ai-systems/memory-systems
summary: |
  A comprehensive infrastructure guide for building AI-native applications with Claude Code and Cursor. Covers database selection (Supabase, Neo4j, Turso), deployment architecture (Vercel, Inngest), AI interface patterns (streaming, structured extraction), and workflow optimizations. Includes project-specific recommendations and a learning path for mastering database persistence while vibe coding.
---

Building AI-native applications with Claude Code and Cursor requires a carefully chosen stack that balances developer experience with production readiness. For a CPO mastering the craft of vibe coding, the key insight is that **fewer, better-integrated tools dramatically outperform a fragmented approach**. This guide provides concrete recommendations for your four projects—NFold, Psyche-Polis, LACE, and PCI—along with workflow optimizations and a learning path for pushing into database persistence.

The foundational stack that emerges from this research centers on **Supabase** as your primary database platform (providing PostgreSQL, auth, realtime, and vector search in one service), **Vercel** for deployment with its AI SDK, **Inngest** for background jobs, and **Neo4j** continuing where you've already invested for graph-heavy applications. This combination maximizes AI-friendliness while minimizing cognitive overhead.

---

## Your four projects need different database strategies

Each of your applications has distinct data requirements that map to specific technology choices. Understanding these patterns will accelerate your development and prevent architectural dead ends.

**NFold (Financial Cognition Partner)** requires the most comprehensive persistence layer. Since NFold harvests epistemic structures—theses, tensions, invalidation conditions—while managing conversation history and user sessions, it needs robust relational storage with versioning capabilities. The recommended stack is **Supabase + Clerk + pgvector**:

- **Clerk** for authentication provides beautiful drop-in components, SOC 2 Type II compliance (important for financial applications), and excellent Supabase integration for Row Level Security. At **$0 for 10,000 MAUs**, it's ideal for launch.
- **Supabase** provides PostgreSQL with automatic connection pooling (eliminating Vercel serverless connection issues), real-time subscriptions for live model updates, and pgvector for semantic search over conversation history.
- **Event sourcing pattern** for epistemic model versioning—store each thesis creation, evidence addition, and invalidation as an immutable event. This provides complete audit history and enables time-travel queries.

For NFold's schema, structure epistemic models with explicit invalidation tracking:

```sql
-- Core epistemic structure
CREATE TABLE theses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  confidence DECIMAL(3,2),
  status TEXT DEFAULT 'active', -- 'active' | 'invalidated' | 'superseded'
  invalidation_conditions JSONB,
  invalidated_at TIMESTAMPTZ,
  invalidation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tensions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thesis_1_id UUID REFERENCES theses(id),
  thesis_2_id UUID REFERENCES theses(id),
  description TEXT,
  resolution_status TEXT DEFAULT 'unresolved'
);

```

**Psyche-Polis (Procedural City Generation)** presents a fascinating hybrid challenge. The procedural generation algorithms benefit from local-first, zero-latency database access, while the spatial/temporal data needs efficient querying. Consider **Turso (SQLite edge) + React Three Fiber**:

- **Turso** excels for procedural generation—SQLite runs locally during development with identical behavior to production, supports R-tree indexes for spatial queries, and provides edge replication for multiplayer scenarios later.
- **React Three Fiber** with **@react-three/drei** helpers provides the 3D rendering foundation. For procedural city generation, use instanced meshes for performance (thousands of buildings in a single draw call).
- Temporal sedimentation can be modeled through versioned building records with `valid_from` and `valid_to` timestamps, enabling time-travel through city evolution.

If dérive-based navigation requires relationship traversal (roads connecting buildings, neighborhoods influencing each other), add **Neo4j** for the semantic layer while keeping Turso for geometry.

**LACE (Self-Organizing Knowledge Graph)** should continue using Neo4j—it's the right tool for knowledge graphs with complex traversals. Optimize by adding a **pgvector layer for semantic search**:

```
User Query → pgvector (semantic candidates, top 100) → Neo4j (graph traversal) → 3D Render

```

This hybrid pattern dramatically improves query performance: vector search finds semantically relevant starting points, then Neo4j handles relationship-aware navigation. For 3D visualization, **react-force-graph-3d** integrates well with Neo4j data and supports custom Three.js node rendering for your specific visual language.

Key Neo4j optimization tips for growing graphs:

- Index frequently queried properties with `CREATE INDEX`
- Use `MERGE` carefully—prefer `CREATE` for known new nodes
- Batch writes for bulk operations (100-500 nodes per transaction)
- Profile queries with `EXPLAIN` and `PROFILE` to find bottlenecks

**PCI (Psyche-Computer Interface)** also fits Neo4j well since reasoning traces are naturally graph-structured. Contradictions become conflicting edges between nodes, and temporal properties on relationships track model evolution. Add timestamps to all relationships:

```
(Claim)-[:SUPPORTS {timestamp: datetime(), confidence: 0.8}]->(Conclusion)
(Claim)-[:CONTRADICTS {timestamp: datetime(), resolution_status: 'pending'}]->(OtherClaim)

```

---

## Starting with Supabase: a practical learning path

Since you haven't used Supabase yet, here's a structured approach to building database intuition through hands-on practice. The goal is developing visceral understanding, not just following tutorials.

**Week 1: Foundation through exploration.** Start by creating a Supabase project and exploring the dashboard. The SQL Editor is your primary learning environment—run queries directly, see results immediately. Create a simple `conversations` table:

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role TEXT NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

```

Use the Table Editor to manually insert data and observe relationships. This builds intuition for how relational data works before adding abstraction layers.

**Week 2: Connect to Next.js with Prisma.** Prisma provides type-safe database access that works excellently with AI-assisted development. The schema-first approach generates TypeScript types automatically:

```bash
npm install prisma @prisma/client
npx prisma init

```

Configure `prisma/schema.prisma` with your Supabase connection (using the pooled connection string for Vercel compatibility). Run `npx prisma db pull` to generate schema from existing tables, or `npx prisma db push` to sync schema changes.

**Week 3: Add pgvector for semantic search.** Enable the vector extension in Supabase and add an embeddings column to messages. This is the foundation for semantic search over conversation history:

```sql
CREATE EXTENSION vector;
ALTER TABLE messages ADD COLUMN embedding vector(1536);
CREATE INDEX ON messages USING hnsw (embedding vector_cosine_ops);

```

Benchmarks show **pgvector outperforms Pinecone** for most use cases under 50M vectors, with better accuracy (0.99 vs 0.94) and lower cost since it's included in your existing database.

**Week 4: Real-time subscriptions.** Add Supabase Realtime to sync conversation updates across devices. The pattern is simple but powerful:

```tsx
const supabase = createClient(url, key);
supabase
  .channel('messages')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${chatId}` },
    (payload) => { /* Update UI with new message */ }
  )
  .subscribe();

```

---

## Claude Code and Cursor: optimized workflows for vibe coding

The most effective approach combines both tools strategically. **Claude Code excels at architecture, complex refactoring, and navigating large codebases**—it can handle 18,000+ line files and maintain context across many files. **Cursor excels at rapid implementation with visual feedback**, especially through Composer for multi-file edits.

**CLAUDE.md is your project's memory.** Keep it concise (under 150-200 instructions) and focused on project-specific context:

```markdown
# Project: NFold

## Commands
- npm run dev: Start development server
- npm run typecheck: Run TypeScript check
- npm test: Run tests

## Stack
- Next.js 14 App Router
- Supabase (PostgreSQL + Auth + Realtime)
- Vercel AI SDK for streaming
- Clerk for authentication
- Tailwind CSS + shadcn/ui

## Architecture
- /app - Next.js app router pages
- /components/ui - shadcn/ui components
- /lib/db - Prisma client and schemas
- /lib/ai - AI integration code

## Key Patterns
- Use 'use client' sparingly - prefer Server Components
- All database queries go through Prisma
- AI responses always stream via Vercel AI SDK
- Epistemic models use event sourcing pattern

```

Place this at `CLAUDE.md` in your repo root (shared with any collaborators) and use `CLAUDE.local.md` for personal preferences (gitignored).

**The explore-plan-code-commit workflow** prevents scope creep and produces better results:

1. Ask Claude to read relevant files WITHOUT writing code: "Look at the auth implementation and conversation storage to understand how they work together"
2. Request a plan with extended thinking: "think hard about how to add epistemic model versioning"
3. Have Claude create a Plan.md for complex features
4. Execute implementation step by step
5. Commit frequently with descriptive messages

**Cursor project rules** replace the deprecated `.cursorrules` file. Create `.cursor/rules/` with MDC files for context-aware assistance:

```markdown
---
description: API route patterns
globs: "app/api/**/*.ts"
alwaysApply: true
---

## API Route Guidelines
- Use Edge runtime for streaming responses
- Validate request body with Zod schemas
- Return consistent JSON: { success: boolean, data?: T, error?: string }
- Add rate limiting for public endpoints

```

**When to use each tool:**

| Task | Best Tool |
| --- | --- |
| Initial architecture planning | Claude Code ("ultrathink") |
| Multi-file refactoring | Claude Code |
| Rapid UI iteration | Cursor Composer |
| Debugging with error traces | Claude Code (paste full stack) |
| Quick single-file fixes | Cursor Cmd+K |
| Learning new codebase | Both in parallel |

---

## Building AI interfaces with streaming and generative UI

The **Vercel AI SDK v6** is the definitive toolkit for building AI-powered Next.js applications. It provides a unified API across providers including Claude, with built-in streaming support:

```tsx
// app/api/chat/route.ts
import { streamText, convertToModelMessages } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

```

For structured extraction (harvesting epistemic structures), use Claude's **strict mode with Zod schemas**:

```tsx
import { tool as createTool } from 'ai';
import { z } from 'zod';

export const extractThesisTool = createTool({
  description: 'Extract a thesis from the conversation',
  inputSchema: z.object({
    content: z.string().describe('The thesis statement'),
    confidence: z.number().min(0).max(1).describe('Confidence level'),
    invalidationConditions: z.array(z.string()).describe('Conditions that would invalidate this thesis'),
  }),
  strict: true, // Guarantees schema compliance
  execute: async (thesis) => {
    await saveThesis(thesis);
    return { success: true };
  },
});

```

For component libraries, **shadcn/ui** is ideal for vibe coding—it's open code you own (not a dependency), easy for AI to understand and modify, and has excellent AI-specific extensions like **shadcn-chatbot-kit** and **Vercel AI Elements**.

**State management** should use **Zustand** for most AI apps—simple API, minimal boilerplate, and selective subscriptions prevent unnecessary re-renders:

```tsx
import { create } from 'zustand';

interface ConversationStore {
  messages: Message[];
  isStreaming: boolean;
  addMessage: (msg: Message) => void;
}

const useConversationStore = create<ConversationStore>((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, msg]
  })),
}));

```

---

## Visualization choices mapped to your projects

**For NFold's financial data**, use **Tremor** (now part of Vercel)—it's built on Tailwind CSS with 35+ pre-built dashboard components that work perfectly with AI-assisted development:

```tsx
import { Card, Metric, Text, AreaChart } from '@tremor/react';

function ThesisConfidenceChart({ data }) {
  return (
    <Card>
      <Text>Thesis Confidence Over Time</Text>
      <Metric>{data[data.length - 1].confidence}</Metric>
      <AreaChart data={data} index="date" categories={["confidence"]} />
    </Card>
  );
}

```

**For LACE's 3D knowledge graph**, **react-force-graph-3d** provides the right abstraction:

```tsx
import ForceGraph3D from 'react-force-graph-3d';

function KnowledgeGraphView({ nodes, links }) {
  return (
    <ForceGraph3D
      graphData={{ nodes, links }}
      nodeAutoColorBy="cluster"
      nodeThreeObject={node => createCustomNode(node)}
      linkDirectionalParticles={2}
      d3AlphaDecay={0.02} // Slower settling for organic feel
    />
  );
}

```

**For Psyche-Polis's procedural city**, React Three Fiber with instanced rendering:

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Instances, Instance } from '@react-three/drei';

function ProceduralCity({ buildings }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <Instances limit={10000}>
        <boxGeometry />
        <meshStandardMaterial />
        {buildings.map(b => (
          <Instance key={b.id} position={b.position} scale={[b.width, b.height, b.depth]} color={b.color} />
        ))}
      </Instances>
    </Canvas>
  );
}

```

---

## Deployment architecture for AI workloads

**Vercel handles most AI workloads** with Fluid Compute extending serverless execution to ~13 minutes. For NFold's conversation streaming, Edge Functions provide global low-latency with 300s total streaming support. However, multi-step AI analysis pipelines need **Inngest**:

```tsx
// Inngest step function - each step retries independently
const analyzeConversation = inngest.createFunction(
  { id: "analyze-conversation" },
  { event: "conversation/completed" },
  async ({ event, step }) => {
    const extraction = await step.run('extract-theses', async () =>
      extractEpistemicStructure(event.data.messages)
    );

    const embedding = await step.run('generate-embedding', async () =>
      generateEmbedding(extraction)
    );

    await step.run('persist-model', async () =>
      saveEpistemicModel(event.data.userId, extraction, embedding)
    );
  }
);

```

**Cost projection for bootstrapped projects:**

| Phase | Users | Monthly Cost |
| --- | --- | --- |
| MVP | 0-100 | $70-220 (Vercel Pro $20 + Free tiers + AI ~$50-200) |
| Growth | 100-1,000 | $300-1,200 (Supabase Pro $25 + AI scaling) |
| Scale | 1,000+ | $1,400-6,500 (Infrastructure + AI volume) |

**Key cost optimizations:**

- **Prompt caching** (90% discount on repeated system prompts)
- **Model cascading**: Use Haiku/Claude 3.5 Sonnet for routing, escalate to Opus only for complex reasoning
- **Semantic caching**: Store and retrieve similar queries from Redis to avoid duplicate API calls

---

## Common pitfalls and how to avoid them

**The 70% problem** is real: vibe coding gets you to a working app quickly, but the final 30% becomes challenging without engineering intuition. Watch for these warning signs:

- Inconsistent patterns across files (AI generates different solutions for similar problems)
- Copy-pasted code solving the same problem in different ways
- "It works but I don't understand why"

**Prevention strategies:**

1. **Test ruthlessly after every change**—this is the #1 practice for non-technical builders. Use Vitest for unit tests and Playwright for end-to-end.
2. **Review every line before committing**—treat AI like a fast but inexperienced junior developer.
3. **Clear context between tasks** (`/clear` in Claude Code)—context rot causes degraded suggestions.
4. **Commit frequently**—small, reversible changes are your safety net.

**Simon Willison's golden rule**: "I won't commit any code to my repository if I couldn't explain exactly what it does to somebody else."

**Security blind spots** in AI-generated code:

- Always validate user input before LLM calls
- Never expose secrets through `NEXT_PUBLIC_` prefix
- Implement rate limiting on all AI endpoints
- Use Row Level Security in Supabase for multi-tenant data

---

## Project-specific stack recommendations

**NFold (Financial Cognition Partner)**

```
Auth: Clerk ($0 → $25/mo at scale)
Database: Supabase PostgreSQL + pgvector
ORM: Prisma (type-safe, AI-friendly)
Real-time: Supabase Realtime
Background Jobs: Inngest (epistemic analysis pipelines)
AI: Vercel AI SDK + Claude Sonnet 4
Visualization: Tremor (financial dashboards)
Versioning: Event sourcing with snapshot+delta

```

**Psyche-Polis (Procedural City)**

```
Database: Turso (SQLite edge) for geometry + spatial queries
Graph Layer: Neo4j (if semantic relationships needed)
3D: React Three Fiber + drei helpers
Rendering: Instanced meshes for performance
Temporal: Versioned records with validity ranges
State: Zustand for procedural parameters

```

**LACE (Knowledge Graph)**

```
Graph DB: Neo4j AuraDB (continue investment)
Semantic Layer: Supabase + pgvector (hybrid retrieval)
Visualization: react-force-graph-3d + custom Three.js nodes
Performance: APOC procedures for complex queries
Optimization: Index frequently traversed properties

```

**PCI (Reasoning Traces)**

```
Storage: Neo4j (traces are naturally graphs)
Temporal: Timestamped relationships
Contradictions: Explicit edge type with resolution_status
Multi-agent: Inngest for orchestration
Persistence: JSONB for trace metadata

```

---

## The learning path forward

Your next technical edges to push, in order of leverage:

1. **Week 1-2**: Set up Supabase for NFold. Create conversations and messages tables through the dashboard, connect with Prisma, implement basic CRUD. This builds foundational database intuition.
2. **Week 3-4**: Add Clerk authentication and Row Level Security. Users should only see their own data. This introduces security patterns early.
3. **Month 2**: Implement epistemic model persistence with event sourcing. This is the core innovation of NFold—the ability to track thesis evolution over time.
4. **Month 3**: Add pgvector for semantic search over conversations. This enables "find conversations where I discussed similar ideas" functionality.
5. **Ongoing**: Develop testing discipline. Start with Playwright for critical user flows, expand to Vitest for business logic.

The goal isn't to become a traditional engineer—it's to develop enough technical intuition to direct AI assistants effectively and recognize when something is wrong. Your 8 years of working with software provides excellent foundation for this pattern recognition.

**When to bring in technical help:**

- Security-critical features (payments, health data)
- Performance optimization requiring profiling
- Debugging loops that exceed 2 hours
- Architectural decisions with long-term lock-in

For everything else, the combination of Claude Code's reasoning depth and Cursor's rapid iteration creates a powerful development loop. The key insight is that **modern AI tools don't replace engineering judgment—they amplify it**. Your job is to develop that judgment through deliberate practice with real projects.

---

## Related

- [[dynamic-knowledge-graphs]] — Living knowledge bases for AI-native applications
- [[bidirectional-context]] — Context as shared interface philosophy
