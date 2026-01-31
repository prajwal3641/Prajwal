export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string[];
  tech: string[];
  link?: string;
  github?: string;
  icon?: string; 
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
}