import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/mains/Main';

export default function RouteComponents() {
  return (
    <Routes>
      <Route path="/" exact element={<MainPage />} />
    </Routes>
  );
}
