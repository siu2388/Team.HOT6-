import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarProfile from '../../commons/box/ProfileforCalendar';
import { getDate, getDayOfWeek } from '../../../commons/utils/getDate';
import AddActiveModal from './AddActiveModal';
import { res } from '../../../styles/responsive';
import { useParams } from 'react-router-dom';
import * as api from '../../../api.js';

export default function GroupCalendar({ title, userInfo }) {
  const [tumblerUsage, setTumblerUsage] = useState(0);
  const [containerUsage, setContainerUsage] = useState(0);
  const tumblerTotal = 150;
  const tumblerWidth = (tumblerUsage / tumblerTotal) * 100;
  const containerTotal = 150;
  const containerWidth = (containerUsage / containerTotal) * 100;

  const totalUsage = tumblerUsage + containerUsage;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [memberNames, setMemberNames] = useState([]); 
  const groupId = useParams().id;
  console.log(selectedDate,'!!!!!!!');

  const fetchCalendarData = async date => {
    try {
      const formattedDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      const res = await api.get(`/activities/${groupId}/${formattedDate}`);
      const data = res.data.activityInfo;
      console.log(data);
      
      setCalendarData(data || []);
      const tumbler = data?.tumbler || 0;
      const multipleContainers = data?.multipleContainers || 0;
      setTumblerUsage(tumbler);
      setContainerUsage(multipleContainers);
    } catch (error) {
      console.log('Error fetching calendar data:', error);
    }
  };
  useEffect(() => {
    fetchCalendarData(selectedDate);
  }, [selectedDate, groupId]);

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const tileData = calendarData.filter(data => data.date === formattedDate);

    if (tileData.length > 0) {
      return tileData.map((activity, index) => (
        <CalendarContent key={index}>
          🥤: {activity.tumbler} ♻️: {activity.multipleContainers}
        </CalendarContent>
      ));
    }

    return null;
  };

  const onClickToggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const tileClassName = ({ date }) => {
    if (date.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10)) {
      return 'selected';
    }
    return null;
  };

  const titleSat = ({ date }) => {
    return date.getDay() === 6 ? 'saturday' : null;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    fetchCalendarData(date);
  };

  const onClickMonth = async date => {
    try {
      const currentMonth = date.getMonth();
      const nextMonth = currentMonth + 1;
      const formattedNextMonth = nextMonth < 10 ? `0${nextMonth}` : nextMonth;
      const year = date.getFullYear();
      const monthDate = `${year}-${formattedNextMonth}`;
      console.log(monthDate,'monthdDate');
      const res = await api.get(`/activities/${groupId}/${monthDate}`);
      const data = res.data.activityInfo;

      const response = await api.get(`/activities/${groupId}/${monthDate}/totalCount`);
      const totaldata = response.data;
      console.log('total!!!!!!!',totaldata);
      setCalendarData(data || []);
      const tumbler = totaldata?.tumbler || 0;
      const multipleContainers = totaldata?.multipleContainers || 0;
      console.log(tumbler,multipleContainers);
      setTumblerUsage(tumbler);
      setContainerUsage(multipleContainers);
    } catch (error) {
      console.log('Error fetching calendar data:', error);
    }
  };
  useEffect(() => {
    onClickMonth(selectedDate);
  }, [selectedDate, groupId]);

  const fetchMemberProfile = async () => {
    try {
      const selectedDateCopy = new Date(selectedDate);
      selectedDateCopy.setDate(selectedDateCopy.getDate() + 1);
      const formattedDate = selectedDateCopy.toISOString().slice(0, 10);
      const response = await api.get(`/activities/${groupId}/${formattedDate}`);
      const data = response.data.activityInfo;
  
      if (data && Array.isArray(data)) {
        const selectedDateCopy = new Date(formattedDate);
        selectedDateCopy.setDate(selectedDateCopy.getDate() - 1);
        const selectedDateData = data.filter(
          (member) => member.date === selectedDateCopy.toISOString().slice(0, 10)
        );
          console.log('data!!!!1',selectedDateData);
        const filteredMembers = selectedDateData.reduce((acc, member) => {
          const existingMember = acc.find(
            (item) => item.nickname === member.nickname
          );
          if (!existingMember) {
            acc.push(member);
          }
          return acc;
        }, []);
        console.log('data!!!!2',filteredMembers);
        setMemberNames(filteredMembers);
      } else {
        setMemberNames([]);
      }
  
    } catch (error) {
      console.log('Error fetching member profile:', error);
    }
  };
  
  useEffect(() => {
    fetchMemberProfile();
  }, [selectedDate, groupId]);

  return (
    <>
    <CalendarWrap>
      <CalendarBox>
        <Calendar
          calendarType="US"
          value={selectedDate}
          onChange={handleDateChange}
          tileClassName={[tileClassName, titleSat]}
          tileContent={tileContent}
          onActiveStartDateChange={({ activeStartDate, view }) => {
            if (view === 'month') {
              onClickMonth(activeStartDate);
            }
          }}
        />
      </CalendarBox>
      <CalendarDetailBox>
        <TodayDateBox>
          <div>
            <TodayDate>{getDate(selectedDate)}</TodayDate>
            <TodayDw>{getDayOfWeek(selectedDate)}</TodayDw>
          </div>
          {groupId === userInfo?.user?.groupId && (
            <AddBtn onClick={onClickToggleModal}>
              <img src="/images/groups/details/addBtn.png" alt="" />
            </AddBtn>
          )}
        </TodayDateBox>
        <MemberProfilies>
        {memberNames.map((member, index) => (
            <CalendarProfile
              key={index}
              member={member.members}
            />
          ))}
        </MemberProfilies>
      </CalendarDetailBox>
      {isOpen && (
        <AddActiveModal onClickToggleModal={onClickToggleModal} selectedDate={selectedDate} />
      )}
    </CalendarWrap>
    <AdditionalBox>
    <ProgressContainer>
      <ProgressTitle>
        <IconContainer>🥤텀블러</IconContainer>
        <ProgressBar>
          <FilledProgressBar width={tumblerWidth} />
        </ProgressBar>
        <ProgressValue>{tumblerUsage}</ProgressValue>
      </ProgressTitle>
      <ProgressTitle>
        <IconContainer>🫙다회용기</IconContainer>
        <ProgressBar>
          <FilledProgressBar width={containerWidth} />
        </ProgressBar>
        <ProgressValue>{containerUsage}</ProgressValue>
      </ProgressTitle>
    </ProgressContainer>
    <EarthBox>
      <LogoImage>
        <img src="/images/commons/coinearth.png" alt="사랑해 지구야 로고" />
      </LogoImage>
      <StatusMessage>
        <SpeechBubble>
          <SpeechText>Good!</SpeechText>
          <Desc>{title} 그룹의 이번 달 텀블러 사용 횟수는 {tumblerUsage}회,</Desc>
          <Desc>다회용기 사용 횟수는 {containerUsage}회야!</Desc>
          <SpeechHighlight>우리는 이번달에 ⭐️{totalUsage}회⭐️ 지구를 지켰어!</SpeechHighlight>
        </SpeechBubble>
      </StatusMessage>
    </EarthBox>
  </AdditionalBox>
  </>
  );
}

