const profileEditButton = document.querySelector(`.profile__edit-button`);
const popupCloseButton = document.querySelector(`.popup__close`);
const editPopup = document.querySelector (`.popup`);



profileEditButton.addEventListener(`click`, function(){
    editPopup.classList.remove(`popup_disabled`);
});


popupCloseButton.addEventListener('click', function(){
    editPopup.classList.add(`popup_disabled`);
});

const nameInput = document.querySelector(`.popup__input-name`);
const professionInput = document.querySelector(`.popup__input-profession`);
const profileName = document.querySelector(`.profile__name`);
const profileProfession = document.querySelector(`.profile__profession`)
const popupSubmit = document.querySelector(`.popup__submit`);


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    editPopup.classList.add(`popup_disabled`);
};

popupSubmit.addEventListener('click', handleFormSubmit);
 


