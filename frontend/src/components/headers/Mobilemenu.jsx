import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import styled,{ keyframes, css } from 'styled-components';
import { ROUTE } from '../../constants/routes/routeData';
import MyProfile from '../mypages/profilebox/MyProfile';

const MobileMenu = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        <HamburgerIcon className={isOpen ? 'open' : ''} />
      </HamburgerButton>
      <MobileMenuContainer isOpen={isOpen}>
        <MobileMenuContent isOpen={isOpen}>
          <CloseButton onClick={closeMenu}>&times;</CloseButton>
          <MyProfilebox>
            <MyProfile userInfo={userInfo} />
          </MyProfilebox>
          <MenuItem>
            <MenuLink to={ROUTE.GROUP_LIST.link} onClick={toggleMenu}>Group</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to={'/'} onClick={toggleMenu}>Challenge</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to={'/'} onClick={toggleMenu}>Community</MenuLink>
          </MenuItem>
          <SubMenu>
          {userInfo ? (
            <LoginBox>
              <SubMenuList>
                <SubMenuBtn btn={'stroke'}>
                  <Link to={ROUTE.PAGE_GROUP.link}>MYPAGE</Link>
                </SubMenuBtn>
              </SubMenuList>
              <SubMenuList>
                <SubMenuBtn>
                  <Link>LOGOUT</Link>
                </SubMenuBtn>
              </SubMenuList>
            </LoginBox>
          ) : (
            <LoginBox>
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
            </LoginBox>
          )}
          </SubMenu>
          </MobileMenuContent>
      </MobileMenuContainer>
      {isOpen && <MobileMenuOverlay onClick={closeMenu} />}
    </>
  );
};

const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem; 
  height: 3rem; 
`;
const HamburgerIcon = styled.div`
  width: 24px;
  height: 3px;
  background-color: #111;
  position: relative;
  transition: transform 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    right:0.1rem;
    width: 100%;
    height: 3px;
    background-color: #111;
    transition: transform 0.3s ease;
  }

  &::before {
    top: -8px;
  }

  &::after {
    bottom: -8px;
  }

  &.open {
    transform: rotate(45deg);

    &::before {
      transform: rotate(90deg);
      top: 0;
    }

    &::after {
      transform: rotate(90deg);
      bottom: 0;
    }
  }
`;

const slideInAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;


const MobileMenuContainer = styled.div`
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #EAEAEA;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  z-index: 999;
  width: 50%; 
  overflow-x: visible;
  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${slideInAnimation} 0.3s ease;
        `
      : css`
          animation: ${slideOutAnimation} 0.3s ease;
        `};
  overflow-y:auto;
  @media (max-width: 920px) {
    width: 70%;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;


const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: -12px;
  position: relative;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;
const CloseButton = styled.button`
  position: absolute;
  right:2rem;
  margin-right:0rem;
  background: none;
  border: none;
  font-size: 6rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const MyProfilebox = styled.div`
  background-color:#fff;
  padding-top:6rem;
  padding-bottom: 8rem;
  margin-top:8rem;
  margin-bottom:8rem;

`;
const MenuItem = styled.div`
  margin-bottom: 4rem;
  margin-left: 3rem;
  a {
    font-size: 3.8rem;
    font-weight: bold;
    color: #444;
    text-decoration: none;
    display: inline-block;
    padding: 2rem 3rem;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: #CFCDCD;
    border-color: #CFCDCD;
    border-radius: 4rem;
  }
`;


const MenuLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 500;
  color: #111;
  text-decoration: none;
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubMenuList = styled.div`
  margin-bottom: 0.3rem;
  display:flex;
  justify-content:center;
`;

const LoginBox = styled.div`
    display:flex;
    margin-top:14rem;
    flex-direction: column;
`;

const SubMenuBtn = styled.button`
  background-color: ${({ btn }) => (btn === 'stroke' ? '#fff' : '#457B3B')}; 
  margin-top: 1.2rem;
  width: 50rem;
  height: 7rem;
  border-radius: 5%; 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.3rem solid ${({ btn }) => (btn === 'stroke' ? '#457B3B' : '#457B3B')};

  &:hover {
    background-color: ${({ btn }) => (btn === 'stroke' ? '#f2f7f5' : '#5C8E6A')}; 
    border-color: ${({ btn }) => (btn === 'stroke' ? '#5C8E6A' : '#5C8E6A')}; 
  }

  a {
    padding-top:2rem;
    width:100%;
    height:100%;
    font-size: 2rem;
    font-weight: 500;
    color: ${({ btn }) => (btn === 'stroke' ? '#457B3B' : '#fff')};
    text-decoration: none;
  }
`;



export default MobileMenu;
