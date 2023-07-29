import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../../shared/config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import { StoreDecorator } from '../../../shared/config/Storybook/StoreDecorator/StoreDecorator';
import PopupNotifications from './PopupNotifications';

const meta: Meta<typeof PopupNotifications> = {
    title: 'widgets/PopupNotifications',
    component: PopupNotifications,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator()];
export default meta;
type Story = StoryObj<typeof PopupNotifications>;

export const Primary: Story = {

};
export const PrimaryDark: Story = {

};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
