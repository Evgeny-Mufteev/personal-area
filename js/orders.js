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
});

const delegatModalWindows = (el, btn, popup, item, modalBtn) => {
  el = el.target;
  const overlay = document.querySelector(".overlay");

  if (el.closest(btn)) {
    document.querySelector(popup).classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");

    // получаю id товара  и присваиваю его кнопке
    el.closest(item).id;
    document.querySelector(modalBtn).id = el.closest(item).id;
  }
  if (el.closest(".js-orders__close, .overlay, .js-order-accept, .js-order-сancel")) {
    console.log(modalBtn);
    document.querySelector(popup).classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
};

document.addEventListener("click", (el) => {
  if (el.closest(".js-confirm")) {
    delegatModalWindows(el, ".js-confirm", ".orders__succes-popup", ".orders__item", ".js-order-accept");
  } else if (el.closest(".js-cancel")) {
    delegatModalWindows(el, ".js-cancel", ".orders__сancellations-popup", ".orders__item", ".js-order-accept");
  }
});

//   // Отмена заказа
//   if (el.closest(".js-cancel")) {
//     document.querySelector(".orders__сancellations-popup").classList.add("active");
//     overlay.classList.add("active");
//     document.body.classList.add("no-scroll")

//     // получаю id товара  и присваиваю его кнопке
//     el.closest(".orders__item").id;
//     document.querySelector(".js-order-сancel").id = el.closest(".orders__item").id;
//   }
//   if (el.closest(".js-orders__close, .overlay, js-order-сancel")) {
//     document.querySelector(".orders__сancellations-popup").classList.remove("active");
//     overlay.classList.remove("active");
//     document.body.classList.remove("no-scroll")
//   }
// }
// document.addEventListener("click", delegatModalWindows);

// const delegatModalWindows = (el) => {
//   el = el.target;
//   const overlay = document.querySelector(".overlay");

//   // Подтверждение заказа
//   if (el.closest(".js-confirm")) {
//     document.querySelector(".orders__succes-popup").classList.add("active");
//     overlay.classList.add("active");
//     document.body.classList.add("no-scroll")

//     // получаю id товара  и присваиваю его кнопке
//     el.closest(".orders__item").id;
//     document.querySelector(".js-order-accept").id = el.closest(".orders__item").id;
//   }
//   if (el.closest(".js-orders__close, .overlay, .js-order-accept")) {
//     document.querySelector(".orders__succes-popup").classList.remove("active");
//     overlay.classList.remove("active");
//     document.body.classList.remove("no-scroll")
//   }

//   // Отмена заказа
//   if (el.closest(".js-cancel")) {
//     document.querySelector(".orders__сancellations-popup").classList.add("active");
//     overlay.classList.add("active");
//     document.body.classList.add("no-scroll")

//         // получаю id товара  и присваиваю его кнопке
//         el.closest(".orders__item").id;
//         document.querySelector(".js-order-сancel").id = el.closest(".orders__item").id;
//   }
//   if (el.closest(".js-orders__close, .overlay, js-order-сancel")) {
//     document.querySelector(".orders__сancellations-popup").classList.remove("active");
//     overlay.classList.remove("active");
//     document.body.classList.remove("no-scroll")
//   }
// }
// document.addEventListener("click", delegatModalWindows);