// jest-dom custom matchers type definitions
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveClass(className: string): R;
      toHaveValue(value: string | number): R;
    }
  }
} 