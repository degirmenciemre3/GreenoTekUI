// Carousel İçin Glide.js Kullanımı
$(document).ready(function () {
    var glide = new Glide(".glide", {
        type: "carousel",
        perView: 3,
        gap: 30,
        autoplay: 5000,
        hoverpause: true,
        breakpoints: {
            1200: {
                perView: 2,
            },
            768: {
                perView: 1,
            },
        },
    });
    glide.mount();
});

//swiper kullanımı
new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// AOS Kullanımı
AOS.init();

// Fancybox Kullanımı
$('[data-fancybox="gallery"]').fancybox({
    buttons: ["zoom", "share", "slideShow", "fullScreen", "close"],
});

