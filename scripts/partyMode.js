function applyPartyMode() {
    // //get all backbround elements
    // let backgroundElements = document.querySelectorAll("[style*='background-color']");
    // //get all text elements
    // let textElements = document.querySelectorAll("[style*='color']");
    // //get all border elements
    // let borderElements = document.querySelectorAll("[style*='border-color']");
    // //get all shadow elements
    // let shadowElements = document.querySelectorAll("[style*='box-shadow']");
    // //get all image elements
    // let imageElements = document.querySelectorAll("img");
    // //get all link elements
    // let linkElements = document.querySelectorAll("a");
    // //get all button elements
    // let buttonElements = document.querySelectorAll("button");
    // //get all input elements
    // let inputElements = document.querySelectorAll("input");
    // //get all textarea elements
    // let textareaElements = document.querySelectorAll("textarea");
    // //get all select elements
    // let selectElements = document.querySelectorAll("select");
    // //get all option elements
    // let optionElements = document.querySelectorAll("option");
    // //get all table elements
    // let tableElements = document.querySelectorAll("table");


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
