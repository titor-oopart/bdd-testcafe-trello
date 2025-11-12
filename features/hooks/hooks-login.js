import { Before, After } from "@cucumber/cucumber";
import { LoginPage } from "../steps/login/login-page";
import { NavigationPage } from "../steps/navigation/navigation-page";
import { LoginLocators } from "../steps/login/login-locators";
import { isElmentVisible } from "../../utils/utils";

const loginPage = new LoginPage();
Before("@login", async (t) => {
  if (!(await isElmentVisible(LoginLocators.trelloLogo))) {
    const navigationPage = new NavigationPage();
    await navigationPage.goTo("login");
    await loginPage.login();
  }
});

After("@logout", async (t) => {
  await loginPage.logout();
  await loginPage.verifyLogout();
});
