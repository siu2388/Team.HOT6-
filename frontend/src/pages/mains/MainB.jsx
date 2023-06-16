import React, { useEffect, useState } from 'react';
import * as S from './main.styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as Api from '../../api/index';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
  const [plasticData, setPlasticData] = useState([]);
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const plasticResult = await Api.get('/plasticData');
      const parsedPlasticData = JSON.parse(plasticResult.data.data);
      const recentPlasticData = parsedPlasticData.slice(-10);

      setPlasticData(recentPlasticData);

      const wasteResult = await Api.get('/wasteData');
      const parsedWasteData = JSON.parse(wasteResult.data.data);

      const transformedWasteData = Object.keys(parsedWasteData).map(year => ({
        Year: year,
        '재활용 가능자원 분리배출': parsedWasteData[year]['재활용 가능자원 분리배출'],
        '종량제방식 등 혼합배출': parsedWasteData[year]['종량제방식 등 혼합배출'],
      }));

      setWasteData(transformedWasteData);
    };
    fetchData();
  }, []);

  return (
    <S.MainWrap02>
      <S.MainContainer>
        <S.MainMent02>
          심각한 환경문제 <br className="br" />
          어떻게 생각하시나요?
        </S.MainMent02>
        <S.SlickContainer>
          <Slider {...settings}>
            <div>
              <S.ChartInfo>
                <h3>플라스틱 생산량</h3>
                <p>
                  지구온난화의 주범 온실 가스! <br />
                  온실효과를 일으키는 6대 온실가스 중에서 65% 로 가장큰 비율을 차지하는 기체는 ?{' '}
                  <br />
                  이산화탄소 입니다. <br />
                  플라스틱은 생산단계에서 61%, 가공단계에서 30% , 소각 등 영구폐기단계에서 9%의{' '}
                  <br />
                  이산화탄소가 각각 배출됩니다. 생산단계에서 가장 큰 이산화탄소가 배출된다고
                  하는데!!!! <br /> <br />
                  해가 지날수록 점점 증가하기만 하는 플라스틱 총 생산량이 보이시나요?? <br />
                  우리가 많이 소비하는 만큼 생산량도 늘어날 수 밖에 없지 않을까요?? <br />
                  (🌈6대 온실가스 : 이산화탄소, 메탄, 이산화질소, 과불화탄소, 수소불화탄소,
                  육불화황)
                </p>
              </S.ChartInfo>
              <S.ChartBox>
                <ResponsiveContainer width="80%" height="60%">
                  <BarChart
                    width={380}
                    height={300}
                    data={plasticData}
                    margin={{
                      top: 5,
                      right: 20,
                    }}
                  >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="전 세계 플라스틱 생산량(백만 톤)" fill="#F3A478" />
                    <XAxis dataKey="Year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartBox>
            </div>
            <div>
              <S.ChartInfo>
                <h3>플라스틱 쓰레기 배출량</h3>
                <p>
                  우리가 버리는 플라스틱을 포함하는 폐합성수지류의 양을 비교해 봅시다.
                  <br /> (폐합성수지류 : 비닐류, 발포수지류, PET 병, 기타) 코로나가 시작된
                  2019년부터 혼합배출된 폐합성수지류의 양의 급격한 증가를 볼 수 있네요.
                  <br /> 배달음식도 많이 이용했지만, 편리함이 익숙해져 일회용 플라스틱을 많이
                  사용하고 있지는 않나요?
                </p>
              </S.ChartInfo>
              <S.ChartBox>
                <ResponsiveContainer width="80%" height="60%">
                  <LineChart
                    width={380}
                    height={300}
                    data={wasteData}
                    margin={{
                      top: 5,
                      right: 20,
                    }}
                  >
                    <Line
                      type="monotone"
                      dataKey="재활용 가능자원 분리배출"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="종량제방식 등 혼합배출" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="Year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </S.ChartBox>
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
