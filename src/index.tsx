import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize-scss';
import './styles/global.scss';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { GlobalStateProvider } from './context/State';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStateProvider>
        <Root />
      </GlobalStateProvider>
    </Router>
  </React.StrictMode>
);
