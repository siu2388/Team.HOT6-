import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/mains/Main';
import GroupList from '../../pages/groups/list';

export default function RouteComponents() {
  return (
    <Routes>
      <Route path="/" exact element={<MainPage />} />
      <Route path="/groups" exact element={<GroupList />} />
    </Routes>
  );
}
