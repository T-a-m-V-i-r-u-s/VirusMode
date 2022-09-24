// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  // Set mode variables to false if not set
  chrome.storage.local.get("rickRoll", ({ rickRoll }) => {
    if (rickRoll === undefined) {
      chrome.storage.local.set({ rickRoll: false });
    }
  });
  chrome.storage.local.get("partyMode", ({ partyMode }) => {
    if (partyMode === undefined) {
      chrome.storage.local.set({ partyMode: false });
    }
  });
  chrome.storage.local.get("duckModeEnabled", ({ duckModeEnabled }) => {
    if (duckModeEnabled === undefined) {
      chrome.storage.local.set({ duckModeEnabled: false });
    }
  });
  chrome.storage.local.get("wingdingsMode", ({ wingdingsMode }) => {
    if (wingdingsMode === undefined) {
      chrome.storage.local.set({ wingdingsMode: false });
    }
  });
  chrome.storage.local.get("allCapsMode", ({ allCapsMode }) => {
    if (allCapsMode === undefined) {
      chrome.storage.local.set({ allCapsMode: false });
    }
  });
  chrome.storage.local.get("tammyVisionLevel", ({ tammyVisionLevel }) => {
    if (tammyVisionLevel === undefined) {
      chrome.storage.local.set({ tammyVisionLevel: 0 });
    }
  });
  chrome.storage.local.get("naughtyFilterLevel", ({ naughtyFilterLevel }) => {
    if (naughtyFilterLevel === undefined) {
      chrome.storage.local.set({ naughtyFilterLevel: 0 });
    }
  });
  
  // chrome.storage.local.set({ rickRoll: false });
  // chrome.storage.local.set({ partyMode: false });
  // chrome.storage.local.set({ duckModeEnabled: false });
  // chrome.storage.local.set({ wingdingsMode: false });
  // chrome.storage.local.set({ allCapsMode: false });
  // chrome.storage.local.set({ tammyVisionLevel: 0 });
  // chrome.storage.local.set({ naughtyFilterLevel: 0 });
});

