// function for event 'submit'
$('#validate').submit(function() {
    $('span.errors').empty();
    $('span.errors').remove();
    // input elements with attribute 'name'
    var inputsToValidate = $('#validate input[name]');
    for (var i = 0; i < inputsToValidate.length; i++) {
        if (!validateInputEl(inputsToValidate[i])) {
            return false;
        }
    }
    return true;
});

function validateInputEl(inputEl) {
    attrArr = inputEl.attributes;
    isValid = true;
    errorMessage = [];
    // for all attributes of element
    for (var i = 0; i < attrArr.length; i++) {
        attribute = attrArr[i];
        if (attribute.name.indexOf('validate-') >= 0) { // ok, must validate
            checkResult = checkField(attribute, inputEl.value);
            if (!checkResult.isValid) {
                errorMessage.push(getErrorMessage(checkResult.error));
            }
        }
    }
    if (errorMessage.length > 0) {
        addAndShowErrorMessage(inputEl, errorMessage);
        isValid = false;
    }
    return isValid;
}

function addAndShowErrorMessage(parentEl, errorArr) {
    var errText = '';
    for (var i = 0; i < errorArr.length; i++) {
        errText += ' ' + (i + 1) + '. "' + parentEl.name + '" ' + errorArr[i];
    }
    $('<span class="errors">' + errText + '</span>').insertAfter(parentEl);
}

// validate one fieldset
// return object
// param 'validateAttribute' ~ 'validate-minlength = '5'
function checkField(validateAttribute, inputValue) {
    var rules = {
        'required': function(value) {
            return value !== '';
        },
        'minlength': function(value, params) {
            return value.length >= parseInt(params);
        },
        'maxlength': function(value, params) {
            return value.length <= parseInt(params);
        },
        'email': function(value) {
            if (value === '') {
                return true;
            }
            var patt = /^.+@.+[.].{2,}$/i;
            return patt.test(value);
        },
        'date': function(value) {
            if (value.length === 0) {
                return true;
            }
            var dateArr = value.split('/');
            if (dateArr.length !== 3) {
                return false;
            }
            var currentDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
            return (currentDate.getFullYear() == dateArr[2] &&
                currentDate.getMonth() == dateArr[1] - 1 &&
                currentDate.getDate() == dateArr[0]);
        },
        'regexp': function(value) {
            if (value.length === 0) {
                return true;
            }
            var patt = /^\d+\.\d+\.\d+\.\d+$/g;
            return patt.test(value);
        }
    }

    var rule = validateAttribute.name.replace('validate-', '');
    var param = validateAttribute.value;
    var check = rules[rule];
    var isValid = true;

    if (check) {
        isValid = check(inputValue.trim(), param);
    }

    return {
        'isValid': isValid,
        'error': [rule, param]
    }
}

// return error message
// params 'error' ~ ['minlength', '5']
function getErrorMessage(error) {
    var errorMessage = '';
    var message = {
        'required': function() {
            return 'must be filled!';
        },
        'email': function() {
            return 'is incorrect! Example: example@gmail.com';
        },
        'date': function() {
            return 'is incorrect! Example: 23/12/2016';
        },
        'regexp': function() {
            return 'is incorrect! Example: 192.168.1.1';
        },
        'minlength': function(param) {
            return 'must contain more than ' + param + ' characters!';
        },
        'maxlength': function(param) {
            return 'must contain less than ' + param + ' characters!';
        }
    }
    var rule = error[0];
    var param = error[1];
    var errorFunc = message[rule];
    if (errorFunc) {
        errorMessage = errorFunc(param);
    }
    return errorMessage;
}
