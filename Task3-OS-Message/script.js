function getUserOsVersion() {
    var navigatorMessageMap = {
        'mac': 'macos',
        'iphone': 'macos',
        'win': 'windows',
        'lin': 'linux'
    };

    var platform = navigator.platform.toLowerCase();

    for (var key in navigatorMessageMap) {
        key = key.toLowerCase();
        var version = navigatorMessageMap[key];
        if (platform.indexOf(key) >= 0) {
            showElementsByAttrValue(version);
        }
    }
}

//Function show elements(user OS), that support our app
function showElementsByAttrValue(attrValue) {

    var messageElements = document.getElementsByClassName('download-message');

    for (var i = 0; i < messageElements.length; i++) {
        var messEl = messageElements[i];
        var isUserOsVersion = messEl.hasAttribute('data-version') && messEl.getAttribute('data-version') === attrValue;
        // here we can use property 'dataset' and write:
        // var isUserOsVersion = messEl.dataset.version === attrValue;
        if (isUserOsVersion) {
            messEl.classList.add('visible');
            break;
        }
    }
}

getUserOsVersion();
