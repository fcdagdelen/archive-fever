---
title: "Building a small model swarm for psychographic graph modeling"
date: 2025-01-03
tags:
  - ai-systems/small-models
  - ai-systems/knowledge-graphs
  - ai-systems/cognitive-architecture
summary: |
  Production-ready architecture using LangGraph orchestration, Graphiti temporal knowledge graphs, and specialized 1-7B models for NER/emotion extraction. Complete stack costs under $50/month at prototype scale with sub-second latency.
---

# Building a small model swarm for psychographic graph modeling

A production-ready psychographic modeling system using small model swarms is achievable today using **LangGraph** for orchestration, **Graphiti** (Zep AI) for temporal knowledge graphs, specialized HuggingFace models for NER/emotion extraction, and **Groq** for ultra-fast frontier LLM calls. The complete stack costs under $50/month at prototype scale, runs on consumer hardware with 8GB+ VRAM, and can process conversations into evolving graph structures with sub-second latency. The key architectural insight is that **specialized small models (1-7B parameters) outperform general-purpose LLMs on narrow tasks** like entity extraction and emotion detection while being 100x cheaper to run.

## Orchestration architecture: LangGraph with semantic routing

The orchestration layer determines how the frontier LLM (Claude) coordinates specialized small models. **LangGraph** emerges as the optimal framework for this use case due to its graph-based state management, native supervisor/worker patterns, and fine-grained control over task routing. CrewAI offers faster prototyping but less control; AutoGen excels at research scenarios but struggles with smaller models; DSPy optimizes prompts but lacks multi-agent orchestration.

The recommended routing pattern combines **semantic routing** (embedding-based, no LLM cost) for obvious task categorization with **frontier LLM routing** (GPT-4o-mini at $0.00015 per decision) for complex cases. This hybrid approach reduces frontier model costs by 90%+ while maintaining routing accuracy.

```python
# Hybrid routing architecture
from semantic_router import Route, SemanticRouter
from langgraph_supervisor import create_supervisor

# Semantic router handles 95% of obvious cases (no LLM call)
routes = [
    Route(name="entity_extraction", utterances=["who", "person", "company", "named"]),
    Route(name="emotion_analysis", utterances=["feel", "emotion", "sentiment", "mood"]),
    Route(name="relation_inference", utterances=["relationship", "connected", "knows"])
]
semantic_router = SemanticRouter(routes=routes, encoder=embedding_model)

# Frontier LLM supervisor handles complex routing decisions
workflow = create_supervisor(
    [ner_agent, emotion_agent, relation_agent],
    model=ChatOpenAI(model="gpt-4o-mini"),
    prompt="Route to specialists: NER for entities, EMOTION for feelings, RELATION for connections"
)
```

For local multi-model serving, **Ollama** provides the simplest path to running multiple quantized models simultaneously. A single RTX 3090/4090 (24GB VRAM) can run 3-4 small models concurrently using GGUF Q4_K_M quantization, achieving 35-60 tokens/second per model.

## Temporal knowledge graphs with Graphiti and Neo4j

The graph layer must handle **continuous updates** from streaming conversation data, **temporal tracking** of relationship evolution, and **entity resolution** across mentions. **Graphiti** (github.com/getzep/graphiti, 20K+ stars) by Zep AI specifically addresses these requirements with a bi-temporal model that tracks both when relationships became true in reality and when the system learned about them.

Graphiti's architecture separates entities from their temporal states, automatically invalidates outdated information when contradictions appear, and achieves P95 retrieval latency of **~300ms without LLM calls during retrieval**. The critical Cypher pattern for temporal relationships:

```
// Bi-temporal relationship tracking
CREATE (person)-[:BELIEVES {
    valid_from: date("2024-01-15"),    // When relationship became true
    valid_to: null,                     // Still valid (or date when ended)
    transaction_time: datetime(),       // When we learned this
    source: "conversation_session_42",
    confidence: 0.87
}]->(concept)
```

For simpler prototypes, **Neo4j's official neo4j-graphrag package** provides a complete pipeline from text to entities to graph with built-in entity resolution:

```python
from neo4j_graphrag.experimental.pipeline.kg_builder import SimpleKGPipeline

kg_builder = SimpleKGPipeline(
    llm=OpenAILLM(model_name="gpt-4o"),
    driver=neo4j_driver,
    embedder=OpenAIEmbeddings(model="text-embedding-3-large"),
    entities=["Person", "Emotion", "Belief", "Event", "Topic"],
    relations=["EXPRESSED", "BELIEVES", "RELATED_TO", "TRIGGERED"]
)
await kg_builder.run_async(text=conversation_text)
```

The choice between **NetworkX** (in-memory) and **Neo4j** depends on scale: NetworkX handles <100K nodes with sub-second operations but lacks persistence; Neo4j handles billions of nodes with ACID transactions but adds operational complexity. For weekend prototypes, start with NetworkX and migrate to Neo4j when graph size exceeds memory.

## Specialized small models for extraction and affect detection

