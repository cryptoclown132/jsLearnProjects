// make custom giveaway possibility

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

const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
let gaDeadline = setGiveawayUp();
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();

function setGiveawayUp() {
  setGiveawayHeading();
  return setGiveawayDeadline();
}

function setGiveawayHeading() {
  let giveawayHeading = document.getElementById("giveaway-heading");

  giveawayHeading.textContent = prompt("Enter the giveaway heading:");
}

function setGiveawayDeadline() {
  let gaDeadline = new Date(prompt("Enter the year:"), prompt("Enter the month:")
                        , prompt("Enter the day:"), prompt("Enter the hour:")
                        , prompt("Enter the minute:"), 0);

  displayGiveawayEnd(gaDeadline);
  return gaDeadline;
};

function displayGiveawayEnd(gaDeadline) {
  const giveaway = document.querySelector(".giveaway");
  const weekday = weekdays[gaDeadline.getDay()];
  const year = gaDeadline.getFullYear();
  const month = months[gaDeadline.getMonth()];
  const date = gaDeadline.getDate();
  const hours = gaDeadline.getHours();
  const minutes = gaDeadline.getMinutes();

  giveaway.textContent = `giveaway ends on ${weekday} ${year} ${month} ${addZero(date)}
                      ${addZero(hours)}:${addZero(minutes)}am`;
}

function getRemainingTime() {
  const today = new Date().getTime();
  const countInMs = gaDeadline.getTime() - today;

  getCounterValues(getDays(countInMs), getHours(countInMs), getMinutes(countInMs)
                  , getSeconds(countInMs));  
  if (countInMs < 0)
    endCountdown();
}

function endCountdown(countdown) {
  clearInterval(countdown);
  deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
}

function getCounterValues(days, hours, minutes, seconds) {
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

function getDays(countInMs) {
  return Math.floor(countInMs / dayInMs());
}

function getHours(countInMs) {
  return Math.floor((countInMs % dayInMs()) / hourInMs());
}

function getMinutes(countInMs) {
  return Math.floor((countInMs % hourInMs()) / minuteInMs());
}

function getSeconds(countInMs) {
  return Math.floor((countInMs % minuteInMs()) / 1000);
}

function dayInMs() {
  return 24 * 60 * 60 * 1000;
}

function hourInMs() {
  return 60 * 60 * 1000;
}

function minuteInMs() {
  return 60 * 1000;
}
