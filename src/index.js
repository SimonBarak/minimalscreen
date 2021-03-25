import "./index.css";
import domtoimage from "dom-to-image";
import iro from "@jaames/iro";

const imageInputEl = document.querySelector("#imageInput");
const screenShotEl = document.querySelector("#screenShot");
const inputLabelEl = document.querySelector("#inputLabel");
const mockupEl = document.querySelector("#mockup");
const canvasEl = document.querySelector("#canvas");
const finalImageEl = document.querySelector("#finalImage");
const createImageButton = document.querySelector("#create-image");
//const addScreenEl = document.querySelector("#add-screen");
const popUpEl = document.querySelector("#popUp");
const popUpImage = document.querySelector("#popUp-image");
const mainEl = document.querySelector("main");

// SECOND MOCKUP
// addScreenEl.addEventListener("click", () => {
//   const mockupEl = document.querySelector("#mockup-second");
//   mockupEl.classList.remove("hidden");
//   addScreenEl.classList.add("hidden");
// });

const allmockupsEl = Array.from(
  document.getElementsByClassName("mobile-mockup")
);

function generateImage(canvasEl) {
  return new Promise((resolve) => {
    domtoimage
      .toJpeg(canvasEl, { quality: 2 })
      .then(function (dataUrl) {
        return resolve(dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  });
}

const runGeneration = (canvasEl) => {
  canvasEl.classList.remove("m-auto");
  generateImage(canvasEl).then(() => {
    console.log("first time");
    generateImage(canvasEl).then(() => {
      console.log("one more time to make sure ");
      generateImage(canvasEl).then((dataUrl) => {
        console.log("okay now it should be fine");
        popUpImage.src = dataUrl;
        document.body.classList.add("active-popup");
        canvasEl.classList.add("m-auto");
        popUpEl.addEventListener("click", () => {
          console.log("HII");
          document.body.classList.remove("active-popup");
          mainEl.removeEventListener("click", () => {});
        });
      });
    });
  });
};

createImageButton.addEventListener("click", () => {
  window.scroll({
    top: 0,
    left: 0,
  });

  runGeneration(canvasEl);
  console.log("now");
});

// LOAD IMAGE FUNCTION
const insertImage = (parrentEl, imageWrapperEl, imageFile) => {
  var reader = new FileReader();

  reader.onload = (event) => {
    var img = new Image();
    const dataUrl = event.target.result;

    img.src = dataUrl;

    imageWrapperEl.appendChild(img);
    parrentEl.classList.remove("initial-width");
  };
  reader.readAsDataURL(imageFile);
};

// LOAD MP4 FUNCTION
const insertVideo = (parrentEl, imageWrapperEl, imageFile) => {
  var reader = new FileReader();

  reader.onload = (event) => {
    const dataUrl = event.target.result;

    let newVideo = document.createElement("video");
    newVideo.defaultMuted = true;
    newVideo.setAttribute("type", "video/mp4");
    newVideo.setAttribute("src", dataUrl);
    newVideo.setAttribute("controls", true);
    newVideo.load();
    newVideo.play();
    newVideo.setAttribute("loop", "true");

    imageWrapperEl.appendChild(newVideo);
    parrentEl.classList.remove("initial-width");

    createImageButton.classList.add("opacity-10");
    createImageButton.classList.add("pointer-events-none");
    const warningDiv = document.createElement("div");
    warningDiv.innerHTML = "Sorry, video rendering is not a ready jet";
    createImageButton.parentElement.appendChild(warningDiv);
  };
  reader.readAsDataURL(imageFile);
};

// Initialize mockups
allmockupsEl.forEach((parrentEl) => {
  const controlersEl = parrentEl.querySelector(".controlers");
  const inputImageEl = parrentEl.querySelector(".input-image");
  const inputVideoEl = parrentEl.querySelector(".input-video");
  //const imageWrapperEl = parrentEl.querySelector(".imageWrapper");

  inputImageEl.addEventListener("change", (event) => {
    const { files } = event.target;
    const imageFile = files[0];
    controlersEl.classList.add("hidden");
    insertImage(parrentEl, parrentEl, imageFile);
  });

  inputVideoEl.addEventListener("change", (event) => {
    const { files } = event.target;
    const imageFile = files[0];
    controlersEl.classList.add("hidden");
    insertVideo(parrentEl, parrentEl, imageFile);
  });
});

// COLOR PICKER
var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#ffc800",
});

colorPicker.on("color:change", function (color) {
  // log the current color as a HEX string

  const root = document.querySelector(":root");
  root.style.setProperty("--bg-color", color.hexString);
});
//

// function dragElement(elmnt) {
//   var pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;
//   if (document.getElementById(elmnt.id + "-handler")) {
//     // if present, the handler is where you move the DIV from:
//     document.getElementById(elmnt.id + "-handler").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
//     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }

// dragElement(document.getElementById("draggable"));
