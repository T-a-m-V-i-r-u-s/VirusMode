// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}


/* TOGGLE SETTINGS */
// Get toggle elements
let rickMode = document.getElementById("rickRoll");

// Update the toggle elements when the page loads
chrome.storage.sync.get("rickRoll", ({ rickRoll }) => {
  rickMode.checked = rickRoll;
});

// Function to toggle the rick roll variable
function toggleRickRoll() {
  chrome.storage.sync.get("rickRoll", ({ rickRoll }) => {
    chrome.storage.sync.set({ rickRoll: !rickRoll });
    console.log('Rick roll set to %c' + !rickRoll, `rickRoll: ${rickRoll}`);
  });
}

// When the button is clicked, toggle the rick roll variable
rickMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleRickRoll,
  });
});
