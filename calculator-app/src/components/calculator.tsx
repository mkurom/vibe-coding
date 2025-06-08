"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  type CalculatorState, 
  type Operation,
  initialState,
  inputNumber as inputNumberLogic,
  inputOperation as inputOperationLogic,
  performCalculation as performCalculationLogic,
  clearAll as clearAllLogic,
  clearEntry as clearEntryLogic,
  inputDecimal as inputDecimalLogic
} from "@/lib/calculator";

export function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const inputNumber = (num: string) => {
    setState(prevState => inputNumberLogic(prevState, num));
  };

  const inputOperation = (nextOperation: Operation) => {
    setState(prevState => inputOperationLogic(prevState, nextOperation));
  };

  const performCalculation = () => {
    setState(prevState => performCalculationLogic(prevState));
  };

  const clearAll = () => {
    setState(clearAllLogic());
  };

  const clearEntry = () => {
    setState(prevState => clearEntryLogic(prevState));
  };

  const inputDecimal = () => {
    setState(prevState => inputDecimalLogic(prevState));
  };

  const CalculatorButton = ({ 
    onClick, 
    children, 
    variant = "outline",
    className = ""
  }: {
    onClick: () => void;
    children: React.ReactNode;
    variant?: "default" | "outline" | "secondary" | "destructive";
    className?: string;
  }) => (
    <Button
      onClick={onClick}
      variant={variant}
      size="lg"
      className={`h-14 text-lg font-semibold ${className}`}
    >
      {children}
    </Button>
  );

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">電卓</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ディスプレイ */}
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <div 
            className="text-right text-3xl font-mono font-bold overflow-hidden"
            data-testid="calculator-display"
          >
            {state.display}
          </div>
        </div>

        {/* ボタングリッド */}
        <div className="grid grid-cols-4 gap-2">
          {/* 1行目 */}
          <CalculatorButton onClick={clearAll} variant="destructive">
            AC
          </CalculatorButton>
          <CalculatorButton onClick={clearEntry} variant="secondary">
            CE
          </CalculatorButton>
          <CalculatorButton onClick={() => inputOperation("÷")} variant="default">
            ÷
          </CalculatorButton>
          <CalculatorButton onClick={() => inputOperation("×")} variant="default">
            ×
          </CalculatorButton>

          {/* 2行目 */}
          <CalculatorButton onClick={() => inputNumber("7")}>
            7
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("8")}>
            8
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("9")}>
            9
          </CalculatorButton>
          <CalculatorButton onClick={() => inputOperation("-")} variant="default">
            -
          </CalculatorButton>

          {/* 3行目 */}
          <CalculatorButton onClick={() => inputNumber("4")}>
            4
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("5")}>
            5
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("6")}>
            6
          </CalculatorButton>
          <CalculatorButton onClick={() => inputOperation("+")} variant="default">
            +
          </CalculatorButton>

          {/* 4行目 */}
          <CalculatorButton onClick={() => inputNumber("1")}>
            1
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("2")}>
            2
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("3")}>
            3
          </CalculatorButton>
          <CalculatorButton 
            onClick={performCalculation} 
            variant="default"
            className="row-span-2 h-[calc(theme(spacing.14)*2+theme(spacing.2))]"
          >
            =
          </CalculatorButton>

          {/* 5行目 */}
          <CalculatorButton 
            onClick={() => inputNumber("0")}
            className="col-span-2"
          >
            0
          </CalculatorButton>
          <CalculatorButton onClick={inputDecimal}>
            .
          </CalculatorButton>
        </div>
      </CardContent>
    </Card>
  );
} 