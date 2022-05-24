"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // меню бургер
  const dropdownMenu = (el) => {
    el = el.target;

    const MobileMenuIcon = document.querySelector(".header__mobile-menu");
    const blockMenu = document.querySelector(".mobile-menu");

    if (el.closest(".header__mobile-wrap")) {
      MobileMenuIcon.classList.toggle("active");
      blockMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    }
  };
  document.addEventListener("click", dropdownMenu);

  // Якорь наверх
  const toper = function () {
    let button = document.querySelector(".toTop");
    let header = document.querySelector(".header");

    const scrollTo = (element) => {
      window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: "smooth",
      });
    };
    button.addEventListener("click", () => {
      scrollTo(header);
    });
  };
  toper();

  // отображение якоря при скролле
  window.addEventListener("scroll", () => {
    const topArrow = document.querySelector(".toTop");
    if (window.pageYOffset > 500) {
      topArrow.classList.add("_show");
    } else {
      topArrow.classList.remove("_show");
    }
  });

});
