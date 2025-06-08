import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from '@/components/calculator';

describe('Calculator Component Integration Tests', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  // Helper function to get display value from the calculator display area
  const getDisplayValue = () => {
    const displayArea = screen.getByTestId('calculator-display');
    return displayArea?.textContent || '';
  };

  describe('Initial Rendering', () => {
    it('should render calculator title', () => {
      expect(screen.getByRole('heading', { name: '電卓' })).toBeInTheDocument();
    });

    it('should display initial value of 0', () => {
      expect(getDisplayValue()).toBe('0');
    });

    it('should render all number buttons', () => {
      for (let i = 0; i <= 9; i++) {
        expect(screen.getByRole('button', { name: i.toString() })).toBeInTheDocument();
      }
    });

    it('should render operation buttons', () => {
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '÷' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '=' })).toBeInTheDocument();
    });

    it('should render control buttons', () => {
      expect(screen.getByRole('button', { name: 'AC' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'CE' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '.' })).toBeInTheDocument();
    });
  });

  describe('Basic Number Input', () => {
    it('should display number when clicked', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      expect(getDisplayValue()).toBe('5');
    });

    it('should concatenate multiple digits', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      
      expect(getDisplayValue()).toBe('123');
    });

    it('should replace initial "0" with first digit', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '7' }));
      expect(getDisplayValue()).toBe('7');
    });
  });

  describe('Basic Operations', () => {
    it('should perform addition correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('8');
    });

    it('should perform subtraction correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '9' }));
      await user.click(screen.getByRole('button', { name: '-' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('5');
    });

    it('should perform multiplication correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '7' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('42');
    });

    it('should perform division correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '8' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('4');
    });

    it('should handle division by zero', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('Error');
    });
  });

  describe('Decimal Operations', () => {
    it('should handle decimal input', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      
      expect(getDisplayValue()).toBe('3.14');
    });

    it('should perform decimal calculation', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('4');
    });

    it('should not allow multiple decimal points', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      
      expect(getDisplayValue()).toBe('3.14');
    });
  });

  describe('Clear Operations', () => {
    it('should clear all with AC button', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: 'AC' }));
      
      expect(getDisplayValue()).toBe('0');
      
      // Test that previous operation is cleared
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(getDisplayValue()).toBe('5'); // Should not be 123 + 5 = 128
    });

    it('should clear entry with CE button', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: 'CE' }));
      
      expect(getDisplayValue()).toBe('0');
    });
  });

  describe('Chained Operations', () => {
    it('should handle chained operations', async () => {
      const user = userEvent.setup();
      
      // 2 + 3 × 4 = 5 × 4 = 20 (left-to-right evaluation)
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('20');
    });
  });

  describe('Edge Cases', () => {
    it('should handle clicking equals without operation', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('5');
    });

    it('should handle operation without second number', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      // Should not crash, display should still show a value
      expect(getDisplayValue()).toBeTruthy();
    });
  });
}); 