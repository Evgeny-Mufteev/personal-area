"use strict";
document.addEventListener("DOMContentLoaded", () => {

  // Инпут выбора даты
  new AirDatepicker("#date-picker-orders", {
    range: true,
    multipleDatesSeparator: " - ",
  });

  const delegate = (el) => {
    el = el.target;
    // Сортировка заказов
    if (el.closest(".orders__sorting-btn")) {
      el.closest(".orders__sorting-btn").classList.toggle("active");
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
    if (!el.closest(".orders__sorting-btn")) {
      document.querySelector(".orders__sorting-btn").classList.remove("active");
    }
  };
  document.addEventListener("click", delegate);





  // Таймер JS
















});
