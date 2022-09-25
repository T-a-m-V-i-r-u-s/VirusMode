// let pHeight = getPageHeight();
// let pWidth = getPageWidth();

// // //slide object across the screen
// // function slideObject(object, x, y, speed) {
// //     let id = setInterval(frame, speed);
// //     function frame() {
// //         if (x == object.style.left && y == object.style.top) {
// //             clearInterval(id);
// //         } else {
// //             if (x > object.style.left) {
// //                 object.style.left++;
// //             } else if (x < object.style.left) {
// //                 object.style.left--;
// //             }
// //             if (y > object.style.top) {
// //                 object.style.top++;
// //             } else if (y < object.style.top) {
// //                 object.style.top--;
// //             }
// //         }
// //     }
// // }

// //create an object with two image frames, that animates between the two frames
// function createAnimatedObject(image1, image2, x, y, speed) {
//     let obj = document.createElement("img");
//     obj.src = image1;
//     obj.style.top = y + 'px';
//     obj.style.left = x + 'px';
//     obj.style.position = "absolute";
//     obj.style.zIndex = "100";
//     obj.style.scale = "0.5";
//     obj.className = "animatedObject";
//     document.body.appendChild(obj);
//     setInterval(function () {
//         if (obj.src == image1) {
//             obj.src = image2;
//         } else {
//             obj.src = image1;
//         }
//     }, speed);
//     return obj;
// }

// //create a duck object that slides across the screen
// function createDuck() {
//     let duck = createAnimatedObject(chrome.runtime.getURL("/images/runner1.png"), chrome.runtime.getURL("/images/runner2.png"), Math.random() * pWidth, Math.random() * pHeight, 200);
//     slideDuck(duck, Math.random() * pWidth, Math.random() * pHeight, 1);
// }

// function applyDuckRunMode() {
//     let duckCount = 5
//     for (var i = 0; i < duckCount; i++) {
//         theDuck = createDuck();
//         moveDuck(theDuck);
//     }
// }


// applyDuckRunMode();


// //slide duck arcross the screen and back
// function slideDuck(duck, x, y, speed) {
//     let id = setInterval(frame, speed);
//     function frame() {
//         if (x == duck.style.left && y == duck.style.top) {
//             clearInterval(id);
//         } else {
//             if (x > duck.style.left) {
//                 duck.style.left++;
//             } else if (x < duck.style.left) {
//                 duck.style.left--;
//             }
//             if (y > duck.style.top) {
//                 duck.style.top++;
//             } else if (y < duck.style.top) {
//                 duck.style.top--;
//             }
//         }
//     }
// }

// //move duck to a random location
// function moveDuck(duck) {
//     slideDuck(duck, Math.random() * pWidth, Math.random() * pHeight, 1);
// }