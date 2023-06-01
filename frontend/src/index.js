import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RecoilRootComponent from './components/commons/RecoilRoot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRootComponent>
      <App />
    </RecoilRootComponent>
  </React.StrictMode>,
);
