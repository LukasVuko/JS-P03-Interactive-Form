// On the page load, focus on the name field

document.getElementById('name').focus();

// JOB ROLE - Hide other rob role field

document.getElementById('other-title').hidden = 'true';

document.getElementById('title').addEventListener('input', function (e) {
  if (e.target.value === 'other') {
    document.getElementById('other-title').removeAttribute('hidden');
  } else {
    document.getElementById('other-title').hidden = 'true';
  }
});

// // T-Shirt Section
document.getElementById('colors-js-puns').hidden = 'true';

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
});
