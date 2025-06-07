"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, RotateCcw } from "lucide-react";

export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">カウンター</CardTitle>
        <CardDescription>
          ボタンをクリックして数値を変更できます
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-4">
            {count}
          </div>
        </div>
        
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={decrement}
            className="flex items-center gap-2"
          >
            <Minus className="h-4 w-4" />
            減少
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            リセット
          </Button>
          
          <Button
            size="lg"
            onClick={increment}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            増加
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          現在の値: {count}
        </div>
      </CardContent>
    </Card>
  );
} 