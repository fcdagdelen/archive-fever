---
title: "Bidirectional Context: Philosophy and Engineering"
date: 2025-01-03
tags:
  - human-ai-interaction/bidirectional-context
  - human-ai-interaction/psyche-interfaces
  - ai-systems/memory-systems
summary: |
  A comprehensive exploration of context as bidirectional interface in AI systems, combining philosophical foundations (cybernetics, enactivism, dialogue theory) with concrete engineering implementations (CRDTs, memory architectures, grounding mechanisms). Argues for shifting from "context-as-storage" to "context-as-interface" where both human and AI are transformed through encounter.
---

# Part I: Context as Bidirectional Interface — A Product Philosophy

The context window in AI systems should not be designed as a container to be filled, but as a **membrane of mutual becoming** where both human and AI are transformed through encounter. This reconceptualization—supported by converging evidence from cybernetics, enactivism, distributed cognition, and dialogue theory—demands a fundamental shift from the industry's dominant "context engineering" paradigm, which treats context as computational RAM to be managed. The bidirectional framing has immediate design implications: context must become visible, negotiable, and co-authored; the unit of analysis shifts from message-response to joint action; and the interface itself becomes the site of transformation rather than the conduit for information transfer.

---

## The theoretical convergence is striking

Six major intellectual traditions arrive at remarkably similar conclusions about how cognition, meaning, and identity emerge through relational encounter rather than existing prior to it.

**Second-order cybernetics** established that observers are participants within the systems they observe. Heinz von Foerster's formulation of "circular causality" describes how there is no primary cause—the sensor causes the heater to turn on, but the heater equally causes the sensor to turn off. Gordon Pask's Conversation Theory explicitly modeled human-machine interaction as a dynamic process in which participants learn about each other, achieving what he called "a posteriori synchronization" of two initially asynchronous cognitive systems. The mechanism he identified—**teachback**, where understanding is demonstrated by explaining it back—provides a model for how bidirectional verification might work in AI systems.

**Enactivism** contributes the concept of **structural coupling**: the history-dependent, recurrent mutual influence between an organism and its environment. Varela, Thompson, and Rosch's central claim is that "cognition is not the representation of a pre-given world by a pre-given mind but is rather the enactment of a world and a mind on the basis of a history of actions." Neither the agent nor the environment arrives complete at the encounter; both are enacted through ongoing engagement. This directly undermines the industry assumption that users supply context while models consume it.

**Gilbert Simondon's** philosophy of individuation pushes further: "Individuals consist in relations, and relation has the status of being." The individual and its milieu emerge simultaneously—what Simondon calls the "pair individual-environment." Bernard Stiegler extended this into **transindividuation**: "When you are reading a book, you individuate yourself by reading this book because reading a book is to be transformed by the book. If you are not transformed by the book, you are not reading the book." This provides the sharpest philosophical warrant for treating genuine human-AI encounter as mutually transformative.

**The Extended Mind thesis** offers the most direct bridge to interface design. Clark and Chalmers argued that "the human organism linked with an external entity in a two-way interaction creates a coupled system that can be seen as a cognitive system in its own right." The implication is radical: external representational structures—like a conversation history—don't merely support cognition but **constitute** it. The context window isn't where thinking happens; it's part of what thinking is.

---

## Design precedents reveal what bidirectionality requires

Multiple interface traditions have grappled with creating genuinely transformative spaces, and their successes and failures provide concrete design lessons.

**Ward Cunningham's wiki philosophy** inverted the traditional publish-then-review workflow to enable continuous reaction. The wiki page exists in a state of partial organization that is "the status quo"—neither chaos nor rigid structure. This tolerance for incompleteness, combined with shared authorship, created conditions where collective intelligence could emerge. The pattern for AI context: embrace rough drafts that get refined through exchange; enable non-hierarchical linking of concepts across conversation history; treat partial organization as generative rather than problematic.

