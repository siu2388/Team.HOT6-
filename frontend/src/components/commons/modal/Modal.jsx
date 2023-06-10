import React from 'react';
import styled from 'styled-components';



// 모달 컴포넌트
const Modal = ({type, message, closeModal}) => {

  if (type === 'success') {
    return (
      <SuccessModalWrapper>
        <SuccessModalContent>
          <BlueSection>
            <Circle />
            <XButton >X</XButton>
          </BlueSection>
          <WhiteSection>
            <LeftCircle>
              <BlueInitial>i</BlueInitial>
            </LeftCircle>
            <Message>{message}에 성공하셨습니다!</Message>
          </WhiteSection>
          <Okbox>
                <SmallBox onClick={closeModal}>OK</SmallBox>
            </Okbox>
        </SuccessModalContent>
      </SuccessModalWrapper>
    );
  } else if(type === 'error') {
    return (
      <ErrorModalWrapper>
        <ErrorModalContent>
          <RedSection>
            <Circle />
            <EButton onClick={closeModal}>X</EButton>
          </RedSection>
          <WhiteSection>
            <LeftCircle>
              <RedInitial>e</RedInitial>
            </LeftCircle>
            <Message>{message}에 실패하셨습니다!</Message>
          </WhiteSection>
          <Okbox>
            <SmallBox onClick={closeModal}>OK</SmallBox>
          </Okbox>
        </ErrorModalContent>
      </ErrorModalWrapper>
    );
  }
};

export default Modal;


const SuccessModalWrapper = styled.div`
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

const SuccessModalContent = styled.div`
    width: 35rem;
    height: 25rem;
    border: 12px solid #A6A2A2;
    border-radius: 5px;
    background-color: white;
`;

const BlueSection = styled.div`
  height: 25%;
  background-color: blue;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: flex-end;
  position: relative;
`;

const BlueInitial = styled.div`
  color: #1411C1;
  font-size: 9rem;
  font-weight: bold;
  font-family: 'Your preferred font', sans-serif;
  position:absolute;
  top:0.4rem;
  left:2.8rem;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  background-color: #87ceeb;
  border-radius: 50%;
  margin-right: 10px;
  position:absolute;
  right:1rem;
`;

const XButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  color: blue;
  position:absolute;
  right:1rem;
  right:2.9rem;
  font-weight: bold;
`;

const WhiteSection = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
`;

const LeftCircle = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: #87ceeb;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
  margin-left:1.2rem;
  margin-top: 1rem;
`;

const RedInitial = styled.div`
  color: #E70C0C;
  font-size: 11rem;
  font-weight: bold;
  font-family: 'Your preferred font', sans-serif;
  position:absolute;
  top:-1.8rem;
  left:1rem;
`;

const Message = styled.p`
  margin-top: 4rem;
  font-size: 1.5rem;
`;

const SmallBox = styled.button`
  width: 80px;
  height: 40px;
  background-color: lightblue;
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
  border: 12px solid #A6A2A2;
  border-radius: 5px;
  background-color: white;
`;

const RedSection = styled.div` 
  height: 25%;
  background-color: red;
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
  color: red ;
  position:absolute;
  right:2.9rem;
  font-weight: bold;
`;

const Okbox = styled.div`
  display: flex;
  justify-content: center;
`;