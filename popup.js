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
let partyModeEnabled = document.getElementById("partyModeEnabled");

//Update the toggle elements when the page loads
chrome.storage.local.get("partyMode", ({ partyMode }) => {
  partyModeEnabled.checked = partyMode;
});

//Function to toggle the party mode variable
function togglePartyMode() {
  chrome.storage.local.get("partyMode", ({ partyMode }) => {
    chrome.storage.local.set({ partyMode: !partyMode });
    console.log('Party mode set to %c' + !partyMode, `partyMode: ${partyMode}`);
  });
}

//When the button is clicked, toggle the party mode variable
partyModeEnabled.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: togglePartyMode,
  });
});


/* ----- Wing Dings ----- */
//get toggle elements
let wingdingsModeEnabled = document.getElementById("wingdingsModeEnabled");

//update the toggle elements when the page loads
chrome.storage.local.get("wingdingsMode", ({ wingdingsMode }) => {
  wingdingsModeEnabled.checked = wingdingsMode;
});

//function to toggle the wingding variable
function toggleWingdingsMode() {
  chrome.storage.local.get("wingdingsMode", ({ wingdingsMode }) => {
    chrome.storage.local.set({ wingdingsMode: !wingdingsMode });
    console.log('Wingding set to %c' + !wingdingsMode, `wingdingsMode: ${wingdingsMode}`);
  });
}

//when the button is clicked, toggle the wingding variable
wingdingsModeEnabled.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleWingdingsMode,
  });

  const css = '* { font-family: wingdings !important; }';
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    css: css,
  });
});


/* ----- Duck mode ----- */
// get toggle elements
let duckMode = document.getElementById("duckModeEnabled");

// Update the toggle elements when the page loads
chrome.storage.local.get("duckModeEnabled", ({ duckModeEnabled }) => {
  duckMode.checked = duckModeEnabled;
});

// Function to toggle the duck mode variable
function toggleDuckMode() {
  chrome.storage.local.get("duckModeEnabled", ({ duckModeEnabled }) => {
    chrome.storage.local.set({ duckModeEnabled: !duckModeEnabled });
    console.log('Duck mode set to %c' + !duckModeEnabled, `duckModeEnabled: ${duckModeEnabled}`);
  });
}
// When the button is clicked, toggle the duck mode variable
duckMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleDuckMode,
  });
  // inject duck mode script into active tab
  //chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  //  chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['scripts/duckMode.js']})
  //})
});

/* ------------- RANGE SLIDER ------------- */
/* ----- Tammy vision ----- */
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

/* ----- Naughty vision ----- */
// Get the slider
let naughtyFilterLevelSlider = document.getElementById("naughtyFilterLevel");

// Get the current slider value
chrome.storage.local.get("naughtyFilterLevel", ({ naughtyFilterLevel }) => {
  naughtyFilterLevelSlider.value = naughtyFilterLevel;
});

// Update the vision level when the slider is changed
naughtyFilterLevelSlider.oninput = async function () {
  chrome.storage.local.set({ naughtyFilterLevel: this.value });
  
  // update the innerHTML of the style element with id naughty-filter
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  function applyNaughtyFilter(filterLevel) {
    $("#naughty-filter").html("img { filter: blur(" + filterLevel + "px); }");
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: applyNaughtyFilter,
    args: [this.value],
  });
}