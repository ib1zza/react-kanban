/* eslint-disable react/jsx-no-undef */
import { Story } from '@storybook/react';

import { Provider } from 'react-redux';

import { store } from '../../../../app/providers/store/store';

export const StoreDecorator = () => (StoryComponent: Story) => (

    <Provider store={store}>
        <StoryComponent />
    </Provider>
);
