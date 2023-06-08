import React from 'react';
import styled from 'styled-components';
import MainA from './MainA';
import MainB from './MainB';
import MainC from './MainC';

export default function MainPage() {
  return (
    <Wrapper>
      <MainA />
      <MainB />
      <MainC />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  & > div {
    scroll-snap-align: start;
    height: 100vh;
  }
`;
