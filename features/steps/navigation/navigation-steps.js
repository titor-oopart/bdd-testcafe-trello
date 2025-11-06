import { NavigationPage } from "./navigation-page.js";

import { Given } from "@cucumber/cucumber";

Given(/I am on the "(.+)" page/, async (t, [page]) => {
  const navigationPage = new NavigationPage();
  await navigationPage.goTo(page);
});
