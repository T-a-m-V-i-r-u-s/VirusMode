function applyRickRoll() {
    // Get all the links change them to rick roll
    $("a").each(function () {
        $(this).attr("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    });

    // Get any elements with onclick and change them to rick roll
    $("[onclick]").each(function () {
        $(this).attr("onclick", "window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'");
    });

    // Remove all jsaction events
    $("[jsaction]").each(function () {
        if ($(this).attr("jsaction") != undefined) {
            $(this).removeAttr("jsaction");
        }
    });

    // Get all the images in the and change the url to gif of RickRoll if does not contain class of rickroll
    $("img").each(function () {
        if (!$(this).hasClass("aDuck")) {
            $(this).attr("src", "https://c.tenor.com/_4YgA77ExHEAAAAd/rick-roll.gif");
        }
    });
}

// if the rick roll variable is true, run the rick roll function on page load and on page scroll
chrome.storage.local.get("rickRoll", ({ rickRoll }) => {
    if (!rickRoll) {
        return;
    }

    // Run the function on page load
    $(document).ready(function () {
        applyRickRoll();
    });

    //run fuction on page scroll
    $(window).scroll(function () {
        applyRickRoll();
    });
});

