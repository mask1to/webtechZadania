$(document).ready(() => {
    $('#myNewSlideShow .slick').slick({
        autoplay: true,
        pauseOnHover: true,
        dots: true,
        adaptiveHeight: false,
        fade: false,
        initialSlide: 0,
    });

    $('#myFavoriteMusicShow .slick').slick({
        autoplay: false,
        dots: true,
        speed: 500,
        fade: !0,
        cssEase: 'linear',
        adaptiveHeight: false,
    });

})
