import React from 'react';
import styled from 'styled-components';

const SuccessModal = ({ message, onClose }) => {
  return (
    <SuccessModalWrapper>
      <SuccessModalContent>
        <BlueSection>
          <Circle>
          <XButton onClick={onClose}>X</XButton>
          </Circle>
        </BlueSection>
        <WhiteSection>
          <LeftCircle>
            <BlueInitial>
            <img src="/images/commons/success.png" alt="Success" />
            </BlueInitial>
          </LeftCircle>
          <Message>{message}</Message>
        </WhiteSection>
        <Okbox>
          <SmallBox onClick={onClose}>OK</SmallBox>
        </Okbox>
        <LoImage>
            <img src="/images/commons/mainearth.png" alt="사랑해 지구야 로고" />
        </LoImage>
      </SuccessModalContent>
    </SuccessModalWrapper>
  );
};

export default SuccessModal;


const LoImage = styled.div`
display:flex;
justify-content: right;  
margin-top:-10rem;
margin-right:-10rem;
img{
    width:20rem;
    
  };
`;
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
  padding-bottom: 10rem;
  border: 0.8rem solid #a6a2a2;
  border-radius: 5px;
  background-color: white;
`;

const BlueSection = styled.div`
  height: 5rem;
  background-color: #657DD2;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: flex-end;
  position: relative;
`;

const BlueInitial = styled.div`
  position: absolute;
  img{
    width:7rem;
  }
  
`;

const Circle = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #87ceeb;
  border-radius: 50%;
  margin-right: 0.5rem;
  position: absolute;
  right: 1rem;
`;

const XButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 2.5rem;
  color: #657DD2;
  position: absolute;
  margin-left: 0.7rem;
  font-weight: bold;
`;

const WhiteSection = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap:2.2rem;
`;

const LeftCircle = styled.div`
  width: 8rem;
  height: 8rem;
  position: relative;
  margin-left: 1.2rem;
  margin-top: 1rem;
`;

const Message = styled.p`
  margin-top: 2rem;
  max-width: 65%;
  line-height: 1.2;
  font-size: 1.5rem;
`;

const SmallBox = styled.button`
  width: 8rem;
  height: 4rem;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size:2rem;
  &:hover {
    background-color: #657DD2;
  }
`;

const Okbox = styled.div`
  display: flex;
  justify-content: center;
`;
