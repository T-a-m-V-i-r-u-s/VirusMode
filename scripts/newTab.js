let div = document.getElementById("newTab");
//let selectedClassName = "current";
const presetURL = ["www.google.com", "www.w3schools.com"];

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

// Initialize the page by constructing the url options
constructOptions(presetURL);
