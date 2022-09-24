function applyNaughtyFilter() {
    // get level of blur from storage
    chrome.storage.local.get("tammyVisionLevel", ({ tammyVisionLevel: tammyVisionLevel }) => {
        $("body").css("filter", "blur(" + tammyVisionLevel + "px)");
    });
}

applyNaughtyFilter();