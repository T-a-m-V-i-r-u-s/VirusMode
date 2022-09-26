function duck2() {
    this.obj = document.createElement("img");
    this.obj.src = chrome.runtime.getURL("/images/evilDuck.png");
    this.obj.style.top = '0px';
    this.obj.style.left = '0px';
    this.obj.style.height = '150px';
    this.obj.style.width = '150px';
    this.obj.style.position = "absolute";
    this.obj.style.cursor = "move";
    this.obj.style.zIndex = "1000";
    this.obj.className = "thiefDuck quack";

    document.body.appendChild(this.obj);
    return this.obj
}

function applyDuckThiefMode() {
    // add thief duck
    let thiefDuck = new duck2();
    thiefDuck.setAttribute('id','thief');
    thiefDuck.id = 'thief';

    // put all visible divs in an array and randomize stealing order...
    var numDivs = $('div:visible').length;
    let arrayOfDivs = [];
    for (let i = 0; i < numDivs; i++){
        let divToAdd = $("div:eq("+i+")");
        arrayOfDivs.push(divToAdd)
    }
    let randomizedDivs = shuffle(arrayOfDivs);

    // recursively loop through each div and steal it <3
    var i = 0, j = numDivs;
    (function stealNext () {
        if (i < j) {
            let divToSteal = randomizedDivs[i++];
    
            let locX = divToSteal.offset().left + (divToSteal.width()/2);
            let locY = divToSteal.offset().top - (divToSteal.height()/2);
            
            // animate duck to go to div
            var left = $('#thief').offset().left;  // Get the calculated left position
            var top = $('#thief').offset().top;  // Get the calculated top position
            var a = Math.abs(locX-left);
            var b = Math.abs(locY-top);

            var distance = Math.sqrt( a*a + b*b ) + 50;
            var speed = 0.5;
            $("#thief").css({left:left, top:top})  // Set the left to its calculated position
                        .animate({"left":locX+"px", "top":locY+"px"}, distance/speed, function() {
                            // delete div element after thief duck has arrived
                            divToSteal.effect( "shake" );
                            divToSteal.fadeOut(stealNext);
                        });
        }
    }) ();
}

function removeDuckThiefMode() {
    $('#thief').remove();
}

//if duck thief mode is enabled, apply duck thief mode
chrome.storage.local.get("duckThiefModeEnabled", ({ duckThiefModeEnabled }) => {
    if(duckThiefModeEnabled){
        applyDuckThiefMode();
    } else {
        removeDuckThiefMode();
    }
});

//apply duck thief mode when switch value is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (key in changes) {
        if(key === "duckThiefModeEnabled"){
            if(changes[key].newValue){
                applyDuckThiefMode();
            } else {
                removeDuckThiefMode();
            }
        }
    }
});

/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
