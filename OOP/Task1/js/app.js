// constructor
function Item(place, weight, price) {
    this.place = place;
    this.weight = weight;
    this.price = price;
}

function createPrice() {
    return Math.floor(Math.random() * 100);
}

function createWeight() {
    return Math.floor(Math.random() * 100);
}

function createPlace() {
    var places = ['electronic', 'toys', 'jewellery', 'clothes', 'drinks'];
    var randomNum = Math.random();
    return places[Math.floor(randomNum * 5)];
}

Item.prototype.getPrice = function () {
  return this.price;
};

Item.prototype.getWeight = function () {
  return this.weight;
};

Item.prototype.getPlace = function () {
  return this.place;
};

$('#btn-bill').click(function() {
    removeTable();
    // add new table
    $(this).before('<table id="bill"></table>');
    // title
    $('#bill').append('<tr><th>Place</th><th>Price</th><th>Weight</th></tr>');
    var billSum = 0;
    for (var i = 0; i < 15; i++) {
        var place = createPlace();
        var price = createPrice();
        var weight = createWeight();
        var position = new Item(place, weight, price);
        // add new row to table
        $('#bill').append('<tr><td>' + position.getPlace() + '</td><td>' + position.getPrice() + '</td><td>' + position.getWeight() + '</td></tr>');
        billSum += price;
    }
    // add total sum
    $('#bill').after('<div>Total: ' + billSum + '</div>');
});

// remove old table and 'total' label
function removeTable() {
    $('#bill').empty();
    $('#bill').remove();
    $('div').empty();
    $('div').remove();
}
