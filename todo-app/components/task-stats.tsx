"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Trash2 } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
  };
  onClearCompleted: () => void;
}

export function TaskStats({ stats, onClearCompleted }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="font-medium">タスク統計</span>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                全体: {stats.total}
              </Badge>
              <Badge variant="default" className="text-xs bg-green-600">
                完了: {stats.completed}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                未完了: {stats.active}
              </Badge>
              {stats.total > 0 && (
                <Badge variant="outline" className="text-xs">
                  進捗: {completionRate}%
                </Badge>
              )}
            </div>
          </div>

          {stats.completed > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearCompleted}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              完了済みを削除
            </Button>
          )}
        </div>

        {stats.total > 0 && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 