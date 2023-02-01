const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");

const toggleOpenPopup = () => {
  popup.classList.toggle("popup_opened");
};

const handleeditButtonClick = () => {
  toggleOpenPopup();
};

const handleCloseButtonClick = () => {
  toggleOpenPopup();
};
const handleOverlyClick = (event) => {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
};
editButton.addEventListener("click", handleeditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
popup.addEventListener("click", handleOverlyClick);

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_type_name");
let aboutInput = document.querySelector(".popup__input_type_about");
console.log(nameInput);
console.log(aboutInput);


const saveButton = popup.querySelector(".popup__button");
const handleSaveButtonClick = () => {
  popup.classList.remove("popup_opened");
}
saveButton.addEventListener('click', handleSaveButtonClick);


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
          // Так мы можем определить свою логику отправки.
         // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let formNameElement = popup.querySelector(".popup__input_type_name");
    let formAboutElement = popup.querySelector(".popup__input_type_about");
    
    console.log(formNameElement.value);
    console.log(formAboutElement.value);
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

    function nameInputTextContent (){

      nameInput.textContent = 'Имя';
      aboutInput.textContent = 'О себе';
    }
    nameInput.addEventListener("click", handleCloseButtonClick);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);