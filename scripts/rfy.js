const liArrayWithPopup = ['1', '3', '7'];
liArrayWithPopup.forEach((item, index) => {
    const str = '[data-index=' + item + ']';
    const liSlide = $(str);
    
    const slideButton = liSlide.find('.quick-add-button');
    const slidePopup = liSlide.find('.config-product-popup');
    const popupClose = liSlide.find('.configure-popup-close');

    
    const slideSelectWrapper = liSlide.find('.cursor-pointer-position-relative');
    const slideSelect = liSlide.find('.configure-product-size');

    const productLabel = liSlide.find('.product-label');

    slideButton.click(() => {
        // When user clicks slide2's QuickAdd button, shows product-popup field.
        slidePopup.attr('aria-expanded', 'true');
        slidePopup.removeClass('config-product-popup').addClass('config-product-popup-changing');
        setTimeout(() => {
            slidePopup.removeClass('config-product-popup-changing').addClass('config-product-popup');
        }, 200);
    })
    
    popupClose.click(() => {
        // close popup
        slidePopup.attr('aria-expanded', 'false');
        slidePopup.removeClass('config-product-popup').addClass('config-product-popup-changing');
        setTimeout(() => {
            slidePopup.removeClass('config-product-popup-changing').addClass('config-product-popup');
        }, 200);

        // reset popup
        slideSelect.attr('data-user-focused', 'false');
    })

    slideSelectWrapper.click(() => {
        // When user clicks the dropdown, set select's data-user-focused from false to true,
        //      this way, the color of select-icon is synchronized with color of dropdown button.
        slideSelect.attr('data-user-focused', 'true');
    })
    
    slideSelect.on('change', function() {
        // Do not use anonymous function here,
        // otherwise *this* won't work.
        const prevValue = slideSelect.attr('data-value');
        const newValue = this.value;
        if (prevValue === newValue) return;
        //console.log('prevValue:', prevValue);
        //console.log(prevValue === '');
        
        // change class of label if value changes from "" to valid, or valid to ""
        if (prevValue === '') {
            productLabel.removeClass('product-label').addClass('product-label-chosen');
        }
        if (newValue === '') {
            productLabel.addClass('product-label').removeClass('product-label-chosen');
        }

        slideSelect.attr('data-value', this.value);
    })
})

const slidePrevButton = $('[data-test-id="pagination-arrow-prev"]');
const slideNextButton = $('[data-test-id="pagination-arrow-next"]');
const slickTrack = $('.slick-track');

const ulSlickDots2 = $("#ul-slick-dots-2");
const ulSlickDots8 = $("#ul-slick-dots-8");

let slickDots = $("#ul-slick-dots-2");
let slickDotButtons = slickDots.find(".slick-dot-button");
let tabs = slickDots.find('li[role="tab"');

let curSlick = 1;
let slickLength = 2;
let initialDisplaceX = 0;
let translateX = -1248; // todo:switch to -312 when at 8 mode
let prevWidth = $(this).width();

const rfyClickBoundingBox2 = {
  rfyLeft: 0,
  rfyRight: 0,
  li1Left: 0,
  li4Right: 0
}
const rfyClickBoundingBox8 = {
  rfyLeft: 0,
  rfyRight: 0,
  liLeft: 0,
  liRight: 0
}

const ulSlickDotsArray = [2, 8];
for (const ulSlickDotsArrayLength of ulSlickDotsArray) {
  const slickDots = $("#ul-slick-dots-" + ulSlickDotsArrayLength);
  const tabs = slickDots.find('li[role="tab"');
  console.log('tabs:', tabs);
  console.log('tabs.length:', tabs.length);
  
  const slickDotButtons = slickDots.find(".slick-dot-button");
  console.log('slickDotButtons:', slickDotButtons);
  for (let index = 1; index <= slickDotButtons.length; index++) {
    slickDotButtons.eq(index - 1).click((event) => {
      console.log('added onclick listener to index:', index);
      goToSlickSlidePage(index);
      // https://stackoverflow.com/questions/54661577/how-to-override-a-parent-event-listener-when-a-child-element-is-clicked-in-javas
      event.stopPropagation();
    })
  }
  if (ulSlickDotsArrayLength === 8) {
    slickDots.hide();
  }
}



