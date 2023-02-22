const profileEditButton = document.querySelector(`.profile__edit-button`);
const popupCloseButton = document.querySelector(`.popup__close`);
const editPopup = document.querySelector (`.popup`);
const nameInput = document.querySelector(`.popup__input_el_name`);
const professionInput = document.querySelector(`.popup__input_el_profession`);
const profileName = document.querySelector(`.profile__name`);
const profileProfession = document.querySelector(`.profile__profession`);
const popupSubmit = document.querySelector(`.popup__form`);

function popupOpened(){
    editPopup.classList.add(`popup_opened`);
};

profileEditButton.addEventListener(`click`, popupOpened);

function popupClosed(){
    editPopup.classList.remove(`popup_opened`);
};

popupCloseButton.addEventListener('click', popupClosed);

nameInput.value = profileName.textContent;
professionInput.value = profileProfession.textContent;

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    popupClosed();
};

popupSubmit.addEventListener('submit', handleFormSubmit);