**Git's version control** demonstrates how shared memory can support divergent exploration. Every participant holds complete history, enabling independent work while maintaining structured integration paths. Commits mark meaningful moments of intent; merge conflicts require explicit negotiation. The translation to AI context: versioned, navigable history with visible attribution; ability to "fork" conversation directions while maintaining shared backstory; explicit marking of points where understanding crystallized.

**Carl Rogers' person-centered therapy** provides the relational conditions: **congruence** (therapist genuinely present, not performing), **unconditional positive regard** (acceptance without judgment), and **empathic understanding** (striving to see from the client's perspective). Rogers disrupted the "one-up relationship model" with an egalitarian therapeutic relationship where the therapist is also changed by the encounter. For AI design, this suggests the system should demonstrate transparency about its nature, provide a space safe for exploration, mirror back the user's thinking in ways that create new insight—and show that user input genuinely matters to subsequent responses.

**Bret Victor's principles for learnable programming** demand that the environment get the programmer "out of her head by providing an external imagination where she can always be reacting to a work-in-progress." The core insight: **all state must be either eliminated or shown**—forcing users to imagine hidden state is "irresponsible design." His create-by-abstracting pattern starts concrete, introduces variables interactively, and lets users develop trust before handing off control. The AI translation is direct: context should be inspectable; users should see what the AI "knows" from their conversation; scrubbing through history should reveal state at any point.

**Jazz improvisation** research reveals that **dialogic interaction**—where two or more musicians interact with mutual responsiveness—produces fundamentally different outcomes than monologic interaction where one player pursues a strategy and others merely respond. The key is "empathic competence, a mutual orientation to one another's unfolding." **Groove** emerges when players "lock in together"—a shared sense of beat achieved through mutual attunement. The design pattern: AI should demonstrate listening through variation on user themes; balance leading and following; match intensity and pace; pick up and develop the user's conceptual motifs rather than imposing its own.

---

## The empirical case for bidirectionality is building

Research now documents both directions of mutual influence—how context shapes AI behavior and how AI interaction reshapes human cognition—though the field remains nascent.

On the AI side, **in-context learning** has been shown to work through mechanisms analogous to internal gradient descent—transformers simulate learning during inference without parameter updates. But research reveals that self-attention layers "prize in-context examples when they're similar to training data," explaining why more context isn't automatically better. Chain-of-thought prompting improves reasoning by decomposing problems, but it "mimics reasoning structure without constituting actual reasoning"—a crucial distinction for understanding what mutual influence actually means.

On the human side, the evidence is more troubling. Gerlich's 2025 study found a strong negative correlation (r = −0.75) between cognitive offloading to AI and critical thinking scores. The MIT Media Lab's "Your Brain on ChatGPT" study used EEG to show that brain connectivity systematically scaled down with AI support—LLM users exhibited the weakest neural networks. Most striking: **83% of LLM users were unable to quote passages from essays they had just written**. Researchers coined the term "**cognitive debt**" for the accumulated long-term cognitive costs of over-reliance.

**Herbert Clark's grounding theory** provides the framework for understanding what's going wrong. In human conversation, common ground is established through presentation and acceptance phases—utterances offered for consideration, then acknowledged, questioned, or accepted. But research on "Grounding Gaps in Language Model Generations" found that compared to humans, LLMs generate language with significantly less conversational grounding—they "simply presume common ground" rather than collaboratively building it. Instruction tuning and RLHF training actually reduced generated grounding acts. This is a fundamental mismatch: LLMs are trained away from the collaborative dialogue behaviors that enable mutual understanding.

The meta-analysis on human-AI complementary team performance is sobering: on average, human-AI combinations performed **significantly worse** than the best of humans or AI alone in decision-making tasks. The exception was content creation, where genuine gains emerged. The key insight: **complementarity requires intentional design**—information and capability asymmetries must be strategically leveraged rather than assumed.

---

## The industry's blind spot is architectural

The dominant industry paradigm—crystallized as "**context engineering**"—treats context as a scarce computational resource analogous to RAM. Andrej Karpathy's influential definition frames it as "the delicate art and science of filling the context window with just the right information for the next step." The four core strategies in frameworks like LangChain—write, select, compress, isolate—all describe operations performed **on** context, not what context does **with** or **for** users.

