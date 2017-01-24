var maxSlotMachineNumber = 10;
var casino = undefined;
var slotMachinesArr = [];

function putDefaultValueToArray() {
    for (var i = 0; i < maxSlotMachineNumber; i++) {
        slotMachinesArr.push(null);
    }
}

// Constructor
function Casino(slotMachine, money) {
    this.slotMachineNumber = slotMachine;
    this.casinoMoney = money;
    var random = getRandomValue(0, slotMachine - 1);
    var slotMoney = Math.floor(money / slotMachine);
    var remainder = money % slotMachine;
    for (var i = 0; i < slotMachine; i++) {
        // create new Slot Machine and add remaind sum to the first slot
        var newSlot = new SlotMachine(i === 0 ? (slotMoney + remainder) : slotMoney);
        // some slot must be lucky
        if (i === random) {
          newSlot.lucky = true;
        }
        // create html element for this slot
        createSlotElement(newSlot);
    }
}

// Casino public method

// return all money in casino
Casino.prototype.getMoney = function() {
    return this.casinoMoney;
}

// return number of slot machines
Casino.prototype.getMachinesNumber = function() {
    return this.slotMachineNumber;
}

// create new slot machine and add to game area
Casino.prototype.addSlotMachine = function() {
    // find free place for slot machine
    var freeIndex = getFreeIndex();
    if (typeof freeIndex === 'string') {
        return;
    }
    // find slot with max money
    var richesSlot = getRichesSlotMachine();
    var richesSlotMoney = 0;
    var newSlotMoney = 0;
    if (richesSlot) {
        richesSlotMoney = richesSlot.getMoney();
        newSlotMoney = Math.floor(richesSlotMoney / 2);
        richesSlot.putMoney(-1 * newSlotMoney);
        updateSlotMachineMoney(slotMachinesArr.indexOf(richesSlot));
    } else {
      newSlotMoney = this.casinoMoney;
    }
    // create new slot
    var newSlot = new SlotMachine(newSlotMoney);
    createSlotElement(newSlot);
    this.slotMachineNumber += 1;
    updateCasinoInfo(); // update 'slotMachineNumber' value in html element
}

// delete slot
Casino.prototype.deleteSlotMachine = function(index) {
    this.slotMachineNumber -= 1;
    updateCasinoInfo();
    // put deleted slot money to other slot
    var slotMachine = slotMachinesArr[index - 1];
    var slotMoney = slotMachine.getMoney();
    var sumToAdd = Math.floor(slotMoney / this.slotMachineNumber);
    var remaindSum = slotMoney % this.slotMachineNumber;
    showSlotMachine(slotMachine, 0); // hide element
    slotMachinesArr[index - 1] = null;
    var firstElIndex = 0;
    for (var i = 0; i < slotMachinesArr.length; i++) {
        if (slotMachinesArr[i]) {
            // put to the first slot sum + remaindSum
            // to other only sum
            slotMachinesArr[i].putMoney(firstElIndex === 0 ? (sumToAdd + remaindSum) : sumToAdd);
            firstElIndex++;
            updateSlotMachineMoney(i);
        }
    }
    updateCasinoInfo();
}

// take money from casino
// param 'sum' - how much
Casino.prototype.withdraMoney = function(sum) {
    while (sum > 0) {
        // if the 'riches' slot has less money than 'sum'
        // we take all money from this slot
        // and going to find second 'riches' slot
        var richesSlot = getRichesSlotMachine();
        var richesSlotMoney = richesSlot.getMoney();
        var remaindSum = richesSlotMoney - sum;
        var diffSum = remaindSum < 0 ? richesSlotMoney : sum;
        richesSlot.putMoney(-1 * diffSum);
        this.casinoMoney -= diffSum;
        updateSlotMachineMoney(slotMachinesArr.indexOf(richesSlot));
        sum -= diffSum;
    }
    updateCasinoInfo();
}

// Constructor
function SlotMachine(money) {
    this.money = money;
    this.lucky = false;
}

// return lucky ))
SlotMachine.prototype.getLucky = function() {
  return this.lucky;
}

// return all money in slot
SlotMachine.prototype.getMoney = function() {
    return this.money;
}

