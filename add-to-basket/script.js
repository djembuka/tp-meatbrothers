window.addEventListener('load', () => {
  document
    .querySelectorAll('.item_slide, .workarea_product, .item-section')
    .forEach((product) => {
      const btnBuy = product.querySelector('.btn-buy');
      if (!btnBuy) return;

      btnBuy.addEventListener('click', () => {
        let popup = document.createElement('div');
        popup.classList.add('product-popup');
        let imgElem = product.querySelector('.slide-img');
        let imgStyle = '';
        if (imgElem) {
          imgStyle = imgElem.getAttribute('style');
        } else {
          imgElem = product.querySelector('.item-img');
          imgStyle = `background-image: url('${imgElem
            .querySelector('img')
            .getAttribute('src')}')`;
        }
        popup.innerHTML = `
      <div class="product-popup__body">
        <div class="product-popup__img" style="${imgStyle}"></div>
        <div class="product-popup__text">
          <b>${btnBuy.getAttribute('data-name')}</b>
          <span>Продукт добавлен в корзину.</span>
        </div>
      </div>
      `;
        document.querySelector('body').append(popup);
        setTimeout(() => {
          document.querySelector('body').classList.add('body--product-popup');
          setTimeout(() => {
            document
              .querySelector('body')
              .classList.add('body--product-popup-hide-animation');
            setTimeout(() => {
              document.querySelector('.product-popup').remove();
              document
                .querySelector('body')
                .classList.remove('body--product-popup');
              document
                .querySelector('body')
                .classList.remove('body--product-popup-hide-animation');
            }, 500);
          }, 1500);
        }, 10);
      });
    });
});
