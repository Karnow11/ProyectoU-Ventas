import { test, expect } from '@playwright/test';

test('register', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle("U-Ventas"); 

  
  await page.getByRole("button", { name: "Create account >" }).click();

  await page.getByRole("button", { name: "Create account >" }).click();

  //await expect(page)

});
