import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 2,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  cssEase: 'linear',

  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

export default function Slick() {
  return (
    <SlickContainer>
      <Slider {...settings}>
        <div>
          <SlideBox back={'/images/main/slick01.png'}>
            <SlideHoverBox>
              <Link>바로가기</Link>
            </SlideHoverBox>
          </SlideBox>
        </div>
        <div>
          <SlideBox back={'/images/main/slick02.png'}>
            <SlideHoverBox>
              <Link>바로가기</Link>
            </SlideHoverBox>
          </SlideBox>
        </div>
        <div>
          <SlideBox back={'/images/main/slick01.png'}>
            <SlideHoverBox>
              <Link>바로가기</Link>
            </SlideHoverBox>
          </SlideBox>
        </div>
      </Slider>
    </SlickContainer>
  );
}

const SlickContainer = styled.div`
  width: 100%;
  .slick-list {
    padding: 0 90px !important;
  }
`;

const SlideBox = styled.div`
  width: 600px;
  padding-bottom: 50%;
  background: ${({ back }) => `url(${back})`};
  /* background: url('/images/main/slick01.png'); */
  border-radius: 4rem;
  position: relative;

  @media (min-width: 1700px) {
    width: 750px;
  }

  @media (max-width: 1350px) {
    width: 500px;
  }

  @media (max-width: 1200px) {
    width: 400px;
  }
  @media (max-width: 950px) {
    width: 300px;
  }
  @media (max-width: 800px) {
    width: 85%;
  }

  &:hover {
    & > div {
      display: block;
    }
  }
`;

const SlideHoverBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  display: none;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 5rem;
    font-weight: 600;
    color: #fff;
  }
`;