The small model swarm requires four specialized capabilities: **named entity recognition**, **open relation extraction**, **emotion detection**, and **semantic embeddings**. Each has optimal HuggingFace models with specific tradeoffs.

### Entity extraction models

**GLiNER** (github.com/urchade/GLiNER) represents the state-of-art for zero-shot NER, outperforming ChatGPT on custom entity types without fine-tuning. The recommended variants:

| Model | Size | Best For | F1 Score |
| --- | --- | --- | --- |
| `urchade/gliner_multi` | 1.33GB | General zero-shot NER | Outperforms GPT-3.5 |
| `knowledgator/gliner-multitask-large-v0.5` | ~1.5GB | NER + relation extraction combined | Comparable to dedicated models |
| `numind/NuNER_Zero` | ~500MB | Fast zero-shot | +3.1% F1 over GLiNER-large-v2.1 |
| `knowledgator/gliner-pii-base-v1.0` | ~300MB | PII detection | 80.99% F1 |

### Relation extraction models

**REBEL** (`Babelscape/rebel-large`, 1.4GB) extracts 200+ relation types as a seq2seq task with **76.65% Macro F1 on CoNLL04**. For conversations specifically, the model handles implicit relations well but requires post-processing to parse triplet format. The alternative `relik-ie/relik-relation-extraction-small` provides faster inference with Wikidata property predictions.

### Emotion detection models

GoEmotions-trained models detect **28 fine-grained emotions** beyond simple sentiment. The production-ready option is `SamLowe/roberta-base-go_emotions` (~500MB) with ONNX variant for 75% size reduction. For cutting-edge performance, `cirimus/modernbert-large-go-emotions` (December 2024) leverages ModernBERT architecture improvements.

Key emotions detected: admiration, amusement, anger, annoyance, approval, caring, confusion, curiosity, desire, disappointment, disapproval, disgust, embarrassment, excitement, fear, gratitude, grief, joy, love, nervousness, optimism, pride, realization, relief, remorse, sadness, surprise, neutral.

### Psychological state inference

Personality trait detection is possible via `KevSun/Personality_LM` (80% accuracy, 79% F1 on Big Five traits). **Cognitive distortion detection** (rumination, catastrophizing, overgeneralizing) achieves F1=0.62 in research—comparable to clinical raters—but lacks public production models. This represents a custom fine-tuning opportunity using the CrowdDist dataset (15 cognitive distortion categories).

### Memory requirements summary

| Configuration | Total VRAM/RAM | Models Included |
| --- | --- | --- |
| Minimal (~1.5GB) | GLiNER-small + mrebel-base + GoEmotions + MiniLM-L6 | Basic extraction |
| Full (~4GB) | GLiNER-multi + REBEL-large + ModernBERT-emotions + mpnet-base + Personality_LM | Complete psychographic pipeline |

## Infrastructure for sub-second inference

### Fast inference APIs comparison

**Groq** delivers the fastest available inference using custom LPU hardware, achieving **840 tokens/second for Llama 3.1 8B** at $0.05/$0.08 per million tokens (input/output). This makes Groq optimal for the frontier LLM orchestrator when latency matters more than cost.

**Together.ai** provides the best small model ecosystem, including BGE embeddings at **$0.01 per million tokens** and batch API with 50% cost reduction. Together also hosts fine-tuned variants of emotion/NER models.

| Provider | Llama 8B Speed | 8B Pricing ($/M tokens) | Embeddings | Best For |
| --- | --- | --- | --- | --- |
| Groq | 840 TPS | $0.05-0.08 | ❌ | Ultra-low latency chat |
| Together.ai | 4x vLLM | $0.18-0.18 | ✅ $0.01/M | Multi-model workflows |
| Fireworks.ai | 300 TPS | ~$0.20 | Via custom | Cost-effective scale |
| HuggingFace Endpoints | Variable | $0.50-6.50/hr | ✅ All models | Specialized models |

### Real-time graph visualization

For streaming graph updates, **Cytoscape.js** handles thousands of nodes efficiently with built-in force-directed layouts and Canvas/WebGL rendering. The critical pattern is **batched WebSocket updates** (100ms intervals) to prevent render thrashing:

```jsx
// React + Cytoscape.js + WebSocket batching pattern
const bufferRef = useRef([]);

useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = (event) => bufferRef.current.push(JSON.parse(event.data));

  const interval = setInterval(() => {
    if (bufferRef.current.length > 0) {
      cyRef.current.add(bufferRef.current);
      cyRef.current.layout({ name: 'cose', animate: true }).run();
      bufferRef.current = [];
    }
  }, 100);
  return () => { ws.close(); clearInterval(interval); };
}, []);
```

Performance thresholds: D3.js handles 100-500 nodes in SVG; Cytoscape.js/vis.js handle 1,000s in Canvas; Sigma.js/Cosmos handle 10,000+ with WebGL.

## Research landscape and existing implementations

### Academic foundations

