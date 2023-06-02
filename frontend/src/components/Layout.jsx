import React from 'react';
import Header from './headers/Header';

export default function LayoutComponent({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
