function applyTammyVision(){
    // get level of blur from storage
    chrome.storage.local.get("tammyVisionLevel", ({ tammyVisionLevel: tammyVisionLevel }) => {
        // if tammy vision is greater than 0, apply blur to body
        // if (tammyVisionLevel > 0) {
            $("body").css("filter", "blur(" + tammyVisionLevel + "px)");
        // }
        // window.alert(tammyVisionLevel);
    });
}

applyTammyVision();