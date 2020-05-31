/* ~~~~ On the page load, focus on the name field ~~~~ */

document.getElementById('name').focus();

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Job Role Functionality: Hide 'Other' field ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

document.getElementById('other-title').hidden = 'true';

document.getElementById('title').addEventListener('input', function (e) {
  if (e.target.value === 'other') {
    document.getElementById('other-title').removeAttribute('hidden');
  } else {
    document.getElementById('other-title').hidden = 'true';
  }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ T-Shirt Functionality: Hide color field if design is not selected ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

document.getElementById('colors-js-puns').hidden = 'true';

function removeAndAppendDefaultOption() {
  const colorOptions = document.getElementById('color').children;
  for (i = 0; i < colorOptions.length; i++) {
    if (colorOptions[i].id === 'default-option') {
      colorOptions[i].parentNode.removeChild(colorOptions[i]);
    }
  }
  const defaultOption = document.createElement('OPTION');
  defaultOption.id = 'default-option';
  defaultOption.value = 'defaultColor';
  defaultOption.textContent = 'Please select a T-shirt theme';
  defaultOption.selected = true;
  defaultOption.disabled = true;
  document.getElementById('color').appendChild(defaultOption);
}

document.getElementById('design').addEventListener('input', function (e) {
  const colors = document.getElementById('color').children;
  const selected = e.target.value;

  if (selected === 'JS Puns' || selected === 'Love JS') {
    document.getElementById('colors-js-puns').removeAttribute('hidden');

    Array.from(colors).forEach((option) => {
      const regex = RegExp(selected);
      if (regex.test(option.innerText)) {
        option.removeAttribute('hidden');
      } else {
        option.hidden = 'true';
      }
    });
  } else {
    document.getElementById('colors-js-puns').hidden = 'true';
  }

  removeAndAppendDefaultOption();
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Activities Functionality: Disable conflicting events ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const totalCostTag = document.createElement('P');
totalCostTag.id = 'total-cost';
totalCostTag.innerText = 'Total: $0';
const activity = document.querySelector('.activities');
activity.appendChild(totalCostTag);
let total = 0;

activity.addEventListener('input', (e) => {
  const click = e.target;
  const eventDateAndTime = click.getAttribute('data-day-and-time');
  const checkList = activity.querySelectorAll('input');

  for (i = 0; i < checkList.length; i++) {
    if (
      eventDateAndTime === checkList[i].getAttribute('data-day-and-time') &&
      click !== checkList[i]
    ) {
      if (click.checked === true) {
        checkList[i].disabled = true;
        checkList[i].parentNode.style.color = 'grey';
      } else if (click.checked === false) {
        checkList[i].disabled = false;
        checkList[i].parentNode.style.color = '';
      }
    }
  }

  let eventCost = parseInt(e.target.getAttribute('data-cost'));
  click.checked === true ? (total += eventCost) : (total -= eventCost);

  document.getElementById('total-cost').innerText = `Total: $${total}`;
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Payment Info Functionality: Hide payment methods that aren't selected ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

document.getElementById('paypal').hidden = true;
document.getElementById('bitcoin').hidden = true;

const paymentDiv = document.getElementById('payment');
const selectMethodOption = paymentDiv.firstElementChild;
paymentDiv.removeChild(selectMethodOption);
const paymentOptions = paymentDiv.children;

paymentDiv.addEventListener('input', (e) => {
  for (i = 0; i < paymentOptions.length; i++) {
    if (paymentOptions[i].value !== e.target.value) {
      document.getElementById(`${paymentOptions[i].value}`).hidden = true;
    } else {
      document
        .getElementById(`${paymentOptions[i].value}`)
        .removeAttribute('hidden');
    }
  }
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Append Error Messages to the page ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Each <p> insert contains a unique ID which will be used to show and hide in the validation section

function append(errorId, msg, parentNode, insertBeforeId) {
  const error = document.createElement('p');
  error.innerText = `${msg}`;
  error.style.color = 'grey';
  error.id = `${errorId}`;
  error.hidden = true;
  document
    .getElementsByClassName(`${parentNode}`)[0]
    .insertBefore(error, document.getElementById(`${insertBeforeId}`));
}

append(
  'nameError',
  'Please enter a valid name which contains no numbers or special characters.',
  'basic',
  'name'
);
append('mailError', 'Please enter a valid email address.', 'basic', 'mail');
append(
  'activityError',
  'Please select at least one activity.',
  'activities',
  'total-cost'
);
append(
  'creditError1',
  'Please enter a credit card number.',
  'paymentFieldset',
  'credit-card'
);
append(
  'creditError2',
  'Please enter a number that is between 13 and 16 digits long.',
  'paymentFieldset',
  'credit-card'
);
append(
  'creditError3',
  'Please enter a vallid ZIP code.',
  'paymentFieldset',
  'credit-card'
);
append(
  'creditError4',
  'Please enter a valid CVV number.',
  'paymentFieldset',
  'credit-card'
);
append(
  'registerError',
  'One or more fields were filled out incorrectly.',
  'form',
  'register'
);
/* ~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Validation ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~ */

// Utilities (Validation)
function showErrorMessage(errorId) {
  document.getElementById(`${errorId}`).removeAttribute('hidden');
  return false;
}
function hideErrorMessage(errorId) {
  document.getElementById(`${errorId}`).hidden = true;
  return true;
}

// Flags (booleans) which will determine if all validations are passed on submit

let nameFlag = false;
let mailFlag = false;
let activityFlag = false;
let credFlag1 = false;
let credFlag2 = false;
let credFlag3 = false;
let credFlag4 = false;

// Regex test for name
const regexNameTest = /^[\'a-zA-Z -]{2,30}$/;
const regexMailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexCreditTest1 = '';
const regexCreditTest2 = '';
const regexCreditTest3 = '';
const regexCreditTest4 = '';

document.getElementById('name').addEventListener('input', (e) => {
  if (regexNameTest.test(e.target.value)) {
    nameFlag = hideErrorMessage('nameError');
  } else {
    nameFlag = showErrorMessage('nameError');
  }
});

document.getElementById('mail').addEventListener('input', (e) => {
  if (regexMailTest.test(e.target.value)) {
    mailFlag = hideErrorMessage('mailError');
  } else {
    mailFlag = showErrorMessage('mailError');
  }
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    nameFlag &&
    mailFlag &&
    activityFlag &&
    credFlag1 &&
    credFlag2 &&
    credFlag3 &&
    credFlag4
  ) {
    document.querySelector('form').submit();
  } else {
    showErrorMessage('registerError');
  }
});
