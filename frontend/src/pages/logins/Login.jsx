import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../api/index';
import { useRecoilState } from 'recoil';
import { isErrorModalState, userInfoState, userTokenState } from '../../stores';
import { ROUTE } from '../../constants/routes/routeData';

export default function LoginPage() {
  const [, setUserToken] = useRecoilState(userTokenState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  const onChangeInput = e => {
    const { name, value } = e.target;

    if (name === 'userId') {
      setUserId(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmitLogin = async e => {
    e.preventDefault();

    try {
      const data = {
        userId,
        password,
      };

      const result = await API.post('/login', data);

      const userToken = result.data.token;
      sessionStorage.setItem('userToken', userToken);
      setUserToken(userToken);
      navigate(ROUTE.HOME.link);
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: err.response.data,
      });
    }
  };

  return (
    <LoginWrap>
      <LoginContainer>
        <LoginLogoboxes>
          <LoginLogoimgBox>
            <img src="/images/commons/textlogo.png" alt="사랑해 지구야 로고" />
          </LoginLogoimgBox>
          <LoginLogoBox>
            <img src="/images/commons/mainearth.png" alt="사랑해 지구야 로고" />
          </LoginLogoBox>
        </LoginLogoboxes>
        <LoginForm>
          <InputBox>
            <TextField
              label="ID"
              id="outlined-start-adornment"
              name="userId"
              onChange={onChangeInput}
            />
          </InputBox>
          <InputBox>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
                name="password"
                onChange={onChangeInput}
              />
            </FormControl>
          </InputBox>
          <FindBox>
            <Link>ID / PW 찾기</Link>
          </FindBox>
          <Button variant="contained" color="success" onClick={handleSubmitLogin}>
            로그인
          </Button>
          <JoinLink>
            <Link to="/register">앗! 아직 아이디가 없으신가요? 가입하러가기</Link>
          </JoinLink>
        </LoginForm>
      </LoginContainer>
    </LoginWrap>
  );
}
const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8.8rem;
  background-color: #b6ce8a;
`;

const LoginContainer = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const LoginLogoboxes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const LoginLogoBox = styled.div`
  width: 23rem;
  height: auto;
  margin-bottom: 3rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-direction: row;
  img {
    width: 100%;
  }
`;

const LoginLogoimgBox = styled.div`
  width: 23rem;
  height: 13rem;
  display: flex;
  gap: 2rem;
  margin-right: 2rem;
  justify-content: center;
  flex-direction: row;
  img {
    width: 100%;
  }
  @media (max-width: 767px) {
    height: 16rem;
  }
`;

const InputBox = styled.div`
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  width: 100%;
  border-radius: 1rem;
  background-color: #fff;
  padding: 3rem;

  .MuiTextField-root {
    width: 100%;
  }

  .MuiFormControl-root {
    width: 100%;
    margin: 0;
  }

  .MuiOutlinedInput-input {
    font-size: 1.5rem;
  }

  .MuiInputLabel-root {
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

const FindBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;

  a {
    font-size: 1.4rem;
    font-weight: 400;
    color: #999;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const JoinLink = styled.div`
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
