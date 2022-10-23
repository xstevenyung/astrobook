import { readdirSync } from "node:fs";
import { resolve } from "node:path";

export type Story = {
  filename: string;
  component: any;
};

export function getStories(): Promise<Array<Story>> {
  const stories = readdirSync(resolve("./src/components"))
    .filter((filename) => {
      const parts = filename.split(".");
      return parts[parts.length - 2] === "story";
    })
    .map(async (filename) => {
      const parts = filename.split(".");
      const filenameWithoutExtension = parts
        .slice(0, parts.length - 1)
        .join(".");
      const extension = parts[parts.length - 1];

      let story;

      if (extension === "ts") {
        story = (await import(`../components/${filenameWithoutExtension}.ts`))
          .default;
      }

      if (extension === "tsx") {
        story = (await import(`../components/${filenameWithoutExtension}.tsx`))
          .default;
      }

      story = story as Omit<Story, "filename">;

      return {
        filename,
        ...story,
      };
    });

  return Promise.all(stories);
}
