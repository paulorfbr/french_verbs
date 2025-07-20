// This file should be renamed to e2e.spec.mjs for ESM compatibility.
import { test, expect } from '@playwright/test';

test.describe('French Verb Prepositions App', () => {
  test('Search by verb returns correct results', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('French Verb Prepositions')).toBeVisible();
    await page.getByLabel('Enter a verb').fill('parler');
    await page.getByRole('button').click();
    await expect(page.getByText('parler')).toBeVisible();
    await expect(page.getByText('à')).toBeVisible();
    await expect(page.getByText('Je parle à mon ami.')).toBeVisible();
  });

  test('Search by preposition returns correct results', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Search by Preposition' }).click();
    await page.getByText('de').click();
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('avoir besoin')).toBeVisible();
    await expect(page.getByText('se souvenir')).toBeVisible();
    await expect(page.getByText("s'occuper")).toBeVisible();
    await expect(page.getByText("J'ai besoin de dormir.")).toBeVisible();
  });
}); 