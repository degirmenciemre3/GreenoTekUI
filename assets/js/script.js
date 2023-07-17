
//language
async function loadScript(language) {
  var script = document.createElement('script');
  script.src = language === 'TR' ? 'assets/js/tr.js' : 'assets/js/en.js';
  document.body.appendChild(script);

  var scriptlang = document.createElement('script');
  scriptlang.src = "assets/js/language.js";
  document.body.appendChild(scriptlang);
}

//carousel değiştikçe yazıyı değiştir
var caption = document.getElementById("caption");
$('.carousel').on('slid.bs.carousel', function () {
  let currentSlide = $(this).find('.active');
  var newCaption = "";
  let savedLanguage = localStorage.getItem("language");
  if(savedLanguage){
    if(savedLanguage === 'EN'){
      newCaption = currentSlide.data("captionen");
    }
    else{
      newCaption = currentSlide.data("captiontr");
    }
  }else{
    newCaption = currentSlide.data("captiontr");
  }
  
  caption.innerHTML = newCaption;
});

$(document).ready(async function () {
  

  // Carousel İçin Glide.js Kullanımı
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

    $(".whatsapp_float").click(function() {
      var phoneNumber = "+905324328985";
      var message = "Merhaba!, Bilgi Almak İstiyorum";
  
      window.open("https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + message);
    });

    //Switch Language
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      // Kaydedilmiş dil seçimini seçim menüsünde seçili hale getir
      $("#language-select").val(savedLanguage);
    }
    // Seçim menüsündeki değişiklikleri dinle
    $("#language-select").change(function() {
    console.log($(this).val());
    // Seçilen dili yerel depolama özelliğinde sakla
    localStorage.setItem("language", $(this).val());
    setTimeout(function() {
      location.reload()
    }, 500);
    });

    await loadScript(savedLanguage === '' || savedLanguage === null ? "TR" : savedLanguage);
    
});



//swiper kullanımı
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,
    loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
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


/**
   * Mobile nav toggle
   */

const mobileNavShow = document.querySelector('.mobile-nav-show');
const mobileNavHide = document.querySelector('.mobile-nav-hide');

document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
  el.addEventListener('click', function(event) {
    event.preventDefault();
    mobileNavToogle();
  })
});

function mobileNavToogle() {
  document.querySelector('body').classList.toggle('mobile-nav-active');
  mobileNavShow.classList.toggle('d-none');
  mobileNavHide.classList.toggle('d-none');
}

/**
 * Hide mobile nav on same-page/hash links
 */
document.querySelectorAll('#navbar a').forEach(navbarlink => {

  if (!navbarlink.hash) return;

  let section = document.querySelector(navbarlink.hash);
  if (!section) return;

  navbarlink.addEventListener('click', () => {
    if (document.querySelector('.mobile-nav-active')) {
      mobileNavToogle();
    }
  });

});

/**
 * Toggle mobile nav dropdowns
 */
const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

navDropdowns.forEach(el => {
  el.addEventListener('click', function(event) {
    if (document.querySelector('.mobile-nav-active')) {
      event.preventDefault();
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('dropdown-active');

      let dropDownIndicator = this.querySelector('.dropdown-indicator');
      dropDownIndicator.classList.toggle('bi-chevron-up');
      dropDownIndicator.classList.toggle('bi-chevron-down');
    }
  })
});

/**
 * Scroll top button
 */
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop) {
  const togglescrollTop = function() {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
  window.addEventListener('load', togglescrollTop);
  document.addEventListener('scroll', togglescrollTop);
  scrollTop.addEventListener('click', window.scrollTo({
    top: 0,
    behavior: 'smooth'
  }));
}





/**
   * Porfolio isotope and filter
   */
let portfolionIsotope = document.querySelector('.portfolio-isotope');

if (portfolionIsotope) {

  let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
  let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
  let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

  window.addEventListener('load', () => {
    let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
      itemSelector: '.portfolio-item',
      layoutMode: portfolioLayout,
      filter: portfolioFilter,
      sortBy: portfolioSort
    });

    let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
    menuFilters.forEach(function(el) {
      el.addEventListener('click', function() {
        document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aos_init === 'function') {
          aos_init();
        }
      }, false);
    });

  });

}

/**
   * Initiate glightbox
   */
const glightbox = GLightbox({
    selector: '.glightbox'
  });