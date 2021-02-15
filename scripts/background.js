chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(msg, sender, sendResponse) {
  if (msg.type == 'word-selected') {
    updateSelectedWord(msg.txt);
  }
}

async function updateSelectedWord(word) {
  window.selectedWord = evaluateSelectedWord(word);
  window.selectedWordDefinitions = [];

  if (window.selectedWord && window.selectedWord.length > 3) {
    window.selectedWordDefinitions = await getDefinitionOf(window.selectedWord);
  } 
}

async function getDefinitionOf(word) {
  const API_KEY = "312d215b-06b3-4c16-9757-b5e727b600be";
  const URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${window.selectedWord}?key=${API_KEY}`;

  const definition = await fetch(URL).then(gotResult).catch(gotError)

  async function gotResult(res) {
    let data = await res.json();
    return data;
  } 

  function gotError(err) {
    throw Error(err);
  }

  return definition;
}

function evaluateSelectedWord(word) {
  if (word) {
    word = word.replaceAll(' ', '');
    word = word.toLowerCase();
    return word;
  }
}