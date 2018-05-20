// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.zillow.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "address");
  port.onMessage.addListener(function(msg) {
    console.log("MESSAGE JOKE: "+msg.joke);

    var address = msg.joke;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://angelhack-firebase-project.firebaseio.com/apartments/.json", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function receiveResponse() {
     if (this.readyState == 4) {
         if (this.status == 200) {
             alert("We got a response : " + this.response);
         } else if (!isValid(this.response) && this.status == 0) {
             alert("The computer appears to be offline.");
         }
     }
 };
 var randomNumber = Math.floor(Math.random() * 1000)+1;
 //var obj = { "name":"John", "age":30, "city":"New York"};

 var indexOf = address.indexOf("\n");
 if(indexOf != -1){
    address = address.substring(0, indexOf);
 }

 var obj = {"address": address };
 var myJSON = JSON.stringify(obj);

    xhr.send(myJSON);

  var something = msg.joke+"something something";

    port.postMessage({greeting: something});
  });
});
