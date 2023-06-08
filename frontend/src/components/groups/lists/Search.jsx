import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export default function Search() {
  return (
    <SearchBox>
      <SearchInput type="text" placeholder="그룹명을 입력해주세요." />
      <Button variant="contained" color="success">
        <a>검색</a>
      </Button>
    </SearchBox>
  );
}

const SearchBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 22rem;
  height: 4rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0.8rem;
  outline: none;
  font-size: 1.5rem;
  font-weight: 400;
  color: #111;
`;
