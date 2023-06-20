import React from 'react';
import SuccessModal from '../../components/commons/modal/SuccessModal.jsx';
import ErrorModal from '../../components/commons/modal/ErrorModal.jsx';

export const successModal = message => {
  <SuccessModal message={message} />;
};

export const errorModal = message => {
  <ErrorModal message={message} />;
};
