/* eslint-disable react/jsx-no-undef */

import { Provider } from 'react-redux';

import { Story } from '@storybook/react';
import { store } from '../../../../app/providers/StoreProvider/config/store';

export const StoreDecorator = () => (Story: Story) => (

    <Provider store={store}>
        <Story />
    </Provider>
);
