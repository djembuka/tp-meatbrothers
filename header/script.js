window.addEventListener('load', () => {
  //Search
  document
    .querySelector('.header-top__search .header-icon')
    .addEventListener('click', (e) => {
      e.target
        .closest('.header-top__search')
        .classList.add('header-top__search--form');
      e.target.closest('.header-top__search').querySelector('input').focus();
    });
  //Close search
  document
    .querySelector('.header-top__search__close')
    .addEventListener('click', (e) => {
      e.target
        .closest('.header-top__search')
        .classList.remove('header-top__search--form');
    });
  //Fix header
  var observer = new IntersectionObserver(
    (entries) => {
      if (document.querySelector('header')) {
        if (entries[0].intersectionRatio > 0) {
          document.querySelector('header').classList.remove('header--fixed');
        } else {
          document.querySelector('header').classList.add('header--fixed');
        }
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );

  var target = document.querySelector('header');
  observer.observe(target);
});
