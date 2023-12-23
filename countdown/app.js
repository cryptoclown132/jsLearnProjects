const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2023, 11, 29, 11, 29, 0);	

const weekday = weekdays[futureDate.getDay()];
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

giveaway.textContent = `giveaway ends on ${weekday} ${year} ${month} ${date}
                      ${hours}:${minutes}am`;

const futurTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const countInMs = futurTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(countInMs / oneDay);
  let hours = Math.floor((countInMs % oneDay) / oneHour);
  let minutes = Math.floor((countInMs % oneHour) / oneMinute);
  let seconds = Math.floor((countInMs % oneMinute) / 1000);

  const counterValues = [days, hours, minutes, seconds];
  items.forEach((item, index) => {
    item.innerHTML = addZero(counterValues[index]);
  })
}

function addZero(number) {
  if (number < 10)
    return `0${number}`;
  return number;
}

getRemainingTime();