import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE_ARR } from './routeData';

export default function RouteComponents() {
  return (
    <Routes>
      {ROUTE_ARR.map(({ path, element }, index) => (
        <Route key={index} path={path} exact element={element} />
      ))}
    </Routes>
  );
}
