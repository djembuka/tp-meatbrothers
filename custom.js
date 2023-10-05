window.addEventListener('load', () => {
  var flag = false;
  var observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].intersectionRatio < 1) return;
      if (!flag) {
        flag = true;
        if (document.querySelector('.item-section__links-right')) {
          document
            .querySelector('.item-section__links-right')
            .classList.add('item-section__links--show');
        }
        if (document.querySelector('.item-section__links-left')) {
          document
            .querySelector('.item-section__links-left')
            .classList.add('item-section__links--show');
        }
      }
    },
    {
      root: null,
      threshold: 1.0,
    }
  );

  var target = document.querySelector('.item-title-inform');
  observer.observe(target);
});
