import React, { useEffect } from 'react';
import Header from './headers/Header';
import SuccessModal from './commons/modal/SuccessModal';
import ErrorModal from './commons/modal/ErrorModal';
import { useRecoilState } from 'recoil';
import { isErrorModalState, isSuccessModalState } from '../stores';
import Footer from './commons/Footers/Footer';
import { useLocation } from 'react-router-dom';

export default function LayoutComponent({ children }) {
  const [isSuccessModal, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [isErrorModal, setIsErrorModal] = useRecoilState(isErrorModalState);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 맨 위로 이동
  }, [location]);

  const onClose = () => {
    setIsScucessModal({ state: false, message: '' });
    setIsErrorModal({ state: false, message: '' });
  };

  return (
    <>
      <Header />
      {children}
      {location.pathname !== '/' && <Footer />}
      {isSuccessModal.state && <SuccessModal onClose={onClose} message={isSuccessModal.message} />}
      {isErrorModal.state && <ErrorModal onClose={onClose} message={isErrorModal.message} />}
    </>
  );
}
