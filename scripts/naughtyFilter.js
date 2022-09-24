function applyNaughtyFilter() {
    // get level of blur from storage
    chrome.storage.local.get("naughtyFilterLevel", ({ naughtyFilterLevel: naughtyFilterLevel }) => {
        const css = 'img { filter: blur(' + naughtyFilterLevel + 'px); }';
        // inject css into document
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    });
}

applyNaughtyFilter();