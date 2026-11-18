// Course data. Progress keys: <monthId>_<weekId>, <monthId>_p<i>, <monthId>_iq (do not change).
export const JOBS = [
  { role: "Sovereign AI Architect", pay: "INR 35 to 65+ LPA", desc: "Designs private, 17-layer 'Cyber Factories' for enterprises." },
  { role: "CUDA Kernel Engineer", pay: "INR 40 to 60 LPA", desc: "Optimizes hardware-level model performance (60%+ gains)." },
  { role: "Product-Minded AI Lead", pay: "INR 45 to 80+ LPA", desc: "Bridges the gap between research prototypes and software." },
  { role: "AI Safety & Alignment Engineer", pay: "INR 25 to 65 LPA", desc: "Performs Red-Teaming and preference alignment (DPO)." },
  { role: "MLOps/LLMOps Lead", pay: "INR 20 to 55 LPA", desc: "Automates CI/CD for local model retraining and deployment." },
  { role: "AI Infrastructure Engineer", pay: "INR 25 to 55 LPA", desc: "Manages local GPU clusters, vLLM, and K3s orchestration." },
  { role: "RAG Architect", pay: "INR 18 to 50 LPA", desc: "Designs advanced retrieval-augmented generation pipelines." },
  { role: "LLM Engineer", pay: "INR 20 to 50 LPA", desc: "Specialist in LoRA fine-tuning and 4-bit quantization science." },
  { role: "Agentic Systems Developer", pay: "INR 22 to 45 LPA", desc: "Builds multi-agent swarms and autonomous workflows." },
  { role: "Computer Vision Engineer", pay: "INR 15 to 35 LPA", desc: "Builds local visual-reasoning and security monitoring systems." }
];

export const PROJECTS = [
  { phase: "I", m: 1, name: "L1 Foundation Script", diff: "Beginner", focus: "Shell & Hardware Setup" },
  { phase: "I", m: 1, name: "Sovereign Portfolio Hub", diff: "Beginner", focus: "GitHub Mastery & Pages" },
  { phase: "I", m: 2, name: "Cyber Factory UI", diff: "Beginner", focus: "Full-Stack Dashboard" },
  { phase: "I", m: 3, name: "The Statistics Profiler", diff: "Beginner", focus: "Data Analytics & Python" },
  { phase: "I", m: 4, name: "L5 AI Router Proxy", diff: "Foundational", focus: "Backend Logic & TS" },
  { phase: "II", m: 5, name: "Matrix Engine", diff: "Foundational", focus: "Linear Algebra for AI" },
  { phase: "II", m: 6, name: "Loss Optimizer", diff: "Foundational", focus: "Calculus & Optimization" },
  { phase: "II", m: 7, name: "Hallucination Scorer", diff: "Intermediate", focus: "Probability & Uncertainty" },
  { phase: "II", m: 8, name: "Autonomous Deployer", diff: "Intermediate", focus: "MLOps & GitHub Actions" },
  { phase: "III", m: 9, name: "Sovereign Data Preprocessor", diff: "Intermediate", focus: "Production-Grade Python" },
  { phase: "III", m: 10, name: "Visual Security Monitor", diff: "Intermediate", focus: "Neural Networks (Vision)" },
  { phase: "III", m: 11, name: "Attention Visualizer", diff: "Advanced", focus: "Transformer Architecture" },
  { phase: "III", m: 12, name: "Synthetic Dataset Engine", diff: "Advanced", focus: "LLM Pre-training Science" },
  { phase: "III", m: 12, name: "Year-One Capstone", diff: "Intermediate", focus: "Portfolio Consolidation" },
  { phase: "IV", m: 13, name: "Domain Expert Fine-tune", diff: "Advanced", focus: "LoRA Mastery" },
  { phase: "IV", m: 14, name: "The VRAM Optimizer", diff: "Advanced", focus: "Quantization (GGUF/AWQ)" },
  { phase: "IV", m: 15, name: "The 60% Differentiator", diff: "Master", focus: "Custom CUDA Kernels" },
  { phase: "IV", m: 16, name: "Factory Security Audit", diff: "Advanced", focus: "GitHub Enterprise Admin" },
  { phase: "V", m: 17, name: "Sovereign PDF Brain", diff: "Advanced", focus: "Local RAG Systems" },
  { phase: "V", m: 18, name: "Autonomous Developer Swarm", diff: "Master", focus: "Agentic Systems (L15)" },
  { phase: "V", m: 19, name: "Self-Evolving Assistant", diff: "Advanced", focus: "Memory & State Machines" },
  { phase: "V", m: 20, name: "Safety Audit Report", diff: "Advanced", focus: "Red Teaming & Alignment" },
  { phase: "VI", m: 21, name: "Ollama Desktop Client", diff: "Intermediate", focus: "Local Inference APIs" },
  { phase: "VI", m: 22, name: "Sovereign Chat App", diff: "Advanced", focus: "Tauri & Rust Desktop Apps" },
  { phase: "VI", m: 23, name: "Auto-Scaling Factory", diff: "Master", focus: "K3s Cluster Orchestration" },
  { phase: "VI", m: 24, name: "The Cyber Factory Repo", diff: "Master", focus: "Final Stack Capstone" }
];

