export const getDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const getDates = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDate()).padStart(2, 0);

  return `${year}-${month}-${day}`;
};

export const getDayOfWeek = date => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeek = week[date.getDay()];

  return `${dayOfWeek}요일`;
};
