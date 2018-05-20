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

chrome.runtime.onConnect.addListener( function(port) {
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

 //ABOVE IS GETTING ADDRESS
 //BELOW IS GETTING GOOGLE MAPS API INFO

//  const workObj =  googleMaps(address);
//  alert("post return");
// alert(JSON.stringify(workObj));


const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';

var work_address = "350 W Broadway, New York, NY 10013"

var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+address+"&destination="+work_address+"&key=AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA";

var xhr2 = new XMLHttpRequest();

var duration; var dist;

xhr2.open("GET", url, false);
xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr2.onreadystatechange = function receiveResponse() {
 if (this.readyState == 4) {
     if (this.status == 200) {
         console.log(this.response);
         var res = JSON.parse(this.response);
         dist = res.routes[0].legs[0].distance.text;
         duration = res.routes[0].legs[0].duration.text;
     } else if (!isValid(this.response) && this.status == 0) {
         alert("The computer appears to be offline.");
     }
 }
};
xhr2.send();

//BELOW IS GETTING SCHOOL ADDRESS

var school_address = "116th St & Broadway, New York, NY 10027"

var url2 = "https://maps.googleapis.com/maps/api/directions/json?origin="+address+"&destination="+school_address+"&key=AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA";

var xhr3 = new XMLHttpRequest();

var duration2; var dist2;

xhr3.open("GET", url2, false);
xhr3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr3.onreadystatechange = function receiveResponse() {
 if (this.readyState == 4) {
     if (this.status == 200) {
         console.log(this.response);
         var res2 = JSON.parse(this.response);
         dist2 = res2.routes[0].legs[0].distance.text;
         duration2 = res2.routes[0].legs[0].duration.text;
     } else if (!isValid(this.response) && this.status == 0) {
         alert("The computer appears to be offline.");
     }
 }
};
xhr3.send();



//ABOVE IS GOOGLE MAPS API

 var obj = {"address": address, "work_distance": dist, "work_duration": duration, "school_distance": dist2, "school_duration": duration2};
 var myJSON = JSON.stringify(obj);

    xhr.send(myJSON);

  var something = msg.joke+"something something";

  alert("Saved! " + address);

    port.postMessage({greeting: something});
  });
});

// function googleMaps(address){
//
//   const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
//   const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';
//
//   var work_address = "126 College Ave, New Brunswick, NJ 08901"
//
//   var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+address+"&destination="+work_address+"&key=AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA";
//
//   var xhr = new XMLHttpRequest();
//
//   xhr.open("GET", url, false);
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function receiveResponse() {
//    if (this.readyState == 4) {
//        if (this.status == 200) {
//
//            console.log(this.response);
//            var res = JSON.parse(this.response);
//            var dist = res.routes[0].legs[0].distance.text;
//            var duration = res.routes[0].legs[0].duration.text;
//
//            const travelObj = {
//              time: duration,
//              distance: dist
//            }
//            alert(JSON.stringify(travelObj));
//            return travelObj;
//        } else if (!isValid(this.response) && this.status == 0) {
//            alert("The computer appears to be offline.");
//        }
//    }
// };
//        xhr.send();
//
// }
