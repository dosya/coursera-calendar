var deadlines = [].slice.apply(document.getElementsByTagName('time'));
deadlines = deadlines.map(function(element) {
  var title = element.getAttribute('data-event-title');
  var url = element.getAttribute('data-event-location');
  var duedate = element.getAttribute('data-event-times');
  return {'title':title, 'url':url, 'time':duedate};
});

chrome.extension.sendRequest(deadlines);
