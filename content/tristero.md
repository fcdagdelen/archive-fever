---
title: "Tristero: Event-Sourced Knowledge Systems with Emergent Ontology"
date: 2026-01-15
tags:
  - building/projects
  - ai-systems/knowledge-graphs
  - ai-systems/memory-systems
  - tristero-research
summary: |
  Tristero is an event-sourced knowledge system where the ontology—the categories, types, and relationships that organize information—emerges and evolves through a governed reflection process. It treats organizational structure as emergent, provisional, and learnable rather than fixed, designed, and imposed.
---

**Tristero represents a fundamental reconception of how knowledge systems should work**—as living architectures where the organizational structure itself emerges, adapts, and learns. The system treats ontology evolution as a first-class concern governed by reflection, separating immutable facts about what happened from provisional beliefs about what those facts mean. This separation is an epistemological commitment with deep implications for human-AI collaboration, collective sensemaking, and the future of knowledge work.

This document synthesizes research across event sourcing, dynamic ontology systems, reinforcement learning approaches to knowledge structures, collective cognition theory, and relevant conceptual frameworks—all grounded in Tristero's specific architecture. It serves as both a literature review and a provocation toward future directions.

---

## The problem with knowledge tools

Most knowledge management systems have a dirty secret: they're better at accumulating information than at making sense of it. You pour notes, documents, and fragments into them. They dutifully store everything. And then you're left with the same problem you started with—except now it's buried under thousands of files with a search bar on top.

The standard solution is to add structure. Tags, folders, ontologies, knowledge graphs. But this creates a new problem: the structure itself becomes a liability. Categories that made sense six months ago now feel wrong. The taxonomy you inherited from someone else's mental model doesn't match how you actually think. And changing the schema means either living with accumulated cruft or embarking on a painful migration that inevitably loses something.

This is the paradox at the heart of knowledge systems: **you need structure to make information useful, but the structure you need keeps changing as you learn**.

Existing tools span a spectrum from "structure emerges from use" to "schema-first design":

| Tool         | Approach                                      | Flexibility | Structure |
| ------------ | --------------------------------------------- | ----------- | --------- |
| **Obsidian** | No enforced schema; Markdown + wikilinks      | Very high   | Very low  |
| **Roam**     | Block-based; bidirectional links; daily notes | Very high   | Low       |
| **Logseq**   | Outliner + templates + properties             | High        | Medium    |
| **Tana**     | Supertags as classes with typed fields        | Medium      | High      |
| **Notion**   | Databases with relations and rollups          | Medium      | High      |

None of these treat the organizational structure itself as something that should evolve through use, be learnable through feedback, or maintain its own history of how it changed. The ontology is either absent (Obsidian), implicit (Roam), or static (Notion). Tristero takes a different approach.

---

## What Tristero is and how it works

Tristero is an event-sourced knowledge system where the ontology—the categories, types, and relationships that organize information—emerges and evolves through a governed reflection process rather than being designed upfront or migrated manually.

### The core architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Event Store                             │
│  (Immutable append-only log of everything that happened)        │
│  NoteIngested, EntityExtracted, RelationshipAsserted,           │
│  QueryExecuted, ReflectionProposed, OntologyVersionCommitted... │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Projection Runner                          │
│  (Builds current views from event history, checkpointed)        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Projection Store                           │
│  Graph structure │ Embeddings │ Ontology versions │ Search      │
│  (Rebuildable, multiple simultaneous views possible)            │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         Query Service   Reflection      Scheduler
                         Orchestrator    (Autonomous
         (Semantic       (Propose →      reflection
          retrieval +     Critique →     triggers)
          ontology        Execute)
          context)
