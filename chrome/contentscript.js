function parseCourseraTimestamp(timestamp) {
    //var d = Date.parse(ev['time']);
    var time = timestamp.match(/\/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/);
    if (time) {
        return new Date(Date.UTC(time[1], time[2]-1, time[3], time[4], time[5], time[6]));
    }
    return new Date();
}

function createGoogleCalendarLink(timestamp, title, url) {
    return 'http://www.google.com/calendar/event?action=TEMPLATE' + '&text=' + encodeURIComponent(title) + '&dates=' + encodeURIComponent(timestamp) + '&details=' + encodeURI(url);
}

function createAddLink(timestamp, title, url) {
    var a = document.createElement('a');
    a.href = createGoogleCalendarLink(timestamp, title, url);
    a.target='_blank';
    var img = document.createElement('img');
    var icon = chrome.extension.getURL('icon-20.png');
    img.src = icon;
    img.alt = '';
    a.appendChild(img);
    return a;
}

var deadlines = [].slice.apply(document.getElementsByTagName('time'));
deadlines = deadlines.map(function(element) {
  var title = element.getAttribute('data-event-title');
  var url = element.getAttribute('data-event-location');
  var duedate = element.getAttribute('data-event-times');
  element.parentNode.style.whiteSpace = 'nowrap';
  element.parentNode.appendChild(createAddLink(duedate, title, url));
});
