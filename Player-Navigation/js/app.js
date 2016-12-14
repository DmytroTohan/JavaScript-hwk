document.getElementById('player').style.top = '50px';
document.getElementById('player').style.left = '50px';
document.getElementById('fire').style.top = '45px';
document.getElementById('fire').style.left = '45px';
localStorage.setItem('lastMove', 'right');

document.body.onkeydown = function(e) {

    var el = document.getElementById('player');
    var fire = document.getElementById('fire');

    var KEYCODE_LEFT  = 37;
    var KEYCODE_UP    = 38;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_DOWN  = 40;
    var KEYCODE_ENTER = 13;
    var KEYCODE_SPACE = 32;

    if (e.keyCode == KEYCODE_LEFT) {
        el.style.left = (parseInt(el.style.left) - 10) + 'px';
        stopFireAnimation(fire, el);
        localStorage.setItem('lastMove', 'left');
    } else if (e.keyCode == KEYCODE_RIGHT) {
        el.style.left = (parseInt(el.style.left) + 10) + 'px';
        stopFireAnimation(fire, el);
        localStorage.setItem('lastMove', 'right');
    } else if (e.keyCode == KEYCODE_UP) {
        el.style.top = (parseInt(el.style.top) - 10) + 'px';
        stopFireAnimation(fire, el);
        localStorage.setItem('lastMove', 'top');
    } else if (e.keyCode == KEYCODE_DOWN) {
        el.style.top = (parseInt(el.style.top) + 10) + 'px';
        stopFireAnimation(fire, el);
        localStorage.setItem('lastMove', 'bottom');
    } else if (e.keyCode == KEYCODE_ENTER || e.keyCode == KEYCODE_SPACE) {
        createFireEffect(el);
        createFireAnimation(el, fire);
    }
}

function createFireAnimation(player, fire) {

    // Get the latest step hero, to know in which direction to shoot
    var lastMove = localStorage.getItem('lastMove');

    fire.classList.add('move'); //  display: block; transition: 0.5s ease 0s;

    if (lastMove == 'left') {
        fire.style.left = document.documentElement.clientLeft + 'px';
    } else if (lastMove == 'top') {
        fire.style.top = document.documentElement.clientTop + 'px';
    } else if (lastMove == 'right') {
        fire.style.left = document.documentElement.clientWidth - 20 + 'px';
    } else if (lastMove == 'bottom') {
        fire.style.top = document.documentElement.clientHeight - 20 + 'px';
    }

    // transitionend - the event, when a fire transition has completed
    fire.addEventListener('transitionend', function() {
        stopFireAnimation(this, player);
    });
}

// Our fire element always moves with the player
function moveFireElementToParent(parent, fire) {
    fire.style.left = (parseInt(parent.style.left) - 5) + 'px';
    fire.style.top = (parseInt(parent.style.top) - 5) + 'px';
}

function stopFireAnimation(fire, player) {
    fire.classList.remove('move');
    moveFireElementToParent(player, fire);
}

function createFireEffect(el) {
    el.classList.add('grow');
    setTimeout(function() {
      el.classList.remove('grow');
    },100);
}
