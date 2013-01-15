//var regex1 = /due/;
//var regex2 = /Due/;
//var regex3 = /Deadlines/;

//if (regex1.test(document.body.innerText) || regex2.test(document.body.innerText) || regex3.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({}, function(response) {});
//} else {
  // No match was found.
//}
