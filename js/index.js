/* search */

document.querySelector(".header__search").addEventListener("click", function() {
  document.querySelector(".header__form").classList.add("form-active");
  this.classList.add("active");
});

document.querySelector(".header__search-close").addEventListener("click", function() {
  document.querySelector(".header__form").classList.remove("form-active");
  document.querySelector(".header__search").classList.remove("active");
});

document.addEventListener("click", function(e) {
  let target = e.target;
  let form = document.querySelector(".header__form");
  if (!target.closest(".header__container")) {
  form.classList.remove("form-active");
    form.querySelector(".header__form-input").value = "";
    document.querySelector(".header__search").classList.remove("active");
  }
});


/* скролл меню */

document.querySelectorAll('.js-scroll-menu').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
  });
})



/* submenu */

const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

/* burger */
let burger = document.querySelector(".burger");
let container = document.querySelector(".header__container");
let menuWrap = document.querySelector(".nav-wrap");
let menu = document.querySelector(".header__nav");
let menuLinks = menu.querySelectorAll(".nav__link");
let login = document.querySelector(".header__login");

burger.addEventListener ("click",
function() {
  burger.classList.toggle("menu-on");
  container.classList.toggle("is-active");
  menuWrap.classList.toggle("is-active");
  menu.classList.toggle("is-active");
  login.classList.toggle("is-active")
  document.body.classList.toggle("stop-scroll");
})

menuLinks.forEach(function(el) {
  el.addEventListener("click", function() {
    burger.classList.remove("menu-on");
    container.classList.remove("is-active");
    menu.classList.remove("is-active");
    menuWrap.classList.remove("is-active");
    login.classList.remove("is-active")
    document.body.classList.remove("stop-scroll");
  })
})
setMenuListener();

/* слайдер */

const swiper = new Swiper('.slider__swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  },
  a11y: {
    slideLabelMessage: `Фоновое изображение слайдера номер: {{index}}`
  }
});

/* select */

document.addEventListener("DOMContentLoaded", function() {
  const selector = document.querySelector(".choices")
  const choices = new Choices(selector, {
    searchEnabled: false,
    shouldSort: false,
    classNames: {
      containerOuter: 'choices header_choices',
    },
  });
});

/* carousel */

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container", {
    slidesPerView: 1,
    autoHeight: true,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery .carousel-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".carousel-next",
      prevEl: ".carousel-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }

  });
});

/* modal */

const modalBtns = document.querySelectorAll('.carousel-slide');
const modalOverley = document.querySelector('.modal-overley');
const modals = document.querySelectorAll('.modal');
const closeModal = document.querySelectorAll('.modal-close');

modalBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
  let path = e.currentTarget.getAttribute('data-path');

  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });

  document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
  modalOverley.classList.add('modal-overley--visible');
  });
});

modalOverley.addEventListener('click', (e) => {
  if (e.target == modalOverley) {
    modalOverley.classList.remove('modal-overley--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});

document.querySelectorAll('.modal-close').forEach(function(closeBtn){
  closeBtn.addEventListener('click', function() {
      modalOverley.classList.remove('modal-overley--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });
    });
  });


 /* табы */

 document.querySelectorAll('.js-tab-btn').forEach(function(tabsBtn){
  tabsBtn.addEventListener('click', function(e){
  e.preventDefault();
  const path = e.currentTarget.dataset.path;
  document.querySelectorAll('.js-tab-btn').forEach(function(btn){
  btn.classList.remove('js-tab-btn-active')
});
  e.currentTarget.classList.add('js-tab-btn-active');
  document.querySelectorAll('.tab-content').forEach(function(tabsBtn){
  tabsBtn.classList.remove('is-active')
});
  document.querySelector(`[data-target="${path}"]`).classList.add('is-active');
  });
});

/* сколл каталога на mobile */

(() => {
	const MOBILE_WIDTH = 580;

	function getWindowWidth () {
	  return Math.max(
	    document.body.scrollWidth,
	    document.documentElement.scrollWidth,
	    document.body.offsetWidth,
	    document.documentElement.offsetWidth,
	    document.body.clientWidth,
	    document.documentElement.clientWidth
	  );
	}

	function scrollToContent (link, isMobile) {
		if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
			return;
		}

	  const href = link.getAttribute('href').substring(1);
	  const scrollTarget = document.getElementById(href);
	  const elementPosition = scrollTarget.getBoundingClientRect().top;

	  window.scrollBy({
	      top: elementPosition,
	      behavior: 'smooth'
	  });
	}

	document.querySelectorAll('.js-scroll-link').forEach(link => {
	  link.addEventListener('click', function(e) {
	      e.preventDefault();
	      scrollToContent(this, true);
	  });
	});
})();

/* accordion */

(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });
})();


/* Tooltip */

(() => {
tippy('.js-tooltip-btn', {
  theme: 'mytheme',
  maxWidth: 264,
  size: "large"
});
})();


/* slider-news */

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slider-news-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".news .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1
    },
    navigation: {
      nextEl: ".slider-news-next",
      prevEl: ".slider-news-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      },

      1920: {
        slidesPerView: 3,
        spaceBetween: 50
      }

    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }

  });
});


/* slider-partner */

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-partner-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 50,
    navigation: {
      nextEl: ".slider-partner-next",
      prevEl: ".slider-partner-prev"
    },

    breakpoints: {

      500: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      800: {
        slidesPerView: 2,
        spaceBetween: 50,
      },

      1024: {
        slidesPerView: 2,
      },

      1200: {
        slidesPerView: 3,
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "swiper-slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("swiper-slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("swiper-slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }

  });
});


/* form */

var telSelector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7(999)-999-99-99");
im.mask(telSelector);

const validation = new JustValidate('.form', {
  errorFieldCssClass: 'is-invalid',
  errorLabelStyle: {
    fontSize: '12px',
    color: '#D11616',
    textIndent: '9%',
  },
  focusInvalidField: true,
  },
);

  validation
    .addField('#name', [
    {
        rule: 'required',
        errorMessage: 'Укажите ваше имя',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя слишком короткое',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя слишком длинное',
      },
    ])
    .addField('#tel', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваш телефон',
      },
      {
        rule: "function",
        validator: function (name, value) {
          const phone = telSelector.inputmask.unmaskedvalue();
          return phone.length === 10
        },
        errorMessage: 'Не достаточно символов в номере',
      },
      ]).onSuccess((event) => {
        console.log('validation passes ...');

        let formData = new FormData(event.target);
        console.log(...formData);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        event.target.reset();
      });


/* map */

ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    }
  );

  myMap.behaviors.disable('scrollZoom');
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    myMap.behaviors.disable('drag');
}

  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "/img/my-map.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -40],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}








