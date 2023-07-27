import '../../src/app/styles/index.scss';
import type { Preview } from '@storybook/react';
import { ThemeDecorator } from '../../src/shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/app/providers/theme/lib/ThemeContext';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        decorators: [ThemeDecorator(Theme.LIGHT)],
    },

};

export default preview;
