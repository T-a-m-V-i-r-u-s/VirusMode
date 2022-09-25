function applyWingdingsMode() {
    // get level of blur from storage
    chrome.storage.local.get("wingdingsMode", ({ wingdingsMode: wingdingsMode }) => {
        // insert a css style element into the head of the document
        // that changes the font family of all html elements to wingdings
        let css = '* { font-family: inherit; }';
        if (wingdingsMode) {
            css = '* { font-family: wingdings !important; }';
        }
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        // change the id to wingdings-mode so that it can be removed later
        style.id = 'wingdings-mode';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    });
}

applyWingdingsMode();