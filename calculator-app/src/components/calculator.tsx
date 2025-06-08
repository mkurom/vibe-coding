"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
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
          <div className="text-right text-3xl font-mono font-bold overflow-hidden">
            {display}
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