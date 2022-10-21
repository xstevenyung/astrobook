import { readdirSync } from "node:fs";
import { resolve } from "node:path";

export type Component = {
  name: string;
  extension: string;
};

export function getComponents(): Array<Component> {
  return readdirSync(resolve("./src/components"))
    .filter((filename) => filename !== "Frame.astro")
    .map((filename) => {
      const [name, extension] = filename.split(".");
      return { name, extension };
    });
}

export async function importComponent(name: string, extension: string) {
  if (extension === "tsx") {
    const { default: Component } = await import(`../components/${name}.tsx`);
    return Component;
  }

  if (extension === "jsx") {
    const { default: Component } = await import(`../components/${name}.jsx`);
    return Component;
  }

  if (extension === "vue") {
    const { default: Component } = await import(`../components/${name}.vue`);
    return Component;
  }

  if (extension === "astro") {
    const { default: Component } = await import(`../components/${name}.astro`);
    return Component;
  }

  throw new Error(`Extension ${extension} not supported`);
}
