import React from 'react';
import styled from 'styled-components';

const SuccessModal = ({ message, onClose }) => {
  return (
    <SuccessModalWrapper>
      <SuccessModalContent>
        <BlueSection>
          <Circle />
          <XButton onClick={onClose}>X</XButton>
        </BlueSection>
        <WhiteSection>
          <LeftCircle>
            <BlueInitial>i</BlueInitial>
          </LeftCircle>
          <Message>{message}</Message>
        </WhiteSection>
        <Okbox>
          <SmallBox onClick={onClose}>OK</SmallBox>
        </Okbox>
      </SuccessModalContent>
    </SuccessModalWrapper>
  );
};

export default SuccessModal;

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
  border: 12px solid #a6a2a2;
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
  color: #1411c1;
  font-size: 9rem;
  font-weight: bold;
  font-family: 'Your preferred font', sans-serif;
  position: absolute;
  top: 0.4rem;
  left: 2.8rem;
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

const XButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  color: blue;
  position: absolute;
  right: 1rem;
  right: 2.9rem;
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
  margin-left: 1.2rem;
  margin-top: 1rem;
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

const Okbox = styled.div`
  display: flex;
  justify-content: center;
`;
