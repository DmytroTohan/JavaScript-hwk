// function shows 'input' elements to add new employee
document.getElementById('newEmployee').onclick = function() {
    var limit = localStorage.getItem('limit');
    if (countNumberOfEmployees() >= limit) {
        alert('Limit number of employees - ' + limit);
    } else {
        $employeeContent = document.querySelector('div.employee-content');
        $employeeContent.classList.add('visible');
        this.disabled = true;
    }
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
    var newEmployeeIsDuplicate = checkDuplicateEmployee(employeeStructure);
    var avgSalaryReaches = checkAvgSalary(employeeStructure.employeeSalary);
    if (newEmployeeIsDuplicate) {
        alert('New employee is duplicate!');
    } else if (avgSalaryReaches) {
        alert('If add new employee, average salary will be reaches 2000$ !');
    } else {
        addEmployeeToList(employeeStructure);
        clearInputEmployeeContentAndDisable();
        updateListInformation();
    }
};

document.getElementById('btn-cancel').onclick = function() {
    clearInputEmployeeContentAndDisable();
};
// set the limit of employees
document.getElementById('btn-edit').onclick = function() {
    var userAnswer = prompt('Please, enter number of employees: ');
    if (userAnswer) {
        var patternSalary = /^(\d)*$/g;
        // only numbers
        if (!userAnswer.match(patternSalary)) {
            alert('Only numbers!');
            return;
        }
        var currentCount = countNumberOfEmployees();
        var limit = parseInt(userAnswer);
        if (limit < currentCount) {
            alert('Current count of employees is ' + currentCount + '. If You want limit the number of employees to ' + userAnswer + ', please delete ' + (currentCount - limit) + ' employees!');
        } else {
            localStorage.setItem('limit', limit);
            updateListInformation();
        }
    }
}
// Delete 'li' - element from list
function deleteElementFromList(btnDelete) {
    btnDelete.onclick = function(e) {
        var userAnswer = confirm('Are you sure, you want to remove employee?');
        if (userAnswer) {
            var $btnParent = btnDelete.parentNode;
            $btnParent.remove();
            updateListInformation();
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

function checkAvgSalary(salaryStr) {
    var count = countNumberOfEmployees() + 1;
    var salary = countAverageSalary() + parseInt(salaryStr.trim().replace('$ ',''));
    var avgSalaryReaches = (salary / count) > 2000;
    return avgSalaryReaches;
}

function checkDuplicateEmployee(obj) {

    isDuplicate = false;
    // new employee
    var employeesFirstName = document.querySelectorAll('ul.employeeList>li>span.employeeFirstName');
    var employeesLastName = document.querySelectorAll('ul.employeeList>li>span.employeeLastName');
    var newEmployee = obj.employeeFirstName.trim() + obj.employeeLastName.trim();

    var employeesInList = [];
    for (var i = 0; i < employeesFirstName.length; i++) {
        // add all employees to array
        employeesInList.push(employeesFirstName[i].textContent.trim() + employeesLastName[i].textContent.trim());
    }
    if (employeesInList.indexOf(newEmployee) !== -1) {
        isDuplicate = true;
    }

    return isDuplicate;
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
    return document.querySelectorAll('ul.employeeList>li').length;
}

function countAverageSalary() {
    var averageSalary = 0;
    var employeesEl = document.querySelectorAll('ul.employeeList>li>span.employeeSalary');
    for (var i = 0; i < employeesEl.length; i++) {
      var $spanSalary = employeesEl[i];
      averageSalary += parseInt($spanSalary.textContent.replace('$ ',''));
    }
    return averageSalary;
}
// rewrite list info
function updateListInformation() {
    var numberOfEmployees = countNumberOfEmployees();
    var salarySum = countAverageSalary();
    document.getElementById('count').textContent = numberOfEmployees;
    document.getElementById('avg').textContent = Math.round(salarySum / numberOfEmployees);
    document.getElementById('limit').textContent = localStorage.getItem('limit');
}

function init() {
    // put standart limit of users, if localStorage is empty
    if (!localStorage.getItem('limit')) {
        localStorage.setItem('limit', 10);
    }
    updateListInformation();
}

init();
