function applyNaughtyFilter() {
    // get level of blur from storage
    chrome.storage.local.get("naughtyFilterLevel", ({ naughtyFilterLevel: naughtyFilterLevel }) => {
        const css = 'img { filter: blur(' + naughtyFilterLevel + 'px); }';
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        // change the id to naughty-filter so that it can be updated later
        style.id = 'naughty-filter';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    });
}

applyNaughtyFilter();