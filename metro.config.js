const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// First apply NativeWind, then Storybook
const nativeWindConfig = withNativeWind(config, { input: './global.css' });

module.exports = withStorybook(nativeWindConfig, {
    // Set to false to remove storybook specific options
    // you can also use a env variable to set this
    enabled: true,
    // Path to your storybook config
    configPath: path.resolve(__dirname, './.rnstorybook'),
    // note that this is the default so you can the config path blank if you use .rnstorybook

    // Optional websockets configuration
    // Starts a websocket server on the specified port and host on metro start
    // websockets: {
    //   port: 7007,
    //   host: 'localhost',
    // },
});
