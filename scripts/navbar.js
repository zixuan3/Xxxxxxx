const navbar = $('.navbar-kdnToX');
let isAllBlack = false;
console.log(navbar.first());

$(document).scroll(() => {
    //console.log('scroll:', $(window).scrollTop());
    const scrollTop = $(window).scrollTop();
    if (isAllBlack && scrollTop >= 950) {
        return;
    }
    let opacity_low = scrollTop / 950;
    let opacity_high = opacity_low + 0.3;
    if (opacity_low > 1) {
        opacity_low = 1;
        isAllBlack = true;
    } else {
        isAllBlack = false;
    }
    if (opacity_high > 1) opacity_high = 1;
    navbar.css({
        "background": 
        "linear-gradient(to top, rgba(24, 26, 29, " + opacity_low + "), rgba(24, 26, 29, " + opacity_high + "))"
    });
})