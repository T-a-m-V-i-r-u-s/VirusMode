function applyDsylecsixMode(){
    // apply dsylecsix transformation to all elements
        // get all text on screen
        // swap letters in word

    /* https://stackoverflow.com/questions/23256557/javascript-how-do-i-change-every-word-visible-on-screen */
    for (var i = 0; i < document.childNodes.length; i++) {
        checkNode(document.childNodes[i]);
    }
    function checkNode(node) {
        var nodeName = node.nodeName.toLowerCase();
        if(nodeName === 'script' || nodeName === 'style') {return;}
        if (node.nodeType === 3) {
            // get text in elements
            var text = node.nodeValue;
            // create new data-attribute to text element with original text to revert mode
            //console.log(node);
            //node.dataset.original = text;
            //node.setAttribute('data', "original: text");
            // swap text
            let nth = 0;
            var newText = text.replace(/\b(\w+)/g, function (match, capture) { // for every word in text, replace
                nth++;
                // only affect every odd nth word to look more randomised
                if (nth%2 == 1){
                    // if word is >= 8 letters, swap a random letter in first half and a random letter in second half of word
                    let wordLength = capture.length;
                    if (wordLength >= 8){
                        let middlePos = Math.floor(wordLength/2);
                        let firstHalfPos = Math.round(Math.random() * (middlePos-1 - 1) + 1);
                        let secHalfPos = Math.round(Math.random() * (wordLength-2 - middlePos) + middlePos);
                        return swapStr(swapStr(capture,firstHalfPos,firstHalfPos+1),secHalfPos,secHalfPos+1);
                    }
                    // else if word is between 4-7 words swap letter in random position
                    else if (wordLength >=4){
                        let randomPos = Math.round(Math.random() * (wordLength-2 - 1) + 1);
                        return swapStr(capture, randomPos, randomPos+1);
                    }
                } // else return normal word
                return capture;
            }); 
            node.nodeValue = newText;
        }
        if (node.childNodes.length > 0) {
            for (var j = 0; j < node.childNodes.length; j++) {
                checkNode(node.childNodes[j]);
            }
        }
    }
}

/* https://stackoverflow.com/questions/25345108/why-cant-i-swap-characters-in-a-javascript-string */
function swapStr(str, first, last){
    return str.substr(0, first)
           + str[last]
           + str.substring(first+1, last)
           + str[first]
           + str.substr(last+1);
}

//apply dsylecsix mode when switch value is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (key in changes) {
        if(key === "dsylecsixModeEnabled"){
            if(changes[key].newValue){
                applyDsylecsixMode();
            } else {
                removeDsylecsixMode();
            }
        }
    }
});

//remove all dsylecsix mode
function removeDsylecsixMode(){
    for (var i = 0; i < document.childNodes.length; i++) {
        checkNode(document.childNodes[i]);
    }
    function checkNode(node) {
        var nodeName = node.nodeName.toLowerCase();
        if(nodeName === 'script' || nodeName === 'style') {return;}
        if (node.nodeType === 3) {
            // replace text to original text element
            //node.nodeValue = node.dataset.original;
        }
        if (node.childNodes.length > 0) {
            for (var j = 0; j < node.childNodes.length; j++) {
                checkNode(node.childNodes[j]);
            }
        }
    }
}

//if dsylecsix mode is enabled, apply all dsylecsix mode
chrome.storage.local.get("dsylecsixModeEnabled", ({ dsylecsixModeEnabled }) => {
    if(dsylecsixModeEnabled){
        applyDsylecsixMode();
    }
});