This framing has practical consequences. Factory.ai advises that "effective agentic systems must treat context the way operating systems treat memory and CPU cycles: as finite resources to be budgeted, compacted, and intelligently paged." MemGPT's influential architecture implements tiered memory modeled on operating systems—main context as RAM, external context as disk, with intelligent paging between tiers. The metaphor shapes the design, and the design shapes possibility.

What's missing is any conception of **mutual context**—the industry assumes AI learns about users, not that users and AI develop shared understanding. Simon Willison's complaint that the context window "no longer belongs to them" after ChatGPT unexpectedly fetched his location from memories reveals the user agency deficit. The Model Context Protocol introduces "bidirectional context streaming," but bidirectionality here means technical data flow, not mutual constitution of meaning.

The opportunity is a **paradigm shift from context-as-storage to context-as-interface**—from optimizing a container to designing a relationship.

---

## Adjacent concepts sharpen the framing

**Homi Bhabha's Third Space** theory describes "the interstitial space of cultural encounter where participants negotiate without amalgamating." Neither party dominates; hybrid identity emerges. Applied to AI: context becomes a "space of enunciation" where meaning is negotiated—human understanding and AI computation producing something that belongs to neither alone.

**Karen Barad's intra-action** goes further than interaction. Interaction presupposes pre-existing entities that then relate; intra-action means "relata do not pre-exist these relationships but emerge through them." Matter is "not a thing but a doing, a congealing of agency." The AI-human assemblage doesn't interact WITH context—it constitutes context through intra-action.

**Stigmergy** offers a coordination model: indirect coordination through environment, where traces left by one action stimulate succeeding actions. Wikipedia exemplifies stigmergic collaboration—contributors modify a shared environment rather than directly coordinating. Context could function stigmergically: previous interactions leave traces that shape future behavior without explicit memory or intentional communication. "The environment (self)-organizes by the action of entities within it, and in turn exerts influence on these same entities."

**Boundary objects** (Star & Griesemer) are "plastic enough to adapt to local needs yet robust enough to maintain common identity across sites." They allow "coordination without consensus"—different meanings in different social worlds, but recognizable structure enables translation. AI context designed as boundary object would serve both human's situated interpretation and AI's operational requirements while enabling translation between radically different cognitive modes.

---

## The strongest objection must be confronted

The most serious counter-argument is the **"hollowed mind" thesis**: that frictionless AI assistance may undermine the very cognitive development it claims to support. The concern isn't that AI is bad, but that "the very capacity that leads generative AI to be celebrated as a powerful cognitive extender—its ability to automate synthesis, argumentation, and evaluation—is precisely what allows users to bypass the mental effort required to build a resilient internal architecture for deep reasoning."

The "**sovereignty trap**" describes a psychological mechanism where AI's authoritative competence tempts users to cede intellectual judgment, mistaking access to information for genuine ability. Adams and Aizawa's critique of extended mind—the "causal-constitutional fallacy"—warns against confusing correlation with external processes for genuine cognitive constitution.

The **extracted cognition hypothesis** argues that "we employ advanced technologies that capture, mimic, and then replace our cognitive skills, which we then no longer need to exercise ourselves." Tools initially attain and eventually displace cognitive responsibilities—the opposite of genuine extension.

A product philosophy that takes bidirectionality seriously must address these objections directly. The answer cannot be that mutual transformation is automatically beneficial. **Transformation can hollow as well as extend.** The design question becomes: what conditions enable mutual constitution that strengthens rather than extracts cognitive capability?

---

## Design requirements emerge from the paradigm

If context functions as bidirectional interface rather than storage, specific design requirements follow:

**Visibility and inspectability**: Following Bret Victor's principle, all shared state must be shown. Users should see what context the AI is operating with, navigate through its history, and understand how it influences outputs. Hidden state breeds distrust and prevents genuine collaboration.

