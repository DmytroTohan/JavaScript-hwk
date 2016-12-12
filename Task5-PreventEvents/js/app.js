var leftBlockClick = function (e) {
	var $el = e.target;
	alert('Click!');
}

leftbox1.onclick = leftBlockClick;
leftbox2.onclick = leftBlockClick;
leftbox3.onclick = leftBlockClick;

var rightBlockClick = function (e) {
	var $el = e.target;
  e.stopPropagation();
	alert('Click!');
}

rightbox1.onclick = rightBlockClick;
rightbox2.onclick = rightBlockClick;
rightbox3.onclick = rightBlockClick;

var linkClick = function(e) {
    e.preventDefault();
}

link1.onclick = linkClick;
