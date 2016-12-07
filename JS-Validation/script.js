// Create form and build obj
function createForm() {
    var form = document.createElement("form");
    form.setAttribute("name", "login");
    form.setAttribute("action", "google.com");
    form.setAttribute("onsubmit", "return checkForm()");
    document.body.appendChild(form);
    var formElements = {
        age: {
            type: 'text',
            name: 'age',
            value: 'Age'
        },
        username: {
            type: 'text',
            name: 'username',
            value: 'User name'
        },
        date: {
            type: 'text',
            name: 'date',
            value: 'Date'
        },
        submit: {
            type: 'submit',
            name: 'validate',
            value: 'Validate Me'
        }
    };
    createFormElement(form, formElements);
}

// Create input elements
function createFormElement(form, formElem) {
    for (var element in formElem) {
        var inputEl = document.createElement('input');
        var elObject = formElem[element];
        for (var prop in elObject) {
            inputEl.setAttribute(prop, elObject[prop]);
        }
        form.appendChild(inputEl);
    }
}

// Validate function
function checkForm() {
    var valid = true;
    var inputElements = document.forms[0].childNodes;
    var 
    // Check age
    var age = inputElements[0].value;
    var numbers = '0123456789';
    for (var i = 0; i < age.length; i++) {
        if (numbers.indexOf(age[i]) === -1) {
            valid = false;
            alert('age should contains only numbers!');
            break;
        }
    }
    // Check user name
    var rightName = 'user_';
    var userName = inputElements[1].value;
    if (userName.indexOf(rightName) !== 0) {
        alert('User name should start from "user_"');
        valid = false;
    }
    // Check current date
    var currentDate = moment().format('DD/MM/YYYY');
    var formDate = inputElements[2].value;
    if (formDate !== currentDate) {
        alert('Your data is invalid');
        valid = false;
    }
    return valid;
}

createForm();
