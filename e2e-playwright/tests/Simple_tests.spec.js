const { test, expect } = require("@playwright/test");

test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Programming assignments");
});

test("Creating a submission that fails the tests and checking the feedback on incorrect submission", async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder(' Write your code here...').fill("def hello(): return 'Goodbye'");
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('FAILED')).toBeVisible();
  await expect(page.getByRole('navigation')).toContainText('SCORE: 0');
});

test("Creating a submission that passes the tests and checking the notification on the correctness of the submission", async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder(' Write your code here...').fill("def hello(): return 'Hello'");
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('OK')).toBeVisible();
  await expect(page.getByRole('navigation')).toContainText('SCORE: 100');
});


test("Creating a submission that passes the tests, checking the notification on the correctness of the submission, moving to the next assignment, and checking that the assignment is a new one.", async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder(' Write your code here...').fill("def hello(): return 'Hello'");
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('OK')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('heading', { name: 'Assignment 2: Hello world' })).toBeVisible();
  await expect(page.getByRole('navigation')).toContainText('SCORE: 100');
});