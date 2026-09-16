import resumeUrl from "@/assets/Lovish-Thukral-Resume.pdf?url";

export const PROFILE = {
  name: "Lovish Thukral",
  role: "Full Stack Software Engineer",
  discipline: "AI Systems · Backend Engineering",
  thesis: "I build systems to scale, not pages to sell.",
  neural:
    "Dealing with neural minds — and making them answer millions of requests without burning the servers.",
  email: "lavi.khatri114@outlook.com",
  github: "https://github.com/Lovish-Thukral",
  linkedin: "https://linkedin.com/in/lavi-khatri",
  location: "Ludhiana, India",
  resume: resumeUrl,
};

export const PRINCIPLES = [
  {
    id: "scale",
    title: "Scale",
    line: "What happens when the dataset, traffic, or workload grows.",
    body: "A query that returns in 8ms over 500 rows is not a query that returns in 8ms over 5 million. I design schemas, indexes and pagination for the size the data becomes, not the size it starts at.",
    metrics: ["1 → 1,000,000 requests", "keyset over offset", "index-aware schemas"],
  },
  {
    id: "efficiency",
    title: "Efficiency",
    line: "Unnecessary computation, transfer, memory and database work.",
    body: "Most latency isn't mysterious — it's redundant work. Duplicate round trips, over-fetching, unquantized weights, payloads nobody reads. I go looking for the work that shouldn't be happening at all.",
    metrics: ["fewer round trips", "quantized weights", "smaller payloads"],
  },
  {
    id: "systems",
    title: "Systems",
    line: "How components interact, not just whether they individually work.",
    body: "The interesting failures live between services: the retry that amplifies load, the cache that lies, the transaction boundary drawn in the wrong place. I think in flow, not in files.",
    metrics: ["boundaries", "state ownership", "failure propagation"],
  },
  {
    id: "ai",
    title: "AI",
    line: "Beyond API calls — into inference, deployment and local execution.",
    body: "An API key is not an AI system. Runtime selection, quantization tiers, device resources, context construction and orchestration are where the engineering actually is.",
    metrics: ["ONNX Runtime", "llama.cpp", "on-device inference"],
  },
  {
    id: "reliability",
    title: "Reliability",
    line: "A feature isn't finished because it worked once.",
    body: "The happy path is the easy 20%. What I care about is the timeout, the partial write, the reconnect, the half-submitted exam that must survive a dead browser tab.",
    metrics: ["auto-save intervals", "state sync", "predictable degradation"],
  },
] as const;

