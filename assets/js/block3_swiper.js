function homepageBannerCarousel() {
    const mySwiper = new Swiper('.irlTwiportSwiper', {
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.irlNextBtn',
            prevEl: '.irlPrevBtn',
        },
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
    });
};

if (document.querySelector('.irlTwiportSwiper')) {
    homepageBannerCarousel();
}


