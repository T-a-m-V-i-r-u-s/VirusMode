function applyWingdingsMode(){
    //get all font elements
    var fontElements = document.getElementsByTagName("font");
    //loop through all font elements
    for(var i = 0; i < fontElements.length; i++){
        //get the current font element
        var fontElement = fontElements[i];
        //get the font face
        var fontFace = fontElement.getAttribute("face");
        //if the font face is wingdings
        if(fontFace != "Wingdings"){
            //get the text content
            var textContent = fontElement.textContent;
            //replace the text content with the unicode character
            fontElement.textContent = String.fromCharCode(textContent);
            //change font face to wingdings
            fontElement.setAttribute("face", "Wingdings");
        }
        //change font to wingdings
        fontElement.style.fontFamily = "Wingdings";
    }
}

//if wingdings mode is enabled, apply wingdings mode
chrome.storage.local.get("wingdingsMode", ({ wingdingsMode }) => {
    if(wingdingsMode){
        applyWingdingsMode();
    }
});