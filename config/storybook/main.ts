import type { StorybookConfig } from '@storybook/react-webpack5';
import {buildLoaders} from "../build/buildLoaders";
import {BuildOptions} from "../build/types/config";
import { PluginItem } from '@babel/core';
import path from "path";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

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
    ],

    core: {
        builder: {
          name: '@storybook/builder-webpack5',
          options: {
            fsCache: true,
            lazyCompilation: true,
          },
        },
      },
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../../public'],
    webpackFinal: async (config, { configType }) => {

        config?.module?.rules?.push(...buildLoaders({isDev: true} as BuildOptions));
        config?.resolve.modules.push(path.resolve(__dirname, "../../src"))

        if (!config.resolve) {
            config.resolve = {};
        }

        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin(),
        ];
        return config;
    },
    babel: async (options) => ({
        ...options,
        presets: [
            ...options.presets as PluginItem[],
            [
                '@babel/preset-react', {
                runtime: 'automatic',
            },
                'preset-react-jsx-transform'
            ],
        ],
    }),
};

export default config;


