import { LoginPage } from "./login-page.js";

import { When, Then } from "@cucumber/cucumber";

const loginPage = new LoginPage();
When(/I enter valid credentials/, async (t) => {
  await loginPage.login();
});

Then(/I should see that the user is logged in successfully/, async (t) => {
  await loginPage.verifyUserLogged();
});