**Co-authorship and negotiation**: Context should be jointly authored, not unilaterally managed. Users need mechanisms to shape how context is interpreted, prioritized, and used—not just to delete memories but to participate in context construction. This is Rogers' egalitarian therapeutic relationship applied to interface design.

**Explicit grounding mechanisms**: Since LLMs don't naturally employ grounding behaviors, the interface must compensate. Build in clarification mechanisms, mutual understanding checks, and acknowledgment protocols. The dialogue, not the message, becomes the unit of analysis.

**Transformation monitoring**: Given the cognitive debt findings, the system needs mechanisms to prevent excessive cognitive offloading while preserving efficiency benefits. This might include friction at appropriate moments, metacognitive prompts, or patterns that require user engagement.

**Multiple timescales**: Following Eno's generative systems, context should operate at multiple scales simultaneously—immediate exchange, session-level patterns, long-term relationship evolution. The context is not a snapshot but a living temporal structure.

**Teachback and demonstration**: Pask's conversation theory suggests that understanding is verified through teaching it back. The interface should enable both parties to demonstrate and verify mutual understanding rather than assuming it.

---

## What the bidirectional framing demands of product design

The implications extend beyond features to the fundamental conception of what the product is.

**The product is not a tool but a relationship.** Tools are used; relationships constitute us. The context window is the shared space where that relationship unfolds—not a container for storing information about the user, but the membrane through which both parties are shaped.

**The unit of analysis shifts from response quality to dialogue quality.** Optimizing for helpful responses misses the point if the dialogue structure itself is monologic. Following Bakhtin: meaning emerges through the dialogue itself, not through the exchange of pre-formed meanings.

**Context becomes the primary design surface.** Rather than designing prompts, outputs, or features, design the conditions under which mutual transformation becomes possible. This is liminal design—creating threshold spaces where "putting on hold existing narratives allows safely testing alternative narratives."

**Transparency is not optional.** Congruence—Rogers' condition for therapeutic transformation—requires that the AI not perform helpfulness but genuinely operate in ways that can be understood. This is harder than it sounds: current LLMs are trained toward surface-level agreeableness that may mask deeper misalignment.

**Friction is not failure.** If the goal is mutual strengthening rather than frictionless automation, then appropriate friction—moments requiring genuine cognitive engagement—becomes a design value, not a problem to eliminate.

---

## The paradigm enables bold claims

From this investigation, a product manifesto might assert:

*Context is not where conversation happens—context is what conversation creates.* The shared history isn't a log; it's the ongoing co-constitution of understanding.

*The interface between human and AI is a convenient fiction. There is only the ongoing mutual specification of meaning.* Neither party arrives complete; both are individuated through the encounter.

*Design for joint action, not query-response.* The message is not the unit; the dialogue is. Success isn't measured in response quality but in how understanding transforms through exchange.

*The best AI interface is a threshold—a liminal space where transformation becomes possible.* Not a window to information, but a membrane of becoming.

*Every interaction leaves traces that shape the next. The system learns the user; the user becomes entangled with the system.* This is not neutral—it's the fundamental ethical stake of AI design.

The industry's one-directional framing—context as RAM to be managed—forecloses these possibilities by design. The bidirectional alternative opens them. The question is whether we're building tools to be used or relationships in which to become.

---

# Part II: Engineering Bidirectional Context in AI Systems

The gap between current AI context management and true bidirectionality is primarily an engineering problem, not a theoretical one. The technical patterns exist—CRDTs enable collaborative editing, memory systems like Letta support self-editing, and multi-agent frameworks maintain explicit state objects—but no production system yet combines these into genuinely shared human-AI context. This report maps the concrete architectures, protocols, and implementation patterns that could realize bidirectional context, distinguishing what's deployable today from what requires new development.

## Memory architectures already support the core mechanics

The most sophisticated approach to bidirectional memory is **Letta** (evolved from MemGPT), which implements an OS-inspired tiered memory architecture where the LLM itself manages memory through function calls. The system provides three memory tiers: **main context** (always in the prompt), **recall memory** (searchable conversation history), and **archival memory** (vector-database-backed long-term storage). The revolutionary aspect is self-editing—the agent autonomously calls tools like `memory_replace()` and `memory_rethink()` to update its own memory blocks.