export const CURRICULUM = [
  {
    phaseId: "p1", title: "Phase I: Hardware & Software Foundations", duration: "Months 1 to 4", goal: "Master the environment that hosts the Cyber Factory.",
    months: [
      {
        id: "m1", title: "Month 1: The Linux Shell & Hardware Provisioning",
        description: "Lay the bedrock of your local infrastructure. In this month, you will master the Unix shell, manage rigorous server permissions, and establish the base environment required for advanced GPU orchestration.",
        course: "The Missing Semester of Your CS Education (MIT)", link: "https://missing.csail.mit.edu/",
        weeks: [
          { id: "w1", text: "Week 1: Unix Shell (Bash/Zsh) & Navigation" },
          { id: "w2", text: "Week 2: File permissions & SSH" },
          { id: "w3", text: "Week 3: Environment variables" },
          { id: "w4", text: "Week 4: Hardware & NVIDIA drivers/CUDA 12.4 Setup" }
        ],
        projects: ["L1 Foundation Script", "Sovereign Portfolio Hub"],
        iq: "IQ: Detailed Visualization (Data flow from GPU to RAM)"
      },
      {
        id: "m2", title: "Month 2: Full-Stack Web Logic",
        description: "Construct the visual layer of your Cyber Factory. You will learn to build responsive, data-rich web interfaces that allow you to monitor hardware health and model inference in real-time.",
        course: "HTML, CSS, and Javascript for Web Developers", link: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
        weeks: [
          { id: "w1", text: "Week 1: Semantic HTML5" },
          { id: "w2", text: "Week 2: CSS3 Grid & Flexbox" },
          { id: "w3", text: "Week 3: ES6+ JavaScript Core Logic" },
          { id: "w4", text: "Week 4: Asynchronous Browser Rendering" }
        ],
        projects: ["Cyber Factory UI"],
        iq: "Method: Feynman Technique (Explain rendering without jargon)"
      },
      {
        id: "m3", title: "Month 3: GitHub Mastery & Analytics",
        description: "Establish your professional version control lifecycle. You will master branch management and integrate Python analytics to profile your operational data and code repositories.",
        course: "Git and GitHub: Track Changes and Collaborate on Code (Coursera)", link: "https://www.coursera.org/learn/introduction-git-github",
        weeks: [
          { id: "w1", text: "Week 1: Git lifecycle (init, commit, merge)" },
          { id: "w2", text: "Week 2: Branching strategies" },
          { id: "w3", text: "Week 3: Markdown & Portfolio Design" },
          { id: "w4", text: "Week 4: Basic Python Analytics Profiling" }
        ],
        projects: ["The Statistics Profiler"],
        iq: "IQ: Dual N-Back Memory Training"
      },
      {
        id: "m4", title: "Month 4: Type-Safe Backend with Node.js",
        description: "Architect type-safe asynchronous routing. You will build resilient Node.js middleware to manage and authenticate traffic between your frontend dashboard and your local AI model endpoints.",
        course: "Learn TypeScript: Fundamentals", link: "https://www.codecademy.com/learn/learn-typescript-fundamentals",
        weeks: [
          { id: "w1", text: "Week 1: Asynchronous programming" },
          { id: "w2", text: "Week 2: Node.js File System (fs)" },
          { id: "w3", text: "Week 3: TypeScript interfaces" },
          { id: "w4", text: "Week 4: Local API Routing Logic" }
        ],
        projects: ["L5 AI Router Proxy"],
        iq: "Method: Blank-Page Retrieval (Months 1-3)"
      }
    ]
  },
  {
    phaseId: "p2", title: "Phase II: The AI Core: Mathematical Engines", duration: "Months 5 to 8", goal: "Master the 'why' behind model behavior.",
    months: [
      {
        id: "m5", title: "Month 5: Linear Algebra & Matrix Calculus",
        description: "Dive into the mathematical heart of AI. You will understand the vector spaces, massive matrix transformations, and eigenvalues that govern modern neural network weights and biases.",
        course: "MIT 18.06: Linear Algebra", link: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
        weeks: [
          { id: "w1", text: "Week 1: Vector spaces" },
          { id: "w2", text: "Week 2: Eigenvalues & Eigenvectors" },
          { id: "w3", text: "Week 3: Jacobians" },
          { id: "w4", text: "Week 4: Chain Rule for backpropagation" }
        ],
        projects: ["Matrix Engine"],
        iq: "IQ: Relational Reasoning (Pattern matching)"
      },
      {
        id: "m6", title: "Month 6: Multivariable Calculus & Optimization",
        description: "Master the mechanics of machine learning. Learn to visualize partial derivatives and gradient descent to mathematically prove how models minimize loss and iteratively learn.",
        course: "Multivariable Calculus (Khan Academy)", link: "https://www.khanacademy.org/math/multivariable-calculus",
        weeks: [
          { id: "w1", text: "Week 1: Gradients" },
          { id: "w2", text: "Week 2: Partial Derivatives" },
          { id: "w3", text: "Week 3: Gradient Descent Mechanics" },
          { id: "w4", text: "Week 4: 3D Weight Visualization" }
        ],
        projects: ["Loss Optimizer"],
        iq: "Method: Interleaving (Math + Coding)"
      },
      {
        id: "m7", title: "Month 7: Probability & Uncertainty",
        description: "Quantify the unknown. Use Bayesian inference and entropy mathematics to measure model uncertainty, allowing you to mathematically score and prevent hallucination risks.",
        course: "Data Science: Probability", link: "https://pll.harvard.edu/course/data-science-probability",
        weeks: [
          { id: "w1", text: "Week 1: Bayesian inference" },
          { id: "w2", text: "Week 2: Random variables" },
          { id: "w3", text: "Week 3: Entropy in prediction" },
          { id: "w4", text: "Week 4: LLM Hallucination Mathematics" }
        ],
        projects: ["Hallucination Scorer"],
        iq: "IQ: Strategic Chess"
      },
      {
        id: "m8", title: "Month 8: GitHub Mastery 2: MLOps",
        description: "Automate your infrastructure. Design CI/CD pipelines and security scanning workflows to deploy, test, and validate model updates autonomously without human intervention.",
        course: "Automate Workflows with GitHub Actions", link: "https://learn.microsoft.com/en-us/training/paths/github-actions/",
        weeks: [
          { id: "w1", text: "Week 1: GitHub Actions" },
          { id: "w2", text: "Week 2: CI/CD pipelines" },
          { id: "w3", text: "Week 3: Secret scanning" },
          { id: "w4", text: "Week 4: Automated Testing Triggers" }
        ],
        projects: ["Autonomous Deployer"],
        iq: "Method: Self-Explanation of Backpropagation"
      }
    ]
  },
  {
    phaseId: "p3", title: "Phase III: Deep Learning & Architectures", duration: "Months 9 to 12", goal: "Understanding the biological inspiration of AI.",
    months: [
      {
        id: "m9", title: "Month 9: Python for AI Engineering",
        description: "Engineer production-ready data pipelines. Clean, aggregate, and structure raw local data into high-quality formats using advanced Pandas and Scikit-learn architectures.",
        course: "Machine Learning with Python: Train Predictive Models (Coursera)", link: "https://www.coursera.org/learn/machine-learning-with-python",
        weeks: [
          { id: "w1", text: "Week 1: NumPy" },
          { id: "w2", text: "Week 2: Pandas" },
          { id: "w3", text: "Week 3: Scikit-learn" },
          { id: "w4", text: "Week 4: Classical ML workflows & Data Cleaning" }
        ],
        projects: ["Sovereign Data Preprocessor"],
        iq: "Method: Pipeline Mapping"
      },
      {
        id: "m10", title: "Month 10: PyTorch Mechanics",
        description: "Build neural architectures from scratch. Leverage PyTorch tensors and Autograd mechanisms to construct advanced vision models for local hardware security monitoring.",
        course: "Introduction to Neural Networks and PyTorch (Coursera)", link: "https://www.coursera.org/learn/deep-neural-networks-with-pytorch",
        weeks: [
          { id: "w1", text: "Week 1: Tensors" },
          { id: "w2", text: "Week 2: Autograd" },
          { id: "w3", text: "Week 3: CNNs (Vision)" },
          { id: "w4", text: "Week 4: RNNs (Text)" }
        ],
        projects: ["Visual Security Monitor"],
        iq: "Method: Architecture Replication"
      },
      {
        id: "m11", title: "Month 11: Transformer Architecture",
        description: "Deconstruct the engine of modern AI. Plot and mathematically analyze the Query/Key/Value projections and Multi-Head Attention mechanisms inside open-weights models.",
        course: "Generative AI with Large Language Models", link: "https://www.coursera.org/learn/generative-ai-with-llms",
        weeks: [
          { id: "w1", text: "Week 1: Multi-Head Attention" },
          { id: "w2", text: "Week 2: Positional Encoding" },
          { id: "w3", text: "Week 3: Encoder-Decoder logic" },
          { id: "w4", text: "Week 4: Attention Weight Extraction" }
        ],
        projects: ["Attention Visualizer"],
        iq: "IQ: Matrix Visualization"
      },
      {
        id: "m12", title: "Month 12: Pre-training & Ethics",
        description: "Generate synthetic knowledge. Explore scaling laws and utilize local teacher models to curate and filter high-quality instruction datasets for your private factory.",
        course: "CS50 AI (Harvard)", link: "https://cs50.harvard.edu/ai/",
        weeks: [
          { id: "w1", text: "Week 1: Data scaling laws" },
          { id: "w2", text: "Week 2: Distributed training (vLLM)" },
          { id: "w3", text: "Week 3: Bias Mitigation" },
          { id: "w4", text: "Week 4: Synthetic Data Generation" }
        ],
        projects: ["Synthetic Dataset Engine", "Year-One Capstone"],
        iq: "Method: Year 1 Retrieval Test"
      }
    ]
  },
  {
    phaseId: "p4", title: "Phase IV: Model Engineering & Optimization", duration: "Months 13 to 16", goal: "Become a 'Pro' by mastering local hardware efficiency.",
    months: [
      {
        id: "m13", title: "Month 13: Parameter-Efficient Fine-Tuning",
        description: "Specialize your models efficiently. Master LoRA mathematics and adapter merging to inject highly specific domain knowledge into your base fleet without retraining.",
        course: "Hugging Face LLM Course: Fine-tuning a Pretrained Model", link: "https://huggingface.co/learn/llm-course/chapter3/1",
        weeks: [
          { id: "w1", text: "Week 1: Low-rank matrices" },
          { id: "w2", text: "Week 2: NF4 quantization" },
          { id: "w3", text: "Week 3: Adapter merging" },
          { id: "w4", text: "Week 4: Unsloth Library Integration" }
        ],
        projects: ["Domain Expert Fine-tune"],
        iq: "IQ: Weight Logic Visualization"
      },
      {
        id: "m14", title: "Month 14: Quantization Science",
        description: "Maximize VRAM utilization. Compare GGUF and AWQ formats, and master weight compression science to run massive, highly-capable models on consumer-grade GPUs.",
        course: "Optimum Quantization Guide", link: "https://huggingface.co/docs/optimum/concept_guides/quantization",
        weeks: [
          { id: "w1", text: "Week 1: Weight compression (16-bit to 4-bit)" },
          { id: "w2", text: "Week 2: PagedAttention" },
          { id: "w3", text: "Week 3: vLLM clusters" },
          { id: "w4", text: "Week 4: GGUF vs AWQ Benchmarking" }
        ],
        projects: ["The VRAM Optimizer"],
        iq: "IQ: Resource Allocation Puzzles"
      },
      {
        id: "m15", title: "Month 15: CUDA & Kernel-Level Integration",
        description: "Bypass high-level API overhead. Write custom C++ CUDA kernels to directly manipulate GPU streaming multiprocessors and vastly accelerate your attention calculations.",
        course: "NVIDIA DLI: Fundamentals of Accelerated Computing with CUDA C/C++", link: "https://learn.nvidia.com/courses/course-detail?course_id=course-v1:DLI+C-AC-01+V1",
        weeks: [
          { id: "w1", text: "Week 1: GPU architecture" },
          { id: "w2", text: "Week 2: Memory layouts" },
          { id: "w3", text: "Week 3: Custom kernels writing" },
          { id: "w4", text: "Week 4: API Overhead Bypassing" }
        ],
        projects: ["The 60% Differentiator"],
        iq: "IQ: Matrix Reasoning (3D Spatial)"
      },
      {
        id: "m16", title: "Month 16: GitHub Mastery 3",
        description: "Govern the factory. Implement enterprise-grade repository rulesets, SAML SSO, and strict data leakage prevention policies to ensure complete sovereign security.",
        course: "GitHub Foundations", link: "https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/",
        weeks: [
          { id: "w1", text: "Week 1: Enterprise Governance" },
          { id: "w2", text: "Week 2: SAML SSO" },
          { id: "w3", text: "Week 3: Repo Security Policies" },
          { id: "w4", text: "Week 4: Data Leakage Prevention" }
        ],
        projects: ["Factory Security Audit"],
        iq: "Method: Security Rule Structuring"
      }
    ]
  },
  {
    phaseId: "p5", title: "Phase V: Agentic Systems & Multi-Agent Swarms", duration: "Months 17 to 20", goal: "Autonomous logic and memory.",
    months: [
      {
        id: "m17", title: "Month 17: Retrieval-Augmented Generation",
        description: "Give your AI accurate, private context. Deploy local vector databases, master semantic chunking algorithms, and build highly-cited knowledge retrieval pipelines.",
        course: "Retrieval-Augmented Generation", link: "https://www.pinecone.io/learn/retrieval-augmented-generation/",
        weeks: [
          { id: "w1", text: "Week 1: Vector databases (ChromaDB, Pinecone)" },
          { id: "w2", text: "Week 2: Semantic chunking" },
          { id: "w3", text: "Week 3: Embeddings" },
          { id: "w4", text: "Week 4: RAG Citation Mechanics" }
        ],
        projects: ["Sovereign PDF Brain"],
        iq: "IQ: Information Graphing"
      },
      {
        id: "m18", title: "Month 18: Agentic Workflows",
        description: "Orchestrate autonomous labor. Combine tool-use function calling and agentic frameworks to build swarms that can code, test, and execute complex workflows without supervision.",
        course: "AI Agents Course", link: "https://huggingface.co/learn/agents-course/unit0/introduction",
        weeks: [
          { id: "w1", text: "Week 1: Function calling" },
          { id: "w2", text: "Week 2: Multi-agent orchestration" },
          { id: "w3", text: "Week 3: crewAI implementation" },
          { id: "w4", text: "Week 4: LangGraph integration" }
        ],
        projects: ["Autonomous Developer Swarm"],
        iq: "IQ: Delegation Logic"
      },
      {
        id: "m19", title: "Month 19: Long-Term Memory",
        description: "Solve context window amnesia. Integrate graph databases to grant your agent swarms persistent memory and cross-session contextual awareness.",
        course: "Neo4j & Generative AI Fundamentals (GraphAcademy)", link: "https://graphacademy.neo4j.com/courses/genai-fundamentals/",
        weeks: [
          { id: "w1", text: "Week 1: Persistent memory (Mem0)" },
          { id: "w2", text: "Week 2: Graph databases (Neo4j)" },
          { id: "w3", text: "Week 3: Programmatic Governed Inference" },
          { id: "w4", text: "Week 4: Cross-session State Machines" }
        ],
        projects: ["Self-Evolving Assistant"],
        iq: "IQ: Memory Pathing"
      },
      {
        id: "m20", title: "Month 20: Red Teaming & Safety",
        description: "Fortify the perimeter. Perform rigorous red-teaming against prompt injections, jailbreaks, and adversarial attacks to secure your autonomous systems.",
        options: [
          { type: "Free", course: "OWASP Top 10 for LLMs", link: "https://genai.owasp.org/" },
          { type: "Paid", course: "AI Security Masterclass", link: "https://learnprompting.org/courses/ai-security-masterclass" }
        ],
        weeks: [
          { id: "w1", text: "Week 1: Prompt injection" },
          { id: "w2", text: "Week 2: Jailbreaking defense" },
          { id: "w3", text: "Week 3: LLM-as-a-Judge" },
          { id: "w4", text: "Week 4: Red Team Auditing" }
        ],
        projects: ["Safety Audit Report"],
        iq: "IQ: Adversarial Thinking"
      }
    ]
  },
  {
    phaseId: "p6", title: "Phase VI: Distribution & Production Mastery", duration: "Months 21 to 24", goal: "Deploying AI as professional software.",
    months: [
      {
        id: "m21", title: "Month 21: Local Inference Engines",
        description: "Serve the fleet. Standardize your unified API gateways to securely expose high-speed local inference to your broader private network.",
        course: "Ollama Official Documentation", link: "https://github.com/ollama/ollama",
        weeks: [
          { id: "w1", text: "Week 1: Ollama Configuration" },
          { id: "w2", text: "Week 2: Llama.cpp compilation" },
          { id: "w3", text: "Week 3: LiteLLM unified gateways" },
          { id: "w4", text: "Week 4: API Serving & CLI Design" }
        ],
        projects: ["Ollama Desktop Client"],
        iq: "IQ: Logic Architecture"
      },
      {
        id: "m22", title: "Month 22: Desktop Application Packaging",
        description: "Package AI into native software. Bundle your local inference engines into sleek, cross-platform desktop applications using the Rust programming language and Tauri.",
        course: "Tauri 2: Create a Project", link: "https://v2.tauri.app/start/create-project/",
        weeks: [
          { id: "w1", text: "Week 1: Bundling local AI" },
          { id: "w2", text: "Week 2: Cross-platform software (.dmg/.exe)" },
          { id: "w3", text: "Week 3: Tauri (Rust) Integration" },
          { id: "w4", text: "Week 4: Embedded local inference" }
        ],
        projects: ["Sovereign Chat App"],
        iq: "Method: Native Mapping"
      },
      {
        id: "m23", title: "Month 23: Scalable MLOps",
        description: "Ensure infinite scalability. Dockerize your models and orchestrate them with K3s Kubernetes to automatically spawn nodes based on inference request volume.",
        course: "Machine Learning Operations (MLOps): Getting Started (Coursera)", link: "https://www.coursera.org/learn/mlops-fundamentals",
        weeks: [
          { id: "w1", text: "Week 1: Docker for AI" },
          { id: "w2", text: "Week 2: K3s Kubernetes" },
          { id: "w3", text: "Week 3: Model registry governance" },
          { id: "w4", text: "Week 4: Node Auto-scaling based on volume" }
        ],
        projects: ["Auto-Scaling Factory"],
        iq: "IQ: Load Balancing"
      },
      {
        id: "m24", title: "Month 24: Final Portfolio & Capstone",
        description: "Complete the Cyber Factory. Synthesize the 17-layer stack, benchmark your hardware gains, and document your comprehensive portfolio for the world.",
        course: "Open Source Guide", link: "https://opensource.guide/",
        weeks: [
          { id: "w1", text: "Week 1: Finalize 'Cyber Factory' Repo" },
          { id: "w2", text: "Week 2: Document 60% hardware performance gain" },
          { id: "w3", text: "Week 3: Open-source documentation" },
          { id: "w4", text: "Week 4: Final Stack Testing" }
        ],
        projects: ["The Cyber Factory Repo"],
        iq: "Method: Full Synthesis"
      }
    ]
  },
  {
    phaseId: "p7", title: "Phase VII: Career Launch", duration: "Months 25 to 26", goal: "Land your first AI infrastructure role.",
    months: [
      {
        id: "m25", title: "Month 25: Interview Blitz",
        description: "Defend your architecture. Master the system design interview by eloquently defending your data sovereignty choices and custom hardware-level optimizations.",
        course: "Data Scientist Career Guide and Interview Preparation (Coursera)", link: "https://www.coursera.org/learn/career-guide-and-interview-prep-for-data-science-pc",
        weeks: [
          { id: "w1", text: "Week 1: System Design Interview" },
          { id: "w2", text: "Week 2: Architectural Defense Practice" },
          { id: "w3", text: "Week 3: Data sovereignty reasoning" },
          { id: "w4", text: "Week 4: Portfolio presentation skills" }
        ],
        projects: ["Mock Interview Completion"],
        iq: "IQ: Communication Drills"
      },
      {
        id: "m26", title: "Month 26: Placement & Graduation",
        description: "Launch your career. Leverage your documented portfolio to bypass automated screening and secure strong placement offers in global innovation hubs.",
        course: "Wellfound Job Portal", link: "https://wellfound.com/jobs",
        weeks: [
          { id: "w1", text: "Week 1: Apply to elite product firms" },
          { id: "w2", text: "Week 2: Bypass ATS using GitHub Portfolio" },
          { id: "w3", text: "Week 3: Offer Evaluation" },
          { id: "w4", text: "Week 4: Onboarding" }
        ],
        projects: ["Job Secured"],
        iq: "Method: Future Mapping"
      }
    ]
  }
];
