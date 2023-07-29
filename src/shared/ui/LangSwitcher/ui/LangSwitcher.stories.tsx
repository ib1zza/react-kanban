import type { Meta, StoryObj } from '@storybook/react';

import { LangSwitcher } from './LangSwitcher';
import { ThemeDecorator } from '../../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';

const meta: Meta<typeof LangSwitcher> = {
    title: 'shared/LangSwitcher',
    component: LangSwitcher,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof LangSwitcher>;

export const Primary: Story = {

};
export const PrimaryDark: Story = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
