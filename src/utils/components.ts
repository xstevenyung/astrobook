export type Component = {
  name: string;
  extension: string;
};

export function getComponents(): Array<Component> {
  return [
    { name: "Card", extension: "tsx" },
    { name: "Tag", extension: "vue" },
  ];
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

  throw new Error(`Extension ${extension} not supported`);
}
