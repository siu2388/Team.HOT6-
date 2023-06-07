import styled, { keyframes } from 'styled-components';

export const MainWrap01 = styled.div`
  width: 100%;
  height: 100vh;
  background: url('/images/main/main01.png');
  padding-top: 9.7rem;
  overflow: hidden;
  position: relative;
`;

export const MainContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

export const MainContent01 = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const rotate = keyframes`
0%{
    transform: rotate(0deg);
}
50%{ 
    transform: rotate(25deg);
}
100%{
    transform: rotate(-25deg);
}
`;

export const MentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  & > img {
    width: 22rem;
    animation: ${rotate} 3s linear infinite alternate;
  }
`;

export const MentText = styled.h2`
  font-size: 16rem;
  font-weight: 600;
  color: #22b0f1;
  -webkit-text-stroke: 5px #31348d;
`;

export const MainContent02 = styled.div``;

export const SubText01 = styled.h3`
  font-size: 7rem;
  font-weight: 600;
  color: #90f142;
  text-align: right;
  -webkit-text-stroke: 1px #fff;
`;

export const SubText02 = styled.p`
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  text-align: right;
  line-height: 1.3;
`;

export const PositionBox = styled.span`
  position: relative;
  font-size: 16rem;
  font-weight: 600;
  color: #22b0f1;
  -webkit-text-stroke: 5px #31348d;
`;

export const PositionImg01 = styled.img`
  position: absolute;
  top: 1rem;
  right: -0.5rem;
`;

export const PositionImg02 = styled.img`
  width: 8rem;
  position: absolute;
  left: 0.3rem;
  bottom: 5.6rem;
`;

export const MainWrap02 = styled.div`
  width: 100%;
  height: 100vh;
  background: #ede0f1;
  padding-top: 12rem;
  overflow: hidden;
  position: relative;
`;

export const MainMent02 = styled.h3`
  font-size: 7rem;
  font-weight: 600;
  color: #078a04;
  line-height: 1.3;
  position: absolute;
  top: 0;
  left: 0;
`;

export const MainWrap03 = styled.div`
  width: 100%;
  height: 100vh;
  background: #f1f5f0;
  padding-top: 12rem;
  overflow: hidden;
  position: relative;
`;

export const MainMentBox = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 8.5rem;
`;

export const MainMent03 = styled.h3`
  font-size: 7rem;
  font-weight: 600;
  color: #078a04;
  text-align: center;
`;

export const ScrollBox = styled.div`
  position: absolute;
  z-index: 999;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.7;
`;

const ScrollAnimation = keyframes`
  0% {
   bottom: -2.2rem;
  }
  100% {
   bottom: -4rem;
  }
`;

export const ScrollText = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
`;

export const ScrollIcon = styled.img`
  width: 2rem;
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation: ${ScrollAnimation} 0.8s 1s infinite linear;
`;

export const SlickContainer = styled.div`
  width: 100%;
  height: 70vh;

  .slick-slide {
    & > div > div {
      width: 100%;
      height: 100%;
      display: flex !important;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
`;

export const ChartInfo = styled.div`
  max-width: 48%;

  h3 {
    font-size: 3rem;
    font-weight: 600;
    color: #111;
    margin-bottom: 2rem;
  }
  p {
    font-size: 2rem;
    font-weight: 500;
    color: #111;
    line-height: 1.4;
  }
`;

export const ChartBox = styled.div`
  width: 50rem;
  height: 50rem;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