SlotMachine.prototype.putMoney = function(sum) {
    this.money += sum;
}

// put some money to slot
SlotMachine.prototype.takeMoney = function(sum) {
    this.money -= sum;
}

// ok, user plays game
// param 'sum' - user put to slot machine some money
SlotMachine.prototype.playGame = function(sum) {
    var slotIndex = slotMachinesArr.indexOf(this);
    var slotMoney = this.getMoney();
    var arrNumber = [];
    // create 3 numbers (if 'this' slot is lucky => [7,7,7])
    for (var i = 0; i < 3; i++) {
        var random = this.getLucky() ? 7 : getRandomValue(1, 9);
        setTimeout(setNumber, (i + 1) * 300, slotIndex, i, random);
        arrNumber.push(random);
    }
    // calculate user wins
    var userWin = checkGameNumber(arrNumber, sum, slotMoney);
    // diff the money from slot, if user won
    this.putMoney(-1 * userWin['slot_money']);
    casino.casinoMoney -= userWin['slot_money'];
    // update info and show user wins
    updateCasinoInfo();
    updateSlotMachineMoney(slotIndex);
    setTimeout(showUserWin, 1500, userWin['user_win']);
}

// calculate:
// 1. how much money user won
// 2. how much money we must diff. from slot machine
function checkGameNumber(arr, sum, money) {
    var result = {
      'user_win': 0,
      'slot_money': 0
    };
    if (arr[0] === 7 && arr[1] === 7 && arr[2] === 7) {
        result['user_win'] = money;
        result['slot_money'] = money;
    } else if (arr[0] === arr[1] && arr[1] === arr[2]) {
        result['user_win'] = sum * 5;
        result['slot_money'] = money < sum * 5 ? money : sum * 5;
    } else if (arr[0] === arr[1] || arr[0] === arr[2] || arr[1] === arr[2]) {
        result['user_win'] = sum * 2;
        result['slot_money'] = money < sum * 2 ? money : sum * 2;
    }
    return result;
}

//
function showUserWin(winSum) {
    alert('You win ' + winSum + '$ !');
}

// set number to game block
function setNumber(slotIndex, numberIndex, value) {
    var $gameArea = $('div.slot-play-area')[slotIndex];
    $gameArea.children[numberIndex].textContent = value;
}

// return random value from 'min' to 'max'
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// find the first 'null'-value in slotMachinesArr
function getFreeIndex() {
    for (var i = 0; i < slotMachinesArr.length; i++) {
        if (slotMachinesArr[i] == null) {
            return i;
        }
    }
    alert('Max number of slot machines = 10');
    return '';
}

// return slot that has the most money
function getRichesSlotMachine() {
    var firstElIndex = true;
    for (var i = 0; i < slotMachinesArr.length; i++) {
        if (slotMachinesArr[i] == null) {
            continue;
        }
        if (firstElIndex) {
            var richesSlot = slotMachinesArr[i];
            firstElIndex = false;
        }
        if (slotMachinesArr[i].getMoney() > richesSlot.getMoney()) {
            richesSlot = slotMachinesArr[i];
        }
    }
    return richesSlot;
}

// find SlotMachine by index and show
function createSlotElement(slot) {
    var freeIndex = getFreeIndex();
    if (typeof freeIndex === 'string') {
        return;
    }
    slotMachinesArr[freeIndex] = slot;
    showSlotMachine(slot, 1);
}

// change visibility on '.work-area' and '.unwork-area'
function showSlotMachine(slot, status) {
    var tdArr = $('#slot-table td');
    var slotIndex = slotMachinesArr.indexOf(slot);
    var $slotMachine = tdArr[slotIndex];
    $($slotMachine.children[status]).hide()
    updateSlotMachineMoney(slotIndex);
    $($slotMachine.children[status === 1 ? 0 : 1]).show();
}

// change money value in html el.
function updateSlotMachineMoney(index) {
    var $moneyEl = $('p.slot-money')[index];
    $moneyEl.textContent = slotMachinesArr[index].getMoney() + '$';
}

function showCasinoInfo() {
    updateCasinoInfo();
    $('.casino-info').show(); // show block (at the first time)
}

