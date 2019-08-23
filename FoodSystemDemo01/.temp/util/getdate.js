/*
  *获取指定日期的前一天，后一天
  *date 代表指定的日期，格式：2018-09-27
  *day 传-1表始前一天，传1表始后一天
  */
const getNextPreDate = function getNextPreDate(date) {

  var weekday = "";
  let mydate = date;
  let myweekday = mydate.getDay();
  let mymonth = mydate.getMonth() + 1;
  let myday = mydate.getDate();
  let myyear = mydate.getYear();
  myyear = myyear > 200 ? myyear : 1900 + myyear;
  if (myweekday == 0) {
    weekday = " 星期日";
  } else if (myweekday == 1) {
    weekday = " 星期一";
  } else if (myweekday == 2) {
    weekday = " 星期二";
  } else if (myweekday == 3) {
    weekday = " 星期三";
  } else if (myweekday == 4) {
    weekday = " 星期四";
  } else if (myweekday == 5) {
    weekday = " 星期五";
  } else if (myweekday == 6) {
    weekday = " 星期六";
  }
  return mymonth + "月" + myday + "日" + "  " + weekday;
};

export default getNextPreDate;