import { test, expect } from '@playwright/test';

test.describe('Calculator E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('UI Components', () => {
    test('should display calculator interface correctly', async ({ page }) => {
      // Check page title
      await expect(page).toHaveTitle(/Create Next App/);
      
      // Check calculator title
      await expect(page.getByRole('heading', { name: '電卓' })).toBeVisible();
      
      // Get calculator container to scope our searches
      const calculator = page.locator('div').filter({ hasText: '電卓' }).first();
      
      // Check initial display
      await expect(page.locator('text=0').first()).toBeVisible();
      
      // Check all number buttons are visible
      for (let i = 0; i <= 9; i++) {
        await expect(calculator.getByRole('button', { name: i.toString() })).toBeVisible();
      }
      
      // Check operation buttons
      await expect(calculator.getByRole('button', { name: '+' })).toBeVisible();
      await expect(calculator.getByRole('button', { name: '-' })).toBeVisible();
      await expect(calculator.getByRole('button', { name: '×' })).toBeVisible();
      await expect(calculator.getByRole('button', { name: '÷' })).toBeVisible();
      await expect(calculator.getByRole('button', { name: '=' })).toBeVisible();
      
      // Check control buttons
      await expect(calculator.getByRole('button', { name: 'AC' })).toBeVisible();
      await expect(calculator.getByRole('button', { name: 'CE' })).toBeVisible();
      await expect(calculator.getByRole('button', { name: '.' })).toBeVisible();
    });
  });

  test.describe('Basic Calculations', () => {
    test('should perform addition correctly', async ({ page }) => {
      await page.getByRole('button', { name: '7' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '3' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=10').first()).toBeVisible();
    });

    test('should perform subtraction correctly', async ({ page }) => {
      await page.getByRole('button', { name: '9' }).click();
      await page.getByRole('button', { name: '-' }).click();
      await page.getByRole('button', { name: '4' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=5').first()).toBeVisible();
    });

    test('should perform multiplication correctly', async ({ page }) => {
      await page.getByRole('button', { name: '6' }).click();
      await page.getByRole('button', { name: '×' }).click();
      await page.getByRole('button', { name: '7' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=42').first()).toBeVisible();
    });

    test('should perform division correctly', async ({ page }) => {
      await page.getByRole('button', { name: '8' }).click();
      await page.getByRole('button', { name: '÷' }).click();
      await page.getByRole('button', { name: '2' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=4').first()).toBeVisible();
    });
  });

  test.describe('Number Input', () => {
    test('should input single digit correctly', async ({ page }) => {
      await page.getByRole('button', { name: '5' }).click();
      await expect(page.locator('text=5').first()).toBeVisible();
    });

    test('should input multiple digits correctly', async ({ page }) => {
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '2' }).click();
      await page.getByRole('button', { name: '3' }).click();
      
      await expect(page.locator('text=123').first()).toBeVisible();
    });

    test('should replace initial zero', async ({ page }) => {
      await page.getByRole('button', { name: '7' }).click();
      await expect(page.locator('text=7').first()).toBeVisible();
      // Check that it's not "07"
      await expect(page.locator('text=07')).not.toBeVisible();
    });
  });

  test.describe('Decimal Operations', () => {
    test('should handle decimal input', async ({ page }) => {
      const calculator = page.locator('div').filter({ hasText: '電卓' }).first();
      
      await calculator.getByRole('button', { name: '3' }).click();
      await calculator.getByRole('button', { name: '.' }).click();
      await calculator.getByRole('button', { name: '1' }).click();
      await calculator.getByRole('button', { name: '4' }).click();
      
      await expect(page.locator('text=3.14').first()).toBeVisible();
    });

    test('should perform decimal calculation', async ({ page }) => {
      const calculator = page.locator('div').filter({ hasText: '電卓' }).first();
      
      await calculator.getByRole('button', { name: '1' }).click();
      await calculator.getByRole('button', { name: '.' }).click();
      await calculator.getByRole('button', { name: '5' }).click();
      await calculator.getByRole('button', { name: '+' }).click();
      await calculator.getByRole('button', { name: '2' }).click();
      await calculator.getByRole('button', { name: '.' }).click();
      await calculator.getByRole('button', { name: '5' }).click();
      await calculator.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=4').first()).toBeVisible();
    });

    test('should not allow multiple decimal points', async ({ page }) => {
      const calculator = page.locator('div').filter({ hasText: '電卓' }).first();
      
      await calculator.getByRole('button', { name: '3' }).click();
      await calculator.getByRole('button', { name: '.' }).click();
      await calculator.getByRole('button', { name: '1' }).click();
      await calculator.getByRole('button', { name: '.' }).click(); // This should be ignored
      await calculator.getByRole('button', { name: '4' }).click();
      
      await expect(page.locator('text=3.14').first()).toBeVisible();
      await expect(page.locator('text=3.1.4')).not.toBeVisible();
    });
  });

  test.describe('Clear Functions', () => {
    test('should clear all with AC button', async ({ page }) => {
      // Input some numbers and operation
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '2' }).click();
      await page.getByRole('button', { name: '3' }).click();
      await page.getByRole('button', { name: '+' }).click();
      
      // Clear all
      await page.getByRole('button', { name: 'AC' }).click();
      await expect(page.locator('text=0').first()).toBeVisible();
      
      // Verify previous operation is cleared
      await page.getByRole('button', { name: '5' }).click();
      await page.getByRole('button', { name: '=' }).click();
      await expect(page.locator('text=5').first()).toBeVisible(); // Not 128 (123+5)
    });

    test('should clear entry with CE button', async ({ page }) => {
      await page.getByRole('button', { name: '1' }).click();
      await page.getByRole('button', { name: '2' }).click();
      await page.getByRole('button', { name: '3' }).click();
      
      await page.getByRole('button', { name: 'CE' }).click();
      await expect(page.locator('text=0').first()).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle division by zero', async ({ page }) => {
      await page.getByRole('button', { name: '5' }).click();
      await page.getByRole('button', { name: '÷' }).click();
      await page.getByRole('button', { name: '0' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=Error').first()).toBeVisible();
    });

    test('should recover from error state', async ({ page }) => {
      // Cause error
      await page.getByRole('button', { name: '5' }).click();
      await page.getByRole('button', { name: '÷' }).click();
      await page.getByRole('button', { name: '0' }).click();
      await page.getByRole('button', { name: '=' }).click();
      await expect(page.locator('text=Error').first()).toBeVisible();
      
      // Clear and start new calculation
      await page.getByRole('button', { name: 'AC' }).click();
      await page.getByRole('button', { name: '2' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '3' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=5').first()).toBeVisible();
    });
  });

  test.describe('Complex Operations', () => {
    test('should handle chained operations', async ({ page }) => {
      // 2 + 3 × 4 = 5 × 4 = 20 (left-to-right evaluation)
      await page.getByRole('button', { name: '2' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '3' }).click();
      await page.getByRole('button', { name: '×' }).click();
      await page.getByRole('button', { name: '4' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=20').first()).toBeVisible();
    });

    test('should handle consecutive equals', async ({ page }) => {
      await page.getByRole('button', { name: '5' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '3' }).click();
      await page.getByRole('button', { name: '=' }).click();
      await expect(page.locator('text=8').first()).toBeVisible();
      
      // Pressing equals again should not change result
      await page.getByRole('button', { name: '=' }).click();
      await expect(page.locator('text=8').first()).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should be navigable with keyboard', async ({ page }) => {
      // Test Tab navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // Should reach first button
      
      // This is a basic check - full keyboard navigation testing would require more setup
      await expect(page.getByRole('button', { name: 'AC' })).toBeFocused();
    });

    test('should have proper ARIA labels', async ({ page }) => {
      // Check that buttons have proper roles
      await expect(page.getByRole('button', { name: '5' })).toBeVisible();
      await expect(page.getByRole('button', { name: '+' })).toBeVisible();
      await expect(page.getByRole('button', { name: '=' })).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      
      // All buttons should still be visible and clickable
      await expect(page.getByRole('button', { name: '5' })).toBeVisible();
      await page.getByRole('button', { name: '5' }).click();
      await page.getByRole('button', { name: '+' }).click();
      await page.getByRole('button', { name: '3' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=8').first()).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      
      await page.getByRole('button', { name: '9' }).click();
      await page.getByRole('button', { name: '×' }).click();
      await page.getByRole('button', { name: '6' }).click();
      await page.getByRole('button', { name: '=' }).click();
      
      await expect(page.locator('text=54').first()).toBeVisible();
    });
  });
}); 