slidePrevButton.click(() => {
  console.log('slidePrevButton');
  if (curSlick > 1) {
    goToSlickSlidePage(curSlick - 1);
  }
})

slideNextButton.click(() => {
  console.log('slideNextButton');
  if (curSlick < slickLength) {
    goToSlickSlidePage(curSlick + 1);
  }
})

function goToSlickSlidePage(pageNum) {
  console.log('goToslickSlidePage:', pageNum);
  curSlick = pageNum;
  for (let slickIndex = 1; slickIndex <= slickLength; slickIndex++) {
    if (slickIndex !== curSlick) {
      tabs.eq(slickIndex - 1).attr("aria-selected", "false");
      tabs.eq(slickIndex - 1).removeClass("slick-active");
    } else {
      tabs.eq(curSlick - 1).attr("aria-selected", "true");
      tabs.eq(curSlick - 1).addClass("slick-active");
    }
  }
  
  
  // https://stackoverflow.com/questions/178325/how-do-i-check-if-an-element-is-hidden-in-jquery
  if (ulSlickDots8.is(":visible")) {
    initialDisplaceX = ($(this).width() - 11 - 312) / 2;
  }

  slickTrack.css({"transform": "translate3d(" + (initialDisplaceX + translateX * (curSlick - 1)) + "px, 0px, 0px)"});//https://stackoverflow.com/questions/27302395/animate-translate3d-with-jquery
  slickTrack.css({"transition": "-webkit-transform 500ms ease 0s"});

  setTimeout(() => {
    slickTrack.css({"transition": ""});//https://stackoverflow.com/questions/5951365/how-to-remove-only-one-style-property-with-jquery
  }, 500);
  if (curSlick === 1) {// When at start of slick slides, disable prev button.
    setTimeout(() => {
      slidePrevButton.attr("aria-hidden", "true");
      slidePrevButton.removeClass("pagination-arrow-selectable").addClass("pagination-arrow-disabled");
    }, 500);
  }
  if (curSlick === slickLength) {// When at end of slick slides, disable next button.
    setTimeout(() => {
      slideNextButton.attr("aria-hidden", "true");
      slideNextButton.removeClass("pagination-arrow-selectable").addClass("pagination-arrow-disabled");
    }, 500);
  }
  if (curSlick > 1) {// When not at start, enable prev button.
    setTimeout(() => {
      slidePrevButton.attr("aria-hidden", "false");
      slidePrevButton.prop("disabled", false);
      slidePrevButton.removeClass("pagination-arrow-disabled").addClass("pagination-arrow-selectable");
    }, 500);
  }
  if (curSlick < slickLength) {// When not at end, enable next button.
    setTimeout(() => {
      slideNextButton.attr("aria-hidden", "false");
      slideNextButton.prop("disabled", false);
      slideNextButton.removeClass("pagination-arrow-disabled").addClass("pagination-arrow-selectable");
    }, 500);
  }
}

let programStart = true;

$(window).resize(() => {
  const curWidth = $(this).width();
  console.log("width:", curWidth);
  if (curWidth < 1200) {
    slidePrevButton.hide();
      slideNextButton.hide();

      ulSlickDots2.hide();
      ulSlickDots8.show();
    if (prevWidth >= 1200 || programStart === true) {
      // switch to 8-slick mode
      programStart = false;

      slickDots = $("#ul-slick-dots-8");
      slickDotButtons = slickDots.find(".slick-dot-button");
      tabs = slickDots.find('li[role="tab"');


      slickLength = 8;
      translateX = -312;

      curSlick = 1;
      goToSlickSlidePage(1);
    } else {
      // Still in 8-slick mode, just resized, so need to re-center current slick slide
      initialDisplaceX = ($(this).width() - 11 - 312) / 2;
      slickTrack.css({"transform": "translate3d(" + (initialDisplaceX + translateX * (curSlick - 1)) + "px, 0px, 0px)"});
      slickTrack.css({"transition": "-webkit-transform 500ms ease 0s"});
      setTimeout(() => {
        slickTrack.css({"transition": ""});
      }, 500);
    }
  } else if (curWidth >= 1200) {
    slidePrevButton.show();
    slideNextButton.show();

    ulSlickDots2.show();
    ulSlickDots8.hide();
    if (prevWidth < 1200 || programStart === true) {
      programStart = false;

      // switch to 2-slick mode
      slickDots = $("#ul-slick-dots-2");
      slickDotButtons = slickDots.find(".slick-dot-button");
      tabs = slickDots.find('li[role="tab"');


      slickLength = 2;
      translateX = -1248;
      initialDisplaceX = 0;

      curSlick = 1;
      goToSlickSlidePage(1);
    }
  }
  prevWidth = curWidth;
})


