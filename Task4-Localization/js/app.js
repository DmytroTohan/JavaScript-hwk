// Put multi-local values of "welcome message"
// to Local Storage if he's empty
function putWelcomeMessageToLocalStorage() {
    if (!localStorage.getItem('welcomeMessage')) {
        var welcomeMessage = {
            'ua': 'Раді тебе бачити!',
            'eng': 'Glad to see you!',
            'ru': 'Рады тебя видеть!'
        };
        localStorage.setItem('welcomeMessage', JSON.stringify(welcomeMessage));
    }
    // if the page is loaded for the first time
    // put defaul language to local storage.
    // or get browser language from 'navigator.language' 
    if (!localStorage.getItem('lastLanguages')) {
        localStorage.setItem('lastLanguages', 'ua');
    }
}

// invisible all messages in 'lang' class
function invisibleAllMessages() {
    var langEls = document.getElementsByClassName('lang');
    for (var i = 0; i < langEls.length; i++) {
        langEls[i].classList.remove('visible');
    }
}

// get last user choice
function getLastUserChoice() {
    return localStorage.getItem('lastLanguages');
}

// Build welcome message and show
// param 'lang' - user choice
function showWelcomeMessage(lang) {
    invisibleAllMessages();
    // Find element with class 'lang-' + 'ua'/'ru'/'eng'
    // and add to visible
    var langEls = document.getElementsByClassName('lang-' + lang);
    for (var i = 0; i < langEls.length; i++) {
        langEls[i].classList.add('visible');
    }
    // Parse string to object
    var data = JSON.parse(localStorage.getItem('welcomeMessage'));
    var message = data[lang];
    // Find element and change text
    var $welcomeMessage = document.querySelector('.lang-welcome-message');
    $welcomeMessage.textContent = message;
    $welcomeMessage.classList.add('visible');
    // set user choice to local Storage
    localStorage.setItem('lastLanguages', lang);
}

// add event to all radio button
function addEventToAllRadioButton() {
    $languages = document.getElementById('languages');
    var lastUserChoice = getLastUserChoice();
    var arrRadio = $languages.querySelectorAll('input[data-lang]');
    for (var i = 0; i < arrRadio.length; i++) {
        var $radio = arrRadio[i];
        // If user already has made a choice,
        // we must checked radio button
        // and show welcome message
        if (lastUserChoice && $radio.dataset.lang == lastUserChoice) {
            $radio.setAttribute('checked', true);
            showWelcomeMessage(lastUserChoice);
        }
        $radio.addEventListener('click', function() {
            if (this.checked) {
                showWelcomeMessage(this.dataset.lang);
            }
        });
    }
}

// start
function init() {
    putWelcomeMessageToLocalStorage();
    addEventToAllRadioButton();
}

init();