export const EXPERIENCE = [
  {
    company: "ASWEBWORKS LLP",
    role: "Software Developer Intern",
    period: "07/2026 – 10/2026",
    location: "Ludhiana, India",
    context:
      "Leading backend development for Noptch — an education and career platform spanning students, universities, courses, jobs and freelancing.",
    stages: [
      {
        node: "SCHEMA",
        detail:
          "Designed normalized PostgreSQL schemas and relational lookup structures to support new platform modules and efficient data access.",
      },
      {
        node: "QUERY",
        detail:
          "Implemented pagination across multiple endpoints to keep database queries bounded and performance stable as datasets grow.",
      },
      {
        node: "SERVICE",
        detail:
          "Solely developed the LMS backend with Node.js, Prisma ORM and MySQL — owning API design, database integration and business logic.",
      },
      {
        node: "STATE",
        detail:
          "Built exam auto-save that persists student answers at 1-minute intervals, synchronizing backend state with frontend session storage.",
      },
    ],
    stack: ["PostgreSQL", "Node.js", "Prisma ORM", "MySQL", "REST APIs"],
  },
  {
    company: "Vidya Corporation",
    role: "Full Stack Developer Trainee",
    period: "06/2025 – 07/2025",
    location: "Ludhiana, India",
    context:
      "MERN-stack training delivered through a social media application built end to end.",
    stages: [
      {
        node: "AUTH",
        detail: "JWT authentication across the request lifecycle.",
      },
      {
        node: "API",
        detail: "REST APIs for posts, likes and comments.",
      },
      {
        node: "DATA",
        detail: "MongoDB schemas modelling social relationships between entities.",
      },
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
] as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  thesis: string;
  tech: string[];
  pipeline: string[];
  notes: { label: string; value: string }[];
  points: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "sabrina",
    index: "01",
    name: "Sabrina AI",
    subtitle: "Offline Voice Assistant",
    thesis: "An assistant designed to run when the cloud isn't there.",
    tech: ["Python", "ONNX Runtime", "faster-whisper", "llama.cpp", "NeuTTS"],
    pipeline: ["VOICE", "STT", "CONTEXT", "LOCAL LLM", "TTS", "VOICE"],
    notes: [
      { label: "latency", value: "~0.5–1s after model load" },
      { label: "network", value: "none required" },
      { label: "selection", value: "device-resource aware" },
    ],
    points: [
      "Fully offline STT → local LLM → TTS pipeline using faster-whisper, llama.cpp and NeuTTS — no cloud APIs, no internet dependency.",
      "Adaptive deployment logic inspects device resources and selects the optimal model and quantization tier at startup.",
      "~0.5–1s response latency after initial model load on consumer hardware.",
    ],
  },
  {
    id: "remvo",
    index: "02",
    name: "REMVO",
    subtitle: "On-Device Background Removal",
    thesis: "AI image processing that never uploads the image.",
    tech: ["React.js", "ONNX Runtime Web", "WebGPU", "WASM"],
    pipeline: ["IMAGE", "PREPROCESS", "ONNX MODEL", "WebGPU", "POSTPROCESS", "RESULT"],
    notes: [
      { label: "model", value: "quantized ~44MB" },
      { label: "backend", value: "WebGPU, WASM fallback" },
      { label: "upload", value: "0 bytes leave device" },
    ],
    points: [
      "Browser-based background removal performed through local ONNX inference — the image stays on the device instead of being uploaded to a server.",
      "WebGPU-accelerated inference with a WASM fallback for unsupported browsers.",
      "Quantized ~44MB model chosen to keep in-browser load times practical.",
    ],
  },
  {
    id: "nextep",
    index: "03",
    name: "Nextep AI",
    subtitle: "Career Mentorship & Roadmap Platform",
    thesis: "An agent built around context, not one-shot prompting.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Groq API", "Tailwind CSS"],
    pipeline: ["USER", "PROFILE", "MEMORY", "CONTEXT", "ORCHESTRATION", "LLM", "RESPONSE"],
    notes: [
      { label: "memory", value: "contextual, persisted" },
      { label: "prompting", value: "orchestrated, multi-stage" },
      { label: "output", value: "dynamic roadmaps" },
    ],
    points: [
      "AI career mentorship platform using contextual memory and prompt orchestration to generate personalized guidance.",
      "Dynamic learning roadmaps generated from an evolving user profile rather than a single prompt.",
      "Full-stack architecture across React, Express and MongoDB.",
    ],
  },
];

export const STACK: { group: string; items: { name: string; link?: string }[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", link: "sabrina" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "SQL", link: "asweb" },
      { name: "C++" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", link: "asweb" },
      { name: "Express", link: "nextep" },
      { name: "FastAPI" },
      { name: "Django" },
      { name: "Prisma ORM", link: "asweb" },
      { name: "REST APIs", link: "asweb" },
    ],
  },
  {
    group: "Data",
    items: [
      { name: "PostgreSQL", link: "asweb" },
      { name: "MySQL", link: "asweb" },
      { name: "MongoDB", link: "nextep" },
      { name: "Supabase" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", link: "remvo" },
      { name: "Next.js" },
      { name: "Tailwind CSS", link: "nextep" },
      { name: "Framer Motion" },
    ],
  },
  {
    group: "AI Systems",
    items: [
      { name: "ONNX Runtime", link: "remvo" },
      { name: "Local Inference", link: "sabrina" },
      { name: "Llama Quantization", link: "sabrina" },
      { name: "LLM Integration", link: "nextep" },
      { name: "Prompt Orchestration", link: "nextep" },
    ],
  },
  {
    group: "Systems / Infra",
    items: [
      { name: "Linux" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Git / GitHub" },
      { name: "Postman" },
      { name: "CI/CD" },
    ],
  },
];

export const LINK_TARGETS: Record<string, string> = {
  sabrina: "Sabrina AI",
  remvo: "REMVO",
  nextep: "Nextep AI",
  asweb: "ASWEBWORKS · Noptch",
};

export const NUMBERS = [
  { value: "~0.5–1s", label: "Response latency after model load", src: "Sabrina AI" },
  { value: "~44MB", label: "Quantized model shipped to the browser", src: "REMVO" },
  { value: "24h", label: "Hackathon engineering sprint", src: "Hack-n-Win" },
  { value: "LOCAL", label: "Inference without cloud dependency", src: "Sabrina AI · REMVO" },
  { value: "1 min", label: "Exam answer auto-save interval", src: "Noptch LMS" },
];
