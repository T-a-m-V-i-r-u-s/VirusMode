function applyPartyMode() {
    //get all elements
    let allElements = document.querySelectorAll("div");

    //apply random color to all elements
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.backgroundColor = getRandomColor();
        // allElements[i].style.color = getRandomColor();
        // allElements[i].style.borderColor = getRandomColor();
        // allElements[i].style.boxShadow = "0 0 0 1px " + getRandomColor();
    }
}

//generate a random color
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//if party mode is enabled, apply party mode
chrome.storage.local.get("partyMode", ({ partyMode }) => {
    if (partyMode) {
        applyPartyMode();
        //if user left click, play sound
        // document.addEventListener("click", () => {
        //     let audio = new Audio("https://youtu.be/brwS_ZmVaRc");
        //     audio.play();
        // });
        //playSound("https://youtu.be/brwS_ZmVaRc");
        //apply party mode every 0.5 seconds
        //setInterval(applyPartyMode, 500);
    }
});

//play sound from url
function playSound(url) {
    let audio = new Audio(url);
    audio.play();
}


//apply party mode when switch value is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (key in changes) {
        if (key === "partyMode") {
            if (changes[key].newValue) {
                applyPartyMode();
            } else {
                removePartyMode();
            }
        }
    }
});

//remove party mode
function removePartyMode() {
    //get all elements
    let allElements = document.querySelectorAll("div");

    //remove random color from all elements
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.backgroundColor = "";
    }
}
