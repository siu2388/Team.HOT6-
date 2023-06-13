import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE } from '../../constants/routes/routeData';
import { useRecoilState } from 'recoil';
import { isErrorModalState, updateState, userInfoState, userTokenState } from '../../stores';
import * as API from '../../api/index';
import MobileMenu from './Mobilemenu';

export default function Header() {
  const [userToken, setUserToken] = useRecoilState(userTokenState);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isMobile, setIsMobile] = useState(false);
  const [update] = useRecoilState(updateState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);

  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setUserToken(sessionStorage.getItem('userToken'));
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const result = await API.get('/user');
        setUserInfo(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [userToken, update]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logOut = () => {
    if (userToken) {
      sessionStorage.removeItem('userToken');

      window.location.reload();
    } else {
      setIsErrorModal({
        state: true,
        message: '로그아웃에 실패하였습니다.',
      });
    }
  };

  console.log(userInfo);

  return (
    <HeaderWrap>
      <HeaderContainer>
        <LogoBox>
          <Link to={'/'}>
            <LogoImgBox>
              <img src="/images/commons/textlogo.png" alt="사랑해 지구야 로고" />
            </LogoImgBox>
          </Link>
        </LogoBox>
        <NavigationBox>
          {!isMobile && (
            <Navigation>
              <NavMenu>
                <MenuList>
                  <Link to={ROUTE.GROUP_LIST.link}>Group</Link>
                </MenuList>
                <MenuList>
                  <Link to={'/'}>Challenge</Link>
                </MenuList>
                <MenuList>
                  <Link to={'/'}>Community</Link>
                </MenuList>
              </NavMenu>
            </Navigation>
          )}
          {userToken && (
            <InfoMenu>
              <UserName>{userInfo?.user?.nickname}</UserName>
              <CountBox>
                <span>🥤: {userInfo?.tumblerCount}</span>
              </CountBox>
              <CountBox>
                <span>♻️ : {userInfo?.multipleContainersCount}</span>
              </CountBox>
            </InfoMenu>
          )}
          {isMobile && (
            <MobileMenubox>
              <MobileMenu userInfo={userInfo} />
            </MobileMenubox>
          )}
          {!isMobile && (
            <SubMenu>
              {!userToken ? (
                <>
                  <SubMenuList>
                    <SubMenuBtn btn={'stroke'}>
                      <Link to={ROUTE.LOGIN.link}>LOGIN</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                  <SubMenuList>
                    <SubMenuBtn>
                      <Link to={ROUTE.JOIN.link}>JOIN</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                </>
              ) : (
                <>
                  <SubMenuList>
                    <SubMenuBtn onClick={logOut}>
                      <Link>로그아웃</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                  <SubMenuList>
                    <SubMenuBtn>
                      <Link to={ROUTE.PAGE_GROUP.link}>MYPAGE</Link>
                    </SubMenuBtn>
                  </SubMenuList>
                </>
              )}
            </SubMenu>
          )}
        </NavigationBox>
      </HeaderContainer>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  width: 100%;
  height: 7.6rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImgBox = styled.div`
  width: 100px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 8rem;
    height: auto;
  }
`;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Navigation = styled.div`
  display: flex;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const MenuList = styled.li`
  padding: 0 1.6rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  color: #252525;
  cursor: pointer;
  &:hover {
    color: #f1b24a;
  }
  a {
    font-size: 1.8rem;
    font-weight: 500;
    color: #111;
  }
`;

const InfoMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 2.4rem;
`;

const UserName = styled.div`
  margin-right: 0.8rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: #252525;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 5rem;
  font-weight: bold;
  color: #252525;
  span {
    font-size: 1.6rem;
  }
`;

const SubMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.4rem;
`;

const SubMenuList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SubMenuBtn = styled.button`
  width: 120px;
  height: 48px;
  margin-left: 2rem;
  border: ${({ btn }) => (btn === 'stroke' ? '1px solid #01881c' : 'none')};
  border-radius: 5px;
  background-color: ${({ btn }) => (btn === 'stroke' ? 'none' : '#01881c')};
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ btn }) => (btn === 'stroke' ? '#01881c' : '#fff')};
  }
`;

const MobileMenubox = styled.div`
  margin-left: 24px;
`;
