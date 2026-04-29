import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  Sun, Moon, RotateCcw, ChevronDown, ChevronRight, CheckSquare, Square,
  ExternalLink, Award, Briefcase, Code, Terminal, Brain, GraduationCap, Zap, BookOpen, ShieldCheck, Cpu, LogIn, LogOut
} from 'lucide-react';

// --- FIREBASE CONFIGURATION ---
// IMPORTANT: Replace this entire object with your actual keys from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDmK7CpdmsKCSj0-JEQXeNR78sy1SEMNAg",
    authDomain: "datexia-lurnex-lms.firebaseapp.com",
    projectId: "datexia-lurnex-lms",
    storageBucket: "datexia-lurnex-lms.firebasestorage.app",
    messagingSenderId: "642100250858",
    appId: "1:642100250858:web:4a39556431eb572b8baf93",
    measurementId: "G-K5TWLN8RF9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const collectionId = 'datexia-lms';
const previewAppId = typeof __app_id !== 'undefined' ? __app_id : 'datexia-lurnex-lms';

// --- COURSE DATA ---
const JOBS = [
  { role: "Sovereign AI Architect", pay: "INR 35 – 65+ LPA", desc: "Designs private, 17-layer 'Cyber Factories' for enterprises." },
  { role: "CUDA Kernel Engineer", pay: "INR 40 – 60 LPA", desc: "Optimizes hardware-level model performance (60%+ gains)." },
  { role: "Product-Minded AI Lead", pay: "INR 45 – 80+ LPA", desc: "Bridges the gap between research prototypes and software." },
  { role: "AI Safety & Alignment Engineer", pay: "INR 25 – 65 LPA", desc: "Performs Red-Teaming and preference alignment (DPO)." },
  { role: "MLOps/LLMOps Lead", pay: "INR 20 – 55 LPA", desc: "Automates CI/CD for local model retraining and deployment." },
  { role: "AI Infrastructure Engineer", pay: "INR 25 – 55 LPA", desc: "Manages local GPU clusters, vLLM, and K3s orchestration." },
  { role: "RAG Architect", pay: "INR 18 – 50 LPA", desc: "Designs advanced retrieval-augmented generation pipelines." },
  { role: "LLM Engineer", pay: "INR 20 – 50 LPA", desc: "Specialist in LoRA fine-tuning and 4-bit quantization science." },
  { role: "Agentic Systems Developer", pay: "INR 22 – 45 LPA", desc: "Builds multi-agent swarms and autonomous workflows." },
  { role: "Computer Vision Engineer", pay: "INR 15 – 35 LPA", desc: "Builds local visual-reasoning and security monitoring systems." }
];

