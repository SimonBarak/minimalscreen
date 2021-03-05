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

const prepareImage = () => {
  window.scroll({
    top: 0,
    left: 0,
  });

  console.log("hi");

  // htmlToImage.toJpeg(canvasEl).then(function (dataUrl) {
  //   console.log(dataUrl);

  //   var img = new Image();
  //   img.src = dataUrl;
  //   document.body.appendChild(img);
  //   // var link = document.createElement("a");
  //   // link.download = "my-image-name.jpeg";
  //   // link.href = dataUrl;
  //   // link.click();
  // });

  domtoimage
    .toPng(canvasEl)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });

  // html2canvas(canvasEl).then((canvas) => {
  //   var dataURL = canvas.toDataURL("image/jpeg");
  //   console.log(dataURL);

  //   // buttonEl.href = dataURL;

  //   finalImageEl.src = dataURL;
  // });
};

const createImage = (dataUrl) => {
  var img = new Image();
  img.src = dataUrl;
  img.classList.add("initial-height");
  mockupEl.appendChild(img);
  canvasEl.classList.remove("bg-blue-800");
};

// LOAD IMAGE FUNCTION
const loadMedia = (event) => {
  const { files } = event.target;
  const file = files[0];
  inputLabelEl.classList.add("hidden");
  var reader = new FileReader();
  reader.onload = (event) => {
    const url = event.target.result;
    createImage(url);
    imageInputEl.classList.add("hidden");
    mockupEl.classList.remove("initial-width");
    mockupEl.classList.remove("initial-height");
  };
  reader.readAsDataURL(file);
};

// EventListeners

createImageButton.addEventListener("click", () => {
  prepareImage();
});

imageInputEl.addEventListener("change", (event) => {
  loadMedia(event);
});
