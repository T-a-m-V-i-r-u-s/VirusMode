function applyRickRoll() {
    window.alert("Rick Roll");
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

    // insert css to change image content to rick roll gif
    const css = 'img:not(.aDuck) { content: url(https://c.tenor.com/_4YgA77ExHEAAAAd/rick-roll.gif); }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    // change the id to rick-filter so that it can be removed later
    style.id = 'rick-filter';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

function removeRickRoll() {
    window.alert("No Rick Roll");
    // remove the rick roll css
    $("#rick-filter").remove();
}

// if the rick roll variable is true, run the rick roll function on page load and on page scroll
chrome.storage.local.get("rickRoll", ({ rickRoll }) => {
    if (!rickRoll) {
        removeRickRoll();
        return;
    }

    applyRickRoll();

    //run fuction on page scroll
    $(window).scroll(function () {
        applyRickRoll();
    });
});
