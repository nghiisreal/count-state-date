import { useEffect, useState } from "react";
const messages = ["Today", "days from today", "days ago was"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const day31 = [1, 3, 5, 7, 8, 10, 12];
const day30 = [4, 6, 9, 11];

const today = new Date();

let d = today.getDay(); // Lấy thứ trong tuần (0-6, 0 là Chủ Nhật, 1 là Thứ Hai, ...)
// let dt = today.getDate();
// let m = today.getMonth() + 1;
// let y = today.getFullYear();
let dt = today.getDate();
let m = today.getMonth() + 1;
let y = today.getFullYear();

const currentDate = new Date(y, m + 1, dt);
// console.log(d, dt, m, y);

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [day, setDay] = useState(d);
  const [date, setDate] = useState(dt);
  const [month, setMonth] = useState(m);
  const [year, setYear] = useState(y);
  // console.log(currentDate);
  function handlePrevStep() {
    setStep((s) => {
      const newStep = s - 1;
      if (newStep < 1) {
        return 1;
      }
    });
  }
  function handleNextStep() {
    setStep((s) => s + 1);
  }
  function handlePrevCount() {
    setCount((c) => {
      const newCount = c - step;
      return newCount;
    });
    setDay((d) => {
      let newDay = d - step;
      return newDay < 0 ? (newDay = newDay + 7) : newDay; // Nếu newDay < 0 là -1 thì cộng thêm 7
    });
    setDate((dt) => {
      let newDate = dt - step;
      if (newDate <= 0) {
        let newMonth = month - 1;
        if ([5, 7, 10, 12].includes(month)) {
          newDate += 30;
          setMonth(newMonth);
        }
        if ([1, 2, 4, 6, 8, 9, 11].includes(month)) {
          newDate += 31;
          setMonth(newMonth);
          if (newMonth < 1) {
            setMonth(newMonth + 12);
            setYear(y - 1); // Năm giảm 1
          } // Nếu newMonth < 1 thì cộng 12
        }
      }
      // Điều kiện tháng 3
      if (handleYear(year) === false) {
        // Năm không nhuận
        if (newDate <= 0 && month === 3) {
          newDate += 28;
          setMonth(month - 1);
        }
      } else {
        if (newDate <= 0 && month === 3) {
          newDate += 29;
          setMonth(month - 1);
        }
      }
      return newDate;
    });
  }
  function handleNextCount() {
    setCount((c) => {
      const newCount = c + step;
      return newCount;
    });
    setDay((d) => {
      let newDay = d + step;
      return newDay > 6 ? (newDay = newDay - 7) : newDay; // Nếu newDay lớn hơn 6 là 7 thì trừ đi 7
    });
    setDate((dt) => {
      // console.log(year);
      let newDate = dt + step; // Tăng ngày
      // console.log(newDate);
      if (newDate > 31 && day31.includes(month)) {
        newDate -= 31;
        let newMonth = month + 1;
        setMonth(newMonth);
        if (newMonth > 12) {
          setMonth(newMonth - 12);
          setYear(y + 1); // Tăng năm lên 1
        } // Nếu newMonth > 12 là 13 thì trừ đi 12
      }
      if (newDate > 30 && day30.includes(month)) {
        newDate -= 30;
        let newMonth = month + 1;
        setMonth(newMonth);
      }
      // Điều kiện tháng 2
      if (handleYear(year) === false) {
        // Năm không nhuận
        if (newDate > 28 && month === 2) {
          newDate -= 28;
          let newMonth = month + 1;
          setMonth(newMonth);
        }
      } else {
        if (newDate > 29 && month === 2) {
          // Năm nhuận
          newDate -= 29;
          let newMonth = month + 1;
          setMonth(newMonth);
        }
      }
      return newDate;
    });
    // console.log(date);
  }
  function handleYear(year) {
    const getYear = year;
    // Năm nhuận = true
    const conLeapYear =
      (getYear % 4 === 0 && getYear % 100 !== 0) || getYear % 400 === 0;

    return conLeapYear;
  }
  function handleContent(day, month, year) {
    let content = "";
    const countDay = new Date(year, month + 1, day);
    // Tính số ngày cách nhau
    const dateDiff = Math.abs(countDay - currentDate) / (1000 * 60 * 60 * 24);
    // console.log(countDay);
    // console.log(currentDate);
    // console.log(countDay === currentDate);
    // console.log(dateDiff);
    // .toDateString : cắt hh/mm/ss
    // .getTime() để so sánh thời gian theo đơn vị mili giây
    if (countDay.getTime() === currentDate.getTime()) {
      content = messages[0];
    } else if (countDay.getTime() > currentDate.getTime()) {
      content = dateDiff + " " + messages[1];
    } else {
      content = dateDiff + " " + messages[2];
    }
    return content;
  }
  return (
    <>
      <header style={{ textAlign: "center", fontSize: 32, margin: "20px" }}>
        PROJECT WITH STATE REACTJS
      </header>
      <div className="container">
        <div className="row">
          <button type="button" onClick={handlePrevStep}>
            -
          </button>
          <p>Step: {step}</p>
          <button type="button" onClick={handleNextStep}>
            +
          </button>
        </div>
        <div className="row">
          <button type="button" onClick={handlePrevCount}>
            -
          </button>
          <p>Count: {count}</p>
          <button type="button" onClick={handleNextCount}>
            +
          </button>
        </div>
        {/* <p className="text">1 days from today is Monday Oct 14 2024</p>
      <p className="text">1 days ago was Monday Oct 14 2024</p> */}
        {count >= 1 || count <= -1 ? (
          <p className="text">Today is Fri May 2 2025</p>
        ) : (
          <p className="text" hidden>
            Today is Fri May 2 2025
          </p>
        )}

        <p className="text" style={{ color: "red", fontSize: 24 }}>
          {handleContent(date, month, year)} is {days[day]} {months[month - 1]}{" "}
          {date} {year}
        </p>
      </div>
    </>
  );
}
export default App;
