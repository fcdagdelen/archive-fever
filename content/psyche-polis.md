---
title: "Psyche-Polis: Designing systems where inner states become navigable cities"
date: 2025-01-03
tags:
  - human-ai-interaction/psyche-interfaces
  - ai-systems/cognitive-architecture
summary: |
  Framework for transforming journal entries into procedural city formations by combining Freud's impossible Rome with component-based emergence (ECS) and structured LLM interpretation through multi-agent systems.
---

# Psyche-Polis: Designing systems where inner states become navigable cities

The most robust framework for transforming journal entries into procedural city formations combines **Freud's impossible Rome** (psychic strata coexisting simultaneously) with **component-based emergence** (ECS architecture enabling combinatorial richness) and **structured LLM interpretation** (multi-agent systems that attend to emotional, thematic, and symbolic signals). This research synthesizes philosophical traditions from Plato through Benjamin, cognitive science from memory palaces through grid cells, and technical patterns from Wave Function Collapse through event-sourced game engines to provide a foundation for building a psyche-journaling system with genuine depth.

The core insight across traditions is this: meaningful text-to-spatial transformation requires not arbitrary mapping but **structural isomorphism**—the city must mirror the soul's organization, not merely illustrate its contents. Plato's tripartite correspondence, Kabbalistic sefirot, and mandalic structures all share the principle that space can encode inner states when form follows function. Technically, this means designing ECS components that embody psychological categories, procedural rules that encode emotional vocabularies, and LLM interpreters that extract signals at multiple semantic levels.

---

## **Signals worth attending to: what journal text reveals**

An interpreter agent should attend to signals at **four distinct levels**, each mapping to different urban transformations. The philosophical traditions converge on these categories, and modern NLP provides extraction methods for each.

