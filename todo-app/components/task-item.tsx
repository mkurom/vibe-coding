"use client";

import { useState } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      task.completed && "bg-gray-50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1"
            aria-label={`${task.title}を${task.completed ? '未完了' : '完了'}にする`}
          />
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={100}
                  className="flex-1"
                  autoFocus
                  aria-label="タスクの編集"
                />
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!editTitle.trim()}
                  aria-label="変更を保存"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  aria-label="編集をキャンセル"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <h3 className={cn(
                  "text-sm font-medium leading-relaxed",
                  task.completed && "line-through text-gray-500"
                )}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    作成: {formatDate(task.createdAt)}
                  </Badge>
                  {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                    <Badge variant="outline" className="text-xs">
                      更新: {formatDate(task.updatedAt)}
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEdit}
                aria-label="タスクを編集"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                aria-label="タスクを削除"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 