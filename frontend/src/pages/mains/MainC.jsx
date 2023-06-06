import React from 'react';
import * as S from './main.styles';
import Slick from '../../components/mains/Slick';

export default function MainA() {
  return (
    <S.MainWrap03>
      <S.MainMentBox>
        <S.MainMent03>함께 지구를 지키는 방법</S.MainMent03>
        <img src="/images/main/main_sub04.png" alt="" />
      </S.MainMentBox>
      <Slick />
    </S.MainWrap03>
  );
}