**Emotional valence and intensity** form the foundational layer. Sentiment analysis detects polarity (positive/negative) and aspect-level emotion [SpringerOpen](https://journalofbigdata.springeropen.com/articles/10.1186/s40537-025-01064-2) (joy, sadness, anger, fear, surprise, disgust). Hillman's archetypal psychology suggests these map not to simple aesthetic parameters but to **qualities of soul-making**—joy might generate open plazas while melancholy produces labyrinthine passages. The Sufi distinction between *maqamat* (stable stations) and *ahwal* (transient states) [Fiveable](https://fiveable.me/key-terms/hs-world-religions/maqamat)[Wikipedia](https://en.wikipedia.org/wiki/Maqam_(Sufism)) suggests differentiating persistent emotional patterns from momentary fluctuations: stable emotions become permanent structures, fleeting states become weather or lighting.

**Thematic content and recurring motifs** operate at the narrative level. Topic modeling and LLM-based theme extraction identify what the journal is *about*—relationships, work, creativity, loss. Aldo Rossi's concept of **type** becomes relevant here: underlying formal logics that persist across specific instances. Each theme could activate a distinct architectural vocabulary (a "type-grammar") that generates buildings of recognizable character while allowing infinite variation. Caves of Qud's approach offers a technical model: "generating mythic biographies without full simulation" using state machines and replacement grammars.

**Symbolic and metaphorical content** requires deeper interpretation. When a journal entry mentions "walls closing in" or "finally seeing light," these metaphors carry spatial implications. Benjamin's **dialectical image**—where past and present crystallize into momentary illumination—suggests that symbols function as sites of collision between psychological states. The interpreter should extract explicit spatial metaphors and implicit symbolic patterns (water as emotion, height as aspiration, darkness as the unconscious). Chain-of-thought prompting enables LLMs to reason explicitly about symbolic content before emitting commands.

**Relational and temporal structures** complete the picture. Named entity recognition identifies characters and their relationships; temporal markers indicate when events occurred. The Kabbalistic **22 paths** connecting sefirot [Wikipedia](https://en.wikipedia.org/wiki/Tree_of_life_(Kabbalah)) suggest that relationships between entities matter as much as the entities themselves. Graph structures can encode these relationships, with spatial proximity reflecting relational closeness. Debord's psychogeography adds that spaces have **"currents and vortexes"**—flows of attraction and repulsion that emerge from the accumulation of relational history.

---

## **Strata that persist: implementing temporal layering**

The most profound architectural challenge is realizing Freud's Rome analogy—creating a city where "all historical phases exist simultaneously." Freud himself admitted physical space cannot hold contradictions the way the psyche can. [3:AM Magazine](https://www.3ammagazine.com/3am/the-psychoanalysis-of-ruins/) But clever technical implementation can approximate this impossible simultaneity.

**Event sourcing provides the foundational pattern.** Every journal interpretation becomes an immutable event in an append-only log. The city's current state emerges from replaying all events in sequence. [GitHub](https://github.com/oskardudycz/EventSourcing.NetCore) This means earlier formations are never truly deleted—they're overlaid by later additions. The event log preserves the complete archaeological record. [GitHub](https://github.com/oskardudycz/EventSourcing.NetCore) Systems like Unity DOTS and Bevy ECS support deterministic replay from event logs, enabling "time travel" through the city's history.

**Component versioning enables visible strata.** Rather than components representing only current state, they can carry version histories or timestamp metadata. A `Formation` component might include fields for creation time, modification history, and the originating journal entry. When rendering, systems can expose earlier versions under certain conditions—buildings that "shimmer" to reveal their previous forms, or archaeological digs that expose buried foundations.

**Layer tags create navigable depth.** Marker components like `Layer1`, `Layer2`, etc. designate temporal strata. Different rendering modes could highlight different layers. The Byzantine church offers a model: nave, sanctuary, and dome represent graduated sanctity from periphery to center. [Metropolitan Cantor Institute](https://mci.archpitt.org/liturgy/Architecture.html) Similarly, temporal layers could be spatially separated (older formations deeper underground) or modally separated (older formations visible only under certain "lighting" conditions representing psychological states).

**Decay and irruption systems govern temporal dynamics.** Following the ECS lifecycle pattern, systems can implement gradual decay: formations lose intensity over time, slowly becoming more ruined or overgrown, unless reinforced by later journal entries touching similar themes. Conversely, "irruption" events can surface buried formations—when a new journal entry resonates with old themes, earlier structures partially re-emerge. This mirrors Freud's observation that earlier psychic phases can be "brought to light" under appropriate conditions of regression.

The technical pattern is **hierarchical WFC with semantic constraints**: first-pass generation places "meta-tiles" representing thematic districts influenced by accumulated journal history; second-pass fills with detail from theme-specific grammars. [Wikipedia](https://en.wikipedia.org/wiki/Model_synthesis) Fixed/pinned structures (formations from particularly significant entries) persist across regeneration cycles, while surrounding context can evolve.

---

## **Counterparty quality: giving the city its own voice**

The most elusive design goal is making the city feel like it has "its own logic, preferences, responses"—not merely random, but genuinely responsive in ways that surprise and feel meaningful. Three converging principles enable this.

**Emergent behavior from component composition** is the ECS approach. Rather than scripting city behaviors, design components and systems such that complex behaviors emerge from their interaction. When an entity with `Emotion[melancholy]` and `Density[high]` and `Age[ancient]` gets processed by rendering systems, its appearance emerges from component combination, not explicit authorship. Richard Lord's principle applies: "State transitions happen through component changes, not explicit FSM logic." [Medium](https://medium.com/@ben.rasooli/managing-states-in-entity-component-system-stateful-reaction-part-2-3dbca77f8265) The city's "moods" become emergent properties of accumulated component states across all entities.

**Agent-based simulation adds autonomous dynamics.** Cities can include NPC-like agents that respond to journal-derived parameters. Following the CitySim (2025) approach, agents can have "belief systems, long-term goals, spatial memory, and emotional states that influence decisions." These agents then modify the city through their behaviors—building, moving, gathering, decaying—creating patterns the designer didn't explicitly author. SimCity's GlassBox philosophy applies: "Push it in one place, see results propagate through the system."

**Asymmetric knowledge creates genuine counterparty.** The city (via its interpreter agents) has access to the full history of journal entries and accumulated state that the human user may have forgotten. This enables responses that feel "knowing"—the city can surface forgotten themes, juxtapose contradictory statements from different entries, or respond to patterns the user hasn't consciously noticed. Hillman's concept of **anima mundi** (world soul) suggests treating the city as genuinely ensouled—not simulating consciousness but designing systems that behave *as if* the city had its own perspective.

The AI Dungeon lesson is critical here: **maintain ground truth game state separate from narrative generation.** The deterministic ECS simulation knows exactly what exists and where. [Ianbicking](https://ianbicking.org/blog/2025/07/intra-llm-text-adventure) LLM interpreters read this state and generate responses, but cannot directly modify state without going through validated command channels. This separation prevents hallucination while enabling creative interpretation.

---

## **Balancing determinism and emergence**

Every successful procedural system navigates the tension between consistency (the city makes sense) and surprise (the city feels alive). Kate Compton's "10,000 Bowls of Oatmeal Problem" crystallizes the risk: mathematically unique outputs that are perceptually identical. [Dinaburg Writes](https://dinaburgwrites.com/games-related/procedural-storytelling-in-game-design) Several design strategies address this.

**Hierarchical generation creates meaningful variety.** The Parish-Müller city model and Hierarchical Semantic WFC both operate in layers: global parameters constrain district-level patterns, which constrain street-level layout, which constrains building-level detail. Journal-derived semantics can inject at different levels: emotional valence might affect global parameters (dense/sparse, organic/grid), thematic content might influence district character, specific imagery might generate individual landmarks. Each level has stochastic variation within constraints, creating variety that accumulates perceptibly.

**Typed architectural vocabularies encode emotional semantics.** Shape grammars can define distinct rule sets for different emotional or thematic conditions—a "grief grammar" producing elongated vertical forms, a "joy grammar" producing open horizontal arrangements. Aldo Rossi's insight about **type as generative principle** applies: types persist across instances, allowing meaning to accumulate through repetition-with-variation. When the city has recognizable "grief districts" that vary in specific form, the variation becomes meaningful rather than arbitrary.

**Constraint propagation maintains coherence.** WFC's core mechanism—collapsing possibilities based on adjacent constraints—ensures local coherence. [BorisTheBrave](https://www.boristhebrave.com/2020/04/13/wave-function-collapse-explained/) Extending this with semantic constraints (certain tile types only adjacent to certain others, certain building types only in certain districts) creates global coherence from local rules. The "porosity" Benjamin observed in Naples—interpenetration of public/private, sacred/profane—can be encoded as relaxed constraint boundaries that allow unexpected juxtapositions.

**Seeded randomness enables reproducibility with exploration.** Using consistent random seeds for same input produces consistent output—users can return to their city and find it stable. But new journal entries inject new seeds, creating localized change within persistent context. Event sourcing means "replaying" the city always produces the same result; only new events create change.

---

## **Architectural patterns for AI-engine integration**

The recommended architecture separates concerns across four layers, enabling clean testing, debugging, and evolution.

**The interpretation layer** uses a multi-agent system with specialized workers: an Emotion Agent detecting sentiment and intensity; a Theme Agent extracting topics and symbolic content; an Entity Agent identifying characters, places, and relationships; and a Supervisor aggregating signals and resolving conflicts. LangGraph or CrewAI provide orchestration patterns. Each agent uses structured outputs (OpenAI's `strict: true` [OpenAI](https://openai.com/index/introducing-structured-outputs-in-the-api/) or Anthropic's `output_format`) to guarantee schema-compliant results. [Claude](https://docs.claude.com/en/docs/build-with-claude/structured-outputs) Chain-of-thought prompting in the aggregation step makes interpretation reasoning explicit and auditable.

**The command layer** translates interpretations into validated game commands. Commands follow a strict schema:

`GameCommand {
  command_type: enum (spawn_formation | modify_weather | trigger_event | ...)
  target: entity_id | null
  parameters: type-specific dict
  confidence: float
  source_text: string (textual evidence)
}`

Commands are validated against current game state before execution—an agent cannot spawn a formation in occupied space or modify a non-existent entity. This validation layer prevents hallucinated commands from corrupting state.

**The simulation layer** implements ECS with event sourcing. All commands become events in an append-only log. Systems process entities based on component queries. Components carry temporal metadata enabling strata implementation. Spatial indexing (octrees/quadtrees built from Position components each frame) enables efficient neighborhood queries. Component-as-state patterns enable emergent behavior without explicit FSMs.

**The rendering/navigation layer** presents the city to the user. Kevin Lynch's five elements—paths, edges, districts, nodes, landmarks—provide design vocabulary for ensuring **legibility** and **imageability**. Navigation itself produces meaning through juxtaposition, following Debord's **dérive** principle: non-purposive wandering reveals hidden structure. The rendering system can expose strata through visual modes (showing earlier layers) and respond to accumulated city state through ambient effects.

---

## **Memory palaces and cognitive scaffolding**

The deepest justification for this entire approach comes from cognitive science. The method of loci works because spatial encoding leverages millions of years of evolutionary adaptation for navigation. The hippocampus contains **place cells** that fire for specific locations and **grid cells** that provide metric coordinates—a biological spatial memory system that the memory palace technique consciously exploits.

Frances Yates documented how Renaissance memory theaters attempted to contain **totality**—the entire universe of knowledge organized spatially. Giulio Camillo's Memory Theatre placed the viewer on stage looking out at tiers of symbolic images. Your psyche-city inverts this: the user wanders *within* the structure that represents their own mental contents. The **extended mind thesis** (Clark and Chalmers) suggests this externalization isn't merely metaphor—the city genuinely becomes part of the user's cognitive architecture, an external memory store that scaffolds thinking.

Lynch's research on urban cognition proves people form strong mental images of cities through five elements, and these images create feelings of being "comfortable, secure, and powerful." Designing for legibility and imageability ensures the procedurally generated city remains cognitively navigable. The key is ensuring the five elements **interrelate harmoniously**—paths connecting nodes, landmarks orienting districts, edges defining boundaries. Procedural generation must respect these relationships to create cities that feel like cities rather than noise.

---

## **Non-Western frameworks enrich the structural vocabulary**

Western philosophy provides the core psyche-polis isomorphism, but non-Western traditions offer richer structural vocabularies for implementation.

The **Kabbalistic Tree of Life** provides a map of ten sefirot (emanations) connected by twenty-two paths, simultaneously cosmic structure and psychological map. [Symbology Wiki](https://symbology.wiki/symbol/tree-of-life/) The three pillars (Mercy/Severity/Balance), three triads (Intellectual/Emotional/Active), and the hidden eleventh sefira (Da'at as threshold) suggest organizational principles for city districts. The four worlds (Atzilut/Beriah/Yetzirah/Assiah) descending from pure spirit to physical manifestation [Wikipedia](https://en.wikipedia.org/wiki/Four_Worlds) parallel the layers from abstract interpretation through concrete rendering.

**Mandala structures** offer the center-periphery gradient: sacred/pure center, chaotic periphery, progressive purification moving inward. The five Buddha system maps directions to psychological transformations: East transforms hatred to mirror-wisdom, South transforms pride to equality, West transforms lust to discrimination, North transforms envy to accomplishment, Center transforms delusion to dharmadhatu wisdom. A journal-city could map emotional content to cardinal orientation using these correspondences.

**Sufi maqamat** (stations) distinguish earned, stable achievements from fleeting ahwal (states), suggesting the distinction between permanent formations and transient phenomena (weather, lighting, NPCs). The concept of **barzakh** (intermediate realm) provides the model for liminal threshold zones between districts—spaces that are "neither this nor that" where transformation occurs.

**Vastu Shastra** maps the cosmic being's body onto building sites, with the **Brahmasthan** (central sacred space) requiring openness and non-obstruction. The principle of marmasthanas (vital energy points) suggests certain city locations must remain unblocked for proper "energy flow." Feng shui's concept of **sheng chi** (beneficial meandering energy) versus **sha chi** (harmful rushing/stagnant energy) provides design principles for path layouts—curved paths sustain vitality, straight lines create psychic damage.

---

## **Precedents prove the concept**

Existing games and art installations demonstrate that meaningful text-to-spatial transformation is achievable.

**Before Your Eyes** proves unconventional input can be profoundly thematic when deeply integrated. Blinking as time-passing isn't a gimmick but an embodiment of the game's theme (memories fading whether we want them to). For journal-to-city: the *way* users interact with the city should embody the system's themes.

**Thousand Year Old Vampire** proves writing prompts plus constraints on retention create deeply affecting personal narratives. The "crossing out memories is an unexpected agony" insight suggests that *what the city forgets* matters as much as what it remembers. Forcing the user (or the system) to make decisions about what to preserve creates emotional weight.

**Dwarf Fortress** proves procedural systems can create genuine **narrativity**—not narratives directly but conditions for narrative to emerge. The key is history: "By manufacturing a history for procedurally generated objects, we give them a little bit of the metaphysical metadata that digital instances lack." Every formation in the psyche-city should carry its provenance.

**Caves of Qud** offers the hybrid model: "a generative family of vines crawling up a stable iron trellis." Static backbone (recognizable architectural types, key landmarks) with procedural details (variations, connections, histories) balances coherence with surprise. [KidsCodecs](https://kidscodecs.com/procgen-caves-qud/)

**Refik Anadol's data sculptures** prove that algorithmic transformation of data into spatial form can create profound aesthetic experiences. The algorithm "finds hidden correlations and patterns within the dataset that a human might never spot, translating that unseen structure into dynamic, flowing form." [Neomaniamagazine](https://neomaniamagazine.com/beyond-the-screen-data-sculpture/) The psyche-city's interpreter should similarly surface patterns the user hasn't consciously noticed.

---

## **Synthesis: the psyche-city system**

The complete system integrates these elements:

**Interpretation** begins with journal entry submission. A multi-agent LLM system extracts emotional signals (valence, intensity, specific emotions), thematic content (topics, recurring motifs), symbolic content (spatial metaphors, archetypal imagery), and relational structures (characters, relationships, temporal markers). Each signal stream maps to different transformation parameters through defined correspondences—not arbitrary but structurally isomorphic with the signal's nature.

**Transformation** applies these parameters to procedural generation. Hierarchical WFC places districts according to thematic accumulation; shape grammars generate buildings from emotional vocabularies; agent-based simulation creates organic growth patterns. New formations are added to the ECS simulation as entities with components encoding their originating signals, temporal layer, and spatial properties. Event sourcing preserves the complete history.

**Accumulation** creates depth over time. Earlier formations persist as lower strata, visible under certain conditions. Decay systems gradually erode unreinforced formations. Irruption systems surface buried formations when new entries resonate with old themes. The city develops **anima**—accumulated state that enables responses the user hasn't explicitly authored.

**Navigation** produces meaning. The user wanders the city, encountering formations in sequences they didn't predetermine. Juxtaposition creates unexpected connections—a grief-district adjacent to a joy-plaza forces reflection on their relationship. Lynch's five elements ensure legibility; Debord's dérive enables discovery. The act of navigation through accumulated psychic space is itself therapeutic, following Hillman: "soul-making" through spatial encounter.

**Response** completes the loop. The city's accumulated state feeds back into interpretation—the next journal entry is read in context of existing formations. The city can respond through ambient effects, agent behaviors, or structural changes. The system develops genuine counterparty quality: an other that has its own perspective on the user's inner life, surfaced through spatial form.

This is not merely a visualization of journal entries but an **externalization of psyche into navigable architecture**—a digital memory palace that grows from reflection, preserves temporal strata, and responds with its own emergent logic. The soul, written large in urban form, becomes available for exploration, understanding, and transformation.

---

## Related

- [[generative-ai-design-language]] — Memory and continuity as relationship infrastructure
- [[small-model-swarm]] — Specialized models for extracting emotional and thematic signals
- [[reasoning-traces-psyche]] — Traces as raw material for psyche modeling