function updateCasinoInfo() {
    $('.money-in-casino span').text(casino.getMoney());
    $('.machines-in-casino span').text(casino.getMachinesNumber());
}

// event to 'create-casino-btn'
document.getElementById('create-casino-btn').onclick = function(e) {
    var isValid = true;
    var casinoMoney = 0;
    var slotNumber = 0;
    $('.manager-top input').each(function(index, item) {
        if (!item.checkValidity()) {
            isValid = false;
        }
        if (item.name == 'CasinoMoney') {
            casinoMoney = parseInt(item.value);
        } else if (item.name == 'MachineNumber') {
            slotNumber = parseInt(item.value);
        }
    });
    if (!isValid) {
        return;
    }
    e.preventDefault(); // stop default event
    $(e.target.form).hide();
    casino = new Casino(slotNumber, casinoMoney); // our Casino
    showCasinoInfo();
};

// add new slot event
document.getElementById('add-machine-btn').onclick = function() {
    casino.addSlotMachine();
}

// delete slot
document.getElementById('delete-machine-btn').onclick = function() {
    var index = $('.delete-slot-container input').val();
    if (slotMachinesArr[index - 1] == undefined || slotMachinesArr[index - 1] == null || index == 0) {
        alert('Slot machine with index: ' + index + ' not found!');
        return;
    }
    casino.deleteSlotMachine(parseInt(index));
}

// take the money from casino
document.getElementById('withdraw-money-btn').onclick = function() {
    var sum = parseInt($('.withdraw-money-container input').val());
    var casinoMoney = casino.getMoney();
    if (sum <= 0 || sum > casinoMoney) {
        alert('Sum must be more than 0 and less then total casino money!');
        return;
    }
    casino.withdraMoney(parseInt(sum));
}

// take the money from slot (for all buttons)
$('.withdraw-money-btn').on('click', function() {
    var userData = getUserData(this);
    if (!userData) {
        return;
    }
    var slotMachine = userData['slot'];
    var sum = userData['sum'];
    if (slotMachine.getMoney() < sum || sum <= 0) {
        alert('Sum must be less than amount money in slot and more than 0!');
        return;
    }
    slotMachine.takeMoney(sum);
    casino.casinoMoney -= sum;
    updateSlotMachineMoney(slotMachinesArr.indexOf(slotMachine));
    updateCasinoInfo();
});

// put some money to slot
$('.put-money-btn').on('click', function() {
    var userData = getUserData(this);
    if (!userData) {
        return;
    }
    if (userData['sum'] <= 0) {
        alert('Sum must be more than 0!');
        return;
    }
    var slotMachine = userData['slot'];
    slotMachine.putMoney(userData['sum']);
    casino.casinoMoney += userData['sum'];
    updateSlotMachineMoney(slotMachinesArr.indexOf(slotMachine));
    updateCasinoInfo();
});

// go to play :)
$('.play-btn').on('click', function() {
    var userData = getUserData(this);
    if (!userData || userData['sum'] <= 0) {
        return;
    }
    var slotMachine = userData['slot'];
    var sum = userData['sum'];
    slotMachine.putMoney(sum);
    updateSlotMachineMoney(slotMachinesArr.indexOf(slotMachine));
    casino.casinoMoney += sum;
    updateCasinoInfo();
    slotMachine.playGame(sum);
})

// return {
//  1. some money (user puts to slot)
//  2. current slot
// }
function getUserData(el) {
    var userValue = prompt('Enter amount of money:');
    if (!userValue) {
        return;
    }
    var pattern = '0123456789';
    var isValid = true;
    for (var i = 0; i < userValue.length; i++) {
        if (pattern.indexOf(userValue[i]) === -1) {
            alert('Only number!');
            isValid = false;
            break;
        }
    }
    if (!isValid) {
        return;
    }
    var index = parseInt($(el).parent().attr('data-index'))
    var slotMachine = slotMachinesArr[index - 1];
    var slotMoney = slotMachine.getMoney();
    return {
        'sum': parseInt(userValue),
        'slot': slotMachine
    }
}

putDefaultValueToArray(); // => [null, null,...]