const CalendarWrap = styled.div`
  width: 100%;
  height: 677px;
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  @media ${res.mobile} {
    height: auto;
    flex-direction: column;
  }
`;

const CalendarBox = styled.div`
  width: 840px;
  height: 100%;

  @media ${res.mobile} {
    width: 100%;
  }

  .react-calendar {
    width: 100%;
    border-radius: 1rem;
    border: 1px solid #999;
  }

  .react-calendar__tile {
    display: block;
    padding: 0.5rem;
    height: 12rem;
    position: relative;
    abbr {
      position: absolute;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.5rem;
    }
  }

  .react-calendar__navigation__label__labelText {
    font-size: 1.8rem;
  }

  .react-calendar__navigation button {
    font-size: 1.8rem;
    border-radius: 1rem;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #25d26d;
  }

  .react-calendar__tile--now {
    background: #25d26d;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #2e7d32;
  }

  .react-calendar__tile--active {
    background: #2e7d32;
  }
  .react-calendar button {
    border-radius: 1rem;
  }
`;

const CalendarDetailBox = styled.div`
  width: 420px;
  height: 100%;
  background-color: #fff;
  padding: 3rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid #999;

  @media ${res.mobile} {
    width: 100%;
  }
`;

const TodayDateBox = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 3rem;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodayDate = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 1rem;
`;

const TodayDw = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  color: #9d9d9d;
`;

const MemberProfilies = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: auto;
`;

const CalendarContent = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: #111;
`;

const AddBtn = styled.button`
  width: 4.5rem;
  img {
    width: 100%;
  }

  &:hover > img {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;
const AdditionalBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 4rem;
  margin-top: 20rem;
  justify-content: center;
  justify-content: space-around;
  @media (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  flex-direction: column;
`;

const ProgressTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconContainer = styled.div`
  margin-top: 3rem;
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
`;

const ProgressBar = styled.div`
  width: 25rem;
  height: 1.2rem;
  background-color: #e0e0e0;
  border-radius: 0.6rem;
`;

const FilledProgressBar = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background-color: #7ed321;
  border-radius: 0.6rem;
`;

const ProgressValue = styled.span`
  font-size: 2.2rem;
  font-weight: 500;
  color: #111;
`;
const EarthBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  font-weight: 400;
  color: #111;
  line-height: 1.5;
  margin-top: -3rem;
`;

const SpeechBubble = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 2rem;
  padding: 3rem;
  margin-left: 7rem;

  &::before {
    content: '';
    position: absolute;
    top: 1.4rem;
    left: -2rem;
    border: 1.8rem solid transparent;
    border-bottom-color: #ffffff;
    border-right-color: #ffffff;
    transform: rotate(-120deg);
  }
`;
const SpeechText = styled.p`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #98af47;
  font-family: 'Comic Sans MS', cursive;
`;

const Desc = styled.p`
  font-size: 1.7rem;
`;

const SpeechHighlight = styled.h1`
  font-size: 2.2rem;
  font-weight: 500;
  margin-top: 1rem;
`;

const LogoImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-top: -1rem;
    width: 30rem;
  }
`;