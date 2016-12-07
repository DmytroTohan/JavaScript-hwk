function getUserOsVersion() {
    var navigatorMessageMap = {
        'mac': 'macos',
        'iphone': 'macos',
        'win': 'windows'
    };

    var platform = navigator.platform.toLowerCase();

    for (var key in navigatorMessageMap) {
        key = key.toLowerCase();
        var version = navigatorMessageMap[key];
        if (platform.indexOf(key) >= 0) {
            hideElementsByAttrValue(version);
        }
    }
}

//Function hides elements(user OS), that don't support our app
function hideElementsByAttrValue(attrValue) {

    var messageElements = document.getElementsByClassName('download-message');

    for (var i = 0; i < messageElements.length; i++) {
        var messEl = messageElements[i];
        var isUserOsVersion = messEl.hasAttribute('data-version') && messEl.getAttribute('data-version') === attrValue; //support
        if (!isUserOsVersion) {
            messEl.setAttribute('hidden', true);
        }
    }
}

getUserOsVersion();
