import { Story } from '@storybook/react';
import { Theme } from '../../../../app/providers/theme/lib/ThemeContext';
import { ThemeProvider } from '../../../../app/providers/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);
