import { useProjectStore } from '../store/useProjectStore';
import { useActivityStore } from '../store/useActivityStore';
import { v4 as uuidv4 } from 'uuid';

export const resolvers = {
  Query: {
    projects: () => {
      return useProjectStore.getState().projects;
    },
    project: (_: any, { id }: { id: string }) => {
      return useProjectStore.getState().projects.find(p => p.id === id);
    },
    featuredProjects: () => {
      return useProjectStore.getState().projects.filter(p => p.isFeatured);
    }
  },

  Mutation: {
    createProject: (_: any, { input }: { input: any }) => {
      const project = {
        id: uuidv4(),
        ...input,
        status: 'In Progress',
        progress: 0,
        completedSteps: [],
      };

      useProjectStore.getState().addProject(project);
      useActivityStore.getState().addActivity({
        id: uuidv4(),
        projectId: project.id,
        type: 'document',
        message: `Created new project: ${project.name}`,
        timestamp: Date.now()
      });

      return project;
    },

    updateProject: (_: any, { id, input }: { id: string; input: any }) => {
      useProjectStore.getState().updateProject(id, input);
      return useProjectStore.getState().projects.find(p => p.id === id);
    },

    deleteProject: (_: any, { id }: { id: string }) => {
      const projects = useProjectStore.getState().projects.filter(p => p.id !== id);
      useProjectStore.setState({ projects });
      return true;
    },

    completeStep: (_: any, { projectId, step }: { projectId: string; step: string }) => {
      const project = useProjectStore.getState().projects.find(p => p.id === projectId);
      if (!project) throw new Error('Project not found');

      const updatedSteps = [...new Set([...project.completedSteps, step])];
      useProjectStore.getState().updateProject(projectId, { completedSteps: updatedSteps });
      useProjectStore.getState().updateProjectProgress(projectId);

      useActivityStore.getState().addActivity({
        id: uuidv4(),
        projectId,
        type: 'document',
        message: `Completed step: ${step}`,
        timestamp: Date.now()
      });

      return useProjectStore.getState().projects.find(p => p.id === projectId);
    }
  }
};