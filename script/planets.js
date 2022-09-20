'use strict'

import * as lib from '../model/picture-library-browser.js';                 // NEEDED ??
let picsFromPlanetsAlbum = document.getElementById("pics-from-planets-album-div");
let headerImagePlanetsAlbum = document.getElementById("planets-header-image");
let slideShowHubble = document.getElementById("slideshow");                 // for slideshow

/* ----------------------------------- SLIDESHOW ---------------------------------------- */

// JULIUS TEST
let startPoint = 0
let images = [];
let time = 2000;

let imgPicked = {};
imgPicked[0] = true;
imgPicked[1] = true;
imgPicked[2] = true;

let isPlayingSlideShow = false;

window.onload = function () {
    document.querySelector('#slideshow-galaxies-stop').disabled = true;


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
                picsFromPlanetsAlbum.innerHTML += (`<img src="` + data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes + `" id='imgId` + i + "'>");

                /*
                if(imgPicked[i] == true){
                images[i] = data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes;        // For the slideshow
                }
                */
            }
            headerImagePlanetsAlbum.innerHTML += (`<img src="../app-data/library/pictures/album-header/hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~small.jpg">`);

            /*
            setInterval(function () {
                for (let j = 0; j < 11; j++) {

                    slideShowHubble.setAttribute("src", images[startPoint]);
                    console.log("slideShowHubble.src: " + slideShowHubble.src);

                    if (startPoint < images.length - 1) {
                        startPoint++;
                    } else {
                        startPoint = 0;
                    }
                    // sleep
                    console.log("slideShowHubble.src: " + slideShowHubble.src);
                }
            }, time);
            */



            console.log("Utanför fetchen, efter rad '62'!");


            function playSlideShow() {
                document.querySelector('#slideshow-galaxies-show').disabled = true;
                document.querySelector('#slideshow-galaxies-stop').disabled = false;

                console.log("Du klickade på spela slideshow! :)")

                isPlayingSlideShow = true;

                for (let i = 0; i < data.albums[3].pictures.length; i++) {
                    if (imgPicked[i] == true) {
                        images[i] = data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes;        // For the slideshow
                    };
                }


                let myInterval = setInterval(function () {
                    for (let j = 0; j < images.length; j++) {
                        slideShowHubble.setAttribute("src", images[startPoint]);
                        console.log("DEN HÄR LOOPEN ÄR OÄNDLIG: slideShowHubble.src: " + slideShowHubble.src);

                        if (startPoint < images.length - 1) {
                            startPoint++;
                        } else {
                            startPoint = 0;
                        }
                        // sleep
                        console.log("DEN OÄNDLIGA LOGGEN: slideShowHubble.src: " + slideShowHubble.src);
                    }
                    clearInterval(myInterval);
                }, time);

                myInterval;
            }

            function stopSlideShow() {
                document.querySelector('#slideshow-galaxies-show').disabled = false;
                document.querySelector('#slideshow-galaxies-stop').disabled = true;

                // HÄR VILL VI ATT SLIDESHOWEN SKA SLUTA!
            }


            function clickImg1() {
                console.log("Klickade på image nr: 1!");
                imgPicked[0] = true;
                //document.getElementById("imgId0").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)"; HÄR VILL PATRIK LEKA MED SAKER 21/9 PUSS
            }

            function clickImg2() {
                imgPicked[1] = true;
                console.log("Klickade på image nr: 2!");
            }

            function clickImg3() {
                imgPicked[2] = true;
                console.log("Klickade på image nr: 3!");
            }

            document.getElementById("imgId0").addEventListener("click", clickImg1)
            document.getElementById("imgId1").addEventListener("click", clickImg2)
            document.getElementById("imgId2").addEventListener("click", clickImg3)
            document.getElementById("slideshow-galaxies-show").addEventListener("click", playSlideShow);
            document.getElementById("slideshow-galaxies-stop").addEventListener("click", stopSlideShow);

        });
    // JULIUS TEST


    /*
    let startPoint = 0
    let images = [];
    let time = 2000;
    
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
                    picsFromPlanetsAlbum.innerHTML += (`<img src="` + data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes + `">`);
                    images[i] = data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes;        // For the slideshow
                }
                headerImagePlanetsAlbum.innerHTML += (`<img src="../app-data/library/pictures/album-header/hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~small.jpg">`);
    
                setInterval(function () {
                    for (let j = 0; j < 11; j++) {
    
                        slideShowHubble.setAttribute("src", images[startPoint]);
                        console.log("slideShowHubble.src: " + slideShowHubble.src);
    
                        if (startPoint < images.length - 1) {
                            startPoint++;
                        } else {
                            startPoint = 0;
                        }
                        // sleep
                        console.log("slideShowHubble.src: " + slideShowHubble.src);
                    }
                }, time);
            });
            */

    // -----------------------------TEST FÖR IMAGE CLICK FUNCTIONALITY----------------------------------------

    let library;  //Global varibale, Loaded async from the current server in window.load event

    // library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
    library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

    function imageClick() {
        localStorage.setItem("pictureId", this.getAttribute('id'));
        console.log("imageClick funktionen kör! (Här är den i localStorage): " + JSON.stringify(localStorage.getItem("pictureId")));
        location.href = 'imageSelected.html'; // Jump to the 'imageSelected' page
        // ************* HÄR VERKAR DET SOM ATT 'clickedImageID' töms och blir "undefined" igen *************
    }

    // ACTION-LISTENER-LOOP     THIS WORKS! Adds actionListiners to all images 
    let counterPic = 1;
    for (const album of library.albums) {
        let amountOfPics = album.pictures.length;
        for (let i = 0; i < amountOfPics + 1; i++) { // vf funkar +1 ????
            document.getElementById("picture" + counterPic).addEventListener('click', imageClick);
            counterPic++;
        }
    }

    // ********************************************* index.html *********************************************

    // ***************************************** imageSelected.html *****************************************

    console.log("**************************************************************");

    window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        let imageTitle = document.getElementById("bild-titel");
        let image = document.getElementById("highlighted-image"); // picture
        let imageDescription = document.getElementById("comments-display-field"); // description

        fetch("/app-data/library/picture-library.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                console.log(data); // "data" är alltså våran feta JSON array! (picture-library.json)
                console.log("Här är pictures!: " + JSON.stringify(data.albums[0].pictures))  // På såhär vis kan man printa samtliga bilder från JSON arrayen (index 0)! (Bygg vidare på detta)
                // Med for-loop eller liknande för att printa/hämta alla bilder i hela arrayen

                for (let i = 0; i < data.albums.length; i++) {
                    console.log("Här borde det stå 4 eller 5: " + data.albums.length); // DENNA FUNGERAR, VI HITTAR ALLA INDEX!
                    for (let j = 0; j < data.albums[i].pictures.length; j++) {
                        // console.log("localStorage.getItem(\"pictureId\"): " + localStorage.getItem("pictureId"));
                        // console.log('data.albums[i].pictures[j].id: ' + data.albums[i].pictures[j].id);
                        // console.log('imageTitle.innerText: ' + imageTitle.innerText);
                        if (data.albums[i].pictures[j].id == localStorage.getItem("pictureId")) {
                            // console.log("Julius bullshit: " + data.albums[i].pictures[j].title)
                            imageTitle.innerText = data.albums[i].pictures[j].title;

                            image.style.backgroundImage = "url(/" + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes + `)`; // vi hade glömt ett + efter imgLoRes

                            imageDescription.innerText = data.albums[i].pictures[j].comment; // för att få fram beskrivning
                            console.log(`data.albums[i].path + data.albums[i].pictures[j].imgLoRes: ` + '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
                            console.log(`image.url: ` + image.url);
                            console.log('url', '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
                        }
                    }
                }
            });
    });
    // -----------------------------TEST FÖR IMAGE CLICK FUNCTIONALITY----------------------------------------
}