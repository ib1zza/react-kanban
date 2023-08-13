import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children: ReactNode,
    initialState?: DeepPartial<StateSchema>
}
const StoreProvider = ({ children, initialState } : StoreProviderProps) => {
    const store = createReduxStore(initialState as StateSchema);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export { StoreProvider };
