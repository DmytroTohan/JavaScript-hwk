var userArr = [];

// 'save' button click
document.getElementById('save-btn').onclick = function(e) {
    var registrationInfo = getRegistrationInfo(); // Object
    if (!registrationInfo.isValid) {
        return; // if some input is invalid return
    }
    e.preventDefault(); // stop default event
    delete registrationInfo['isValid'];
    registrationInfo.isDataVisible = true;
    document.querySelector('#registration').reset(); // clear all inputs
    user = new User(registrationInfo); // create new User
    userArr.push(user);
    addUserToTable(user, userArr.indexOf(user));
}

// Constructor
function User(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

function SuperUser() {
    ///
}

SuperUser.prototype.changeDataVisibility = function() {
    return this.isDataVisible = !this.isDataVisible;
}

User.prototype = SuperUser.prototype;

// if user click on table row
var changeTrVisibility = function() {
    var userIndex = parseInt($(this).attr('data-index'));
    // get User from array by index (when we create User,
    // we save index value in 'data-index' attribute)
    var userObj = userArr[userIndex];
    userObj.changeDataVisibility();
    $(this).children().each(function(index, item) { // all <td> from clicked <tr>
        if (userObj.isDataVisible) {
            // show all invible columns
            if (index === 0) {
                item.colSpan = 1;
                return;
            }
            $(item).removeClass('invisible');
            item.colSpan = 1;
        } else {
            // hide all visible columns without 'name'
            if (index === 0) {
                // we must to stretch first <td> to all table width
                item.colSpan = $(this).parent().children().length;
                return;
            }
            $(item).addClass('invisible');
        }
    })
}

function addUserToTable(user, index) {
    if ($('table').length === 0) {
        // if document load at the first time, we must create table
        createTable(user);
    }
    var $newRow = $('<tr data-index=' + index + '></tr>'); // => <tr data-index=0></tr>
    for (var key in user) {
        // create row
        if (key !== 'isDataVisible' && key !== 'changeDataVisibility') {
            $newRow.append($('<td/>').text(user[key]));
        }
    }
    $newRow[0].onclick = changeTrVisibility;
    $('table').append($newRow);
}

function createTable(user) {
    $('#registration').after('<table></table>'); // add table after registration form
    var row = $('<tr/>');
    var propArr = Object.keys(user); // all prop in User
    // create thead
    for (var i = 0; i < propArr.length; i++) {
        var thName = propArr[i];
        if (thName !== 'isDataVisible' && thName !== 'changeDataVisibility') {
            // name => Name; sex => Sex; address => Address ...
            thName = thName[0].toUpperCase() + thName.substr(1, thName.length);
            row.append($('<th/>').text(thName));
        }
    }
    $('table').append(row); // add head row to table
}

// return information about user
function getRegistrationInfo() {
    var isValid = true;
    var regInfo = {};
    // all input elements
    $('#registration input').each(function(index, item) {
        // without unchecked radio and 'submit' button
        if ((item.name === 'sex' && !item.checked) || item.type === 'submit') {
            return;
        }
        regInfo[item.name] = item.value;
        if (!item.checkValidity()) {
            isValid = false;
        }
    });
    regInfo.isValid = isValid;
    return regInfo;
}
