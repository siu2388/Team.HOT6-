import React from 'react';
import styled from 'styled-components';
import FileUpload from '../../components/commons/FileUpload';
import { Button, Slider, TextField } from '@mui/material';

const marks = [
  {
    value: 0,
    label: '0명',
  },
  {
    value: 100,
    label: '100명',
  },
];

export default function GroupWritePage() {
  return (
    <WriteWrap>
      <WriteContainer>
        <Title>그룹 등록</Title>
        <Form>
          <FileContainer>
            <FileUpload />
          </FileContainer>
          <InputBox>
            <TextField id="outlined-basic" label="그룹 명" variant="outlined" />
          </InputBox>
          <SliderBox>
            <Slider
              aria-label="Custom marks"
              defaultValue={0}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
            />
            <p>30명</p>
          </SliderBox>
          <InputBox>
            <TextField
              id="outlined-textarea"
              label="그룹 상세내용"
              placeholder="상세내용을 입력해주세요."
              multiline
            />
          </InputBox>
          <BtnBox>
            <Button variant="contained" color="success">
              등록
            </Button>
            <Button variant="outlined" color="success">
              취소
            </Button>
          </BtnBox>
        </Form>
      </WriteContainer>
    </WriteWrap>
  );
}

const WriteWrap = styled.div`
  width: 100%;
  padding: 9.6rem;
`;

const WriteContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 3rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const Form = styled.form`
  width: 100%;
  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
    label {
      font-size: 1.4rem;
    }
    .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root {
      width: 100%;
      min-height: 6rem;
      textarea {
        font-size: 1.4rem;
        line-height: 1.3;
        overflow-y: auto;
      }
    }
  }

  .css-1aznpnh-MuiSlider-root {
    width: 80%;
    margin-left: 10px;
  }

  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1b5e20;
  }
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
  color: #1b5e20;
  text-align: center;
  margin-bottom: 3rem;
`;

const FileContainer = styled.div`
  width: 35rem;
  margin: 0 auto 3rem;
`;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const SliderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 3rem;
  button {
    font-size: 1.7rem;
    padding: 1rem 5rem;
  }
`;