const PROJECTS = [
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

const CURRICULUM = [
  {
    phaseId: "p1", title: "Phase I: Hardware & Software Foundations", duration: "Months 1–4", goal: "Master the environment that hosts the Cyber Factory.",
    months: [
      {
        id: "m1", title: "Month 1: The Linux Shell & Hardware Provisioning",
        course: "Essential Developer Tools: Terminal and UNIX (Rithm School)", link: "https://www.rithmschool.com/courses/",
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
        course: "Introduction to HTML, CSS, & JavaScript (IBM/Coursera)", link: "https://www.coursera.org/learn/introduction-to-html-css-javascript",
        weeks: [
          { id: "w1", text: "Week 1: Semantic HTML5" },
          { id: "w2", text: "Week 2: CSS3 Grid & Flexbox" },
          { id: "w3", text: "Week 3: ES6+ JavaScript Core Logic" },
          { id: "w4", text: "Week 4: Asynchronous Browser Rendering" }
        ],
        projects: ["Cyber Factory UI Dashboard"],
        iq: "Method: Feynman Technique (Explain rendering without jargon)"
      },
      {
        id: "m3", title: "Month 3: GitHub Mastery & Analytics",
        course: "Getting Started with Git and GitHub (IBM)", link: "https://www.coursera.org/learn/getting-started-with-git-and-github",
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
        course: "Learn TypeScript (Codecademy)", link: "https://www.codecademy.com/learn/learn-typescript",
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
    phaseId: "p2", title: "Phase II: The AI Core - Mathematical Engines", duration: "Months 5–8", goal: "Master the 'why' behind model behavior.",
    months: [
      {
        id: "m5", title: "Month 5: Linear Algebra & Matrix Calculus",
        course: "MIT 18.06: Linear Algebra (Gilbert Strang)", link: "https://web.mit.edu/18.06/www/",
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
        course: "Calculus for Machine Learning (Cursa)", link: "https://cursa.app/en/free-course/calculus-for-machine-learning-efdi",
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
        course: "Data Science: Probability (Harvard Online)", link: "https://pll.harvard.edu/course/data-science-probability",
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
        id: "m8", title: "Month 8: GitHub Mastery 2 - MLOps",
        course: "GitHub Actions Certification Prep", link: "https://learn.microsoft.com/en-us/credentials/certifications/github-actions/",
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
    phaseId: "p3", title: "Phase III: Deep Learning & Architectures", duration: "Months 9–12", goal: "Understanding the biological inspiration of AI.",
    months: [
      {
        id: "m9", title: "Month 9: Python for AI Engineering",
        course: "Machine Learning with Python (IBM)", link: "https://www.coursera.org/learn/machine-learning-with-python",
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
        course: "PyTorch for Deep Learning (DeepLearning.AI)", link: "https://www.deeplearning.ai/short-courses/pytorch-for-deep-learning/",
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
        course: "Large Language Model Fundamentals (Cornell)", link: "https://ecornell.cornell.edu/certificates/technology/large-language-model-fundamentals/",
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
        course: "CS50 AI (Harvard)", link: "https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python",
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
    phaseId: "p4", title: "Phase IV: Model Engineering & Optimization", duration: "Months 13–16", goal: "Become a 'Pro' by mastering local hardware efficiency.",
    months: [
      {
        id: "m13", title: "Month 13: Parameter-Efficient Fine-Tuning",
        course: "Fine-Tuning LLMs (DeepLearning.AI)", link: "https://www.deeplearning.ai/short-courses/finetuning-large-language-models/",
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
        course: "LLM Quantization Guide (Prem AI)", link: "https://blog.premai.io/llm-quantization-guide-gguf-vs-awq-vs-gptq-vs-bitsandbytes-compared-2026/",
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
        course: "CUDA Programming Guide (NVIDIA)", link: "https://docs.nvidia.com/cuda/",
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
        course: "GitHub Foundations (GitHub)", link: "https://resources.github.com/learn/certifications/",
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
    phaseId: "p5", title: "Phase V: Agentic Systems & Multi-Agent Swarms", duration: "Months 17–20", goal: "Autonomous logic and memory.",
    months: [
      {
        id: "m17", title: "Month 17: Retrieval-Augmented Generation",
        course: "Retrieval Augmented Generation (DeepLearning.AI)", link: "https://www.deeplearning.ai/short-courses/retrieval-augmented-generation-for-production/",
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
        course: "AI Agents Course (Hugging Face)", link: "https://huggingface.co/learn/agents-course/unit0/introduction",
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
        course: "Graph Databases Basics (Neo4j)", link: "https://graphacademy.neo4j.com/",
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
        course: "AI Red-Teaming and Security (Learn Prompting)", link: "https://learnprompting.org/courses/ai-security-masterclass",
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
    phaseId: "p6", title: "Phase VI: Distribution & Production Mastery", duration: "Months 21–24", goal: "Deploying AI as professional software.",
    months: [
      {
        id: "m21", title: "Month 21: Local Inference Engines",
        course: "Ollama/Llama.cpp Docs", link: "https://ollama.com/",
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
        course: "Tauri vs. Electron Benchmark (Dev.to)", link: "https://dev.to/manascodes13/a-new-way-to-create-desktop-applications-tauri-react-59bp",
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
        course: "MLOps: Machine Learning Operations (Duke/Coursera)", link: "https://www.coursera.org/learn/mlops-fundamentals",
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
        course: "Open Source Documentation", link: "https://opensource.guide/",
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
    phaseId: "p7", title: "Phase VII: Career Launch", duration: "Months 25–26", goal: "Secure the 20-45+ LPA package.",
    months: [
      {
        id: "m25", title: "Month 25: Interview Blitz",
        course: "Interview Preparation (Great Learning)", link: "https://www.mygreatlearning.com/academy/learn-for-free/courses/ai-interview-prep",
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
        course: "Career Portals", link: "#",
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

export default function App() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [activePhase, setActivePhase] = useState("p1");
  const [activeMonth, setActiveMonth] = useState(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    // Only sign in anonymously if there is no custom token (for preview environment)
    // For GitHub deployment, this will just listen for Google Auth state
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else if (typeof __initial_auth_token !== 'undefined') {
          // If we are in the preview environment, fall back to anonymous
          await signInAnonymously(auth);
        }
      } catch (e) { console.error("Auth Error", e); }
    };
    initAuth();
    
    const unsubAuth = onAuthStateChanged(auth, setUser);
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setProgress({});
      return;
    }
    // Using the rule-compliant path: artifacts/{appId}/users/{userId}/tracking/data
    // For a normal Firebase project, you could just use collectionId/{user.uid}
    const docPath = typeof __app_id !== 'undefined' 
      ? doc(db, 'artifacts', previewAppId, 'users', user.uid, 'tracking', 'data')
      : doc(db, collectionId, user.uid);

    const unsub = onSnapshot(docPath, (snap) => {
      if (snap.exists()) setProgress(snap.data().state || {});
      else setProgress({});
    });
    return unsub;
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to log in with Google. Check console.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleProgress = async (key) => {
    // Require real authentication if not in preview environment
    if (!user || (user.isAnonymous && typeof __initial_auth_token === 'undefined')) {
      alert("Please sign in with Google to save your progress!");
      return;
    }
    const newState = { ...progress, [key]: !progress[key] };
    const docPath = typeof __app_id !== 'undefined' 
      ? doc(db, 'artifacts', previewAppId, 'users', user.uid, 'tracking', 'data')
      : doc(db, collectionId, user.uid);
      
    await setDoc(docPath, { state: newState }, { merge: true });
  };

  const resetProgress = async () => {
    if (!user) return;
    const docPath = typeof __app_id !== 'undefined' 
      ? doc(db, 'artifacts', previewAppId, 'users', user.uid, 'tracking', 'data')
      : doc(db, collectionId, user.uid);
      
    await setDoc(docPath, { state: {} });
    setShowReset(false);
  };

  const stats = useMemo(() => {
    let total = 0;
    CURRICULUM.forEach(p => p.months.forEach(m => {
      total += m.weeks.length + m.projects.length + 1; // +1 for IQ
    }));
    const completed = Object.values(progress).filter(Boolean).length;
    const percent = total > 0 ? Math.round((completed / total
