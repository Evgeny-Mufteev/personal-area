"use strict";
document.addEventListener("DOMContentLoaded", () => {
  
  // Подсчет введенного количества символов в ответе
  const calcMaxResponseLength = () => {
    const feedbackForms = document.querySelector(".reviews__items-wrap");
    const arrInputTextarea = feedbackForms.querySelectorAll(".reviews__form-answer");

    arrInputTextarea.forEach((itemTextarea) => {
      let characterCount = itemTextarea.querySelector(".js-character-count");
      itemTextarea.addEventListener("input", (el) => {
        characterCount.textContent = el.target.value.length;
      });
    });
  };
  calcMaxResponseLength();

  // Проверка формы ответа на отзывы
  const reviewsDelegate = (el) => {
    el = el.target;

    if (el.closest(".js-open-form")) {
      el.closest(".js-open-form").classList.add("hidden");
      el.closest(".reviews__item").querySelector(".js-answer").classList.add("active");
    }
    if (el.closest(".js-reboot")) {
      el.closest(".reviews__item").querySelector(".js-answer").classList.remove("active");
      el.closest(".reviews__item").querySelector(".js-open-form").classList.remove("hidden");
      el.closest(".reviews__item").querySelector(".js-character-count").textContent = 0;
    }
  };
  document.addEventListener("click", reviewsDelegate);
});
