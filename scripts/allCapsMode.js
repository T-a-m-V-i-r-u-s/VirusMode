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
        if(key === "allCapsMode"){
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