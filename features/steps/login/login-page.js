import dotenv from "dotenv";
dotenv.config();

import { t, Selector } from "testcafe";
import { LoginLocators } from "./login-locators";
import {
  clickElement,
  waitingForFirstLocator,
  isElmentVisible,
  validateElementVisible,
} from "../../../utils/utils";

export class LoginPage {
  constructor() {
    this.usernameField = Selector(LoginLocators.userName);
    this.passwordField = Selector(LoginLocators.password);
    this.continueButton = Selector(LoginLocators.continueButton);
    this.avatarMenu = Selector(LoginLocators.avatarMenu);
    this.emailTextField = Selector(LoginLocators.emailTextField);
    this.trelloLogo = Selector(LoginLocators.trelloLogo);
    this.continueButtonAuth = Selector(LoginLocators.contiueFactorAuth);
    this.logoutMenuButton = Selector(LoginLocators.logoutMenuButton);
    this.logoutButton = Selector(LoginLocators.logoutButton);
    this.loginButton = Selector(LoginLocators.loginButton);
    this.accountMenu = Selector(LoginLocators.accountMenu);
    this.userName = process.env.USER_NAME;
    this.userPassword = process.env.USER_PASSWORD;
  }

  async login() {
    await t.typeText(this.usernameField, this.userName);
    await clickElement(this.continueButton);
    await t.typeText(this.passwordField, this.userPassword);
    await clickElement(this.continueButton, "login sucess");
    if (
      await waitingForFirstLocator(this.continueButtonAuth, this.trelloLogo)
    ) {
      await clickElement(this.continueButtonAuth);
    }
  }

  async verifyUserLogged() {
    await clickElement(this.avatarMenu, "avatar menu");
    const userEmail = Selector(this.emailTextField);
    await t.expect(userEmail.innerText).eql(this.userName);
    const trelloLogo = Selector(this.trelloLogo);
    await t.expect(trelloLogo.visible).ok();
  }

  async logout() {
    if (await isElmentVisible(this.accountMenu)) {
      await clickElement(this.logoutMenuButton);
    } else {
      await clickElement(this.avatarMenu);
      await clickElement(this.logoutMenuButton);
    }
    await clickElement(this.logoutButton);
  }

  async verifyLogout() {
    await validateElementVisible(this.loginButton);
  }
}
