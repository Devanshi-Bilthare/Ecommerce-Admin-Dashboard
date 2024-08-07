import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
         <NextUIProvider>
            <App />
        </NextUIProvider>,
    </Provider>
   
);
