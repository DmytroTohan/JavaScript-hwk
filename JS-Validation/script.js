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
            placeholder: 25 
        },
        username: {
            type: 'text',
            name: 'username',
            placeholder: 'user_name'
        },
        date: {
            type: 'text',
            name: 'date',
            placeholder: '13/12/2016'
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
    // Check age
    var age = inputElements[0].value;
    var pattern = /([0-9])/g;
    if (age.search(pattern) !== 0) {
        valid = false;
        alert('age should contains only numbers!');        
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
