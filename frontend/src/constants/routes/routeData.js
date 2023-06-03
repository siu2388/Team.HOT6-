import React from 'react';
import MainPage from '../../pages/mains/Main';
import GroupList from '../../pages/groups/List';
import GroupDetailPage from '../../pages/groups/Detail';
import GroupWritePage from '../../pages/groups/Write';

export const ROUTE = {
  HOME: {
    path: '/',
    link: '/',
    element: <MainPage />,
  },
  GROUP_LIST: {
    path: '/groups',
    link: '/groups',
    element: <GroupList />,
  },
  GROUP_DETAIL: {
    path: '/groups/:id',
    link: '/groups',
    element: <GroupDetailPage />,
  },
  GROUP_WRITE: {
    path: '/groups/write',
    link: '/groups/write',
    element: <GroupWritePage />,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
