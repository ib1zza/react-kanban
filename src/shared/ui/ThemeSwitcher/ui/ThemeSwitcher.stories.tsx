import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '../../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';
import { StoreDecorator } from '../../../config/Storybook/StoreDecorator/StoreDecorator';
import ThemeSwitcher from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'shared/ThemeSwitcher',
    component: ThemeSwitcher,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Primary: Story = {

};
export const PrimaryDark: Story = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
