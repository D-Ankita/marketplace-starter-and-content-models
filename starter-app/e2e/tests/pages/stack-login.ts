import { expect, Locator, Page } from "@playwright/test";

export class AppLogin {
  readonly page: Page;
  readonly emailInputField: Locator;
  readonly passwordInputField: Locator;
  readonly venusPasswordInputField: Locator;
  readonly loginButton: Locator;

  constructor(Page: Page) {
    this.page = Page;
    this.emailInputField = this.page.locator("#email");
    this.passwordInputField = this.page.locator("#pw");
    this.venusPasswordInputField = this.page.locator("#password");
    this.loginButton = this.page.locator('button:has-text("Log In"), button:has-text("LOGIN")');
  }

  async checkAppUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async getLoginPage() {
    await this.page.goto(`${process.env.APP_HOST_URL}`); // go to contentstack app login page
  }

  async contentstackLogin(id: string, pass: string) {
    // check for classic UI and venus UI
    if ((await this.page.$(".user-session-page")) !== null) {
      // contentstack classic ui login
      try {
        await this.emailInputField.type(id);
        await this.passwordInputField.type(pass);
        await this.loginButton.click();
        await this.page.locator(".user-name").click();
        await this.page.click("text=New Interface");
        await this.page.click(".OrgDropdown");
        await this.page.click(`#${process.env.CONTENTSTACK_ORGANIZATION_UID}`);
        await this.page.waitForTimeout(2000);
        await this.page.context().storageState({ path: "storageState.json" });
        await this.page.close();
      } catch (e) {
        console.error(e);
      }
    } else {
      // contentstack venus ui login
      await this.emailInputField.type(id);
      await this.venusPasswordInputField.type(pass);
      const venusLoginButton = await this.page.waitForSelector('button:has-text("Log In")');
      await venusLoginButton.click();
      await this.page.click(".OrgDropdown");
      await this.page.click(`#${process.env.CONTENTSTACK_ORGANIZATION_UID}`);
      await this.page.waitForTimeout(2000);
      await this.page.context().storageState({ path: "storageState.json" });
      await this.page.close();
    }
  }
}