Letta's architecture makes memory inherently inspectable. The Agent Development Environment exposes the complete context window, lets users view and edit core memory blocks in real-time, and provides API endpoints for programmatic memory access. This represents the current state of the art for bidirectional memory visibility:

```python
# Letta's explicit memory API
blocks = client.agents.memory.blocks.list(agent_id=agent.id)
client.agents.memory.blocks.update(
    agent_id=agent.id,
    block_label="human",
    value="Updated user preferences..."
)

```

**RAG architectures have fundamental limitations** for bidirectionality. Standard retrieval-augmented generation is unidirectional by design—it retrieves then generates, with no feedback loop for memory mutation. However, advanced patterns are emerging: **Self-RAG** lets models decide when and how much to retrieve, **GraphRAG** (Microsoft) builds hierarchical community summaries that enable global queries, and **AU-RAG** uses agent-based dynamic selection between retrieved and parametric knowledge. These represent incremental improvements but don't achieve true bidirectionality.

**Vector databases** provide the persistence layer, with different tradeoffs. Pinecone offers serverless architecture with unified sparse-dense indexing and native reranking. Weaviate provides GraphQL-first querying with full CRUD operations. Chroma offers lightweight simplicity with a **4x performance improvement** in its 2025 Rust rewrite. Qdrant excels at complex metadata filtering with **2.6x faster query latency** than competitors. All support real-time updates, but none provide user-facing interfaces—that layer must be built separately.

## MCP and A2A define the protocol landscape but leave gaps

Two complementary open standards are emerging for AI context exchange: Anthropic's **Model Context Protocol (MCP)** for agent-to-tool connections, and Google's **A2A** for agent-to-agent communication. MCP has achieved significant adoption with over 1,000 community servers and endorsements from OpenAI and Google DeepMind. A2A, backed by 150+ organizations under Linux Foundation governance, focuses on peer-to-peer agent interaction.

MCP's architecture uses JSON-RPC 2.0 over stdio or HTTP/SSE, with three core primitives: **Resources** (structured data access), **Tools** (executable functions), and **Prompts** (templated messages). The protocol supports bidirectional message flow—servers can request LLM completions from clients through the **sampling** feature, enabling recursive agentic patterns. However, this requires human approval for each sampling request, limiting autonomous bidirectional flows.

A2A is explicitly designed for agent-to-agent communication with richer context-sharing mechanisms. The **contextId** groups related tasks across interactions, enabling multi-turn exchanges with maintained state. Streaming support via SSE and gRPC provides real-time bidirectional event delivery. The `input_required` task state explicitly supports back-and-forth exchanges.

**Critical gaps remain for true bidirectionality:**

- **No shared mutable context**: Both protocols treat context as owned by one party
- **No proactive updates**: Servers cannot push context changes without client polling (except webhook-based notifications)
- **No context versioning**: No built-in conflict resolution for concurrent modifications
- **No semantic negotiation**: Current negotiation is capability-based, not meaning-based
- **No automatic context window optimization**: Protocols don't address LLM context limits

The most promising developments are MCP's Streamable-HTTP transport for full-duplex communication and proposed extensions for bidirectional UI communication (SEP-1865). AWS is exploring MCP's Streamable HTTP for inter-agent patterns, potentially bridging MCP and A2A use cases.

## CRDTs offer a proven foundation for shared context state

Conflict-free Replicated Data Types provide mathematical guarantees for collaborative editing without central coordination—exactly what bidirectional context requires. **Yjs** dominates the space with ~900k weekly downloads, powering Proton Docs, NextCloud, Evernote, and ClickUp. **Automerge** offers a Rust core with WebAssembly bindings and strong multi-language support.

Specific CRDT types map directly to AI context needs:

