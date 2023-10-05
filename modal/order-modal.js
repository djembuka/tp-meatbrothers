window.addEventListener('load', () => {
  document
    .querySelectorAll('.b-float-label input, .b-float-label textarea')
    .forEach((elem) => {
      const label = elem.parentNode.querySelector('label');
      //set active for the filled inputs
      if (elem.value.trim() !== '') {
        label.classList.add('active');
      }
      //blur event
      elem.addEventListener('blur', () => {
        if (elem.value.trim() !== '') {
          label.classList.add('active');
          elem.closest('.b-float-label').classList.remove('invalid');
        } else {
          label.classList.remove('active');
        }
      });
    });

  //form submit
  const form = document.querySelector('#orderModal form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let flag;
    let elem;
    form.querySelectorAll('input').forEach((input) => {
      if (
        input.getAttribute('type') !== 'hidden' &&
        input.value.trim() === ''
      ) {
        flag = true;
        if (!elem) {
          elem = input;
        }
      }
    });
    if (flag) {
      elem.closest('.b-float-label').classList.add('invalid');
      elem.focus();
      return;
    }
    //submit data
    (async () => {
      try {
        const formData = new FormData(form);
        const response = await fetch(form.getAttribute('action'), {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.STATUS === 'Y') {
          document
            .querySelector('#orderModal')
            .classList.add('modal--response-mode');
          setTimeout(() => {
            document
              .querySelector('#orderModal')
              .classList.add('modal--response-animate');
          }, 100);
        } else if (result.STATUS === 'E' && result.ERROR) {
          document
            .querySelector('#orderModal')
            .querySelector('.text-danger').textContent = result.ERROR;
          document.querySelector('#orderModal').classList.add('modal--error');
        }
      } catch (err) {
        throw err;
      }
    })();
  });

  $('#orderModal').on('hidden.bs.modal', function (event) {
    document
      .querySelector('#orderModal')
      .classList.remove('modal--response-mode');
    document
      .querySelector('#orderModal')
      .classList.remove('modal--response-animate');
    form.querySelectorAll('input').forEach((input) => {
      if (input.getAttribute('type') !== 'hidden') {
        input.value = '';
        input.parentNode.querySelector('label').classList.remove('active');
      }
    });
  });

  //phone mask
  IMask(document.querySelector('#orderModal input[type=tel]'), {
    mask: '+7 (000) 000-00-00',
  });

  //yandex metrika
  if (window.ym && window.ymId) {
    window.ym(window.ymId, 'reachGoal', 'ONE_CLICK_ORDER');
  }
});
