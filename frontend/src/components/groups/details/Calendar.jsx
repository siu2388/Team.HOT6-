import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function GroupCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tileClassName = ({ date }) => {
    // 선택한 날짜와 같으면 'selected' 클래스 반환
    if (date.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10)) {
      return 'selected';
    }
    // 그 외에는 null 반환
    return null;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <CalendarWrap>
      <CalendarBox>
        <Calendar value={selectedDate} onChange={handleDateChange} tileClassName={tileClassName} />
      </CalendarBox>
    </CalendarWrap>
  );
}

const CalendarWrap = styled.div`
  width: 100%;
`;

const CalendarBox = styled.div`
  width: 840px;

  .react-calendar {
    width: 100%;
    border-radius: 1rem;
  }

  .react-calendar__tile {
    display: block;
    padding: 0.5rem;
    height: 12rem;
    position: relative;
    abbr {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  .react-calendar__navigation__label__labelText {
    font-size: 1.8rem;
  }

  .react-calendar__navigation button {
    font-size: 1.8rem;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6cd5a9;
  }

  .react-calendar__tile--now {
    background: #6cd5a9;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #2e7d32;
  }

  .react-calendar__tile--active {
    background: #2e7d32;
  }
`;
