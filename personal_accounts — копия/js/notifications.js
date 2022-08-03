"use strict";
document.addEventListener("DOMContentLoaded", () => {

    // Инпут выбора даты
    new AirDatepicker("#date-picker-notices", {
      range: true,
      multipleDatesSeparator: " - ",
    });

  // Делегирование
  const removeNotice = (el) => {
    el = el.target;
    const allNoticeItem = document.querySelectorAll(".notices__item");

    // Удаление по отдельности
    if (el.closest(".notice__close")) {
      el.closest(".notices__item").remove();
    }

    // Удаление всех
    if (el.closest(".notices__btns-del")) {
      allNoticeItem.forEach((item) => {
        item.remove();
      });
    }

    // Прочесть все уведомления
    if (el.closest(".notices__btns-read")) {
      allNoticeItem.forEach((item) => {
        item.classList.remove("not-read");
        item.classList.add("_read");
      });
    }
  };
  document.addEventListener("click", removeNotice);

  
});
