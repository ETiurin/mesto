const obj = {
  formElement: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputError: 'popup__span',
  activeError: 'popup__span_error-visible'
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage, options) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(options.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.activeError);
};

const hideInputError = (formElement, inputElement, options) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(options.inputError);
  errorElement.classList.remove(options.activeError);
  errorElement.textContent = '';
};

const setEventListeners = (formElement, options) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, options);
    // Реализация  кода, отвечающего за сброс кнопки сохранения через setTimeout. 
    formElement.addEventListener('reset', () => {
      setTimeout(() => {toggleButtonState(inputList, buttonElement, options);}, 0);
    });
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);      
    });
  });
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const enableValidation = (options) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  }); 
};


const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some(inputElement => 
    !inputElement.validity.valid
  )
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, options) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
     buttonElement.classList.add(options.inactiveButtonClass);
     buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
     buttonElement.classList.remove(options.inactiveButtonClass);
     buttonElement.disabled = false;
  }
};

// function resetValidation() {
//   toggleButtonState();
//   inputList.forEach((inputElement) => {
//    hideInputError(inputElement);
//   });
// };
  
  // включение валидации вызовом enableValidation
// все настройки передаются при вызове
  enableValidation(obj);