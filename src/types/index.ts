export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  xp: number;
  content: string;
  quiz: Quiz[];
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: {
    type: 'xp' | 'modules' | 'topics';
    value: number;
  };
}

export interface User {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  achievements: string[];
  completedModules: string[];
}