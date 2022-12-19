/*
Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.
HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися. Додай мінімальне оформлення елементів інтерфейсу.
Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. 
*/

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const refs = {
  timerInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.setAttribute('disabled', 'disabled');
refs.startButton.addEventListener('click', onStartButtonClick);

const dateNow = Date.now();

let startTime = null;

const options = {
  // enableTime
  enableTime: true,

  // Displays time picker in 24 hour mode without AM/PM selection when enabled.
  time_24hr: true,

  // Sets the initial selected date(s)
  defaultDate: new Date(),

  // Adjusts the step for the minute input (incl. scrolling)
  minuteIncrement: 1,

  // Function to trigger on every time the calendar is closed.
  onClose(selectedDates) {
    const currentTime = Date.now();
    let deltaTime = selectedDates[0] - currentTime;

    if (selectedDates[0] < dateNow) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.init({position: 'center-top'});
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }

    refs.startButton.removeAttribute('disabled', 'disabled');

    startTime = selectedDates[0];
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.spanDays.textContent = Math.abs(days);
    refs.spanHours.textContent = pad(Math.abs(hours));
    refs.spanMinutes.textContent = pad(Math.abs(minutes));
    refs.spanSeconds.textContent = pad(Math.abs(seconds));
  },
};

const fp = flatpickr(refs.timerInput, options);

function onStartButtonClick() {
  refs.startButton.setAttribute('disabled', 'disabled');

  const timerID = setInterval(() => {
    const currentTime = Date.now();

    let deltaTime = startTime - currentTime;

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.spanDays.textContent = pad(Math.abs(days));
    refs.spanHours.textContent = pad(Math.abs(hours));
    refs.spanMinutes.textContent = pad(Math.abs(minutes));
    refs.spanSeconds.textContent = pad(Math.abs(seconds));

    if (deltaTime < 0) {
      clearInterval(timerID);
      refs.spanDays.textContent = '00';
      refs.spanHours.textContent = '00';
      refs.spanMinutes.textContent = '00';
      refs.spanSeconds.textContent = '00';
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
