(() => {
  window.addEventListener('load', () => {
    document.querySelectorAll('.menu-collapse').forEach((menu) => {
      const menuWidth = menu.clientWidth - 15 - 50;
      const items = menu.querySelectorAll('.menu-collapse__item');
      let itemsWidth = 0;
      let edgeIndex;

      items.forEach((item, index) => {
        itemsWidth += item.clientWidth;
        if (itemsWidth + index * 34 > menuWidth && edgeIndex === undefined) {
          edgeIndex = index - 1;
        }
      });

      //more button
      const moreButton = document.createElement('div');
      moreButton.classList.add('menu-collapse__more');
      menu.appendChild(moreButton);

      const subMenu = document.createElement('div');
      subMenu.classList.add('menu-collapse__sub');
      moreButton.appendChild(subMenu);

      let showInterval;
      moreButton.addEventListener('mouseenter', () => {
        clearInterval(showInterval);
        moreButton.classList.add('menu-collapse__more--show');
      });
      moreButton.addEventListener('mouseleave', () => {
        showInterval = setTimeout(() => {
          moreButton.classList.remove('menu-collapse__more--show');
        }, 200);
      });

      //append items to submenu
      if (!edgeIndex || edgeIndex === items.length) {
        menu.classList.add('menu-collapse--no-more');
      } else {
        items.forEach((item, index) => {
          if (index > edgeIndex) {
            subMenu.appendChild(item);
          }
        });
      }

      menu.classList.add('menu-collapse--visible');
      menu.classList.add('menu-collapse--ready');
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.menu-collapse').forEach((menu) => {
      //hide submenu
      menu.classList.remove('menu-collapse--visible');
      //move items back
      const subMenu = menu.querySelector('.menu-collapse__sub');
      const moreButton = menu.querySelector('.menu-collapse__more');
      subMenu.querySelectorAll('.menu-collapse__item').forEach((item) => {
        moreButton.before(item);
      });

      const menuWidth = menu.clientWidth - 15 - 50;
      const items = menu.querySelectorAll('.menu-collapse__item');
      let itemsWidth = 0;
      let edgeIndex;

      items.forEach((item, index) => {
        itemsWidth += item.clientWidth;
        if (itemsWidth + index * 34 > menuWidth && edgeIndex === undefined) {
          edgeIndex = index - 1;
        }
      });

      if (!edgeIndex || edgeIndex === items.length) {
        menu.classList.add('menu-collapse--no-more');
      } else {
        items.forEach((item, index) => {
          if (index > edgeIndex) {
            subMenu.appendChild(item);
          }
        });
        menu.classList.remove('menu-collapse--no-more');
      }

      menu.classList.add('menu-collapse--visible');
    });
  });
})();
