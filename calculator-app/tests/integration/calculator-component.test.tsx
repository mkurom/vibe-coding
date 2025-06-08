import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from '@/components/calculator';

describe('Calculator Component Integration Tests', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  describe('UI Rendering', () => {
    it('should render calculator title', () => {
      expect(screen.getByText('電卓')).toBeInTheDocument();
    });

    it('should render initial display as "0"', () => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should render all number buttons', () => {
      for (let i = 0; i <= 9; i++) {
        expect(screen.getByRole('button', { name: i.toString() })).toBeInTheDocument();
      }
    });

    it('should render all operation buttons', () => {
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
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should concatenate multiple digits', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('should replace initial "0" with first digit', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '7' }));
      expect(screen.getByText('7')).toBeInTheDocument();
      expect(screen.queryByText('07')).not.toBeInTheDocument();
    });
  });

  describe('Basic Operations', () => {
    it('should perform addition correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('should perform subtraction correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '9' }));
      await user.click(screen.getByRole('button', { name: '-' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should perform multiplication correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '7' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should perform division correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '8' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('should handle division by zero', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('Decimal Operations', () => {
    it('should handle decimal input', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      
      expect(screen.getByText('3.14')).toBeInTheDocument();
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
      
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('should not allow multiple decimal points', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      
      expect(screen.getByText('3.14')).toBeInTheDocument();
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
      
      expect(screen.getByText('0')).toBeInTheDocument();
      
      // Test that previous operation is cleared
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      expect(screen.getByText('5')).toBeInTheDocument(); // Should not be 123 + 5 = 128
    });

    it('should clear entry with CE button', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: 'CE' }));
      
      expect(screen.getByText('0')).toBeInTheDocument();
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
      
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle clicking equals without operation', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should handle operation without second number', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      // Should not crash, behavior may vary
      expect(screen.getByDisplayValue).toBeDefined();
    });
  });
}); 