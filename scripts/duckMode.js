function getPageWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getPageHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

function duck(event=null) {
    this.size = Math.random() * (50 - 10) + 10;

    this.obj = document.createElement("img");
    this.obj.src = chrome.runtime.getURL("/images/duck.png");
    this.obj.style.top = (getPageHeight() * Math.random()) - this.size + 'px';
    this.obj.style.left = (getPageWidth() * Math.random()) - this.size + 'px';
    if (event != null){
        var newX = event.clientX + document.documentElement.scrollLeft; // copies mouse x position with scrollbar 
        var newY = event.clientY + document.documentElement.scrollTop; // copies mouse y position with scrollbar
        this.obj.style.top = (newY - (this.size / 2)) + "px";
        this.obj.style.left = (newX - (this.size / 2)) + "px";
    }
    this.obj.style.height = this.size + 'px';
    this.obj.style.position = "absolute";
    this.obj.style.width = this.size + 'px';
    this.obj.style.cursor = "move";
    this.obj.style.zIndex = "100";
    this.obj.className = "aDuck";

    document.body.appendChild(this.obj);
}

function applyDuckMode() {
    let duckCount = (getPageHeight() * getPageWidth()) / 6000;
    for (var i = 0; i < duckCount; i++) {
        new duck();
    }
    
    // generate duck on mouse click
    document.addEventListener("click", mouse_move, false);
}

function removeDuckMode() {
    document.removeEventListener('click', mouse_move);
    const ducks = document.getElementsByClassName("aDuck");
    while(ducks.length > 0){
        ducks[0].parentNode.removeChild(ducks[0]);
    }
}

function mouse_move(event) {
    new duck(event);
    checkDuckActivity();
}

//if duckmode is enabled, apply duck mode
chrome.storage.local.get("duckModeEnabled", ({ duckModeEnabled }) => {
    if(duckModeEnabled){
        applyDuckMode();
        checkDuckActivity();
        // run fuction on page scroll
        $(window).scroll(function () {
            let duckExists = document.getElementsByClassName('aDuck');
            if (duckExists == null){
                applyDuckMode();
            } else {
                //console.log('alr exists');
            }
        });
    }
});

//apply duck mode when switch value is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (key in changes) {
        if(key === "duckModeEnabled"){
            if(changes[key].newValue){
                applyDuckMode();
            } else {
                removeDuckMode();
            }
        }
    }
});


// get all randomly generated ducks
function checkDuckActivity() {
    let ducks = document.getElementsByClassName("aDuck");
    // check if duck is being dragged
    for (var i = 0; i < ducks.length; i++) {
        (function (index) {
            ducks[index].addEventListener("click", function () {
                size = ducks[index].width;
            })

            ducks[index].addEventListener('mousedown', e => {
                e.target.classList.add('moving');
                size = ducks[index].width;
            })

            ducks[index].addEventListener('mouseup', e => {
                e.target.classList.remove('moving');
                size = ducks[index].width;
            })

            addEventListener('mouseup', e => {
                if (ducks.length > 0 ){
                    if (ducks[index].classList.contains('moving')) {
                        ducks[index].style.left = (e.clientX - (size / 2) + document.documentElement.scrollLeft) + 'px';
                        ducks[index].style.top = (e.clientY - (size / 2) + document.documentElement.scrollTop) + 'px';
                    }
                    ducks[index].classList.remove('moving')
                }
            })

            addEventListener('mousemove', e => {
                if (ducks.length > 0 && ducks[index].classList.contains('moving')) {
                    ducks[index].style.left = (e.clientX - (size / 2) + document.documentElement.scrollLeft) + 'px';
                    ducks[index].style.top = (e.clientY - (size / 2) + document.documentElement.scrollTop) + 'px';
                }
            })
        })(i);
    }
}