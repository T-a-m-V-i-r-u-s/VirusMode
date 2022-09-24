function applyNaughtyFilter() {
    // get level of blur from storage
    chrome.storage.local.get("naughtyFilterLevel", ({ naughtyFilterLevel: naughtyFilterLevel }) => {
        $("img").css("filter", "blur(" + naughtyFilterLevel + "px)");
    });
}

applyNaughtyFilter();