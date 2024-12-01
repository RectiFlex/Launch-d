import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TokenConfig {
  name: string;
  symbol: string;
  initialSupply: string;
  features: {
    mintable: boolean;
    burnable: boolean;
    pausable: boolean;
    staking: boolean;
    governance: boolean;
    deflation: boolean;
  };
}

export interface TokenAllocation {
  category: string;
  percentage: number;
  lockPeriod: number;
}

export interface Tokenomics {
  allocations: TokenAllocation[];
  totalSupply: string;
  timestamp: number;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  completedSteps: string[];
  tokenConfig?: TokenConfig;
  tokenomics?: Tokenomics;
  contractAddress?: string;
  auditStatus?: string;
  securityScore?: number;
  teamMembers?: string[];
  launchDate?: string;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateProjectProgress: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project]
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          )
        })),
      updateProjectProgress: (id) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id === id) {
              const totalSteps = 10; // Total steps in the project lifecycle
              const progress = (project.completedSteps.length / totalSteps) * 100;
              return { ...project, progress };
            }
            return project;
          })
        }))
    }),
    {
      name: 'project-storage'
    }
  )
);