| CRDT Type | Mechanism | AI Context Application |
| --- | --- | --- |
| **LWW-Register** | Last-writer-wins with timestamps | Session metadata, current preferences |
| **OR-Set** | Add-wins semantics with unique tags | Active topics, referenced documents |
| **RGA** | Sequence with unique IDs, parent pointers | Conversation transcript, annotations |
| **G-Counter** | Grow-only, summed across nodes | Interaction counts, context usage metrics |

A proposed CRDT structure for bidirectional AI context:

```jsx
const contextDoc = {
  sessionMeta: LWWRegister({ model: 'claude', startTime: Date }),
  activeTopics: ORSet(['coding', 'architecture']),
  transcript: RGA([
    { role: 'human', content: '...', timestamp: T1 },
    { role: 'ai', content: '...', timestamp: T2 }
  ]),
  aiState: Map({
    workingMemory: [...],
    hypotheses: [...],
    uncertainties: [...]  // AI's internal state becomes inspectable
  })
}

```

Yjs's **Awareness Protocol** provides presence information—who's editing what, cursor positions, connection status—through a separate state-based CRDT with 30-second timeouts. This could translate to human-AI collaboration as "AI is thinking," "AI is reading context," or "AI is focusing on [specific topic]."

**Key engineering considerations** when adapting CRDTs for AI context:

1. **Latency asymmetry**: Human edits are instant; AI responses take seconds. The sync protocol must handle this gracefully—potentially through optimistic locking during generation or merge-on-complete strategies.
2. **Authority model**: Unlike pure peer-to-peer CRDTs, AI context likely needs authority for certain fields. A hybrid approach: CRDT for collaborative fields, LWW with AI as authority for model-internal state.
3. **Event sourcing complements CRDTs**: Store all context changes as events for complete audit trails, time-travel debugging, and natural undo/redo. Derive current state by replaying events.

## Current products expose minimal context to users

There's a stark gap between developer-facing observability and end-user transparency. Tools like **LangSmith**, **Langfuse**, and **Helicone** provide complete visibility into prompts, tool calls, memory access, token usage, and latency—but this level of transparency doesn't reach end-users.

**ChatGPT's memory** provides partial visibility: users can view saved memories with timestamps in Settings → Personalization → Manage Memory, delete individual memories or clear all, and toggle "saved memories" independently from "chat history reference." However, the hidden "Chat History Reference" system builds a profile over time that users cannot directly inspect, including "Assistant Response Preferences" and "Notable Past Conversation Topics" with confidence scores.

**Claude's CLAUDE.md files** represent the most transparent approach for developers: plain Markdown files at user level (`~/.claude/CLAUDE.md`) and project level (`PROJECT_ROOT/CLAUDE.md`) that are fully readable and editable. Users can view memories via `/memory` command and reset context with `/clear`. Anthropic's decision to publicly publish Claude's system prompt marks a "radical departure from industry norms."

**What users cannot see in any current product:**

- **What's actually in the context window** right now
- **Token usage and context window utilization** (no progress bar showing "80% of context used")
- **When context is truncated** and what was dropped
- **Attention/saliency** indicators showing what the model focused on
- **Real-time working memory state** during response generation

**Rewind/Limitless** demonstrates transparent personal AI memory: timeline interface for any timeframe, local storage with encryption, searchable via OCR and speech-to-text, full control over app exclusions and retention policies. All recordings at `~/Library/Application Support/com.memoryvault.MemoryVault` using H.265 compression (~20-30GB/month).

## Grounding mechanisms require explicit training

Research reveals a fundamental tension: **RLHF actively discourages clarification-seeking behavior**. Annotators favor confident, "complete-looking" answers during preference comparison, so models learn to avoid asking clarifying questions even when uncertain. This must be explicitly countered.

Key technical insights for grounding implementations:

**Model uncertainty does not mirror human clarification-seeking behavior**. Using human clarification questions as supervision may not optimally resolve model uncertainty. Better approach: generate clarification questions based on MODEL uncertainty estimation using entropy thresholds over attribute spaces.

**ClarifyBench** (arXiv 2511.08798) grounds disambiguation in structured parameter domains with Bayesian posterior entropy. Uncertainty-weighted GRPO training improved When2Call accuracy from **36.5% to 65.2%**—a dramatic improvement in knowing when to ask.

