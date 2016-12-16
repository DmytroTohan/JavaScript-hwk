// function shows 'input' elements to add new employee
document.getElementById('newEmployee').onclick = function() {
    $employeeContent = document.querySelector('div.employee-content');
    $employeeContent.classList.add('visible');
    this.disabled = true;
};
// Save new employee
document.getElementById('btn-save').onclick = function() {
    $employeeContent = document.querySelector('.employee-content');
    inputArr = $employeeContent.getElementsByTagName('input');
    var employeeStructure = {};
    // check all input values
    for (var i = 0; i < inputArr.length; i++) {
        var contentProp = checkInputElement(inputArr[i].name, inputArr[i].value);
        if (!contentProp) { // if value isn't valid
            return;
        }
        // add input value to object
        employeeStructure['employee' + inputArr[i].name] = contentProp;
    }
    addEmployeeToList(employeeStructure);
    clearInputEmployeeContentAndDisable();
};

document.getElementById('btn-cancel').onclick = function() {
    clearInputEmployeeContentAndDisable();
};
// Delete 'li' - element from list
function deleteElementFromList(btnDelete) {
    btnDelete.onclick = function(e) {
        var userAnswer = confirm('Are you sure, you want to remove employee?');
        if (userAnswer) {
            var $btnParent = btnDelete.parentNode;
            $btnParent.remove();
        }
    };
}
// add new employee to list
function addEmployeeToList(obj) {
    $userList = document.querySelector('ul.employeeList');
    $newEmployeeLi = document.createElement('li');
    $userList.appendChild($newEmployeeLi);
    for (var key in obj) {
        $employeeElem = document.createElement('span');
        $employeeElem.classList.add(key);
        $employeeElem.textContent = obj[key];
        $newEmployeeLi.appendChild($employeeElem);
    }
    // add 'delete' button
    $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('btn-delete');
    $newEmployeeLi.appendChild($deleteBtn);
    deleteElementFromList($deleteBtn);
}

function checkInputElement(name, value) {

    var isValid = true;
    var employeeProp = '';

    // return, if value is empty
    if (value.trim().length === 0) {
        alert('Field ' + name + ' is empty!');
        return false;
    }
    if (name == 'FirstName' || name == 'LastName') {
        // first letter must be in uppercase
        if (value[0] !== value[0].toUpperCase()) {
            alert(name + ' should start in uppercase!');
            isValid = false;
        } else { // and contains only letters
            var patternName = /^[a-zA-Z]+$/;
            if (value.search(patternName) !== 0) {
                alert(name + ' should contains only letters!');
                isValid = false;
            }
        }
        employeeProp = value + ' ';
    } else if (name == 'Salary') {
        var patternSalary = /^(\d)*$/g;
        // only numbers
        if (!value.match(patternSalary)) {
            isValid = false;
            alert('Salary should contains only numbers!');
        }
        employeeProp = '$ ' + value + ' ';
    } else {
        employeeProp = value;
    }
    return !isValid ? isValid : employeeProp;
}

function clearInputEmployeeContentAndDisable() {
    $employeeContent = document.querySelector('.employee-content');
    var inputArr = $employeeContent.getElementsByTagName('input');
    // clear input value
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i].value = '';
    }
    $employeeContent.classList.remove('visible'); // invisible
    // 'Add new employee' button
    document.getElementById('newEmployee').disabled = false;
}

function countNumberOfEmployees() {
    var count = document.querySelectorAll('ul.employeeList>li').length;
}

function countAverageSalary() {
    var averageSalary = 0;
    var employeesEl = document.querySelectorAll('ul.employeeList>li>span.employeeSalary');
    for (var i = 0; i < employeesEl.length; i++) {
      var $spanSalary = employeesEl[i];
      averageSalary += parseInt($spanSalary.textContent.replace('$ ',''));
    }
}
