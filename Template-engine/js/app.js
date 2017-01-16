// some data, (homework condition)
var user1 = {id:1, name:'john', age:123, city:'kyiv'};
var user2 = {id:2, name:'alex', age:55, city:'lviv'};

//
var listOfUsers = [user1, user2];

// simple template engine
// param: userData -> Object
// for example: {id:1, name:'john', age:123, city:'kyiv'};
var compile = function (userData) {
  // user can write some template text
  var templateString = document.querySelector('.template-str input').value;
  return templateString.replace(/{{\w+}}/g, function (item) { // all {{...}}
    var key = item.replace('{{', '').replace('}}', ''); //delete '{{' and '}}'
    return userData[key] || item; // return user property value or {{abrakadabra}}
  });
}

document.getElementById('compile').onclick = function () {
  var $userList = document.querySelector('#user-list');
  var users = $userList.children; // all users

  for (var i = 0; i < listOfUsers.length; i++) {
    var someUser = listOfUsers[i];
    if (users['user' + someUser['id']]) {
      // change text, if 'users' obj. has user whis ID: user1, user2...
        users['user' + someUser['id']].textContent = compile(someUser);
    } 
  }
}
