'use strict'

import * as lib from '../model/picture-library-browser.js';                 // NEEDED ??
let picsFromPlanetsAlbum = document.getElementById("pics-from-planets-album-div");
let headerImagePlanetsAlbum = document.getElementById("planets-header-image");
let slideShowHubbleContent = document.getElementById("slideshow-modal-content");
let slideShowHubbleModal = document.getElementById("slideshow-modal-id");
let slideShow = document.getElementById("slideshow");
/* ----------------------------------- SLIDESHOW ---------------------------------------- */
let startPoint = 1;
let images = [];
let time = 2000;

// This array represents all images in the album and which ones the user wants to display in a slideshow based on if they are set to true or false... 
// (false == unclicked, false by default)
let imgPicked = {};
imgPicked[0] = false;
imgPicked[1] = false;
imgPicked[2] = false;

let myInterval; // Declared the interval variable here so it is accessable

window.onload = function () {
    console.log("picsFromPlanetsAlbum: " + picsFromPlanetsAlbum);

    fetch("../app-data/library/picture-library.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.albums[3].pictures.length);
            console.log("data: " + data);
            for (let i = 0; i < data.albums[3].pictures.length; i++) {
                picsFromPlanetsAlbum.innerHTML += (`<img src="` + data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes + `" id='imgId` + i + `' class='jsGeneratedAlbumImages'` + '>');
            }

            headerImagePlanetsAlbum.innerHTML += (`<img src="../app-data/library/pictures/album-header/hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~small.jpg">`);

            // This function gets all images that user has clicked (based on if images{} indexes are true or false) and then shows them with a two second interval
            function playSlideShow() {

                if (imgPicked[0] == false && imgPicked[1] == false && imgPicked[2] == false) {
                    console.log("Välj MINST en bild, dumbass...")

                } else {
                    document.querySelector('#slideshow-galaxies-show').disabled = true;

                    console.log("Du klickade på spela slideshow! :)")


                    // ************************************** Place users highlighted images in the 'images' array for slideShow! *****************************************

                    let j = 0;  // Separate indexes exist so that placement of image URL's in the 'images' array don't skip over any indexes just because
                    // the index of the 'imgPicked' array is skipped. BASICALLY = If we increment 'i' and skip an index, don't skip over a placement index in 'images
                    for (let i = 0; i < data.albums[3].pictures.length; i++) {
                        if (imgPicked[i] == true) {
                            images[j] = data.albums[3].path + `/` + data.albums[3].pictures[i].imgHiRes; // All highlighted images are stored in the 'images' array
                            console.log("Här är images index " + i + ": " + images[i]);
                            j++; // 'j' is ONLY incremented if an image URL was placed in the 'images' array. This way no empty indexes will be allowed inside it
                        };
                    }
                    
                    // ************************************** Place users highlighted images in the 'images' array for slideShow! *****************************************

                    slideShow.style.visibility = "visible"; // Shows "slideShow" when we need it, hide it when slideShow is not shown or is cancelled
                    slideShowHubbleModal.style.display = "block";
                    slideShow.setAttribute("src", images[0]); // Start at first img when user presses 'play slideShow'

                    myInterval = setInterval(function () {
                        for (let j = 1; j < 2; j++) {
                            // Loop starts at second index (1) so that the first image in 'images' is displayed by default BEFORE the loop starts at row 70
                            slideShow.setAttribute("src", images[startPoint]);

                            console.log("slideShow.src: " + slideShow.src);
                            //console.log("slideShowHubble.src: " + slideShowHubble.src);
                            console.log("Här är erat J: " + j);

                            if (startPoint < images.length - 1) {
                                startPoint++;
                            } else {
                                startPoint = 0; // STARTPOINT MUST BE SET TO 0 HERE!!!
                            }
                            console.log("slideShowHubble.src: " + slideShow.src);
                        }
                    }, time);
                }
            }

            window.onclick = function (event) {
                if (event.target == slideShowHubbleModal) {
                    slideShowHubbleModal.style.display = "none";
                    document.querySelector('#slideshow-galaxies-show').disabled = false;
                    clearInterval(myInterval); // With "clearInterval" the interval of displaying new images during the slideShow is stopped
                    images = []; // Empties array so that it can be re-filled with images per users choice before "Start slideShow" is pressed
                }
            }

            function clickImg1() {
                if (imgPicked[0] == false) {
                    imgPicked[0] = true;
                    document.getElementById("imgId0").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)";
                } else {
                    imgPicked[0] = false;
                    document.getElementById("imgId0").style.boxShadow = "none";
                }
            }

            function clickImg2() {
                if (imgPicked[1] == false) {
                    imgPicked[1] = true;
                    document.getElementById("imgId1").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)";
                } else {
                    imgPicked[1] = false;
                    document.getElementById("imgId1").style.boxShadow = "none";
                }
            }

            function clickImg3() {
                if (imgPicked[2] == false) {
                    imgPicked[2] = true;
                    document.getElementById("imgId2").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)";
                } else {
                    imgPicked[2] = false;
                    document.getElementById("imgId2").style.boxShadow = "none";
                }
            }

            // Relevant event listiners:
            document.getElementById("imgId0").addEventListener("click", clickImg1)
            document.getElementById("imgId1").addEventListener("click", clickImg2)
            document.getElementById("imgId2").addEventListener("click", clickImg3)
            document.getElementById("slideshow-galaxies-show").addEventListener("click", playSlideShow);
        });
}