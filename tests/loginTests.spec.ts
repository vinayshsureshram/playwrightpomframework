import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {

//Navigate to the banking app
await page.goto('https://www.qaplayground.com/bank');
//Enter credentials and click on login button
await page.getByTestId('login-username-input').fill('standard_user');
await page.getByTestId('login-password-input').fill('bank_sauce');
await page.getByTestId('login-remember-me-checkbox').check();
await page.getByRole('button', { name: 'Sign in to SecureBank', exact: true }).click();

//Assert that the user successfully logged in
await expect (page).toHaveTitle('QA Playground - Master Automation Testing');

//Take a screenshot
await page.screenshot({ path: './screenshots/successful-login.png' });

//Handle the log out alert dialog
page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`); // "Are you sure you want to logout?"
  await dialog.accept(); 
});

await page.getByLabel('Logout').click();

//Assert that the user has successfully logged out
await expect(page).toHaveTitle('QA Playground - Master Automation Testing');

});

test('Incorrect login attempt', async ({page}) => {

//Navigate to the banking app and click on Sign In
await page.goto('https://www.qaplayground.com/bank');
//Enter credentials and click on login button
await page.getByTestId('login-username-input').fill('standard_user');
await page.getByTestId('login-password-input').fill('test');
await page.getByRole('button', { name: 'Sign in to SecureBank', exact: true }).click();

//Assert that the alert message is displayed with the correct text
const alertMessage = page.getByTestId('login-error-message');
await expect(alertMessage).toHaveText('The username or password you entered is incorrect.');

//Take a screenshot
await page.screenshot({ path: './screenshots/incorrect-login.png' });

});