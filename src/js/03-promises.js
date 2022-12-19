/*
HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах, крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.

Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується або відхиляється через delay часу. Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів. Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.
*/

// const refs = {
//   delay: document.querySelector('input[name="delay"]'),
//   step: document.querySelector('input[name="step"]'),
//   amount: document.querySelector('input[name="amount"]'),
//   submitBtn: document.querySelector('button[type="submit"]'),
// };

// refs.delay.addEventListener('input', onDelayInput);
// refs.step.addEventListener('input', onStepInput);
// refs.amount.addEventListener('input', onAmountInput);
// refs.submitBtn.addEventListener('click', onSubmitBtnClick);

import Notiflix from 'notiflix';


const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

console.log(formRef);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(e.target.delay.value);
  let step = Number(e.target.step.value);
  let amount = Number(e.target.amount.value);
  Notiflix.Notify.init({position: 'left-top',distance: '150px',});

  console.log('delay', delay);
  console.log('step', step);
  console.log('amount', amount);


  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const objectPromise = {
    position,
    delay,
  };
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve(objectPromise);
      console.log(object);
    } else {
      // Reject
      reject(objectPromise);
    }
  });
}
