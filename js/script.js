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
  'Name must contain at least two letters and no special characters.',
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

// Flags (booleans) which will determine if all validations are passed on submission
const flags = {
  nameFlag: false,
  mailFlag: false,
  activityFlag: false,
  credFlag1: false,
  credFlag2: false,
  credFlag3: false,
  credFlag4: false,
};

// Regex expressions
const regexNameTest = /^[\'a-zA-Z -]{2,30}$/;
const regexMailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexCreditTest1 = /^\d*\.?\d+$/;
const regexCreditTest2 = /^[1-9][0-9]{12,15}$/;
const regexCreditTest3 = /^[0-9]{5}(?:-[0-9]{4})?$/;
const regexCreditTest4 = /^[0-9][0-9][0-9]$/;

// Utilities (Validation)
function showErrorMessage(errorId) {
  document.getElementById(`${errorId}`).removeAttribute('hidden');
  return false;
}
function hideErrorMessage(errorId) {
  document.getElementById(`${errorId}`).hidden = true;
  return true;
}

function showAndHide(regexExpression, e, flag, errorMessageID) {
  if (regexExpression.test(e.target.value)) {
    flags[flag] = hideErrorMessage(errorMessageID);
  } else {
    flags[flag] = showErrorMessage(errorMessageID);
  }
}

function addListener(inputFieldID, regexExpression, flagName, errorMessageID) {
  document.getElementById(inputFieldID).addEventListener('input', (e) => {
    showAndHide(regexExpression, e, flagName, errorMessageID);
  });
}

// Text Input Listeners //
addListener('name', regexNameTest, 'nameFlag', 'nameError');
addListener('mail', regexMailTest, 'mailFlag', 'mailError');
addListener('cc-num', regexCreditTest1, 'credFlag1', 'creditError1');
addListener('cc-num', regexCreditTest2, 'credFlag2', 'creditError2');
addListener('zip', regexCreditTest3, 'credFlag3', 'creditError3');
addListener('cvv', regexCreditTest4, 'credFlag4', 'creditError4');

// Checkbox Input Listeners //
document
  .getElementsByClassName('activities')[0]
  .addEventListener('input', () => {
    const checkList = document
      .getElementsByClassName('activities')[0]
      .querySelectorAll('input');

    const booleans = Array.from(checkList).map((item) => {
      if (item.checked === true) {
        return true;
      } else {
        return false;
      }
    });

    if (booleans.every((i) => i === false)) {
      flags.activityFlag = showErrorMessage('activityError');
    } else {
      flags.activityFlag = hideErrorMessage('activityError');
    }
  });

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const isTrue = (currentValue) => currentValue === true;
  if (Object.values(flags).every(isTrue)) {
    document.querySelector('form').submit();
  } else {
    showErrorMessage('registerError');
    if (!flags.nameFlag) {
      showErrorMessage('nameError');
    }
    if (!flags.mailFlag) {
      showErrorMessage('mailError');
    }
    if (!flags.activityFlag) {
      showErrorMessage('activityError');
    }
    if (!flags.credFlag1) {
      showErrorMessage('creditError1');
    }
    if (!flags.credFlag2) {
      showErrorMessage('creditError2');
    }
    if (!flags.credFlag3) {
      showErrorMessage('creditError3');
    }
    if (!flags.credFlag4) {
      showErrorMessage('creditError4');
    }
  }
});

// OTHER HELPER UTILITIES

document.getElementById('payment').addEventListener('input', () => {
  if (document.getElementById('payment').selectedIndex != 0) {
    flags.credFlag1 = true;
    hideErrorMessage('creditError1');
    flags.credFlag2 = true;
    hideErrorMessage('creditError2');
    flags.credFlag3 = true;
    hideErrorMessage('creditError3');
    flags.credFlag4 = true;
    hideErrorMessage('creditError4');
  } else {
    document.getElementById('cc-num').value = '';
    document.getElementById('zip').value = '';
    document.getElementById('cvv').value = '';
    flags.credFlag1 = false;
    flags.credFlag2 = false;
    flags.credFlag3 = false;
    flags.credFlag4 = false;
  }
});
