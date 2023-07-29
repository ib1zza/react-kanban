import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '../../config/Storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../../app/providers/theme/lib/ThemeContext';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
    title: 'widgets/Footer',
    component: Footer,

};
meta.decorators = [ThemeDecorator(Theme.LIGHT)];
export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
    args: {
        active: '10',
        finished: '10',
    },
};
export const PrimaryDark: Story = {
    args: {
        active: '10',
        finished: '10',
    },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
