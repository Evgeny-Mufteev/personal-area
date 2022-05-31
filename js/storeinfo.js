"use strict";
document.addEventListener("DOMContentLoaded", () => {

  // При клике на иконку фокусирование на input
  const handleFocusInput = () => {
    const form = document.querySelector(".infoblock__form");
    const arrBtnEdit = form.querySelectorAll(".infoblock__edit");

    arrBtnEdit.forEach((itemBnt) => {
      itemBnt.addEventListener("click", (el) => {
        el.target.closest(".infoblock__input-wrap").querySelector("input").focus();
      });
    });
  };
  handleFocusInput();

  // Маска телефона
  const mask = (input) => {
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = input.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  };
  let number = document.getElementById("number");

  number.addEventListener("click", () => {
    number.addEventListener("input", mask.bind(null, number), false);
    number.addEventListener("focus", mask.bind(null, number), false);
    number.addEventListener("blur", mask.bind(null, number), false);
  });

  // Показать изображение при загрузке
  let COUNT = 0;
  const showImages = (fileInput, containerImage, boolean) => {

    fileInput = document.querySelector(fileInput);
    let files = fileInput.files;
    let BoxContainerImage = document.querySelectorAll(containerImage);

    for (let i = 0, f; (f = files[i]); i++) {
      if (i == 4) break;
      if (!f.type.match("image.*")) continue;

      let readingFiles = new FileReader();

      readingFiles.onload = ((theFile) => {
        return function (e) {
          if (boolean) {
            BoxContainerImage[0].innerHTML = "<img src='" + e.target.result + "' />";
          }
          if (!boolean) {
            BoxContainerImage[COUNT].innerHTML = "<img src='" + e.target.result + "' />";
            COUNT++;
          }
        };
      })(f);
      readingFiles.readAsDataURL(f);
    }
  };

  // Показать список загруженных файлов
  const showDownloadFile = (inputFile, func) => {
    document.querySelector(inputFile).addEventListener("change", function () {
      let formItem = this.parentNode; // родительский элемент, для того чтобы вставить список с файлами
      let ul = formItem.querySelector(".list-files");
      let str = "";
      let arrayFiles = this.files; // массив с выбранными фалами

      if (arrayFiles.length == 0) {
        ul.removeChild("li");
        str = "<li>Файл не выбран</li>";
      } else {
        for (let i = 0; i <= 3; i++) {
          if (arrayFiles[i]) {
            str += "<li>" + arrayFiles[i].name + "</li>"; // <li>Имя файла</li>
          }
        }
      }

      ul.innerHTML = str;
      if (func) {
        showImages("#files", ".infoblock__main-photo-wrap", true);
      } else {
        showImages("#mini-img", ".infoblock__mini-pgoto-inner", false);
      }
    });
  };
  showDownloadFile("#files", true);
  showDownloadFile("#mini-img", false);

  // Показать скрыть пароль
  const showHidePassword = (icon) => {
    let arrPasswordIcon = document.querySelectorAll(icon);
    
      arrPasswordIcon.forEach((el) => {
        el.addEventListener("click", () => {
          let passwordInput = el.previousElementSibling;
          if (el.classList.contains("show")) {
            passwordInput.type = "password";
            el.classList.remove("show");
          } else {
            passwordInput.type = "text";
            el.classList.add("show");
          }
        });
      });
  };
  showHidePassword(".js-password");

  // Проверка паролей и сохранение
  const checkingVerifyPassword = () => {
    const formPassword = document.querySelector(".js-form-submit");

      formPassword.addEventListener("submit", (el) => {
        let currentPassword = document.querySelector(".js-current-password").value;
        let newPassword = document.querySelector(".js-new-password").value;
        let match = true;

        
        if (currentPassword != newPassword || currentPassword == "") {
          document.querySelector(".infoblock__mismatch").classList.add("active");
          document.querySelector(".infoblock__match").classList.remove("active");
          const redBorder = document.querySelectorAll(".js-border");

          for (let el of redBorder) el.classList.add("active");

          match = false;
          el.preventDefault();
        } else {
          document.querySelector(".infoblock__match").classList.add("active");
          document.querySelector(".infoblock__mismatch").classList.remove("active");
        }
        return match;
      });
  };
  checkingVerifyPassword();
  
});
