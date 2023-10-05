window.addEventListener('load', () => {
  window.resetOfferFlag = false;//to dispatch event only once
  
  $('#bx-soa-delivery').delegate('.showoffer', 'click', function (e) {
    btnOpen($(this).closest('form').serialize());
  });
  
  //phone mask
  
  /*if (BX.MaskedInput) {
    var result = new BX.MaskedInput({
        mask: '+7 (999) 999-99-99', // устанавливаем маску
        input: BX('soa-property-3')
    });
    if (window.localStorage.mbCartLocationData) {
      mbCartLocationData = JSON.parse(window.localStorage.mbCartLocationData);
      result.setValue(mbCartLocationData['ORDER_PROP_3']);
    }
  }*/

  $('#bx-soa-region').delegate('input.form-control', 'keyup', function(e) {    
    if (window.resetOfferFlag) return;
    
    window.resetOfferFlag = true;
    resetOffer();
    showResetButton();
  });

  $('#bx-soa-properties').delegate('input.form-control', 'keyup', function(e) {    
    if (window.resetOfferFlag) return;
    
    window.resetOfferFlag = true;
    resetOffer();
    showResetButton();
  });
  
  if (document.getElementById('deliveryResetButton')) {
    document.getElementById('deliveryResetButton').addEventListener( 'click', (e) => {
      e.preventDefault();
      
      window.resetOfferFlag = false;
      window.resetPriceFlag = true;
      BX.Sale.OrderAjaxComponent.sendRequest();
      document.getElementById('bx-soa-delivery').classList.remove( 'bx-soa-section--show-reset' );
    });
  }
  
});

//показываем кнопку сброса
function showResetButton() {
  if (document.querySelector('#bx-soa-delivery .bx-soa-pp-company-item.bx-selected #twpx-showoffer')) {
    document.getElementById('bx-soa-delivery').classList.add( 'bx-soa-section--show-reset' );
  }
}

//сбрасываем цену если изменены поля
function resetOffer() {
  let ajaxURL = '/bitrix/tools/twpx.yadelivery/ajax.php';

  BX.ajax({
      url: ajaxURL,
      method: 'POST',
      data: {action: 'reset'},
  }); 
}

//передаем цену
function setPrice(price, offer, expire) {
  let ajaxURL = '/bitrix/tools/twpx.yadelivery/ajax.php';
  let post = {
    action: 'price',
    price,
    offer,
    expire
  };

  BX.ajax({
    url: ajaxURL,
    method: 'POST',
    data: post,
    onsuccess: function (data) {
      BX.Sale.OrderAjaxComponent.sendRequest();
    },
  });
}

//открываем офферы
function btnOpen(fields) {
  let post = {
    action: 'getOffer',
    fields: fields
  };

  let ajaxURL = '/bitrix/tools/twpx.yadelivery/ajax.php';
  //let width = window.screen.width/2;
  //let height = window.screen.height/2;

  let container = BX.create({
    tag: 'div',
    props: {
        className: 'twpx_yadelivery',
        id: 'twpx_yadelivery',
    },
    //html: data
    html: '<div id="showOffer"><div id="showOfferLoader"><div class="nb-spinner"></div></div></div>',
  });

  popup = BX.PopupWindowManager.create('twpx_yadelivery_popup', '', {
    content: container,
    titleBar: 'Возможные доставки',
    width: 570,
    height: 'auto',
    min_width: 250,
    min_height: 250,
    zIndex: 100,
    closeIcon: {opacity: 1},
    overlay: true,
    closeByEsc: true,
    autoHide: true,
    darkMode: false,
    draggable: false,
    resizable: false,
    lightShadow: false,
    angle: false,
    events: {
      onPopupShow: function () {
          // Событие при показе окна
      },
      onPopupClose: function (PopupWindow) {
          PopupWindow.destroy();
      },
      onAfterPopupShow: function () {
          //                    popup.adjustPosition();
          //                    popup.resizeOverlay();
      }
    },
  });

  popup.show();

  BX.ajax({
    url: ajaxURL,
    method: 'POST',
    data: post,
    //dataType: 'json',
    onsuccess: function (data) {
      //$('#showOffer').html(data);
      BX('showOffer').innerHTML = data;

      if (document.querySelectorAll('#showOffer .delivery-item').length > 3) {
        document.querySelector('#twpx_yadelivery_popup .delivery-modal-button').addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelector('#twpx_yadelivery_popup .delivery-wrapper').classList.add('delivery-wrapper--open');
        });
      } else {
        document.querySelector('#twpx_yadelivery_popup .delivery-modal-button').classList.add('delivery-modal-button--disabled');
      }

      popup.adjustPosition();

      $('#twpx_yadelivery .btn-setprice').on('click', function (e) {
        //var input = $('#twpx_offer_id');
        //var interval = $(e.target).data('interval');
        
        window.btnSetPriceFlag = true;

        var offer = $(e.target).data('offer');
        var price = $(e.target).data('price');
        var expire = $(e.target).data('expire');

        setPrice(price, offer, expire);

        popup.destroy();
      });
    },
  });
}

