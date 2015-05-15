function parseCourseraTimestamp(timestamp) {
    //var d = Date.parse(ev['time']);
    var time = timestamp.match(/\/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/);
    if (time) {
        return new Date(Date.UTC(time[1], time[2]-1, time[3], time[4], time[5], time[6]));
    }
    return new Date();
}

function formatDateToTimestamp(date) {
  var month = '0' + (date.getUTCMonth() + 1);
  var day = '0' + date.getUTCDate();
  var d = date.getUTCFullYear() + month.substr(month.length - 2) + day.substr(day.length - 2);
  var hours = '0' + date.getUTCHours();
  var minutes = '0' + date.getUTCMinutes();
  var seconds = '0' + date.getUTCSeconds();
  var t = hours.substr(hours.length - 2) + minutes.substr(minutes.length - 2) + seconds.substr(seconds.length - 2);
  return d + 'T' + t + 'Z';
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
  element.style.whiteSpace = 'nowrap';
  element.childNodes[0].appendData(' ');
  element.appendChild(createAddLink(duedate, title, url));
});

var assignments = [].slice.apply(document.getElementsByClassName('hg-asst-list-item'));
assignments = assignments.map(function(element) {
  var title = element.getElementsByClassName('hg-asst-title')[0].childNodes[0].data.trim();
  var actions = [].slice.apply(element.getElementsByClassName('hg-asst-line'));
  actions = actions.map(function(action) {
    var verb = action.getElementsByClassName('hg-asst-interval-label')[0].childNodes[0].data;
    var closing = [].slice.apply(action.getElementsByClassName('hg-asst-interval-close'));
    closing = closing.map(function(el) {
      var date = el.getElementsByClassName('hg-date')[0];
      if (date) {
        var timestamp = date.getAttribute('data-livetimer-date-primitive');
        if (timestamp) {
          var d = new Date(timestamp * 1);
          span = document.createElement('span');
          date.appendChild(span);
          var duedate = formatDateToTimestamp(d);
          d.setUTCMinutes(d.getUTCMinutes() - 30);
          duedate = formatDateToTimestamp(d) + '/' + duedate;
          span.appendChild(createAddLink(duedate, title + ' - ' + verb, document.URL));
        }
      }
    });
  });
});
