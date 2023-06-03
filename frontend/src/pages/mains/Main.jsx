import React from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import styled, { keyframes } from 'styled-components';
import Slick from '../../components/mains/Slick';

const options = {
  anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
};

export default function MainPage() {
  return (
    <SectionsContainer {...options}>
      <Section>
        <MainWrap01>
          <MainContainer>
            <MainContent01>
              <MentBox>
                <MentText>
                  사
                  <PositionBox>
                    랑<PositionImg01 src="/images/main/main_sub03.png" alt="지구 이미지" />
                  </PositionBox>
                  <PositionBox>
                    해<PositionImg02 src="/images/main/main_sub02.png" alt="새싹 이미지" />
                  </PositionBox>
                  <br />
                  지구야
                </MentText>
                <img src="/images/main/main_sub01.png" alt="" />
              </MentBox>
            </MainContent01>
            <MainContent02>
              <SubText01>SAVE THE EARTH</SubText01>
              <SubText02>
                지구는 우리의 부주의와 무관심으로 인해 파괴되고 있습니다. <br />
                환경 보호를 위해 분리수거 등의 노력을 기울이며, 아름다운 지구를 만들어 보면
                어떨까요?
              </SubText02>
            </MainContent02>
          </MainContainer>
        </MainWrap01>
      </Section>
      <Section>
        <MainWrap02>
          <MainContainer>
            <MainMent02>
              심각한 환경문제 <br />
              어떻게 생각하시나요?
            </MainMent02>
          </MainContainer>
        </MainWrap02>
      </Section>
      <Section>
        <MainWrap03>
          <MainMentBox>
            <MainMent03>함께 지구를 지키는 방법</MainMent03>
            <img src="/images/main/main_sub04.png" alt="" />
          </MainMentBox>
          <Slick />
        </MainWrap03>
      </Section>
    </SectionsContainer>
  );
}

const MainWrap01 = styled.div`
  width: 100%;
  height: 100vh;
  background: url('/images/main/main01.png');
  padding-top: 9.7rem;
  overflow: hidden;
`;

const MainContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

const MainContent01 = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const rotate = keyframes`
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

const MentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  & > img {
    width: 22rem;
    animation: ${rotate} 3s linear infinite alternate;
  }
`;

const MentText = styled.h2`
  font-size: 16rem;
  font-weight: 600;
  color: #22b0f1;
  -webkit-text-stroke: 5px #31348d;
`;

const MainContent02 = styled.div``;

const SubText01 = styled.h3`
  font-size: 7rem;
  font-weight: 600;
  color: #90f142;
  text-align: right;
  -webkit-text-stroke: 1px #fff;
`;

const SubText02 = styled.p`
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  text-align: right;
  line-height: 1.3;
`;

const PositionBox = styled.span`
  position: relative;
  font-size: 16rem;
  font-weight: 600;
  color: #22b0f1;
  -webkit-text-stroke: 5px #31348d;
`;

const PositionImg01 = styled.img`
  position: absolute;
  top: 1rem;
  right: -0.5rem;
`;

const PositionImg02 = styled.img`
  width: 8rem;
  position: absolute;
  left: 0.3rem;
  bottom: 5.6rem;
`;

const MainWrap02 = styled.div`
  width: 100%;
  height: 100vh;
  background: #ede0f1;
  padding-top: 12rem;
  overflow: hidden;
  position: relative;
`;

const MainMent02 = styled.h3`
  font-size: 7rem;
  font-weight: 600;
  color: #078a04;
  line-height: 1.3;
  position: absolute;
  top: 0;
  left: 0;
`;

const MainWrap03 = styled.div`
  width: 100%;
  height: 100vh;
  background: #f1f5f0;
  padding-top: 12rem;
  overflow: hidden;
  position: relative;
`;

const MainMentBox = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 8.5rem;
`;

const MainMent03 = styled.h3`
  font-size: 7rem;
  font-weight: 600;
  color: #078a04;
  text-align: center;
`;
