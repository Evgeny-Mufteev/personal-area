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
  const anchorUp = () => {
    let buttonAnchor = document.querySelector(".anhor");
    let header = document.querySelector(".header");
    let wrapper = document.querySelector(".wrapper");

    const scrollTo = (element) => {
      // console.log(buttonAnchor.offsetTop);
      wrapper.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: "smooth",
      });
    };
    buttonAnchor.addEventListener("click", () => {
      scrollTo(header);
    });
  };
  anchorUp();

  // отображение якоря при скролле
  window.addEventListener("scroll", () => {
    const topArrow = document.querySelector(".anhor");

    if (window.pageYOffset > 500) {
      topArrow.classList.add("_show");
    } else {
      topArrow.classList.remove("_show");
    }
  });

  const delegate = (el) => {
    el = el.target;
    // Сортировка заказов
    if (document.querySelector(".orders__sorting-btn")) {
      if (el.closest(".orders__sorting-btn, .shop-page__sorting-btn")) {
        el.closest(".orders__sorting-btn, .shop-page__sorting-btn").classList.toggle("active");
      }
      if (el.closest(".order__sorting-list")) {
        let allEl = el.closest(".order__sorting-list").querySelectorAll(".orders__sorting-item");
        allEl.forEach((e) => {
          e.classList.remove("active");
        });
      }
      if (el.classList.contains("orders__sorting-item")) {
        el.classList.add("active");
        document.querySelector(".orders__text-btn").innerText = el.innerText;
      }
      if (!el.closest(".orders__sorting-btn, .shop-page__sorting-btn")) {
        document.querySelector(".orders__sorting-btn").classList.remove("active");
      }
    }

    // Сортировка магазинов
    if (document.querySelector(".shop-page__sorting-btn")) {
      if (el.closest(".shop-page__sorting-list")) {
        let allEl = el.closest(".shop-page__sorting-list").querySelectorAll(".shop-page__sorting-item");
        allEl.forEach((e) => {
          e.classList.remove("active");
        });
      }
      if (el.classList.contains("shop-page__sorting-item")) {
        el.classList.add("active");
        document.querySelector(".shop-page__text-btn").innerText = el.innerText;
      }
    }
  };
  document.addEventListener("click", delegate);
});

// const Zhmeck = {

//   name: "Жмэк",
//   hui: "12sm",
//   GetHui() {
//     return this.hui;
//   },
//   trans: true,
// };
// console.log(Zhmeck.GetHui());
