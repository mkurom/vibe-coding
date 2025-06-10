"use client";

import { FilterType, SortType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Filter, ArrowUpDown } from 'lucide-react';

interface TaskFiltersProps {
  filter: FilterType;
  sortBy: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export function TaskFilters({ filter, sortBy, onFilterChange, onSortChange }: TaskFiltersProps) {
  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'すべて' },
    { value: 'active', label: '未完了' },
    { value: 'completed', label: '完了済み' },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'created', label: '作成日時' },
    { value: 'name', label: '名前順' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <CardTitle className="flex items-center gap-2">
        <Filter className="w-5 h-5" />
        タスク一覧
      </CardTitle>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-1">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange(option.value)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-1">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <div className="flex gap-1">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortChange(option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 