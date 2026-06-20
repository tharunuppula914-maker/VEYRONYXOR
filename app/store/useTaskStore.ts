import { create } from 'zustand';
import { Task } from '@/types';

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  archiveTask: (id: string) => void;
  duplicateTask: (id: string) => void;
  setSelectedTask: (task: Task | null) => void;
  filterTasks: (filterFn: (task: Task) => boolean) => void;
  getTodaysTasks: () => Task[];
  getTasksByStatus: (status: Task['status']) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  selectedTask: null,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  archiveTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, archivedAt: new Date() } : t
      ),
    })),

  duplicateTask: (id) =>
    set((state) => {
      const taskToDuplicate = state.tasks.find((t) => t.id === id);
      if (!taskToDuplicate) return state;

      const newTask = {
        ...taskToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        tasks: [...state.tasks, newTask],
      };
    }),

  setSelectedTask: (task) =>
    set({
      selectedTask: task,
    }),

  filterTasks: (filterFn) =>
    set((state) => ({
      filteredTasks: state.tasks.filter(filterFn),
    })),

  getTodaysTasks: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const state = get();
    return state.tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate >= today &&
        task.dueDate < tomorrow
    );
  },

  getTasksByStatus: (status) => {
    const state = get();
    return state.tasks.filter((task) => task.status === status);
  },
}));