import '../../src/app/styles/index.scss';
import type { Preview } from '@storybook/react';
import { ThemeDecorator } from '../../src/shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/app/providers/theme/lib/ThemeContext';
import { StoreDecorator } from '../../src/shared/config/Storybook/StoreDecorator/StoreDecorator';
import { RouterDecorator } from '../../src/shared/config/Storybook/RouterDecorator/RouterDecorator';
import { i18nDecorator } from '../../src/shared/config/i18n/i18nDecorator';

const preview: Preview = {
    decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator(), i18nDecorator, RouterDecorator],
    parameters: {
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
