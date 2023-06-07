import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileUpload from '../../components/commons/FileUpload';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Postcode from '../../components/commons/DaumPostCode';
import { useRecoilState } from 'recoil';
import { isPostcodeModalState, postcodeAddressState } from '../../stores';
import * as Api from '../../api';

export default function JoinPage() {
  const [isPostcodeModal, setIsPostcodeModal] = useRecoilState(isPostcodeModalState);
  const [postcodeAddress, setPostcodeAddress] = useRecoilState(postcodeAddressState);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    address: postcodeAddress,
    addressDetail: '',
  });

  useEffect(() => {
    return () => {
      setPostcodeAddress(''); // Modified line
    };
  }, [setPostcodeAddress]); // Modified line

  const onClicktoggleAddressModal = () => {
    setIsPostcodeModal(prev => !prev);
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await Api.post('/users', formData);

      if (!response.ok) {
        throw new Error('User registration failed.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JoinWrap>
      <JoinContainer>
        <TitleBox>
          <JoinImgBox>
            <img src="/images/commons/logo.png" alt="" />
          </JoinImgBox>
          <JoinTitle>회원가입</JoinTitle>
        </TitleBox>
        <Form onSubmit={handleSubmit}>
          <ProfileImgBox>
            <FileUpload />
          </ProfileImgBox>
          <InputBox>
            <TextField
              label="아이디"
              id="outlined-start-adornment"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
            />
          </InputBox>
          <InputBox>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </InputBox>
          <InputBox>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPasswordConfirm ? 'text' : 'password'}
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password-Confirm"
              />
            </FormControl>
          </InputBox>
          <InputBox>
            <TextField
              label="이름"
              id="outlined-start-adornment"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </InputBox>
          <InputBox>
            <TextField
              label="닉네임"
              id="outlined-start-adornment"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
            />
          </InputBox>
          <InputBox>
            <TextField
              label="핸드폰 번호"
              id="outlined-start-adornment"
              placeholder="Ex) 010-0000-0000"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </InputBox>
          <InputBox>
            <TextField
              label={postcodeAddress ? '' : '주소'}
              id="outlined-start-adornment"
              disabled
              value={postcodeAddress}
            />
            <SearchIconBox onClick={onClicktoggleAddressModal}>
              <SearchIcon />
            </SearchIconBox>
          </InputBox>
          <InputBox>
            <TextField
              label="상세주소"
              id="outlined-start-adornment"
              name="addressDetail"
              value={formData.addressDetail}
              onChange={handleInputChange}
            />
          </InputBox>
          <Button type="submit" variant="contained" color="success">
            회원가입
          </Button>
          <LoginLink>
            <Link>이미 가입하셨다면? 로그인 하러가기</Link>
          </LoginLink>
        </Form>
      </JoinContainer>
      {isPostcodeModal && <Postcode />}
    </JoinWrap>
  );
}

const JoinWrap = styled.div`
  width: 100%;
  padding-top: 9.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 1rem;
  padding: 3rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const JoinTitle = styled.h3`
  font-size: 4rem;
  font-weight: 600;
  color: #01881c;
`;

const JoinImgBox = styled.div`
  width: 6rem;
  img {
    width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;

  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 100%;
  }
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    width: 100%;
  }
  .css-r47a1p-MuiFormControl-root {
    width: 100%;
    margin: 0;
  }

  .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root,
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input,
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
  }

  button {
    width: 100%;
    padding: 1.3rem 0;
    font-size: 1.6rem;
    font-weight: 500;
    color: #fff;
    margin-bottom: 2.5rem;
  }
`;

const ProfileImgBox = styled.div`
  width: 16rem;
  height: 16rem;
  margin: 3rem auto;
  label {
    height: 100%;
    border-radius: 50%;
  }
`;

const InputBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchIconBox = styled.div`
  width: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2rem;
  cursor: pointer;

  .css-i4bv87-MuiSvgIcon-root {
    font-size: 2.5rem;
  }
`;

const LoginLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    font-size: 1.3rem;
    font-weight: 400;
    color: #1759ff;
    &:hover {
      text-decoration: underline;
    }
  }
`;
