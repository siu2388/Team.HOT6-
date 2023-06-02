export const getDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  console.log(year, month, day);

  return `${year}년 ${month}월 ${day}일`;
};

export const getDayOfWeek = date => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeek = week[date.getDay()];

  return `${dayOfWeek}요일`;
};
