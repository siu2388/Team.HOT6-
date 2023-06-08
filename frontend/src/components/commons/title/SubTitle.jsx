import React from 'react';
import styled from 'styled-components';

export default function SubTitle({ title }) {
  return (
    <SubTitleWrap>
      <h2>{title}</h2>
    </SubTitleWrap>
  );
}

const SubTitleWrap = styled.div`
  h2 {
    font-size: 5rem;
    font-weight: 600;
    color: #078a04;
    text-align: center;
    margin-bottom: 3rem;
  }
`;