const rfyWrapper = $(".rfy-wrapper");
// When click inside .rfy-wrapper, 
// if mouse is not at slick-dots and mouse is outside of active slide(s),
// go to prev/next page.
rfyWrapper.click((event) => {
  if (ulSlickDots8.is(":visible")) {
    // When in 8-dots mode, only the current slick is active,
    const curLiBoundingClientRect = $("li[aria-label='Slide-"+curSlick+"']").get(0).getBoundingClientRect();
    // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
    const curLiLeft = curLiBoundingClientRect.x;
    const curLiRight = curLiBoundingClientRect.x + curLiBoundingClientRect.width;
    // so if click inside .rfy-wrapper and outside of current li,
    if (event.pageX < curLiLeft) {
      if (curSlick !== 1) {
        // slick go to next or prev if it's not at start or end.
        goToSlickSlidePage(curSlick - 1);
      }
    } else if (event.pageX > curLiRight) {
      if (curSlick !== slickLength) {
        goToSlickSlidePage(curSlick + 1);
      }
    }
  }
})


// https://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
// https://stackoverflow.com/questions/17957593/how-to-capture-touchend-coordinates

// - Implement drag scroll for mobile view
var lastMove = null;
var slickTrackX = null;
var mousedownX = null;

rfyWrapper.bind('touchstart', function (e) {
  lastMove = e;
  mousedownX = e.touches[0].pageX;
  console.log("touchstart:", mousedownX);
  slickTrackX = parseFloat(slickTrack.css("transform").split(/\w+\(|\);?/)[1].split(/,\s?/g)[4]);
  console.log(slickTrackX);
});

rfyWrapper.bind('touchmove', function (e) {
  const curPageX = e.touches[0].pageX;
  const diff = curPageX - mousedownX;
  const newSlickTrackX = diff + slickTrackX;
  slickTrack.css({"transform": "translate3d(" + (newSlickTrackX) + "px, 0px, 0px)"});
  //console.log("touchmove:", e.touches[0].pageX);
  lastMove = e;
});

rfyWrapper.bind('touchend', function (e) {
  const curPageX = lastMove.touches[0].pageX;
  const diff = curPageX - mousedownX;
  if (diff < (-90) && curSlick < slickLength) {
    // should go to next slide
    console.log("should go to next slide");
    goToSlickSlidePage(curSlick + 1);
  } else if (diff > 90 && curSlick > 1) {
    // should go to prev slide
    console.log("should go to prev slide");
    goToSlickSlidePage(curSlick - 1);
  } else {
    // should return to current slide
    console.log("should return to current slide");
    goToSlickSlidePage(curSlick);
  }

});

// https://stackoverflow.com/questions/1818474/how-to-trigger-the-window-resize-event-in-javascript
// Try to manually trigger the window resize event in JavaScript
// in order to dynamically change 2-length mode or 8-length mode at start of website.
window.dispatchEvent(new Event('resize'));

/*
add to cart
<button
  type="button" class="quick-add-button ds__input"
  aria-label="Quick Add Peloton Bike+" data-test-id="top-level-quick-add"
  disabled>
  <div class="loading-svg-wrapper">
    <svg width="20px" height="20px" viewBox="0 0 40 40">
      <path opacity="0.4" fill="currentColor" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z">
    </path>
      <path fill="currentColor" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
      C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate"
          from="0 20 20" to="360 20 20" dur="1.0s" repeatCount="indefinite">
        </animateTransform>
      </path>
    </svg>
  </div>
</button>
*/