The most relevant paper is **"TOBUGraph: Graph-Based Approach for Conversational AI-Driven Personal Memory"** (arXiv 2412.05447, December 2024), which demonstrates graph-based retrieval outperforming standard RAG for personal memory capture. For personality modeling, **"Personality Traits in Large Language Models"** (Serapio-García et al., Google Research, Nature Machine Intelligence 2025) establishes rigorous psychometric methodology for LLM personality measurement.

The **extended mind thesis** (Clark & Chalmers, 1998) provides theoretical grounding: external memory systems that are constantly accessible, directly available, and automatically endorsed become cognitive extensions. Recent work on **Extended Mind Transformers** (arXiv 2406.02332) implements this via attention-based retrieval from external memory banks, achieving superior performance on long-sequence tasks.

### Production implementations

Three major open-source projects implement variations of this architecture:

- **Letta/MemGPT** (github.com/letta-ai/letta, 16K+ stars): OS-inspired two-tier memory with self-editing capabilities. Treats memory management as tool use, enabling LLMs to page information in/out of context.
- **Mem0** (github.com/mem0ai/mem0, 22K+ stars): Hybrid architecture combining graph, vector, and key-value stores. Production-ready with cloud offering and 500K+ downloads.
- **Graphiti** (github.com/getzep/graphiti, 20K+ stars): Temporal knowledge graph specifically designed for evolving user interactions. Features bi-temporal tracking, automatic entity resolution, and MCP server integration for Claude Desktop.

### Cognitive architecture reference

**SOAR** (soar.eecs.umich.edu) provides the most mature cognitive architecture pattern for memory/reasoning systems, featuring episodic memory, semantic memory, and reinforcement learning modules. Its working memory uses symbolic graph structures—directly applicable to the knowledge graph layer of this system.

## Weekend proof-of-concept architecture

The following stack enables a working prototype in 2-3 days:

```
┌─────────────────────────────────────────────────────────────┐
│                    React + Cytoscape.js                      │
│                 (Real-time graph visualization)              │
│                    State: Zustand + WebSocket                │
└─────────────────────────────────────────────────────────────┘
                              ↑ WebSocket (100ms batched)
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend                           │
│              Redis Streams for message queue                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              LangGraph Supervisor + Semantic Router          │
│           Frontier: GPT-4o-mini via Groq ($0.05/M)          │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐
│  GLiNER     │    │  GoEmotions     │    │  REBEL           │
│  (NER)      │    │  (Emotion)      │    │  (Relations)     │
│  via Ollama │    │  via HF API     │    │  via HF API      │
└─────────────┘    └─────────────────┘    └──────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Graphiti + Neo4j Aura Free                  │
│           (Temporal knowledge graph persistence)             │
└─────────────────────────────────────────────────────────────┘
```

### Day 1: Core pipeline

1. Set up Neo4j Aura Free (cloud) or local Docker instance
2. Install Graphiti: `pip install graphiti-core`
3. Create FastAPI endpoint for conversation ingestion
4. Wire GLiNER for entity extraction (local via transformers)
5. Add GoEmotions classifier for affect detection

### Day 2: Orchestration and visualization

1. Implement LangGraph supervisor with semantic routing
2. Connect Redis Streams for async model coordination
3. Build React frontend with Cytoscape.js
4. Implement WebSocket connection with update batching
5. Create basic graph layout with emotion-colored nodes

### Day 3: Integration and refinement

1. Add REBEL for relation extraction
2. Implement entity resolution using embedding similarity (0.85+ threshold)
3. Add temporal tracking to relationships
4. Create longitudinal affect tracking (rolling window analysis)
5. Polish visualization with animation and filtering

### Cost breakdown (monthly, prototype scale)

| Component | Cost |
| --- | --- |
| Groq API (frontier routing) | ~$5 |
| Together.ai (embeddings) | ~$2 |
| HuggingFace Inference API | ~$10 |
| Neo4j Aura Free | $0 |
| Total | **~$17/month** |

## Conclusion: Key architectural decisions

The small model swarm pattern succeeds because **task specialization beats general capability** for narrow NLP tasks. GLiNER's zero-shot NER, GoEmotions' 28-class detection, and REBEL's relation extraction each exceed what frontier LLMs achieve on these specific tasks while running at 1/100th the cost.

Three novel insights emerged from this research: First, **Graphiti's bi-temporal model** solves the critical problem of tracking belief evolution—essential for psychographic modeling where someone's attitudes change over time. Second, **semantic routing** (embedding-based task classification) can handle 95%+ of routing decisions without any LLM call, dramatically reducing orchestration costs. Third, the **extended mind thesis** provides theoretical grounding for treating the knowledge graph not just as storage but as an active cognitive extension that shapes reasoning.

The gap between current capabilities and production readiness lies primarily in **cognitive distortion detection**. While research achieves clinical-rater-comparable performance (F1=0.62), no public models exist—representing the most valuable custom training opportunity for genuine psychographic modeling.

---

## Related

- [[psyche-polis]] — Multi-agent LLM systems for extracting emotional and thematic signals
- [[llm-kg-benchmarks]] — Evaluation frameworks for knowledge graph operations
- [[memory-architectures-frontier-ai]] — Memory systems in frontier AI reveal divergent design philosophies
