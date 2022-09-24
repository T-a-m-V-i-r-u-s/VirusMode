function applyTammyVision(){
    // get level of blur from storage
    chrome.storage.local.get("tammyVision", ({ tammyVission }) => {
        // if tammy vision is greater than 0, apply blur to body
        // if (tammyVision > 0) {
        //     $("body").css("filter", "blur(" + tammyVision + "px)");
        // }
        $("body").css("filter", "blur(" + 0 + "px)");
    });
}

applyTammyVision();