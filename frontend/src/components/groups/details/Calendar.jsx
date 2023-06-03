import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MemberProfileBox from '../../commons/box/MemberProfileBox';
import { getDate, getDayOfWeek } from '../../../commons/utils/getDate';
import AddActiveModal from './AddActiveModal';

export default function GroupCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

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

  const tileContent = () => {
    return <CalendarContent>하이</CalendarContent>;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <CalendarWrap>
      <CalendarBox>
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          tileClassName={[tileClassName, titleSat]}
          tileContent={tileContent}
        />
      </CalendarBox>
      <CalendarDetailBox>
        <TodayDateBox>
          <div>
            <TodayDate>{getDate(selectedDate)}</TodayDate>
            <TodayDw>{getDayOfWeek(selectedDate)}</TodayDw>
          </div>
          <AddBtn onClick={onClickToggleModal}>
            <img src="/images/groups/details/addBtn.png" alt="" />
          </AddBtn>
        </TodayDateBox>
        <MemberProfilies>
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
          <MemberProfileBox />
        </MemberProfilies>
      </CalendarDetailBox>
      {isOpen && (
        <AddActiveModal onClickToggleModal={onClickToggleModal} selectedDate={selectedDate} />
      )}
    </CalendarWrap>
  );
}

const CalendarWrap = styled.div`
  width: 100%;
  height: 677px;
  display: flex;
  justify-content: space-between;
`;

const CalendarBox = styled.div`
  width: 840px;
  height: 100%;

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
