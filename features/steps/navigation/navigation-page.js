import { t } from "testcafe";
import dotenv from "dotenv";
dotenv.config();

export class NavigationPage {
  constructor() {
    this.BASE_URL = process.env.BASE_URL;
  }

  async goTo(url) {
    console.log(this.BASE_URL, url);
    await t.navigateTo(`${this.BASE_URL}/${url}`);
  }
}
