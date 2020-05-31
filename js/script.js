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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Activities Functionality ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

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
      } else if (click.checked === false) {
        checkList[i].disabled = false;
      }
    }
  }

  let eventCost = parseInt(e.target.getAttribute('data-cost'));
  click.checked === true ? (total += eventCost) : (total -= eventCost);

  document.getElementById('total-cost').innerText = `Total: $${total}`;
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Payment Info Functionality ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

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

/* ~~~~~~~~~~~~~~~~~~~~ */
/* ~~~~ Validation ~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~ */
