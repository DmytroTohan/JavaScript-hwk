// Constructor
function User(userName) {
    // random number from 'min' to 'max'
    var randomValue = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    // return random date
    var dateValue = function() {
        var now = new Date();
        now.setDate(now.getDate() - randomValue(0, 15));
        return now;
    };

    this.name = userName;
    this.lastVisitDate = dateValue();
    this.nightDiscount = randomValue(1, 5);
    this.weekendDiscount = randomValue(1, 5);
    this.globalDiscount = randomValue(1, 5);
    this.ordersCount = randomValue(1, 10);
    this.ordersTotalPrice = randomValue(100, 1000);
    this.bonus = randomValue(10, 50);

    this.getBonus = function() {
        document.querySelector('.bonus-before').textContent = 'User bonus before new orders: ' + this.bonus;
    };

    this.getDiscount = function() {
        document.querySelector('.discount-before').textContent =
        'User discount before new orders: ' + (this.nightDiscount + this.weekendDiscount + this.globalDiscount);
    };

}

User.NewOrders = function() {
    var now = new Date();
    // decorated function
    this.getBonus = function(usr) {
        usr.getBonus();
        var deltaDays = Math.ceil((usr.lastVisitDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (deltaDays <= 10) {
            usr.bonus += (240 - deltaDays * 24);
        }
        usr.ordersCount += 1;
        usr.lastVisitDate = now;
        return 'User bonus: ' + usr.bonus;
    };
    // decorated function
    this.getDiscount = function(usr) {
        usr.getDiscount();
        var hour = now.getHours();
        var day = now.getDate();
        var isNight = hour >= 23 && hour < 5;
        var isWeekend = day == 0 || day == 6;

        if (!isNight && !isWeekend) {
            usr.globalDiscount += 1;
        }
        if (isNight) {
            usr.nightDiscount += 1;
        }
        if (isWeekend) {
            usr.weekendDiscount += 1;
        }
        return 'User discount: ' + (usr.weekendDiscount + usr.nightDiscount + usr.globalDiscount);
    };
}

User.getDecorator = function(decorator) {
    User[decorator].prototype = this;
    return new User[decorator];
}

var newOrders = function () {
  var user = new User('Dima');
  newOrders = User.getDecorator('NewOrders'); // decorator
  document.querySelector('.bonus').textContent = newOrders.getBonus(user);
  document.querySelector('.discount').textContent = newOrders.getDiscount(user);
}

document.getElementById('new-orders').onclick = newOrders;
