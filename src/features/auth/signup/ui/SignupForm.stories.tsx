import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';
import { ThemeDecorator } from '../../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import SignupForm from './SignupForm';
import { StoreDecorator } from '../../../../shared/config/Storybook/StoreDecorator/StoreDecorator';

const meta: Meta<typeof SignupForm> = {
    title: 'features/SignupForm',
    component: SignupForm,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof SignupForm>;
export const Primary: Story = {
    args: {

    },
};
export const PrimaryDark: Story = {
    args: {

    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
