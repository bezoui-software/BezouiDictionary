
(function() {
  const settings = {'dark-mode': {name: 'Dark mode:'}};

  function setupSettings() {
    const settingsContainer = document.createElement('div');
    settingsContainer.id = `settings`;
    document.body.appendChild(settingsContainer);

    for (let settingKey of Object.keys(settings)) {
      getItem(settingKey, function(savedSetting) {
        savedSetting = savedSetting[settingKey];

        settings[settingKey].elt = document.createElement('div');
        settings[settingKey].elt.id = `${settingKey}-container`;
        settings[settingKey].elt.classList.add('setting');
        settingsContainer.appendChild(settings[settingKey].elt);

        const label = document.createElement('label');
        label.innerHTML = settings[settingKey].name;
        label.classList.add('setting-name');
        settings[settingKey].elt.appendChild(label);

        const toogle = createSwitch(savedSetting);
        toogle.firstChild.onchange = saveChanges;
        settings[settingKey].elt.appendChild(toogle);
      })
    }
  }

  function saveChanges() {
    for (let settingKey of Object.keys(settings)) {
      const setting = settings[settingKey];  
      const settingState = setting.elt.lastChild.firstChild.checked;     
 
      function changedSaved(data) {
        console.log('SAVED !');
      }

      const item = {};
      item[settingKey] = settingState;
      setItem(item, changedSaved);
    }
  }

  function setItem(data, callback) {
    chrome.storage.sync.set(data, callback);
  }

  function getItem(key, callback) {
    chrome.storage.sync.get(key, callback);
  }

  window.onload = function () {
    setupSettings();
  }
}())
