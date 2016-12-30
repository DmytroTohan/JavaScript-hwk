
// function updates time value in html elements
function putTimeValueAndShow(timeObj) {
    for (var key in timeObj) {
        $('.timer-content .' + key).text(timeObj[key]);
    }
}

// 2 days 1 hour 7 minutes 35 seconds => 2 | 01 | 07 | 35
function getFullTime(timeValue) {
    if (timeValue < 10) {
        timeValue = '0' + timeValue;
    }
    return timeValue;
}

function getComingTime() {

  // get deadline from html element
  var dateArrStr = $('div').attr('data-countdown-start').split(':'); //['92', '00', '02', '15']
  // if user wants to change deadline,  it is enough to set 'data-countdown-start' value in html document
  var days = parseInt(dateArrStr[0]);
  var hours = parseInt(dateArrStr[1]);
  var minutes = parseInt(dateArrStr[2]);
  var seconds = parseInt(dateArrStr[3]);

  var startTimeObj = {
      'days': days,
      'hours': getFullTime(hours),
      'minutes': getFullTime(minutes),
      'seconds': getFullTime(seconds)
  };

  putTimeValueAndShow(startTimeObj); // show deadline

  var dateNow = new Date().getTime();

  return (days * 86400 + hours * 3600 + minutes * 60 + seconds + 1) * 1000 + dateNow;

}

function init() {

    // set deadline and show
    var comingTime = getComingTime();
    // after that call 'setIntervar', because at the first second 'time-html-elements' will be empty
    setInterval(function() {

        var dateNowInSeconds = new Date().getTime();
        var secondsLeft = (comingTime - dateNowInSeconds) / 1000;

        var days = parseInt(secondsLeft / 86400);
        secondsLeft = secondsLeft % 86400;

        var hours = parseInt(secondsLeft / 3600);
        secondsLeft = secondsLeft % 3600;

        var minutes = parseInt(secondsLeft / 60);
        var seconds = parseInt(secondsLeft % 60);
        var time = {
            'days': days,
            'hours': getFullTime(hours),
            'minutes': getFullTime(minutes),
            'seconds': getFullTime(seconds)
        };
        putTimeValueAndShow(time);

    }, 100);

}

init();
