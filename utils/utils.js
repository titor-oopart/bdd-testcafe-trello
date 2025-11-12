import { t, Selector } from "testcafe";

export async function clickElement(
  locator,
  description = "element",
  timeout = 10000,
) {
  const element = Selector(locator);

  await t
    .expect(element.exists)
    .ok(`${description} doesn't exist in the DOM`, { timeout });

  await t
    .expect(element.visible)
    .ok(`${description} is not visible.`, { timeout });

  await t.click(element);
  console.log(`✅ Clicked on: ${description}`);
}

export async function waitingForFirstLocator(
  firstLocator,
  secondLocator,
  timeout = 10000,
) {
  const target = Selector(firstLocator);
  const continueElement = Selector(secondLocator);
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if ((await target.exists) && (await target.visible)) return true;
    if ((await continueElement.exists) && (await continueElement.visible))
      return false;
    await t.wait(300);
  }
  return false;
}
export async function isElmentVisible(locator) {
  const element = Selector(locator);
  return await element.visible;
}

export async function validateElementVisible(
  locator,
  description = "element",
  timeout = 10000,
) {
  const element = Selector(locator);

  await t
    .expect(element.exists)
    .ok(`${description} doesn't exist in the DOM`, { timeout });

  await t
    .expect(element.visible)
    .ok(`${description} is not visible.`, { timeout });
}
