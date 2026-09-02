gsap.registerPlugin(ScrollTrigger);
Fancybox.bind("[data-fancybox]", {});

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;
    const links = document.querySelectorAll('.header__list-link');
    const logo = document.getElementById('header-logo');

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');
        toggleLogo();
    }

    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
        setLightLogo();
    }

    function setDarkLogo() {
        logo.src = 'assets/images/logo_dark.svg';
    }

    function setLightLogo() {
        logo.src = 'assets/images/logo_light.svg';
    }

    function toggleLogo() {
        if (burger.classList.contains('active')) {
            setDarkLogo();
        } else {
            setLightLogo();
        }
    }

    burger.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const header = document.querySelector(".header");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add("header--hidden");
        } else {
            header.classList.remove("header--hidden");
        }
        lastScroll = currentScroll;
    });

    let slidesAmount = 2.1;
    if (window.innerWidth < 1025) { 
        slidesAmount = 1; 
    }

    const swiper = new Swiper('.images__slider', {
        loop: true,
        initialSlide: 1,
        slidesPerView: slidesAmount,
        centeredSlides: true,
        spaceBetween: window.innerWidth * (48 / 1920),
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
    
    const accordions = document.querySelectorAll(".area__accordion");

    accordions.forEach(accordion => {
        const title = accordion.querySelector(".area__accordion-title");
        const list = accordion.querySelector(".area__accordion_list");

        title.addEventListener("click", () => {
            const isOpen = accordion.classList.contains("is-open");
            const parentSlide = accordion.closest(".swiper-slide");
            const buttons = parentSlide.querySelector(".area__buttons");
            const siblingAccordions = parentSlide.querySelectorAll(".area__accordion");

            siblingAccordions.forEach(sib => {
                if (sib !== accordion && sib.classList.contains("is-open")) {
                    sib.classList.remove("is-open");
                    const sibList = sib.querySelector(".area__accordion_list");
                    gsap.to(sibList, {
                        height: 0,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });

            if (isOpen) {
                accordion.classList.remove("is-open");
                if (window.innerWidth > 1024) { buttons.classList.remove("active");}
                gsap.to(list, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });

            } else {
                accordion.classList.add("is-open");
                if (window.innerWidth > 1024) { buttons.classList.add("active"); }
                gsap.to(list, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });

    var modal = document.getElementById("modal");
    var modal__container = document.getElementsByClassName("modal__container")[0];
    var btns = document.querySelectorAll(".button-modal");
    var span = document.getElementsByClassName("modal__close")[0];

    btns.forEach(function(btn) {
        btn.onclick = function() {
            modal.classList.add("active");
            modal__container.classList.add("active");
        };
    });

    span.onclick = function() {
        modal.classList.remove("active");
        modal__container.classList.remove("active");
        document.body.style.overflow = "";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove("active");
            modal__container.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    const phoneElements = document.querySelectorAll('#phone');
    const maskOptions = { mask: '+7 (000) 000-00-00' };
    phoneElements.forEach(phoneElement => IMask(phoneElement, maskOptions));

    let direction = "vertical";
    let swiper_pagination = false;
    let autoplay = false;
    let loop = false;

    if (window.innerWidth < 1025) {
        direction = "horizontal";
        swiper_pagination = ".swiper-pagination";
        autoplay = true;
        loop = true;
    }

    const areasSwiper = new Swiper(".areas__slider", {
        loop: loop,
        direction: direction,
        slidesPerView: 1,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        autoplay: autoplay,
        allowTouchMove: true,
        pagination: {
            el: swiper_pagination,
            clickable: true,
        }
    });

    if (window.innerWidth > 1024) {
        ScrollTrigger.create({
            trigger: ".areas",
            start: "top top",
            end: () => `+=${areasSwiper.slides.length * 100}%`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalSlides = areasSwiper.slides.length;
                const targetSlide = Math.min(
                    Math.floor(progress * totalSlides),
                    totalSlides - 1
                );
                if (areasSwiper.activeIndex !== targetSlide) {
                    areasSwiper.slideTo(targetSlide);
                }
            }
        });
    }

    document.querySelectorAll('a[href^="#area--"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSlide = document.querySelector(targetId);

            if (!targetSlide) return;

            const slideIndex = [...targetSlide.parentElement.children].indexOf(targetSlide);

            document.querySelector('.areas').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            areasSwiper.slideTo(slideIndex);
        });
    });
});