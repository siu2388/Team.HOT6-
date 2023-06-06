import React from 'react';
import * as S from './main.styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: 'linear',
  fade: true,
  pauseOnHover: false,
};

export default function MainA() {
  return (
    <S.MainWrap02>
      <S.MainContainer>
        <S.MainMent02>
          심각한 환경문제 <br />
          어떻게 생각하시나요?
        </S.MainMent02>
        <S.SlickContainer>
          <Slider {...settings}>
            <div>
              <S.ChartInfo>
                <h3>차트 제목</h3>
                <p>차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트</p>
              </S.ChartInfo>
              <S.ChartBox></S.ChartBox>
            </div>
            <div>
              <S.ChartInfo>
                <h3>차트 제목2</h3>
                <p>
                  차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트
                  설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트
                  설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명차트 설명
                </p>
              </S.ChartInfo>
              <S.ChartBox></S.ChartBox>
            </div>
          </Slider>
        </S.SlickContainer>
      </S.MainContainer>
      <S.ScrollBox>
        <S.ScrollText>SCROLL</S.ScrollText>
        <S.ScrollIcon src="/images/main/down-arrow.png" alt="화살이미지" />
      </S.ScrollBox>
    </S.MainWrap02>
  );
}
