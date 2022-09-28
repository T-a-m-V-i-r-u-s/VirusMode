// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.local.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: setPageBackgroundColor,
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.local.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }


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
    rickRoll = !rickRoll;
    chrome.storage.local.set({ rickRoll: rickRoll });
  });
}

// When the button is clicked, toggle the rick roll variable
rickMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleRickRoll,
  });

  // run ./scripts/rick.js on the current tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./scripts/rick.js"],
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
  // window.alert(wingdingsMode);
  wingdingsModeEnabled.checked = wingdingsMode;
});

//function to toggle the wingding variable
function toggleWingdingsMode() {
  chrome.storage.local.get("wingdingsMode", ({ wingdingsMode }) => {
    chrome.storage.local.set({ wingdingsMode: !wingdingsMode });
    console.log('Wingding set to %c' + !wingdingsMode, `wingdingsModeEnabled: ${wingdingsMode}`);
  });
}

//when the button is clicked, toggle the wingding variable
wingdingsModeEnabled.addEventListener("click", async () => {
  chrome.storage.local.get("wingdingsMode", async ({ wingdingsMode }) => {
    wingdingsMode = !wingdingsMode;
    chrome.storage.local.set({ wingdingsMode: wingdingsMode });

    // update the innerHTML of the style element with id naughty-filter
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    function toggleWingdings(wingdingsMode) {
      if (wingdingsMode) {
        document.getElementById("wingdings-mode").innerHTML = '* { font-family: wingdings !important; }';
      } else {
        document.getElementById("wingdings-mode").innerHTML = '';
      }
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleWingdings,
      args: [wingdingsMode],
    });
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
});


/* ----- Duck thief mode ----- */
// get toggle elements
let duckThiefMode = document.getElementById("duckThiefModeEnabled");

// Update the toggle elements when the page loads
chrome.storage.local.get("duckThiefModeEnabled", ({ duckThiefModeEnabled }) => {
  duckThiefMode.checked = duckThiefModeEnabled;
});

// Function to toggle the duck mode variable
function toggleDuckThiefMode() {
  chrome.storage.local.get("duckThiefModeEnabled", ({ duckThiefModeEnabled }) => {
    chrome.storage.local.set({ duckThiefModeEnabled: !duckThiefModeEnabled });
    console.log('Duck thief mode set to %c' + !duckThiefModeEnabled, `duckThiefModeEnabled: ${duckThiefModeEnabled}`);
  });
}
// When the button is clicked, toggle the duck thief mode variable
duckThiefMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleDuckThiefMode,
  });
});


/* ----- ALL CAPS MODE ----- */
//get toggle elements
let allCapsMode = document.getElementById("allCapsModeEnabled");

//Update the toggle elements when the page loads
chrome.storage.local.get("allCapsModeEnabled", ({ allCapsModeEnabled }) => {
  allCapsMode.checked = allCapsModeEnabled;
});

// function to toggle the all caps mode variable
function toggleAllCapsMode() {
  chrome.storage.local.get("allCapsModeEnabled", ({ allCapsModeEnabled }) => {
    chrome.storage.local.set({ allCapsModeEnabled: !allCapsModeEnabled });
    console.log('All Caps Mode set to %c' + !allCapsModeEnabled, `allCapsModeEnabled: ${allCapsModeEnabled}`);
  });
}

//when the button is clicked, toggle the all caps mode variable
allCapsMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleAllCapsMode,
  });
});

/* ----- no caps mode ----- */
//get toggle elements
let noCapsMode = document.getElementById("noCapsModeEnabled");

//Update the toggle elements when the page loads
chrome.storage.local.get("noCapsModeEnabled", ({ noCapsModeEnabled }) => {
  noCapsMode.checked = noCapsModeEnabled;
});

// function to toggle the no caps mode variable
function toggleNoCapsMode() {
  chrome.storage.local.get("noCapsModeEnabled", ({ noCapsModeEnabled }) => {
    chrome.storage.local.set({ noCapsModeEnabled: !noCapsModeEnabled });
    console.log('no caps mode set to %c' + !noCapsModeEnabled, `noCapsModeEnabled: ${noCapsModeEnabled}`);
  });
}

//when the button is clicked, toggle the no caps mode variable
noCapsMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleNoCapsMode,
  });
});

/* ----- dsylecsix mode ----- */
//get toggle elements
let dsylecsixMode = document.getElementById("dsylecsixModeEnabled");

//Update the toggle elements when the page loads
chrome.storage.local.get("dsylecsixModeEnabled", ({ dsylecsixModeEnabled }) => {
  dsylecsixMode.checked = dsylecsixModeEnabled;
});

// function to toggle the no caps mode variable
function toggleDsylecsixMode() {
  chrome.storage.local.get("dsylecsixModeEnabled", ({ dsylecsixModeEnabled }) => {
    chrome.storage.local.set({ dsylecsixModeEnabled: !dsylecsixModeEnabled });
    console.log('no dsylecsix mode set to %c' + !dsylecsixModeEnabled, `dsylecsixModeEnabled: ${dsylecsixModeEnabled}`);
  });
}

//when the button is clicked, toggle the no caps mode variable
dsylecsixMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleDsylecsixMode,
  });
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



