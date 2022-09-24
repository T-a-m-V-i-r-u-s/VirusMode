function applyWingdingsMode(){  
    //for all html tags, change font family to wingdings
    var htmlElements = document.getElementsByTagName("*");
    for (var i = 0; i < htmlElements.length; i++) {
        htmlElements[i].style.fontFamily = "wingdings";
    }
}

//if wingdings mode is enabled, apply wingdings mode
chrome.storage.local.get("wingdingsMode", ({ wingdingsMode }) => {
    if(wingdingsMode){
        applyWingdingsMode();
    }
});

//apply wingdings mode when page is loaded
//applyWingdingsMode();