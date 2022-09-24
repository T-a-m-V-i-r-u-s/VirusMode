// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  // Set the rick roll variable to false
  chrome.storage.sync.set({ rickRoll: false });
  //console.log('Default rick roll set to %cfalse', `rickRoll: ${rickRoll}`);
});

