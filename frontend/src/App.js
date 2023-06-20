import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import RouteComponents from './constants/routes/route';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init();
  return (
    <>
      <GlobalStyle />
      <RouteComponents />
    </>
  );
}

export default App;
