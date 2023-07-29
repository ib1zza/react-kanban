import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react';
import i18n from './i18n';

export const i18nDecorator = (Story: Story) => (
    <Suspense fallback={<div>loading translations...</div>}>
        <I18nextProvider i18n={i18n}>
            <Story />
        </I18nextProvider>
    </Suspense>
);
