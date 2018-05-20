
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	var addressElement = document.getElementsByClassName('zsg-h5 bdp-sub-header')[0].innerText;
    console.log("beginning: "+addressElement);

   var port = chrome.runtime.connect({name: "address"});
   port.postMessage({joke: addressElement});
   port.onMessage.addListener(function(msg) {
       console.log("connect worked: "+msg.greeting);
   });

    if (request.greeting == "hello")
      sendResponse({farewell: addressElement});
  });
