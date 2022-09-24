// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  // Set mode variables to false
  chrome.storage.sync.set({ rickRoll: false });
  chrome.storage.local.set({ partyMode: false });
  chrome.storage.sync.set({ duckModeEnabled: false });
});

