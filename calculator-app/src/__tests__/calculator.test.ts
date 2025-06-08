import {
  calculate,
  inputNumber,
  inputOperation,
  performCalculation,
  clearAll,
  clearEntry,
  inputDecimal,
  initialState,
  type CalculatorState,
} from '@/lib/calculator';

describe('Calculator Logic', () => {
  describe('calculate function', () => {
    it('should perform addition correctly', () => {
      expect(calculate(5, 3, '+')).toBe(8);
      expect(calculate(0, 0, '+')).toBe(0);
      expect(calculate(-5, 3, '+')).toBe(-2);
    });

    it('should perform subtraction correctly', () => {
      expect(calculate(5, 3, '-')).toBe(2);
      expect(calculate(0, 5, '-')).toBe(-5);
      expect(calculate(-5, -3, '-')).toBe(-2);
    });

    it('should perform multiplication correctly', () => {
      expect(calculate(5, 3, '×')).toBe(15);
      expect(calculate(0, 5, '×')).toBe(0);
      expect(calculate(-5, 3, '×')).toBe(-15);
    });

    it('should perform division correctly', () => {
      expect(calculate(15, 3, '÷')).toBe(5);
      expect(calculate(0, 5, '÷')).toBe(0);
      expect(calculate(-15, 3, '÷')).toBe(-5);
    });

    it('should throw error for division by zero', () => {
      expect(() => calculate(5, 0, '÷')).toThrow('Division by zero');
    });
  });

  describe('inputNumber function', () => {
    it('should replace display when waiting for operand', () => {
      const state: CalculatorState = {
        ...initialState,
        waitingForOperand: true,
        display: '5'
      };
      const result = inputNumber(state, '3');
      expect(result.display).toBe('3');
      expect(result.waitingForOperand).toBe(false);
    });

    it('should append to display when not waiting for operand', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '5'
      };
      const result = inputNumber(state, '3');
      expect(result.display).toBe('53');
    });

    it('should replace "0" display with new number', () => {
      const result = inputNumber(initialState, '5');
      expect(result.display).toBe('5');
    });
  });

  describe('inputOperation function', () => {
    it('should set operation and previousValue when no previous value exists', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '5'
      };
      const result = inputOperation(state, '+');
      expect(result.previousValue).toBe(5);
      expect(result.operation).toBe('+');
      expect(result.waitingForOperand).toBe(true);
    });

    it('should perform calculation when operation already exists', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '3',
        previousValue: 5,
        operation: '+'
      };
      const result = inputOperation(state, '-');
      expect(result.display).toBe('8'); // 5 + 3 = 8
      expect(result.previousValue).toBe(8);
      expect(result.operation).toBe('-');
    });

    it('should handle division by zero in chained operations', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '0',
        previousValue: 5,
        operation: '÷'
      };
      const result = inputOperation(state, '+');
      expect(result.display).toBe('Error');
      expect(result.previousValue).toBe(null);
      expect(result.operation).toBe(null);
    });
  });

  describe('performCalculation function', () => {
    it('should calculate result when operation exists', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '3',
        previousValue: 5,
        operation: '+'
      };
      const result = performCalculation(state);
      expect(result.display).toBe('8');
      expect(result.previousValue).toBe(null);
      expect(result.operation).toBe(null);
      expect(result.waitingForOperand).toBe(true);
    });

    it('should return unchanged state when no operation exists', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '5'
      };
      const result = performCalculation(state);
      expect(result).toEqual(state);
    });

    it('should handle division by zero', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '0',
        previousValue: 5,
        operation: '÷'
      };
      const result = performCalculation(state);
      expect(result.display).toBe('Error');
      expect(result.previousValue).toBe(null);
      expect(result.operation).toBe(null);
    });
  });

  describe('clearAll function', () => {
    it('should reset to initial state', () => {
      const result = clearAll();
      expect(result).toEqual(initialState);
    });
  });

  describe('clearEntry function', () => {
    it('should clear display only', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '123',
        previousValue: 5,
        operation: '+'
      };
      const result = clearEntry(state);
      expect(result.display).toBe('0');
      expect(result.previousValue).toBe(5);
      expect(result.operation).toBe('+');
    });
  });

  describe('inputDecimal function', () => {
    it('should add decimal point to existing number', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '5'
      };
      const result = inputDecimal(state);
      expect(result.display).toBe('5.');
    });

    it('should not add decimal point if already exists', () => {
      const state: CalculatorState = {
        ...initialState,
        display: '5.5'
      };
      const result = inputDecimal(state);
      expect(result.display).toBe('5.5');
    });

    it('should start with "0." when waiting for operand', () => {
      const state: CalculatorState = {
        ...initialState,
        waitingForOperand: true
      };
      const result = inputDecimal(state);
      expect(result.display).toBe('0.');
      expect(result.waitingForOperand).toBe(false);
    });
  });
}); 