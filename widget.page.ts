import { expect, Locator, Page } from '@playwright/test';

enum WidgetPageSelectors {
  WIDGET_BODY = '[class^="widgetWrapper"] > [class^="widget__"]',
  HEADER_TEXT = 'header h5',
  BUTTON_OPEN = '[data-test="openWidget"]',
  BUTTON_WRITE_TO_US = '[class^="btn"]',
  ARTICLE_POPULAR_TITLE = '[class^="popularTitle__"]',
  ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^="articles__"]`,
  ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
}

export class WidgetPage {
  constructor(private readonly page: Page) {}

  getWidgetBody(): Locator {
    return this.page.locator(WidgetPageSelectors.WIDGET_BODY);
  }

  getTitle(): Locator {
    return this.getWidgetBody().locator(WidgetPageSelectors.HEADER_TEXT);
  }

  getPopularArticles(): Locator {
    // A live locator waits on click/assertion; all() snapshots the current DOM.
    return this.getWidgetBody().locator(WidgetPageSelectors.ARTICLE_POPULAR_LIST_ITEM);
  }

  async openWidget(): Promise<void> {
    // The launcher and the opened panel are separate elements.
    await this.page.locator(WidgetPageSelectors.BUTTON_OPEN).click();
    await expect(this.getWidgetBody()).toBeVisible();
  }

  async clickWriteToUs(): Promise<void> {
    await this.getWidgetBody().locator(WidgetPageSelectors.BUTTON_WRITE_TO_US).click();
  }
}
