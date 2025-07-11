# Bug Report: NativeWind Styles Not Displaying in Storybook React Native Web Vite

## Describe the bug

NativeWind (Tailwind CSS) styles are not being applied or displayed when using Storybook React Native Web Vite in an Expo project. While the React Native version of Storybook works correctly, the web version fails to render the NativeWind styles, despite having the proper configuration.

## To Reproduce

### 1. Project Setup

- Create a new Expo project with NativeWind v4
- Install Storybook React Native Web Vite
- Configure NativeWind with Tailwind CSS

### 2. Configuration Files

**package.json dependencies:**

```json
{
  "dependencies": {
    "nativewind": "^4.1.23",
    "react-native-web": "~0.20.0",
    "tailwind-merge": "^3.3.1",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "@storybook/react-native-web-vite": "^9.0.14",
    "storybook": "^9.0.14",
    "tailwindcss": "^3.4.17"
  }
}
```

**tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**babel.config.js:**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [],
  };
};
```

**global.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**.storybook/main.ts:**

```typescript
import type { StorybookConfig } from "@storybook/react-native-web-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {
      pluginReactOptions: {
        jsxImportSource: "nativewind",
      },
    },
  },
};
export default config;
```

**.storybook/preview.ts:**

```typescript
import "../global.css";

import type { Preview } from "@storybook/react-native-web-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

### 3. Example Component

**Button.tsx:**

```typescript
import type { StyleProp, ViewStyle } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../lib/cn";

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  style,
  onPress,
}: ButtonProps) => {
  const buttonClasses = cn(
    // Base button styles
    "rounded-full border-0",
    // Primary/Secondary styles
    primary ? "bg-blue-500" : "bg-transparent border border-gray-300",
    // Size styles
    size === "small" && "py-2.5 px-4",
    size === "medium" && "py-3 px-5",
    size === "large" && "py-3 px-6"
  );

  const textClasses = cn(
    // Base text styles
    "font-bold leading-none",
    // Primary/Secondary text colors
    primary ? "text-white" : "text-gray-800",
    // Size styles
    size === "small" && "text-xs",
    size === "medium" && "text-sm",
    size === "large" && "text-base"
  );

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View
        className={buttonClasses}
        style={[style, !!backgroundColor && { backgroundColor }]}
      >
        <Text className={textClasses}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
```

**cn.ts (utility function):**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4. Steps to reproduce

1. Run `npm run storybook` to start the web version
2. Navigate to the Button story
3. Observe that NativeWind styles (className prop) are not being applied
4. The component renders without any Tailwind CSS styles

## Expected behavior

NativeWind styles should be applied and visible in the web version of Storybook, similar to how they work in the React Native version and in the actual Expo app.

## Actual behavior

- NativeWind styles are completely ignored in the web version
- Components render without any styling from className props
- Only inline styles work in the web version
- The styles work perfectly in the React Native version of Storybook

## Environment

**Versions:**

- Storybook: 9.0.14
- @storybook/react-native-web-vite: 9.0.14
- NativeWind: 4.1.23
- Tailwind CSS: 3.4.17
- React Native: 0.79.5
- React Native Web: 0.20.0
- Expo: ~53.0.17
- Node: [Please specify your version]
- npm/yarn: [Please specify your version]

**Platform:**

- OS: macOS 14.5.0
- Browser: [Please specify]

## Additional context

### What works

- NativeWind styles work perfectly in the actual Expo app
- React Native version of Storybook displays styles correctly
- Inline styles work in the web version

### What doesn't work

- NativeWind `className` prop styles in web Storybook
- Tailwind CSS classes are not being processed/applied

### Potential causes

1. The web version may not be properly processing the NativeWind transformation
2. The Vite configuration might need additional setup for NativeWind
3. The `jsxImportSource: "nativewind"` configuration might not be sufficient
4. CSS processing pipeline might be missing NativeWind's transformations

### Workaround attempts

- ✅ Added `global.css` import to preview.ts
- ✅ Configured `jsxImportSource: "nativewind"` in main.ts
- ✅ Added NativeWind babel preset
- ❌ Styles still not appearing in web version

This issue makes it impossible to use Storybook for web development when using NativeWind in an Expo project, as the components appear unstyled and don't represent the actual app appearance.

## Related Issues

- This might be related to how react-native-web handles className props
- Could be related to how Vite processes CSS in the NativeWind context
- May need special handling for NativeWind's PostCSS transformations

## Proposed Solution

The Storybook React Native Web Vite framework should:

1. Properly process NativeWind transformations for web
2. Ensure Tailwind CSS classes are compiled and applied
3. Handle the `className` prop correctly in the web context
4. Provide clear documentation for NativeWind setup

Would appreciate any guidance on proper configuration or if this requires framework-level changes to support NativeWind properly.
