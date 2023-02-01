import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { ContextProvider } from './admin/contexts/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ContextProvider> 
    <App />
    </ContextProvider>
  </Provider>
);