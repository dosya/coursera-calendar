var allTimes = [];

// Display all visible links.
function showTimes() {
  var table = document.getElementById('times');
  while (table.children.length > 1) {
    table.removeChild(table.children[table.children.length - 1])
  }
  for (var i = 0; i < allTimes.length; ++i) {
    var ev = allTimes[i];
    var row = document.createElement('tr');
    var col0 = document.createElement('td');
    col0.align = 'left';
    var col1 = document.createElement('td');
    col1.align = 'left';
    
    var p = document.createElement('p');
    p.innerText = ev['time'];
    
    var a0 = document.createElement('a');
    a0.href = 'http://www.google.com/calendar/event?action=TEMPLATE&' + 'Parameter1;&Parameter2;&Parameter3;';
    
    var img = document.createElement('img');
    img.src = 'icon.png';
    img.alt = '';
    
    a0.appendChild(img)
    col0.appendChild(p);
    col0.appendChild(a0);
    
    var a1 = document.createElement('a');
    a1.href = ev['url'];
    a1.innerText = ev['title'];
    
    col1.appendChild(a1);
    
    col1.style.whiteSpace = 'nowrap';
    /*col1.onclick = function() {
      checkbox.checked = !checkbox.checked;
    }*/
    row.appendChild(col0);
    row.appendChild(col1);
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