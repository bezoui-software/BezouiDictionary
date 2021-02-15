window.addEventListener('mouseup', mouseUpped);
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request, sender, sendResponse) {

}

function sendMessage(msg) {
  chrome.runtime.sendMessage(msg);
}

function mouseUpped() {
  updateSelectedWord();
}

function updateSelectedWord() {   
  const selectedText = window.getSelection().toString();
  const msg = {
               'type': 'word-selected', 
               'txt': selectedText
              }
  sendMessage(msg);
}
