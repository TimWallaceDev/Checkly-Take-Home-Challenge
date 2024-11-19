
import { test, expect } from '@playwright/test'

// You can override the default Playwright test timeout of 30s
// test.setTimeout(60_000);

test('Sample Test', async ({ page }) => {
  const response = await page.goto('https://checklyhq.com/')
  expect(response?.status()).toBeLessThan(400)
  await expect(page).toHaveTitle(/Detect and Resolve Issues 10x Faster With Monitoring as Code/)
  await page.screenshot({ path: 'homepage.jpg' })
})