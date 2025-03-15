import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ThemeProvider } from './app/providers/theme';
import './shared/config/i18n/i18n';
import { StoreProvider } from 'app/providers/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StoreProvider>
        <BrowserRouter basename="/">
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StoreProvider>,
);
