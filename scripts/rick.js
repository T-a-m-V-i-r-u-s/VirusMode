function applyRickRoll() {
    // Get all the links change them to rick roll
    $("a").each(function () {
        // if this element isnt a script tag
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

    // insert css to change image content to rick roll gif if the filter is not already applied
    if ($("#rick-filter").length != 0) {
        return;
    }
    const css = 'img:not(.quack) { content: url(https://c.tenor.com/_4YgA77ExHEAAAAd/rick-roll.gif); }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    // change the id to rick-filter so that it can be removed later
    style.id = 'rick-filter';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

function removeRickRoll() {
    // remove the rick roll css
    $("#rick-filter").remove();

    // set all hrefs back to their original value
    $("a").each(function () {
        $(this).attr("href", $(this).attr("href").replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "#"));
    });

    // set onclick back to their original value
    $("[onclick]").each(function () {
        $(this).attr("onclick", $(this).attr("onclick").replace("window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'", ""));
    });
}

function applyOrRemoveRickRoll() {
    chrome.storage.local.get("rickRoll", ({ rickRoll }) => {
        if (!rickRoll) {
            removeRickRoll();
            return;
        }

        applyRickRoll();
    });
}

// run function on page scroll
$(window).scroll(function () {
    applyOrRemoveRickRoll();
});

applyOrRemoveRickRoll();