import { Task, FilterType, SortType } from './types';

export function createTask(title: string): Task {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTask(task: Task, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task {
  return {
    ...task,
    ...updates,
    updatedAt: new Date(),
  };
}

export function filterTasks(tasks: Task[], filter: FilterType): Task[] {
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'all':
    default:
      return tasks;
  }
}

export function sortTasks(tasks: Task[], sortBy: SortType): Task[] {
  const sortedTasks = [...tasks];
  
  switch (sortBy) {
    case 'name':
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    case 'created':
    default:
      return sortedTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
} 