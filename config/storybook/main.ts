import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-styling',
            options: {
                postCss: {
                    // eslint-disable-next-line global-require
                    implementation: require('postcss'),
                },
            },
        },

    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../../public'],
};
export default config;
