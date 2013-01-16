var allTimes = [];

function parseCourseraTimestamp(timestamp) {
    //var d = Date.parse(ev['time']);
    var time = timestamp.match(/\/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/);
    if (time) {
        return new Date(Date.UTC(time[1], time[2]-1, time[3], time[4], time[5], time[6]));
    }
    return new Date();
}

function createGoogleCalendarLink(timestamp, title, url) {

    /*
    <a href="http://www.google.com/calendar/event?action=TEMPLATE&Parameter1;&Parameter2;&Parameter3;">
        <img src="//www.google.com/calendar/images/ext/gc_button2.gif" alt="">
    </a>
    
    The following table lists the basic CGI parameters that define an event:
    Parameter Name   Value   Example
    action(required)         This value is always TEMPLATE (all capitalized).       action=TEMPLATE
    text(required)   Event title.   text=Brunch at Java Cafe
    dates(required)  Date and time of the event, in UTC format. Append a capitalized letter “Z” to the end of times. Google Calendar will interpret the date and time for the user’s time zone.     dates=20060415/20060415 for all day, April 15th 2006
    dates=20060415T180000Z/20060415T190000Z for April 15th 2006 11:00am - noon Pacific Time
    sprop(required)  Information to identify your organization, like your website address. Multiple sprop parameters are allowed. This information should be specified as type:value. The colon character should only be used to separate type and value.   sprop=website:www.javacafebrunches.com
    for website = www.javacafebrunches.com
    sprop=website:www.javacafebrunches.com&sprop;=name:Java Cafe for website = www.javacafebrunches.com and name = Java Cafe
    add      Email address of the guest to invite. Multiple addparameters are allowed.      add=username1@domain.comfor one guest
    add=username1@domain.com&add;=username2@domain.com for two guests
    details  Description of the event. Simple HTML is allowed.      details=Try our Saturday brunch special:<br><br>French toast with fresh fruit<br><br>Yum!
    location         Where the event will take place. Locations that work as Google Maps queries are recommended.   location=Java Cafe, San Francisco, CA
    trp      Specifies whether the user’s Google Calendar shows as “busy” during this event. The default value is false.    trp=true
    
    <a href="http://www.google.com/calendar/event?action=TEMPLATE&text;=Brunch at Java Cafe&dates;=20060415T180000Z/20060415T190000Z&location;=Java Cafe, San Francisco, CA
                &details;=Try our Saturday brunch special:<br><br>French toast with fresh fruit<br><br>Yum!&trp;=true&sprop;=website:http://www.javacafebrunches.com&sprop;=name:Jave Cafe">
        <img src="//www.google.com/calendar/images/ext/gc_button2.gif"></a>
    */
    return 'http://www.google.com/calendar/event?action=TEMPLATE' + '&text=' + encodeURIComponent(title) + '&dates=' + encodeURIComponent(timestamp) + '&details=' + encodeURI(url);
}

// Display all visible links.
function showTimes() {
  var table = document.getElementById('times');
  while (table.children.length > 1) {
    table.removeChild(table.children[table.children.length - 1])
  }
  for (var i = 0; i < allTimes.length; ++i) {
    var ev = allTimes[i];
    var d = parseCourseraTimestamp(ev['time']);

    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    col0.align = 'right';
    var col1 = document.createElement('td');
    col1.align = 'left';
    var col2 = document.createElement('td');
    col1.align = 'left';

    
    var a0 = document.createElement('a');
    a0.href = createGoogleCalendarLink(ev['time'], ev['title'], ev['url']);
    a0.target='_blank';
    col0.appendChild(a0);
    
    var img = document.createElement('img');
    img.src = 'icon.png';
    img.alt = '';
    a0.appendChild(img);
    
    col1.innerText = d.toLocaleString();
    col2.style.whiteSpace = 'nowrap';

    var a1 = document.createElement('a');
    a1.href = ev['url'];
    a1.innerText = ev['title'];
    
    col2.appendChild(a1);
    
    col2.style.whiteSpace = 'nowrap';
    /*col1.onclick = function() {
      checkbox.checked = !checkbox.checked;
    }*/
    row.appendChild(col0);
    row.appendChild(col1);
    row.appendChild(col2);
    table.appendChild(row);
  }
}

// Add links to allLinks and visibleLinks, sort and show them.  send_links.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.
chrome.extension.onRequest.addListener(function(deadlines) {
  for (var index in deadlines) {
    allTimes.push(deadlines[index]);
  }
  allTimes.sort();
  showTimes();
});

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {
  /*
  document.getElementById('filter').onkeyup = filterLinks;
  document.getElementById('regex').onchange = filterLinks;
  document.getElementById('toggle_all').onchange = toggleAll;
  document.getElementById('download0').onclick = downloadCheckedLinks;
  document.getElementById('download1').onclick = downloadCheckedLinks;
  */

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });
};


// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
*/