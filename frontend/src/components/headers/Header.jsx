import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE } from '../../constants/routes/routeData';
import { useRecoilState } from 'recoil';
import { userInfoState, userTokenState } from '../../stores';
import * as API from '../../api/index';

export default function Header() {
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    if (sessionStorage.getItem('userToken')) {
      setUserToken(sessionStorage.getItem('userToken'));
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const result = await API.get('/user');
      setUserInfo(result.data);
    };

    if (userToken) {
      getUserInfo();
    }
  }, [userToken]);

  console.log(userInfo);

  return (
    <HeaderWrap>
      <HeaderContainer>
        <LogoBox>
          <Link to={'/'}>
            {/* <LogoImgBox>
              <img src="/images/commons/logo.png" alt="사랑해 지구야 로고" />
            </LogoImgBox> */}
            <LogoImgBox>
              <img src="/images/commons/textlogo.png" alt="사랑해 지구야 로고" />
            </LogoImgBox>
          </Link>
        </LogoBox>
        <NavigationBox>
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
          {userToken && (
            <InfoMenu>
              <UserName>{userInfo.nickname}</UserName>
              <CountBox>
                {/* <CountImgBox>
                <img src="" alt="" />
              </CountImgBox>{' '} */}
                <span>🥤: 9</span>
              </CountBox>
              <CountBox>
                {/* <CountImgBox>
                <img src="" alt="" />
              </CountImgBox>{' '} */}
                <span>♻️ : 9</span>
              </CountBox>
            </InfoMenu>
          )}
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
                  <SubMenuBtn>
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

const HeaderContainer = styled.header`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImgBox = styled.div`
`;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  @media (max-width: 1050px) {
    display: none;
  }
`;

const Navigation = styled.nav``;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 4.5rem;
`;

const MenuList = styled.li`
  a {
    font-size: 1.8rem;
    font-weight: 500;
    color: #111;
  }
`;

const SubMenu = styled.ul`
  display: flex;
  gap: 1.8rem;
  align-items: center;
`;

const SubMenuList = styled.li``;

const LogoBox = styled.div`
  width: 8rem;
  margin-left:-3rem;
  img {
    width: 100%;
  }
  display: flex;
  flex-direction: row;
  gap:5rem;
`;

const SubMenuBtn = styled.button`
  width: 120px;
  height: 48px;
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

const InfoMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  color: #01881c;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  span {
    font-size: 1.7rem;
    font-weight: 500;
  }
`;

// const CountImgBox = styled.div`
//   width: 2rem;
// `;
