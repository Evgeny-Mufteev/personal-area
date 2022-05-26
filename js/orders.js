"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Инпут выбора даты
  if (document.getElementById("date-picker-orders")) {
    new AirDatepicker("#date-picker-orders", {
      range: true,
      multipleDatesSeparator: " - ",
    });
  }

  if (document.querySelector(".orders__sorting-btn")) {
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
  }

  // Таймер JS
  const composeTimer = () => {
    const containersTimer = document.querySelectorAll(".orders__timer");

    containersTimer.forEach((el) => {
      let days = Number(el.getAttribute("data-days")),
        hours = Number(el.getAttribute("data-hours")),
        minutes = Number(el.getAttribute("data-min")),
        seconds = Number(el.getAttribute("data-sec"));

      const countdown = () => {
        if (seconds == 0) {
          seconds = 59;
          minutes--;
        } else {
          seconds--;
        }

        if (minutes == -1) {
          minutes = 59;
          hours--;
        }

        if (hours == -1) {
          days--;
        }

        if (days < 10) days = "0" + String(days);
        if (hours < 10) hours = "0" + String(hours);
        if (hours < 1 && !el.closest(".orders__warning-wrap").classList.contains("js-little-time")) {
          el.closest(".orders__warning-wrap").classList.add("js-little-time");
        }
        if (seconds < 10) seconds = "0" + String(seconds);
        if (minutes < 10) minutes = "0" + String(minutes);

        if (days > 0) {
          el.querySelector(".sale_counter_time_d").innerHTML = days;
          el.querySelector(".sale_counter_time_h").innerHTML = hours;
          el.querySelector(".sale_counter_time_m").innerHTML = minutes;
        } else {
          el.querySelector(".sale_counter_time_h").innerHTML = hours;
          el.querySelector(".sale_counter_time_m").innerHTML = minutes;
        }

        days = +days;
        hours = +hours;
        minutes = +minutes;
        seconds = +seconds;

        if (days + hours + minutes + seconds <= 0) return;
        setTimeout(countdown, 1000);
      };
      countdown();
    });
  };
  composeTimer();

  // Модальные окна принять/отменить заказ
  const delegatModalWindows = (el, accept = false, acceptPopup = false, closeModal = false) => {
    let overlay = document.querySelector(".overlay"),
      succesPopup = document.querySelector(".orders__succes-popup"),
      сancelPopup = document.querySelector(".orders__сancellations-popup");

    if (accept) {
      el.classList.contains("js-confirm") ? succesPopup.classList.add("active") : сancelPopup.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
      el.classList.contains("js-confirm")
        ? (succesPopup.querySelector(".js-order-accept").id = el.closest(".orders__item").id)
        : (сancelPopup.querySelector(".js-order-accept").id = el.closest(".orders__item").id);
    }
    if (closeModal || acceptPopup) {
      succesPopup.classList.remove("active");
      сancelPopup.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
      if (el.classList.contains("js-popup-confirm")) {
        // обработчик для подтверждения заказа
        console.log("confirm");
      } else if (el.classList.contains("js-popup-remove")) {
        // обработчик для отмены заказа
        console.log("delete");
      }
    }
  };

  document.addEventListener("click", (el) => {
    el = el.target;
    if (el.classList.contains("js-open")) delegatModalWindows(el, true);
    if (el.closest(".js-orders__close, .overlay")) delegatModalWindows(el, false, false, true);
    if (el.closest(".js-order-accept")) delegatModalWindows(el, false, true);
  });

  // // Закрыть уведомление о заказе
  // if (el.closest(".orders-internal__notice-close")) {
  //   document.querySelector(".orders-internal__notice-wrap").remove();
  // }

  const delegateOrdersInternal = (el) => {
    el = el.target;
    if (el.classList.contains("_green")) {
      const arrChecking = document.querySelectorAll("._added");
      const arrNotChecking = document.querySelectorAll("._not-added");
      const overlay = document.querySelector(".overlay");
      let correctInput = false;
      let inCorrect = false;
      let allCorrect = false;

      arrChecking.forEach((input) => {
        if (input.checked) {
          correctInput = true;
        }
      });

      arrNotChecking.forEach((input) => {
        if (input.checked) {
          inCorrect = true;
        } else {
          inCorrect = false;
          return;
        }
      });

      let arrItems = document.forms.processing.querySelectorAll(".orders-internal__item");
      arrItems.forEach((item) => {
        let itemName = item.querySelector("._added").name;
        if (!item.querySelector("input[name='" + itemName + "']:checked")) {
          allCorrect = true;
        }
      });

      if (allCorrect) {
        document.forms.processing.querySelector(".js-submit").click();
      } else if (correctInput) {
        document.querySelector(".orders-internal__ready-to-receive").classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
      } else if (inCorrect) {
        document.querySelector(".orders-internal__lack-goods").classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
      }
    }
    if(el.closest(".orders-internal__not-added") ){
      el.closest(".orders-internal__item").classList.add("sraka");
    } 
    if(el.closest(".orders-internal__added")) {
      el.closest(".orders-internal__item").classList.remove("sraka");
    }
  };

  document.forms.processing.addEventListener("click", delegateOrdersInternal);

  // Подсчет позиций в заказе
  // const calcOrderItems = () => {
  //   const itemWrap = document.querySelector(".orders-internal__item-wrap");
  //   const arrItem = itemWrap.querySelectorAll(".orders-internal__item");
  //   const countItem = document.querySelector(".orders__amount orders-internal__amounts span")
  //   console.log(arrItem.length);
  // }
  // calcOrderItems()
});
