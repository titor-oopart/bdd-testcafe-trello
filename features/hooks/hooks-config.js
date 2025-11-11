import { Before, After } from "@cucumber/cucumber";

Before(async (t) => {
  // Esto se ejecuta antes de cada scenario
  console.log("Antes de cada scenario");
});

After(async (t) => {
  // Esto se ejecuta después de cada scenario
  console.log("Después de cada scenario");
});
