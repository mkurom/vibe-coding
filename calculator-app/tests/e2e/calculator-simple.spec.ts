import { test, expect } from '@playwright/test';

test.describe('Calculator Simple E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display calculator and perform basic addition', async ({ page }) => {
    // Check calculator title
    await expect(page.getByRole('heading', { name: '電卓' })).toBeVisible();
    
    // Check initial display shows 0
    await expect(page.locator('text=0').first()).toBeVisible();
    
    // Perform 5 + 3 = 8
    await page.getByRole('button', { name: '5' }).click();
    await expect(page.locator('text=5').first()).toBeVisible();
    
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await expect(page.locator('text=3').first()).toBeVisible();
    
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('text=8').first()).toBeVisible();
  });

  test('should clear with AC button', async ({ page }) => {
    // Input some numbers
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await expect(page.locator('text=123').first()).toBeVisible();
    
    // Clear all
    await page.getByRole('button', { name: 'AC' }).click();
    await expect(page.locator('text=0').first()).toBeVisible();
  });

  test('should handle division by zero', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    await expect(page.locator('text=Error').first()).toBeVisible();
  });
}); 