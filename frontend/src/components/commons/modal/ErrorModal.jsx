import React from 'react';
import styled from 'styled-components';

// 모달 컴포넌트
export default function ErrorModal({ onClose, message }) {
  return (
    <ErrorModalWrapper>
      <ErrorModalContent>
        <RedSection>
          <Circle />
          <EButton onClick={onClose}>X</EButton>
        </RedSection>
        <WhiteSection>
          <LeftCircle>
            <RedInitial>e</RedInitial>
          </LeftCircle>
          <Message>{message}</Message>
        </WhiteSection>
        <Okbox>
          <SmallBox onClick={onClose}>OK</SmallBox>
        </Okbox>
        <LoImage>
            <img src="/images/commons/mainearth.png" alt="사랑해 지구야 로고" />
        </LoImage>
      </ErrorModalContent>
    </ErrorModalWrapper>
  );
}
const LoImage = styled.div`
display:flex;
justify-content: right;  
margin-top:-10rem;
margin-right:-10rem;
img{
    width:20rem;
    
  };
`;
const WhiteSection = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftCircle = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: #87ceeb;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  margin-left: 1.4rem;
  margin-top: 1.3rem;
`;

const RedInitial = styled.div`
  color: #D26565;
  font-size: 8rem;
  font-weight: bold;
  font-family: 'Your preferred font', sans-serif;
  position: absolute;
  top: -0.8rem;
  left: 1.3rem;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #87ceeb;
  border-radius: 50%;
  margin-right: 10px;
  position: absolute;
  right: 1rem;
`;

const Message = styled.p`
  max-width: 65%;
  line-height: 1.2;
  margin-left:0.8rem;
  font-size: 1.5rem;
`;

const SmallBox = styled.button`
  width: 80px;
  height: 40px;
  background-color: #87ceeb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

const ErrorModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ErrorModalContent = styled.div`
  width: 35rem;
  height: 25rem;
  border: 12px solid #a6a2a2;
  border-radius: 5px;
  background-color: white;
`;

const RedSection = styled.div`
  height: 25%;
  background-color: #D26565;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: flex-end;
  position: relative;
`;

const EButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #D26565;
  position: absolute;
  right: 2.9rem;
  font-weight: bold;
`;

const Okbox = styled.div`
  display: flex;
  justify-content: center;
`;
