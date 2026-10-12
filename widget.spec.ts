import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Uchi.ru support widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // A fresh context should show the banner. click() waits for its rendering.
    await page.locator('._UCHI_COOKIE__button').click();
  });

  test('opens', async () => {
    await widgetPage.openWidget();
    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async () => {
    await widgetPage.openWidget();
    await widgetPage.getPopularArticles().first().click();
    await widgetPage.clickWriteToUs();

    // Retry until the support screen has finished rendering.
    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });

  // Exactly one additional widget test.
  test('opens a popular article with the selected title', async () => {
    await widgetPage.openWidget();
    const article = widgetPage.getPopularArticles().first();
    await expect(article).toBeVisible();
    const articleTitle = (await article.innerText()).trim();
    expect(articleTitle).not.toBe('');

    await article.click();

    await expect(widgetPage.getTitle()).toHaveText(articleTitle);
    await expect(widgetPage.getPopularArticles()).toHaveCount(0);
  });
});
