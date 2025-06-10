"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (title: string) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="新しいタスクを入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        className="flex-1"
        aria-label="新しいタスクの入力"
      />
      <Button 
        type="submit" 
        disabled={!title.trim()}
        className="shrink-0"
        aria-label="タスクを追加"
      >
        <Plus className="w-4 h-4 mr-1" />
        追加
      </Button>
    </form>
  );
} 