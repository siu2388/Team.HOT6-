import React from 'react';
import styled from 'styled-components';

export default function FileUpload() {
  return (
    <>
      <FileInput type="file" id="file" />
      <FileInputLabel htmlFor="file">
        <img src="/images/groups/details/addBtn.png" alt="인증사진 추가버튼" />
      </FileInputLabel>
    </>
  );
}

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: block;
  width: 100%;
  height: 25rem;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: #111;
  background: #eee;
  cursor: pointer;

  img {
    width: 5rem;
  }
`;
