import "./index.css";
import domtoimage from "dom-to-image";

const imageInputEl = document.querySelector("#imageInput");
const screenShotEl = document.querySelector("#screenShot");
const inputLabelEl = document.querySelector("#inputLabel");
const mockupEl = document.querySelector("#mockup");
const canvasEl = document.querySelector("#canvas");
const finalImageEl = document.querySelector("#finalImage");
const createImageButton = document.querySelector("#create-image");
const popUpEl = document.querySelector("#image-popUp");
const mainEl = document.querySelector("main");

const allmockupsEl = Array.from(
  document.getElementsByClassName("mobile-mockup")
);

const removePopUp = () => {
  document.body.classList.remove("active-popup");
  popUpEl.classList.add("hidden");
  popUpEl.innerHTML = "";
  mainEl.removeEventListener("click", () => {});
};

const prepareImage = (canvasEl) => {
  // window.scroll({
  //   top: 0,
  //   left: 0,
  // });
  domtoimage
    .toPng(canvasEl)
    .then(function (dataUrl) {
      document.body.classList.add("active-popup");
      popUpEl.classList.remove("hidden");
      var img = new Image();
      img.src = dataUrl;
      popUpEl.appendChild(img);

      console.log("now");

      mainEl.addEventListener("click", () => {
        console.log("now2");
        removePopUp();
      });
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

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
    parrentEl.classList.remove("initial-width");
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

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-handler")) {
    // if present, the handler is where you move the DIV from:
    document.getElementById(elmnt.id + "-handler").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.getElementById("draggable"));

createImageButton.addEventListener("click", () => {
  console.log(canvasEl);
  prepareImage(canvasEl);
});
