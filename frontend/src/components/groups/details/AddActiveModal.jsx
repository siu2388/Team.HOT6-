import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { getDates } from '../../../commons/utils/getDate';

export default function AddActiveModal({ onClickToggleModal, selectedDate }) {
  return (
    <BackDrop>
      <Modal>
        <ModalTitle>활동 등록</ModalTitle>
        <ActiveForm>
          <InputBox>
            <TextField
              id="filled-required"
              label="이름"
              variant="standard"
              value="깜장이"
              disabled
            />
          </InputBox>
          <InputBox>
            <TextField
              id="filled-required"
              label="활동날짜"
              variant="standard"
              value={getDates(selectedDate)}
              disabled
            />
          </InputBox>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">실천항목</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="텀블러" control={<Radio />} label="텀블러" />
              <FormControlLabel value="다회용기" control={<Radio />} label="다회용기" />
            </RadioGroup>
          </FormControl>
          <FileBox>
            <FileTitle>활동 인증사진</FileTitle>
            <FileInput type="file" id="file" />
            <FileInputLabel htmlFor="file">
              <img src="/images/groups/details/addBtn.png" alt="인증사진 추가버튼" />
            </FileInputLabel>
          </FileBox>
          <BtnBox>
            <Button variant="contained" color="success">
              등록
            </Button>
            <Button variant="outlined" color="success" onClick={onClickToggleModal}>
              닫기
            </Button>
          </BtnBox>
        </ActiveForm>
      </Modal>
    </BackDrop>
  );
}

const BackDrop = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Modal = styled.div`
  width: 400px;
  padding: 3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  color: #01881c;
  margin-bottom: 3rem;
`;

const InputBox = styled.div`
  margin-bottom: 2rem;
`;

const ActiveForm = styled.form`
  width: 100%;
  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
  }
  .css-1x51dt5-MuiInputBase-input-MuiInput-input {
    font-size: 1.6rem;
    font-weight: 400;
    color: #111;
  }

  .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root {
    font-size: 1.7rem;
    font-weight: 400;
    color: #111;
  }

  .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled {
    -webkit-text-fill-color: #111;
  }

  #demo-row-radio-buttons-group-label {
    font-size: 1.5rem;
  }

  .css-j204z7-MuiFormControlLabel-root .MuiFormControlLabel-label {
    font-size: 1.4rem;
  }

  .css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked {
    color: rgb(1, 136, 28);
  }
`;

const FileBox = styled.div`
  margin: 2rem 0;
`;

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

const FileTitle = styled.h5`
  font-size: 1.4rem;
  font-weight: 400;
  color: #0009;
  margin-bottom: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
`;