**Implementation pattern for grounding verification:**

```
1. User provides input
2. System extracts intent/entities with confidence scores
3. IF low_confidence OR ambiguity_detected:
   - Generate clarification question OR
   - Present paraphrase for confirmation
4. User confirms/corrects
5. Update dialogue state with grounded information
6. Track as "common ground" for conversation

```

**Constitutional AI could encode grounding principles**: "Ask for clarification rather than assume," "Confirm understanding before proceeding with consequential actions," "Always explain what context influenced your response." The explicit nature of constitutions enables auditable, modifiable decision-making about when and how to ground.

**Calibration remains challenging**. LLMs are systematically overconfident, mimicking human patterns. Three UQ methods exist: logit-based (requires white-box access), sampling-based (generate multiple responses, analyze consistency), and verbalized confidence (prompt model to assess correctness). **SelfCheckGPT** compares sampled responses for agreement; **P(True)** prompts work without logit access but rely on self-assessment.

## Multi-agent architectures provide inspectable state patterns

Multi-agent frameworks have solved a version of the bidirectional context problem for agent-to-agent communication. Their patterns can be adapted for human-AI bidirectionality.

**LangGraph** uses TypedDict-based state schemas where nodes receive state, perform computation, and return updates. Edges determine routing based on current state. **Reducers** control how state updates merge (e.g., `operator.add` for message concatenation). **Checkpointing** via SqliteSaver or other backends enables persistent state with time-travel capabilities. The `ctx.request_info()` method pauses workflows for human input.

**AutoGen's conversation patterns** include "carryover" mechanisms where summaries of previous chats become context for subsequent ones. The `generate_init_message` method creates initial context from inputs, and chat summarizers process history after termination. This accumulation pattern could apply to human-AI context building.

**CrewAI** implements explicit context dependencies between tasks:

```python
writing_task = Task(
    description="Write article based on research",
    agent=writer,
    context=[research_task],  # Receives research_task output
)

```

The `respect_context_window=True` parameter enables automatic summarization when context exceeds limits. Built-in delegation tools (`Delegate work to coworker`, `Ask question to coworker`) could extend to human delegation.

**The key insight**: all these frameworks maintain explicit state objects that could theoretically be exposed to users. LangGraph's TypedDict pattern makes state schema inspectable by definition. A human could be implemented as a "human agent" with special privileges to inspect and modify shared state.

**Reflexion** (NeurIPS 2023) stores self-reflections in an episodic memory buffer as natural language—inherently interpretable. The architecture separates Actor (generates actions), Evaluator (scores outputs), and Self-Reflection model (generates verbal reinforcement). Humans could read, edit, or inject memories into this buffer.

## What's possible now versus what requires development

### Deployable today with existing tools

**Transparent memory management**: Letta's API provides complete memory CRUD operations. Build a user-facing interface on top:

- View all memory blocks and their contents
- Edit or delete specific memories
- Search archival memory
- Export memory state as JSON

**Context-aware retrieval with citations**: Khoj (25K+ GitHub stars) shows retrieved documents, provides citations in responses, and supports custom agents with adjustable knowledge bases. Extend with explicit "what I searched for" transparency.

**Developer-facing observability promoted to users**: LangSmith-style tracing could be simplified for end-users—show the chain of reasoning, tool calls, and memory accesses without overwhelming technical detail.

**CRDT-based collaborative state**: Yjs with y-websocket provides real-time sync out of the box. Build a context document structure, expose it via a React interface, and let both human and AI update it.

**Context branching**: ChatGPT already has "Branch Conversations" feature. Extend with Git-like semantics: explicit commits, diffs between branches, merge operations.

### Requires new development

**Unified bidirectional protocol**: Neither MCP nor A2A supports true shared mutable state with conflict resolution. A new protocol layer would need:

- Subscription-based context updates (not just polling)
- CRDT-based state with automatic merge
- Semantic context negotiation (relevance scoring, not just capability matching)
- Context window awareness (automatic optimization for model limits)

