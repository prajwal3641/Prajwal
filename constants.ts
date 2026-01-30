import { Experience, Education, Project, SkillCategory, Achievement, Certification } from './types';
import { 
  Code, 
  Server, 
  Database, 
  Layout, 
  Cpu, 
  Globe, 
  Terminal,
  Cloud
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Prajwal Rode",
  role: "Product Developer",
  location: "Pune, Maharashtra, India",
  email: "prajwalrode31@gmail.com",
  phone: "+91-9130148301",
  linkedin: "https://linkedin.com/in/prajwalrode",
  github: "https://github.com/prajwal3641",
  leetcode: "https://leetcode.com/u/Wayne_05/",
  twitter: "https://x.com/0xPrajwal_",
  bio: "I love backend engineering and distributed systems. Passionate about building scalable applications and optimizing performance.",
  // Embedded SVG Avatar: Developer Character (No external fetch required)
  avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MzY2ZjE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM0MzM4Y2E7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjkwIiByPSI1MCIgZmlsbD0iI2ZmZWRkNSIvPjxwYXRoIGQ9Ik01MCw5MCBRNTAsNDAgMTAwLDQwIFExNTAsNDAgMTUwLDkwIiBmaWxsPSIjMWUxZTFlIi8+PGcgc3Ryb2tlPSIjMWUxZTFlIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiPjxjaXJjbGUgY3g9IjgwIiBjeT0iOTUiIHI9IjEyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI5NSIgcj0iMTIiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuOCIvPjxsaW5lIHgxPSI5MiIgeTE9Ijk1IiB4Mj0iMTA4IiB5Mj0iOTUiLz48L2c+PHBhdGggZD0iTTg1IDEyMCBRMTAwIDEzMCAxMTUgMTIwIiBzdHJva2U9IiMxZTFlMWUiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik01MCAyMDAgUTEwMCAxNjAgMTUwIDIwMCBMMTUwIDIyMCBMNTAgMjIwIFoiIGZpbGw9IiMxZTFlMWUiLz48L3N2Zz4="
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
    id: "proj1",
    title: "Microservice Mania: Distributed System",
    description: [
      "Built a fault-tolerant microservices system using Spring Cloud, Eureka, API Gateway, and Resilience4J, achieving 99.9% uptime.",
      "Implemented distributed tracing and monitoring using Sleuth, Zipkin, Prometheus, and Grafana."
    ],
    tech: ["Spring Cloud", "Eureka", "Resilience4J", "Zipkin", "Grafana"],
    github: "https://github.com",
    icon: "server"
  },
  {
    id: "proj2",
    title: "Intervie – Peer-to-Peer Mock Interview",
    description: [
      "Built a real-time peer-to-peer mock interview platform matching candidates based on skills and availability.",
      "Implemented live interviews and mock Group Discussions (2–5 participants) using WebRTC.",
      "Added a smart AI-driven feedback system analyzing voice, transcripts, and code."
    ],
    tech: ["React", "Node.js", "WebRTC", "Socket.io", "AI"],
    link: "https://demo.com",
    icon: "video"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Java", "JavaScript", "C++", "Python", "TypeScript", "Rust"]
  },
  {
    category: "Frameworks & Libs",
    items: ["Spring Boot", "Spring Cloud", "React", "Angular", "Node.js", "Express"]
  },
  {
    category: "Databases & Tools",
    items: ["PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "Git"]
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
  }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert1", name: "Data Structures & Algorithms Master Course", provider: "CodeHelp" },
  { id: "cert2", name: "Spring Security 6 Zero to Master", provider: "Udemy" },
  { id: "cert3", name: "Beginning C++ Programming", provider: "Udemy" }
];