import { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-ondevice-notes",
    "@storybook/addon-ondevice-backgrounds",
  ],
};

export default main;