```

**Three foundational commitments:**

1. **Event store as source of truth**: All changes—knowledge claims, relationship assertions, reclassifications, queries, reflections—are recorded as immutable events in an append-only log. The event log is what actually happened; everything else is interpretation.

2. **Projections as derived views**: The knowledge graph, ontology, embeddings, and search indices are all projections built from the event stream. They can be rebuilt when understanding evolves. Multiple projections can coexist—different organizational logics from the same underlying facts.

3. **Reflection orchestrator for ontology evolution**: Rather than manual schema migration, ontology changes go through a governed cycle:
   - **Propose**: Generate candidate changes (new categories, relationship types, restructurings)—potentially AI-assisted
   - **Critique**: Evaluate implications, check consistency, assess utility
   - **Execute**: Implement approved changes, update projections, propagate to dependent systems

### The key insight: reflection as governance

Most systems treat ontology as either fixed infrastructure or user-managed chaos. Tristero treats ontology evolution as a **governed process with checkpoints**. The propose/critique/execute cycle creates natural intervention points where humans can evaluate AI-generated proposals, where automated consistency checks can prevent incoherent changes, and where the system can learn from which proposals get accepted or rejected.

The **scheduler** enables autonomous reflection—the system can propose its own ontological improvements based on:
- Usage patterns (which categories are heavily queried?)
- Retrieval quality (are queries returning relevant results?)
- Detected inconsistencies (are there contradictions or gaps?)
- Satisfaction metrics (is the system serving user needs?)

This means the ontology adapts to how knowledge is actually being used rather than requiring explicit human direction for every change.

### Why event sourcing matters here

The event-sourced foundation is what makes governed ontology evolution possible:

- **Temporal queries**: What did we believe at time T? What was the ontology when this claim was made?
- **Non-destructive experimentation**: Propose an ontology change, evaluate it against historical queries, reject if it performs worse—without having committed anything
- **Audit trails**: Every ontology change is traceable to the reflection session that produced it, with the full propose/critique/execute record
- **Multiple interpretations**: The same event stream can feed different projections with different organizational logics, for different users or contexts

The concrete implementation uses SQLite for both event store and projection store, with vector embeddings for semantic retrieval. The hexagonal architecture (ports and adapters) means storage backends can change without touching domain logic.

---

## Event sourcing as epistemic infrastructure

With Tristero's architecture in view, we can now examine why event sourcing is particularly well-suited to knowledge systems—and why most existing tools get this wrong.

Most knowledge systems are amnesiac by design. When you update a note in Notion or reorganize tags in Obsidian, the previous state vanishes. This CRUD model (Create, Read, Update, Delete) gives primacy to the present—current state is preserved, history derived or discarded. Event sourcing inverts this entirely: **history is the source of truth; present state is merely one interpretation of that history**.

Martin Fowler's foundational definition captures the core insight: event sourcing "ensures that all changes to application state are stored as a sequence of events. Not just can we query these events, we can also use the event log to reconstruct past states, and as a foundation to automatically adjust the state to cope with retroactive changes."

This separation maps directly onto epistemological distinctions between **brute facts** (what occurred) and **institutional facts** (our interpretation of what occurred). Greg Young, who coined the term CQRS alongside event sourcing, emphasizes the test definition: "at any time we can blow away the application state and confidently rebuild it from the log." For knowledge systems, this means the ontology itself becomes provisional and rebuildable without losing the underlying observations.

The analogy to version control systems (Git) is instructive but incomplete. Git tracks changes to files; an event-sourced knowledge system tracks changes to *meaning*. Events like `ConceptCreated`, `RelationshipAsserted`, `CategoryReclassified`, `ClaimDisputed` form the audit trail of epistemic activity. The read models—graph views, taxonomies, search indices—are projections that can be rebuilt when our understanding of how to organize knowledge evolves.

Three capabilities emerge that directly serve Tristero's goals:

- **Temporal queries**: What did we believe at time T? What evidence existed then? This enables genuine retrospection rather than reconstructing from imperfect memory.
- **Multiple simultaneous interpretations**: The same event stream can feed different projections—a hierarchical taxonomy, a network graph, a timeline view, a semantic embedding space. Different organizational logics coexist without conflict.
- **Non-monotonic reasoning**: Conclusions can be withdrawn when new information arrives, yet the original evidence remains preserved. The system supports belief revision without forgetting.

The W3C PROV-O ontology provides a formal vocabulary for this: entities (knowledge items), activities (actions that produce or modify entities), and agents (who or what performed activities). Every projection element becomes traceable to originating events—what practitioners call "deep provenance" or "statement-level provenance."

---

## The ontology evolution problem

Traditional knowledge systems assume the category structure is known in advance. You design a schema, populate it with instances, and when the schema no longer fits, you migrate. But knowledge work doesn't operate this way. Categories drift in meaning over time ("broadcast" once meant scattering seeds, then newspaper distribution, then radio transmission). New concepts emerge that don't fit existing hierarchies. Two domains merge and their classification systems conflict.

The research literature distinguishes **ontology evolution** from mere schema evolution. Natalya Noy and Michel Klein's seminal paper establishes: ontology evolution is "the timely adaptation of an ontology to changing requirements and the consistent propagation of changes to dependent artifacts." Unlike database schemas, ontologies carry semantic weight—changing them changes *meaning*, not just structure.

The KAON framework from Karlsruhe identifies six phases of ontology evolution:

1. **Change capture**: Detecting that evolution is needed
2. **Change representation**: Expressing the proposed modification
3. **Change semantics**: Understanding implications of the change
4. **Change implementation**: Executing the modification
5. **Change propagation**: Updating dependent systems
6. **Validation**: Verifying the evolved ontology remains coherent

**Tristero's reflection orchestrator directly implements this framework**: the scheduler and usage analysis capture the need for change; the propose phase represents modifications; the critique phase evaluates semantics and implications; execution implements and propagates; and the event-sourced foundation enables validation against historical behavior.

**Schema drift** presents a particularly thorny challenge. Hamilton et al.'s research on semantic change identifies two laws: the **Law of Conformity** (frequently used concepts change meaning more slowly) and the **Law of Innovation** (concepts with multiple senses change faster). For Tristero, this suggests differential update policies—core categories might require higher confidence thresholds for modification than peripheral concepts.

Temporal ontology frameworks like **τOWL** address versioning through annotation documents that track validity periods. Every concept, relationship, and axiom carries temporal metadata—when it was introduced, when modified, when deprecated. Tristero's event-sourced architecture provides this naturally: every ontology version is an event with a timestamp, and the full history of ontological changes is preserved and queryable.

The most recent advances leverage **LLMs for ontology learning**. The LLMs4OL framework demonstrates that models like GPT-4 outperform traditional methods (lexico-syntactic mining, clustering) for term typing, taxonomy discovery, and non-taxonomic relation extraction. This is precisely what Tristero's reflection orchestrator is positioned to exploit: AI-assisted proposal generation with human or AI critique.

---

## Can ontologies learn? Reinforcement, rewards, and the Goodhart problem

The question of whether ontologies can be *learned* through feedback loops rather than designed upfront is underexplored but increasingly tractable. Tristero's architecture—with its explicit feedback signals (query success, user satisfaction, retrieval quality) and governed update mechanism (propose/critique/execute)—provides infrastructure for exploring this.

Most work in knowledge graph reinforcement learning focuses on reasoning paths (DeepPath, 2017) or link prediction—optimizing within a fixed schema rather than optimizing the schema itself.

**AutoGraph-R1 (October 2025)** represents the most direct attempt: a framework that optimizes knowledge graph construction for task performance using RL. The key insight is "shifting the paradigm from building intrinsically 'good' graphs to building demonstrably 'useful' ones." The reward signal derives from the graph's functional utility in a RAG pipeline—how well does this organizational structure support retrieval and answer generation? This treats ontology design as an optimization problem where the loss function is downstream task performance.

**Agentic-KGR** extends this with a co-evolution mechanism: LLMs and knowledge graphs evolve together through multi-round RL, with a dynamic schema expansion mechanism that extends ontologies during training. This points toward systems where organizational structure continuously adapts based on how the knowledge is being used.

For Tristero, several reward signals could evaluate ontology quality:

- **Retrieval precision/recall**: Does this categorization help find relevant information?
- **Semantic coherence**: Are concepts within categories genuinely similar?
- **Compression efficiency** (MDL-based): Does this structure capture regularities efficiently?
- **User task success**: Do people accomplish their goals using this organization?
- **Temporal stability**: Does the structure remain valid as new knowledge arrives?

### The Goodhart problem

The **Goodhart problem** looms large here. Manheim and Garrabrant's taxonomy identifies four failure modes when optimizing for proxies: regressional (selecting for the proxy selects for difference from true goal), extremal (extreme proxy values exist in different worlds than observed correlations), causal (intervention breaks the proxy-goal relationship), and adversarial (agents game metrics). Applied to ontology optimization:

- Retrieval precision rewards might produce degenerate ontologies that game specific query patterns
- Compression efficiency might eliminate semantically meaningful distinctions
- User satisfaction proxies might conflate ease-of-use with correctness

OpenAI's empirical work shows RL reaches approximately **10 nats KL divergence** before the true objective decreases—suggesting early stopping mechanisms could prevent Goodhart effects. For ontology evolution, this might mean: optimize gently, in small increments, with human validation gates rather than end-to-end automation.

**Bandit approaches** offer an alternative to full RL. Multi-armed bandits could A/B test ontology variants—does categorization A or B lead to better retrieval? Thompson Sampling or UCB could balance exploration (trying novel structures) against exploitation (using proven patterns). No papers yet apply bandits directly to ontology editing, but the formulation is natural and the computational cost far lower than full RL.

**Tristero's reflection orchestrator provides governance infrastructure for this**: proposals are generated, critiques evaluate them, and execution only proceeds with appropriate confidence. This human-in-the-loop (or AI-in-the-loop with human oversight) approach may be more appropriate than fully autonomous ontology optimization given Goodhart risks. The critique phase can incorporate ensemble rewards (multiple metrics rather than single proxies), early stopping, and explicit human validation for high-stakes changes.

---

## Collective sensemaking and multiple perspectives

Knowledge systems don't exist in isolation. They support collaboration, institutional memory, and collective intelligence. Tristero's architecture—particularly its support for multiple projections from the same event stream—opens possibilities for genuinely pluralistic knowledge organization.

**Karl Weick's sensemaking framework** defines sensemaking as "the ongoing retrospective development of plausible images that rationalize what people are doing." Seven properties characterize it, but one has direct implications for ontology design: **plausibility over accuracy** (good enough over perfectly true).

Knowledge systems often pursue precision—exact categories, rigid hierarchies, formal semantics. But sensemaking research suggests that **provisional, revisable structures** better match how humans actually work with information. This is exactly what Tristero's event-sourced foundation provides: the ontology is always provisional, always revisable, never losing the underlying observations.

**Transactive memory systems** (Wegner, 1980s) describe how groups distribute knowledge across members, developing shared awareness of "who knows what." For knowledge systems, this suggests supporting **transactive structures**—not just storing knowledge but maintaining models of where knowledge resides and how to access it.

Tristero's event log naturally supports this: every claim can be traced to who contributed it, from what source, in what context. This enables queries like "who in the organization has expertise related to this topic?" rather than just "what do we know about this topic?"

**Pluralism in knowledge representation** presents a deeper opportunity. Most systems assume convergence toward a single ontology, but research on perspectival knowledge suggests maintaining multiple interpretive frameworks may be more valuable. Stanford's encyclopedia entry on scientific pluralism makes the philosophical case: "there is not only one correct way of carving up the natural world."

Tristero's architecture directly supports this: the same event stream can feed multiple projections with different ontologies. Different users or contexts could have different default views while the underlying facts remain shared. This supports what De Liddo et al. call "contested collective intelligence"—preserving disagreement rather than forcing premature consensus.

This connects to the concept of **caravanserai** (transitional spaces)—historical meeting places where different travelers with different maps temporarily coexist. A knowledge system might similarly function as transitional infrastructure where multiple organizational schemes overlap, translate, and inform each other.

---

## Alternative framings: Warburg, anarchives, and non-hierarchical organization

The dominant paradigm for knowledge organization remains hierarchical: trees, taxonomies, nested folders. But several theoretical frameworks challenge this assumption with alternatives that may better suit emergent, evolving knowledge structures.

**Aby Warburg's Mnemosyne Atlas** (1924-1929) pioneered constellation thinking. The atlas consisted of 63 black cloth panels containing approximately 971 images—photographs, reproductions, clippings—pinned and arranged to reveal conceptual relationships through spatial proximity. Warburg developed what he called the "iconology of intervals"—meaning emerges not from individual images but from the **spaces between** them.

Unlike encyclopedic hierarchies, the Atlas allows multiple entry points and reading paths. The arrangement was never fixed: photographed three times during development, showing constant reconfiguration. This represents knowledge as inherently provisional and reconfigurable—a "work-in-progress" by design.

**For Tristero, this suggests implementing dynamic constellation views where concepts cluster based on relational proximity rather than fixed hierarchies**—arrangement itself becomes a form of knowledge.

The **anarchive** concept (SenseLab, Brian Massumi) goes further. Traditional archives document content; anarchives capture **process and formative tendencies**—"what moved an event into taking form." They function as "process seed banks" for future events rather than static repositories.

**For an event-sourced system, the anarchive concept is particularly resonant**: events themselves become "carriers of potential" that can be reactivated through new projections. Each query is an event generating new traces. The system's organization evolves through use, creating feedback loops where usage patterns inform structural refinement. The reflection orchestrator might monitor activation patterns and propose reorganizations based on how knowledge is actually being accessed and combined.

---

## Formal foundations: MDL and category theory

While Warburgian and anarchival approaches emphasize fluidity, **Minimum Description Length (MDL)** provides rigorous criteria for evaluating competing organizational structures. Originated by Jorma Rissanen and developed extensively by Peter Grünwald, MDL formalizes Occam's Razor: **the best model permits the shortest encoding of both the model itself and the data given the model**.

For ontology design, this means selecting categories that maximize regularity capture (categories enable significant compression of instance descriptions) while minimizing category overhead (the category system itself doesn't require excessive specification). The optimal ontology balances granularity—neither too coarse (poor fit) nor too fine (excessive model complexity).

**MDL provides a concrete optimization target for Tristero's reflection orchestrator**: prefer structures that compress the knowledge more efficiently. This could serve as one component of a multi-objective reward signal, counterbalancing retrieval-focused metrics with parsimony.

**Category theory** offers a different kind of rigor—a mathematical language for structure and relationships that enables principled mappings between domains. David Spivak's **ologs** (ontology logs) apply category theory to knowledge representation, with a key capability: **functorial data migration**—principled transformations when schemas change.

For Tristero, category theory suggests treating the ontology as a category where:
- Types (concepts) are objects
- Relationships are morphisms
- Schema changes are functors mapping old structure to new
- Natural transformations capture canonical correspondences between different views

This provides mathematical foundation for the claim that multiple projections from the same event stream maintain coherent relationships to each other—they're not arbitrary views but functorially related perspectives on the same underlying structure.

---

## Where we're going: Research notes

*Working research notes on implications and future directions.*

### Unit economics as the meta-constraint

The immediate priority is unit economics. If the computational costs of reflection cycles are low enough, we can afford to make many mistakes. Mistakes become learning signal rather than failures. High iteration rates mean the system accumulates more information about what ontological structures actually work.

This reframes optimization: instead of trying to make each reflection cycle perfect, make cycles cheap enough that volume compensates for error rate. The question shifts from "how do we get ontology evolution right?" to "how do we make ontology evolution cheap enough to learn from getting it wrong?"

Concrete implications:
- Embedding costs dominate (every node, every query, every proposed change needs vectors)
- LLM calls for propose/critique are expensive—can we distill? Can we use smaller models for routine operations?
- SQLite keeps infrastructure costs near zero, but what happens at scale?
- Can reflection run incrementally on deltas rather than full graph analysis?

### The reflection loop as design space

The current propose/critique/execute pattern is a starting point, not a conclusion. It opens up a design space that can accommodate many configurations towards recursive iterability.

Questions we're sitting with:
- What other patterns exist for governed ontology evolution? Are there biological/evolutionary metaphors that suggest alternatives? Institutional/governance patterns from other domains?
- How much of critique can be automated vs. requiring human judgment? Where's the boundary?
- Should execution be atomic or gradual? (Gradual: propose a change, expose it to a fraction of queries, measure impact, expand or rollback)
- What's the right granularity for reflection? Per-concept? Per-cluster? Whole-ontology?
- Can multiple reflection processes run in parallel with different strategies, competing for adoption?

The propose/critique/execute frame assumes a legislative model—deliberation then decision. But maybe evolution works differently. Maybe it's more like variation/selection/retention. Maybe it's more like negotiation between perspectives. We don't know yet.

### AI context management and research taste

One use case holds particular promise for dynamic ontology systems: **context management for AI**.

Consider what an AI agent needs to operate effectively:
- Access to relevant knowledge (retrieval)
- Organization of that knowledge (structure)
- Awareness of what it knows and doesn't know (metacognition)
- Ability to update its knowledge organization as tasks evolve (adaptation)

Current approaches use static retrieval (RAG with fixed chunking and embedding) or manual prompt engineering. But what if the AI's context window was backed by a knowledge graph whose ontology evolved based on task performance?

This is where Tristero points: **the knowledge graph becomes the AI's working memory, and the ontology becomes learnable based on how well the AI accomplishes tasks**.

But there's a deeper possibility. Emergent ontologies don't just organize existing knowledge—they create **pathways between seemingly unrelated entities**. The reflection process, as it evolves the category structure, might surface connections that weren't explicit in the original data. A type that clusters certain concepts together; a relationship that bridges domains; a hierarchy that reveals structural similarity across contexts.

This is where it gets interesting for research. Human researchers develop "taste"—an intuition for which connections are worth pursuing, which analogies are generative, which distant fields might illuminate each other. This taste operates more like pattern recognition across a lifetime of reading, thinking, and making unexpected links, rather than formal reasoning.

Emergent ontologies could approximate this through something like **dreamlike associations**. The reflection loop explores structural resonances, surfaces latent similarities, proposes category shifts that reframe how knowledge relates to itself.

Different algorithmic patterns in the reflection loop might produce different kinds of association:
- Compression-driven reflection (MDL-style) finds efficient abstractions
- Retrieval-driven reflection optimizes for task performance
- Novelty-driven reflection surfaces unexpected connections
- Adversarial reflection stress-tests category boundaries

This direction points toward one of the holy grails in AI: **automated research taste**—the capacity to sense which connections are worth pursuing. Mutations on the reflection loop could hypothetically accommodate such non-linear association building: an AI system that actively reorganizes its understanding to generate synthesis, to notice structural resemblances across distant domains.

### Goodhart as engineering challenge, not fundamental limit

RL is full of Goodhart problems. Optimizing for proxies that diverge from true objectives is the default failure mode. But we don't think this makes ontology learning impossible—it makes it a **constrained optimization problem**.

The constraint: find reward windows where verification is tractable.

AI context management provides this. When the task is "help an AI accomplish X," we can measure:
- Did the AI accomplish X? (ground truth)
- What context did it retrieve? (observable)
- How was that context organized? (the ontology we're optimizing)

The feedback loop is tight and the reward is verifiable against task completion, not proxy metrics. This doesn't eliminate Goodhart risk, but it narrows the gap between proxy and objective.

The research question becomes: **for which classes of tasks can we construct reward signals that remain aligned under optimization pressure?** AI benchmarks with clear success criteria seem like the right place to start—but the more ambitious target is reward signals for the quality of synthesis, for research taste, for the generativity of associative connections.

---

## A working hypothesis

Tristero embeds a hypothesis: **knowledge systems should treat organizational structure as emergent, provisional, and learnable rather than fixed, designed, and imposed**.

**Emergence**: Categories, relationships, and hierarchies should arise from use patterns and content regularities rather than upfront design.

**Provisionality**: Any organizational scheme is subject to revision. Event sourcing provides the infrastructure—rebuild projections when understanding evolves without losing underlying observations.

**Learnability**: Organization can improve through feedback. Whether through explicit user feedback, implicit usage patterns, retrieval quality metrics, or AI-assisted pattern detection, the system accumulates information about what structures work.

**Governance**: Evolution requires oversight. The propose/critique/execute pattern (or whatever pattern proves better) creates checkpoints where changes can be evaluated before commitment.

The event-sourced foundation ensures nothing is lost in this process. Every observation, every claim, every relationship ever asserted remains in the log. What changes is interpretation—the projections that make sense of accumulating events. The ontology becomes a lens rather than a container, and the lens can be ground to different prescriptions as needs evolve.

Tristero is an experiment in what knowledge systems could become when they treat their own organizational structure as part of a learning process.

## Related

- [[bidirectional-context]]
- [[advanced-rag-architectures]]
- [[memory-architectures-frontier-ai]]
