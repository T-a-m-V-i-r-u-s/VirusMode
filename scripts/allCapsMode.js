function applyAllCapsMode(){
    //get all elements
    let allElements = document.querySelectorAll("*");
    //apply toUpperCase to all elements
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.textTransform = "uppercase";
    }

}

//apply all caps mode when switch value is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (key in changes) {
        if(key === "allCapsModeEnabled"){
            if(changes[key].newValue){
                applyAllCapsMode();
            } else {
                removeAllCapsMode();
            }
        }
    }
});

//remove all caps mode
function removeAllCapsMode(){
    //for all html tags, change font family to wingdings
    let allElements = document.querySelectorAll("*");
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.textTransform = "";
    }
}

//if all caps mode is enabled, apply all caps mode
chrome.storage.local.get("allCapsModeEnabled", ({ allCapsModeEnabled }) => {
    if(allCapsModeEnabled){
        applyAllCapsMode();
    }
});

//applyAllCapsMode();