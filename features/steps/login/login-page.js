import dotenv from "dotenv";
dotenv.config();

import { t, Selector } from "testcafe";
import { LoginLocators } from "./login-locators.js";
import { clickElement, waitingForFirstLocator } from "../../../utils/utils.js";

export class LoginPage {
  constructor() {
    this.usernameField = Selector(LoginLocators.userName);
    this.passwordField = Selector(LoginLocators.password);
    this.continueButton = Selector(LoginLocators.continueButton);
    this.avatarMenu = Selector(LoginLocators.avatarMenu);
    this.emailTextField = Selector(LoginLocators.emailTextField);
    this.trelloLogo = Selector(LoginLocators.trelloLogo);
    this.continueButtonAuth = Selector(LoginLocators.contiueFactorAuth);
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
}
