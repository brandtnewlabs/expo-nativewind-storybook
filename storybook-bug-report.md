# Storybook Installation Bug Report

## Issue Summary

`npm create storybook@latest` fails with ERESOLVE dependency conflict when trying to install Storybook in a React Native/Expo project.

## Environment

- **OS**: macOS 14.5.0 (darwin 24.5.0)
- **Node.js**: (run `node --version` to check)
- **npm**: (run `npm --version` to check)
- **Project Type**: Expo React Native
- **Expo SDK**: ~53.0.17
- **React Native**: 0.79.5
- **React**: 19.0.0

## Steps to Reproduce

1. Create a fresh Expo project
2. Run `npm create storybook@latest`
3. Select "Recommended: Component dev, docs, test"
4. Select "Both: Add both native and web Storybooks"

## Expected Behavior

Storybook should install successfully with compatible versions of all packages.

## Actual Behavior

Installation fails with the following error:

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: expo-storybook@1.0.0
npm ERR! Found: storybook@9.0.16
npm ERR! node_modules/storybook
npm ERR!   dev storybook@"^9.0.16" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer storybook@"9.0.14" from @storybook/addon-ondevice-controls@9.0.14
npm ERR! node_modules/@storybook/addon-ondevice-controls
npm ERR!   dev @storybook/addon-ondevice-controls@"^9.0.14" from the root project
```

## Root Cause

Version mismatch between:

- Core Storybook package: `9.0.16`
- React Native addons: `9.0.14`

The React Native addons (`@storybook/addon-ondevice-controls`, `@storybook/addon-ondevice-actions`, etc.) have not been updated to match the latest Storybook version.

## Attempted Workarounds

1. **Using legacy peer deps flag**: `npm create storybook@latest --legacy-peer-deps` - Failed (flag not recognized)
2. **Manual installation**: Installing specific versions manually works but requires extra steps

## Suggested Solutions

1. **Update React Native addons** to version 9.0.16 to match core Storybook
2. **Lock create-storybook** to install compatible versions together
3. **Add better error handling** in create-storybook to suggest version-specific installation

## Package Versions Involved

- `storybook@9.0.16` (latest)
- `@storybook/addon-ondevice-controls@9.0.14`
- `@storybook/addon-ondevice-actions@9.0.14`
- `@storybook/react-native@9.0.14`

## Additional Context

This appears to be a timing issue where the core Storybook package was updated but the React Native ecosystem packages weren't updated simultaneously.

## Temporary Fix

Users can work around this by:

1. Using `npm create storybook@9.0.14` to install the older compatible version
2. Manually installing packages with `--legacy-peer-deps` flag
3. Using `--force` flag when encountering the dependency conflict
