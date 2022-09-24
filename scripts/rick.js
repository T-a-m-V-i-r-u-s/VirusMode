function rickRoll() {
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
        $(this).removeAttr("jsaction");
    });

    // Get all the images in the and change the url to gif of RickRoll if does not contain class of rickroll
    $("img").each(function () {
        if ($(this).attr("src").indexOf("https://c.tenor.com/_4YgA77ExHEAAAAd/rick-roll.gif") == -1) {
            $(this).attr("src", "https://c.tenor.com/_4YgA77ExHEAAAAd/rick-roll.gif");
        }
    });
}

// if the rick roll variable is true, run the rick roll function on page load and on page scroll
chrome.storage.sync.get("rickRoll", ({ rickRoll }) => {
    if (rickRoll) {
        // Run the function on page load
        $(document).ready(function () {
            rickRoll();
        });

        //run fuction on page scroll
        $(window).scroll(function () {
            rickRoll();
        });
    }
});

