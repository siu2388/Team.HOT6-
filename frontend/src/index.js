import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RecoilRootComponent from './components/commons/RecoilRoot';
import LayoutComponent from './components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <RecoilRootComponent>
        <LayoutComponent>
          <App />
        </LayoutComponent>
      </RecoilRootComponent>
    </Router>
  </React.StrictMode>,
);
