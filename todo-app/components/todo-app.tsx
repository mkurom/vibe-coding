"use client";

import { useState, useMemo } from 'react';
import { Task, FilterType, SortType } from '@/lib/types';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { createTask, updateTask, filterTasks, sortTasks, getTaskStats } from '@/lib/task-utils';
import { TaskForm } from '@/components/task-form';
import { TaskList } from '@/components/task-list';
import { TaskFilters } from '@/components/task-filters';
import { TaskStats } from '@/components/task-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TodoApp() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter);
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, sortBy]);

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  const handleAddTask = (title: string) => {
    if (title.trim()) {
      const newTask = createTask(title);
      setTasks(prev => [...prev, newTask]);
    }
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? updateTask(task, { completed: !task.completed }) : task
      )
    );
  };

  const handleUpdateTask = (id: string, title: string) => {
    if (title.trim()) {
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? updateTask(task, { title: title.trim() }) : task
        )
      );
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TODO List</h1>
          <p className="text-gray-600">シンプルで使いやすいタスク管理アプリ</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>新しいタスクを追加</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm onSubmit={handleAddTask} />
          </CardContent>
        </Card>

        <TaskStats stats={stats} onClearCompleted={handleClearCompleted} />

        <Card>
          <CardHeader>
            <TaskFilters
              filter={filter}
              sortBy={sortBy}
              onFilterChange={setFilter}
              onSortChange={setSortBy}
            />
          </CardHeader>
          <CardContent>
            <TaskList
              tasks={filteredAndSortedTasks}
              onToggle={handleToggleTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 