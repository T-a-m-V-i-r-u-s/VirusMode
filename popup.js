// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.local.get("color", ({ color }) => {
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
  chrome.storage.local.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}


/* ------------- TOGGLE SETTINGS ------------- */
/* ----- Rick Roll ----- */
// Get toggle elements
let rickMode = document.getElementById("rickRoll");

// Update the toggle elements when the page loads
chrome.storage.local.get("rickRoll", ({ rickRoll }) => {
  rickMode.checked = rickRoll;
});

// Function to toggle the rick roll variable
function toggleRickRoll() {
  chrome.storage.local.get("rickRoll", ({ rickRoll }) => {
    chrome.storage.local.set({ rickRoll: !rickRoll });
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


/* ----- Party Mode ----- */
//get toggle elements
let partyMode = document.getElementById("partyMode");

//Update the toggle elements when the page loads
chrome.storage.local.get("partyMode", ({ partyMode }) => {
  partyMode.checked = partyMode;
});

//Function to toggle the party mode variable
function togglePartyMode() {
  chrome.storage.local.get("partyMode", ({ partyMode }) => {
    chrome.storage.local.set({ partyMode: !partyMode });
    console.log('Party mode set to %c' + !partyMode, `partyMode: ${partyMode}`);
  });
}

//When the button is clicked, toggle the party mode variable
partyMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: togglePartyMode,
  });
});


/* ------------- RANGE SLIDER ------------- */
// Get the slider
let tammyVisionLevelSlider = document.getElementById("tammyVisionLevel");

// Get the current slider value
chrome.storage.local.get("tammyVisionLevel", ({ tammyVisionLevel }) => {
  tammyVisionLevelSlider.value = tammyVisionLevel;
});

// Update the vision level when the slider is changed
tammyVisionLevelSlider.oninput = async function () {
  chrome.storage.local.set({ tammyVisionLevel: this.value });
  // update the blur level on the body element of the current chrome tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  function applyTammyVision(visionLevel) {
    $("body").css("filter", "blur(" + visionLevel + "px)");
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: applyTammyVision,
    args: [this.value],
  });

}