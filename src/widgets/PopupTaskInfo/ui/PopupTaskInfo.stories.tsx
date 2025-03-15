import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import { PopupTaskInfo } from './PopupTaskInfo';

const meta: Meta<typeof PopupTaskInfo> = {
    title: 'widgets/PopupTaskInfo',
    component: PopupTaskInfo,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof PopupTaskInfo>;

export const Primary: Story = {

};
export const PrimaryDark: Story = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
