import { atom } from 'recoil';

export const isPostcodeModalState = atom({
  key: 'isPostcodeModal',
  default: false,
});

export const postcodeAddressState = atom({
  key: 'postcodeAddress',
  default: '',
});
