import { Experience, Education, Project, SkillCategory, Achievement, Certification } from '../types/index';
import avatarImg from '../IMG_0610.JPG';

export const PERSONAL_INFO = {
  name: "Prajwal Rode",
  role: "Product Developer",
  location: "Pune, Maharashtra, India",
  email: "prajwalrode31@gmail.com",
  phone: "+91-9130148301",
  linkedin: "https://www.linkedin.com/in/prajwal-rode-a8858b229/",
  github: "https://github.com/prajwal3641",
  leetcode: "https://leetcode.com/u/Wayne_05/",
  twitter: "https://x.com/0xPrajwal_",
  bio: "I love backend engineering and distributed systems. Passionate about building scalable applications and optimizing performance.",
  avatar: avatarImg
};

export const EXPERIENCE: Experience[] = [
  {
    id: "exp1",
    role: "Product Developer",
    company: "EdgeVerve",
    period: "Aug 2025 – Present",
    location: "Bangalore, India",
    description: [
      "Developed and enhanced backend services using Spring Boot for an enterprise Assets and Liability Management (ALM) system used in large-scale banking environments.",
      "Improved system performance and scalability by optimizing backend logic, integrating Redis caching, and tuning PostgreSQL queries, achieving 35–40% faster API response times.",
      "Upgraded frontend from Angular 17 to Angular 19, reducing initial page load time by 25% and improving overall user experience.",
      "Resolved critical production bottlenecks by redesigning parts of the system architecture and applying caching and query optimization strategies to ensure high availability."
    ]
  },
  {
    id: "exp2",
    role: "Product Developer Intern",
    company: "EdgeVerve",
    period: "Feb 2025 – Jul 2025",
    location: "Bangalore, India",
    description: [
      "Migrated legacy Node.js microservices to a scalable Spring Boot architecture, improving maintainability and delivering a 35% performance improvement.",
      "Built and optimized high-throughput REST APIs using Spring Boot, PostgreSQL, and Redis, significantly reducing database load.",
      "Implemented core components of the ALM module, including ETL pipelines and transactional workflows in a distributed system."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "Dr. D.Y. Patil Institute of Technology, Pune",
    period: "2021 – 2025",
    score: "CGPA: 8.32",
    location: "Pune, India"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj2",
    title: "intervie.co",
    description: [
      "Built a real-time peer-to-peer mock interview platform matching candidates based on skills and availability.",
      "Implemented live interviews and mock Group Discussions (2–5 participants) using WebRTC.",
      "Added a smart AI-driven feedback system analyzing voice, transcripts, and code."
    ],
    tech: ["React", "Node.js", "WebRTC", "Socket.io", "AI"],
    link: "https://intervie.co",
    icon: "video",
    previewImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    timeline: [
        { date: "Jan 26, 2026", title: "Project Started", description: "Began conceptualizing the core idea for intervie.co." },
        { date: "Jan 30, 2026", title: "Market Research", description: "Analyzed existing mock interview platforms and gathered user requirements." },
        { date: "Feb 2, 2026", title: "Schema Design", description: "Designed the foundational database schema and data models." },
        { date: "Feb 3, 2026", title: "APIs Design (v1)", description: "Drafted the initial version of the core backend APIs." },
        { date: "Feb 10, 2026", title: "Frontend Pages Design", description: "Completed UI/UX design and began building the React frontend." },
        { date: "Feb 18, 2026", title: "Basic MVP Done", description: "Minimum Viable Product was fully functional with core mock interview flows." },
        { date: "Feb 28, 2026", title: "Auth & Deploy", description: "Implemented secure authentication and deployed the application to production." },
        { date: "Mar 5, 2026", title: "Domain Live", description: "Purchased the official domain and went live to the public!" },
        { date: "Mar 10, 2026", title: "20+ Active Users", description: "Crossed our first major milestone with over 20 active users on the platform." }
    ]
  },
  {
    id: "proj1",
    title: "Microservice Mania: Distributed System",
    description: [
      "Built a fault-tolerant microservices system using Spring Cloud, Eureka, API Gateway, and Resilience4J, achieving 99.9% uptime.",
      "Implemented distributed tracing and monitoring using Sleuth, Zipkin, Prometheus, and Grafana."
    ],
    tech: ["Spring Cloud", "Eureka", "Resilience4J", "Zipkin", "Grafana"],
    github: "https://github.com",
    icon: "server",
    previewImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
    timeline: [
        { date: "Mar 2023", title: "Architecture Design", description: "Finalized the microservices architecture using Spring Cloud components." },
        { date: "May 2023", title: "Service Discovery via Eureka", description: "Implemented Eureka for dynamic scaling and service discovery." },
        { date: "Jul 2023", title: "Tracing & Metrics", description: "Added Zipkin and Sleuth for distributed event tracing, Prometheus and Grafana for metrics visualization." },
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Java", "JavaScript", "C++", "Python", "TypeScript", "Rust"]
  },
  {
    category: "Technologies",
    items: ["Spring Boot", "Node.js", "React", "Angular", "Agentic AI", "n8n", "PostgreSQL", "MongoDB", "Docker", "AWS", "Kubernetes"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Linux", "VS Code", "IntelliJ IDEA", "Eclipse"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach1",
    title: "LeetCode Rating: 1804 (Max)",
    description: "Ranked 489 worldwide in Biweekly Contest 148 (Top 1.6% globally)."
  },
  {
    id: "ach2",
    title: "Rank 366 Worldwide",
    description: "LeetCode Weekly Contest 468."
  },
  {
    id: "ach3",
    title: "Top 5 Finalist",
    description: "Rabbit AI Hiring Show Hackathon (100+ teams)."
  },
  {
    id: "ach4",
    title: "DSA Proficiency",
    description: "Solved 400+ DSA problems on LeetCode and GFG."
  },
  {
    id: "ach5",
    title: "Secured 2nd Rank",
    description: "College-level DSA contest (ITSA Club, Coding Ninjas)."
  }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert1", name: "Data Structures & Algorithms Master Course", provider: "CodeHelp" },
  { id: "cert2", name: "Spring Security 6 Zero to Master", provider: "Udemy" },
  { id: "cert3", name: "Beginning C++ Programming", provider: "Udemy" }
];