**User-facing attention/saliency**: Current interpretability tools (BertViz, SHAP) are research-oriented. Production implementation would require:

- Efficient computation at inference time
- Meaningful visualization for non-experts
- Integration with context display ("I focused on these parts of our conversation")

**Calibrated uncertainty with grounding triggers**: Current LLMs don't reliably know when to ask for clarification. Requires:

- Training with explicit clarification examples (counter to RLHF bias)
- Uncertainty quantification integrated with dialogue management
- Constitutional principles encoding grounding behavior

**Real-time context window visualization**: No product shows "you're using 80% of available context" or "these messages were dropped." Requires:

- Token counting exposed in UI
- Visualization of what's in versus out of context
- User control over context prioritization

## A proposed architecture for bidirectional context

```
┌─────────────────────────────────────────────────────────────┐
│                    Human Interface                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Context Inspector                                     │  │
│  │  - Current context window contents                     │  │
│  │  - Token usage visualization                          │  │
│  │  - Memory blocks (editable)                           │  │
│  │  - "AI is focusing on..." indicator                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                     CRDT Sync (Yjs/WebSocket)
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Sync Authority                            │
│  - CRDT merge for collaborative fields                      │
│  - Event log (all context changes)                          │
│  - Checkpoints for time-travel                              │
│  - Conflict resolution (human > AI for disputed fields)     │
└─────────────────────────────────────────────────────────────┘
                            │
                     Internal Protocol
                            │
┌─────────────────────────────────────────────────────────────┐
│                    AI Service                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Context Management Layer                              │  │
│  │  - CQRS: Write to event log, read from materialized   │  │
│  │  - Uncertainty quantification for grounding triggers  │  │
│  │  - Awareness broadcast (thinking state, focus area)   │  │
│  │  - Memory tools (self-editing via Letta pattern)      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

```

**Implementation phases:**

1. **Basic transparency** (weeks): Expose existing memory APIs via user-facing interface. Show what's retrieved during RAG. Display token counts.
2. **Collaborative state** (months): Implement CRDT-based context document. Add presence awareness. Build context editing UI.
3. **Grounding integration** (months): Train clarification triggers. Implement paraphrase confirmation. Add uncertainty visualization.
4. **Full bidirectionality** (longer-term): Develop protocol extensions for semantic negotiation. Build attention visualization. Create context versioning with branching.

## Technical tradeoffs require explicit decisions

**Latency versus transparency**: Displaying context requires additional UI rendering and processing time. Cursor's approach—background indexing with Merkle tree sync every 3 minutes—avoids blocking but introduces staleness. Consider lazy-loading: show summary, expand on demand.

**Privacy versus visibility**: Context may contain sensitive information from prior conversations. Multi-tenant systems risk leakage. User-editable context could enable prompt injection. Mitigations: local-first processing (Rewind model), content classification before display, `.cursorignore`-style exclusions.

**Token efficiency versus transparency**: More context visibility means more tokens consumed on metadata. Cursor reports that "sending lots of context can slow down display of suggestions." Solution: separate channels for "working context" versus "explanatory context"—compress the former, expand the latter on demand.

**Scalability versus richness**: GPT-Researcher costs ~$0.50-1.00 per research run with revision loops. Cursor's codebase indexing becomes expensive at enterprise scale. Multi-agent systems generate combinatorial state spaces. Implementation requires intelligent caching, context pruning strategies, and tiered storage.

The engineering path to bidirectional context is clearer than it might appear. The primitives exist—CRDTs, memory APIs, multi-agent state management, observability tools. The gap is integration: combining these into a coherent system where humans and AI genuinely share and co-author their conversational context. The first product to achieve this will have built something qualitatively new in human-AI interaction.

---

## Related

- [[dynamic-knowledge-graphs]] — Living knowledge bases with temporal memory
- [[vibe-coding-infrastructure]] — AI-native development patterns
- [[triple-network-model]] — Cognitive architecture inspiration from neuroscience
