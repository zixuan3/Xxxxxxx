function changeLogoWhenResize() {
    const logo = $('a.logo-link-flWoNK');
    const navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024 = $('.larger1024');
    const smallLogo = `
      <svg role="img" width="25" height="36" viewBox="0 0 25 36"
        data-test-id="brandLogo" class="logo-svg-gLYEcu">
        <title>Brand Logo</title>
        <path
          d="M 0 0 l 30 0 l 0 45 l -15 -20 l -15 20 L 0 0">
        </path>
      </svg>
    `;
    const largeLogo = `
      <svg role="img" width="156" height="46" viewBox="0 0 156 46"
        data-test-id="brandLogo" class="logo-svg-largeScreen-euZINs">
        <title>Brand Logo</title>
        <path
          d="M 0 0 l 30 0 l 0 45 l -15 -20 l -15 20 L 0 0 m 45 15 L 45 30 L 55 30 L 55 25 L 50 25 L 50 15 L 45 15 M 60 15 L 60 30 L 70 30 L 70 15 L 67 15 L 67 27 L 63 27 L 63 18 L 67 18 L 67 15 L 60 15 M 85 15 L 85 18 L 78 18 L 78 27 L 82 27 L 82 23 L 85 23 L 85 30 L 75 30 L 75 15 M 90 15 L 90 30 L 100 30 L 100 27 L 93 27 L 93 18 L 97 18 L 97 27 L 100 27 L 100 15 Z">
        </path>
      </svg>
    `;
    // check resize at start
    const curWidth = $(this).width();
    if ((curWidth >= 768 && curWidth <= 1024) || (curWidth >= 1280)) {
      logo.html(largeLogo);
    } else {
      logo.html(smallLogo);
    }
    if (curWidth < 1024) {
      navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.hide();
    } else {
      navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.show();
    }
    
    // changes logos when screen width changes
    $(window).resize(function() {
      const curWidth = $(this).width();
      if ((curWidth >= 768 && curWidth <= 1024) || (curWidth >= 1280)) {
        logo.html(largeLogo);
      } else {
        logo.html(smallLogo);
      }
    
      if (curWidth < 1024) {
        navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.hide();
      } else {
        navbarTextbutonsThatShouldBeHiddenWhenScreenWidthLessThan1024.show();
      }
    });
  }
  
  changeLogoWhenResize();