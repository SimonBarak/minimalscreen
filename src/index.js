import "./index.css";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";

import domtoimage from "dom-to-image";

const imageInputEl = document.querySelector("#imageInput");
const screenShotEl = document.querySelector("#screenShot");
const inputLabelEl = document.querySelector("#inputLabel");
const mockupEl = document.querySelector("#mockup");
const canvasEl = document.querySelector("#canvas");
const finalImageEl = document.querySelector("#finalImage");
const createImageButton = document.querySelector("#create-image");
const headlineEl = document.querySelector("#headline");

const allmockupsEl = Array.from(
  document.getElementsByClassName("mobile-mockup")
);

// const prepareImage = () => {
//   window.scroll({
//     top: 0,
//     left: 0,
//   });
//   domtoimage
//     .toPng(canvasEl)
//     .then(function (dataUrl) {
//       var img = new Image();
//       img.src = dataUrl;
//       document.body.appendChild(img);
//     })
//     .catch(function (error) {
//       console.error("oops, something went wrong!", error);
//     });
// };

// LOAD IMAGE FUNCTION
const insertImage = (parrentEl, imageFile) => {
  var reader = new FileReader();

  reader.onload = (event) => {
    var img = new Image();
    const dataUrl = event.target.result;

    img.src = dataUrl;
    img.classList.add("initial-height");

    console.log(img);
    parrentEl.appendChild(img);

    // imageInputEl.classList.add("hidden");
    // mockupEl.classList.remove("initial-width");
    // mockupEl.classList.remove("initial-height");
  };
  reader.readAsDataURL(imageFile);
};

// EventListeners

allmockupsEl.forEach((parrentEl) => {
  const labelEl = parrentEl.querySelector(".cta");
  const inputEl = parrentEl.querySelector("input");
  const imageWrapperEl = parrentEl.querySelector(".imageWrapper");

  inputEl.addEventListener("change", (event) => {
    const { files } = event.target;
    const imageFile = files[0];
    labelEl.classList.add("hidden");
    insertImage(imageWrapperEl, imageFile);
  });
});
