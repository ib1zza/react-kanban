import type { Preview } from '@storybook/react';
import { ThemeDecorator } from '../../src/shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/app/providers/theme/lib/ThemeContext';
import { StyleDecorator } from '../../src/shared/config/Storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/Storybook/RouterDecorator/RouterDecorator';
import '../../src/app/styles/index.scss';

const preview: Preview = {
    parameters: {
        decorators: [StyleDecorator, ThemeDecorator(Theme.LIGHT)],
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },

    },

};

export default preview;
