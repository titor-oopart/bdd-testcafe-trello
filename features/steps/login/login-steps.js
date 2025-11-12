import { LoginPage } from "./login-page.js";

import { When, Then } from "@cucumber/cucumber";

const loginPage = new LoginPage();
When(/I enter valid credentials/, async (t) => {
  await loginPage.login();
});

When(/I logout/, async (t) => {
  await loginPage.logout();
});

Then(/I should see that the user is logged in successfully/, async (t) => {
  await loginPage.verifyUserLogged();
});

Then(/I am redirected to trello landing page/, async (t) => {
  await loginPage.verifyLogout();
});
