import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {

//Navigate to the banking app
await page.goto('https://www.qaplayground.com/bank');
//Enter credentials and click on login button
await page.getByTestId('username-input').fill('admin');
await page.getByTestId('password-input').fill('admin123');
await page.getByTestId('remember-checkbox').check();
await page.getByRole('button', { name: 'Login', exact: true }).click();

//Assert that the user successfully logged in
await expect (page).toHaveTitle('Bank Dashboard – SecureBank Demo | QA Playground');

//Handle the log out alert dialog
page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`); // "Are you sure you want to logout?"
  await dialog.accept(); 
});

await page.getByLabel('Logout').click();

//Assert that the user has successfully logged out
await expect(page).toHaveTitle('QA Playground: Practice Automation Testing with Selenium');

});

test('Incorrect login attempt', async ({page}) => {

//Navigate to the banking app
await page.goto('https://www.qaplayground.com/bank');
//Enter credentials and click on login button
await page.getByTestId('username-input').fill('admin');
await page.getByTestId('password-input').fill('test');
await page.getByRole('button', { name: 'Login', exact: true }).click();

//Assert that the alert message is displayed with the correct text
const alertMessage = page.locator('#alert-message');
await expect(alertMessage).toHaveText('⚠️ Invalid username or password. Please try again.');

});