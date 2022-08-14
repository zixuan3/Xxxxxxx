const cartButton = $("button[data-test-id='cart']");
const cartModal = $("#CartModal");
const cartModalContent = cartModal.find(".flyout-content");
const cartModalCloseButton = $("#CloseCartModal");
let cartModalOpen = false;
cartModal.hide();

cartButton.click(() => {
    console.log('click cartButton');
    cartModal.show();
    cartModalOpen = true;
    cartModalContent.addClass("ReactModal__Content--after-open");
    $("body").addClass("ReactModal__Body--open");
})

cartModalCloseButton.click(() => {
    console.log('click cartModalCloseButton');
    cartModalOpen = false;
    cartModalContent.removeClass("ReactModal__Content--after-open");
    $("body").removeClass("ReactModal__Body--open");

    if ($(window).width() >= 580) {
        setTimeout(() => {
            cartModal.hide();
        }, 400);
     }
     else {
        setTimeout(() => {
            cartModal.hide();
        }, 300);
     }
});