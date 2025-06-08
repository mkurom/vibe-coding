export type Operation = '+' | '-' | '×' | '÷';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForOperand: boolean;
}

export const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
};

/**
 * 四則演算を実行する
 */
export function calculate(firstValue: number, secondValue: number, operation: Operation): number {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '×':
      return firstValue * secondValue;
    case '÷':
      if (secondValue === 0) {
        throw new Error('Division by zero');
      }
      return firstValue / secondValue;
    default:
      return secondValue;
  }
}

/**
 * 数字入力を処理する
 */
export function inputNumber(state: CalculatorState, num: string): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      display: num,
      waitingForOperand: false,
    };
  }
  
  return {
    ...state,
    display: state.display === '0' ? num : state.display + num,
  };
}

/**
 * 演算子入力を処理する
 */
export function inputOperation(state: CalculatorState, nextOperation: Operation): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: inputValue,
      operation: nextOperation,
      waitingForOperand: true,
    };
  }
  
  if (state.operation) {
    const currentValue = state.previousValue || 0;
    try {
      const newValue = calculate(currentValue, inputValue, state.operation);
      return {
        ...state,
        display: String(newValue),
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true,
      };
    } catch {
      return {
        ...state,
        display: 'Error',
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      };
    }
  }

  return {
    ...state,
    operation: nextOperation,
    waitingForOperand: true,
  };
}

/**
 * 計算を実行する
 */
export function performCalculation(state: CalculatorState): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue !== null && state.operation) {
    try {
      const newValue = calculate(state.previousValue, inputValue, state.operation);
      return {
        ...state,
        display: String(newValue),
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      };
    } catch {
      return {
        ...state,
        display: 'Error',
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      };
    }
  }

  return state;
}

/**
 * 全クリア
 */
export function clearAll(): CalculatorState {
  return { ...initialState };
}

/**
 * エントリクリア
 */
export function clearEntry(state: CalculatorState): CalculatorState {
  return {
    ...state,
    display: '0',
  };
}

/**
 * 小数点入力を処理する
 */
export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.waitingForOperand) {
    return {
      ...state,
      display: '0.',
      waitingForOperand: false,
    };
  }
  
  if (state.display.indexOf('.') === -1) {
    return {
      ...state,
      display: state.display + '.',
    };
  }
  
  return state;
} 