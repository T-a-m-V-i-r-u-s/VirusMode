let div = document.getElementById("newTab");
selectedClassName = "current";
const presetURL = ["www.w3schools.com", "www.w3schools.com"];

//reacts to a button click by opening a new tab with the selected url
function handleButtonClick(event) {
    // Remove styling from the previously selected color
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }
    
    // Mark the button as selected
    let url = event.target.dataset.url;
    event.target.classList.add(selectedClassName);

    chrome.storage.sync.set({ url });
    chrome.tabs.create({ url: url });
    }


//add a button to open a new tab with the current url
function addCurrentTab() {
    let button = document.createElement("button");
    button.textContent = "Open Current Tab";
    button.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.create({ url: tabs[0].url });
        });
    });
    div.appendChild(button);
}

//add timer to track how long user mouse down
function addTimer() {
    let button = document.createElement("button");
    button.textContent = "Timer";
    button.addEventListener("mousedown", () => {
        let timer = 0;
        let interval = setInterval(() => {
            timer++;
            button.textContent = timer;
        }, 1000);
        button.addEventListener("mouseup", () => {
            clearInterval(interval);
        });
    });
    div.appendChild(button);
}

// Initialize the page by constructing the url options
constructOptions(presetURL);

//add button to create new tab with next url
function constructOptions(buttonURL) {
    chrome.storage.sync.get("url", (data) => {
        let currentURL = data.url;
        // For each color we were provided…
        for (let buttonURL of buttonURL) {
            // …create a button with that color…
            let button = document.createElement("button");
            button.dataset.url = buttonURL;
            button.textContent = buttonURL;

            // …mark the currently selected color…
            if (buttonURL === currentURL) {
                button.classList.add(selectedClassName);
            }

            // …and register a listener for when that button is clicked
            button.addEventListener("click", handleButtonClick);
            div.appendChild(button);
        }
    });
}
