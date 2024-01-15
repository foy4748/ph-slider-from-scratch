const images = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
  "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
  "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_640.jpg",
  "https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_640.jpg",
];

// State Management
let currentImg = -1;

// Grabbing Elements

//// Main Container
let rootDiv = document.getElementById("root");

//// Navigation Buttons
let nextBtn = document.getElementsByClassName("navigate-next")[0];
let prevBtn = document.getElementsByClassName("navigate-prev")[0];

//// Pagination Bullet Container
let paginationDiv = document.getElementsByClassName("pagination")[0];

// Event Handler Functions

// Changing Slides
const slideChanger = (direction, images) => () => {
  const size = images.length;

  // First making sure the root Div is empty
  rootDiv.innerHTML = "";

  // Creating Img Element
  const imgElm = document.createElement("img");

  // Styling a Bit
  imgElm.style["width"] = "100%";
  imgElm.style["height"] = "500px";
  imgElm.style["objectFit"] = "cover";
  imgElm.classList.add("col");

  // Updating  State
  // currentImg;
  switch (direction) {
    case "left":
      currentImg = (currentImg + 1) % size;
      imgElm.classList.add("animation-from-right");
      break;
    case "right":
      currentImg = (currentImg - 1 + size) % size;
      imgElm.classList.add("animation-from-left");
      break;
    default:
      break;
  }

  // Populating DOM / Rendering
  imgElm.src = images[currentImg];
  rootDiv.append(imgElm);
};

// Pagination Bullet Part ==============================

// Changing image
// according to bullet point
function bulletPointListener(imgNumber) {
  // Displaying bullet points
  const bulletPoints = document.getElementsByClassName("pagination-bullet");
  bulletPoints[currentImg].classList.remove("pagination-bullet--active");
  // Updating state
  currentImg = imgNumber;

  // First making sure the root Div is empty
  rootDiv.innerHTML = "";

  // Creating Img Element
  const imgElm = document.createElement("img");

  // Styling a Bit
  imgElm.style["width"] = "100%";
  imgElm.style["height"] = "500px";
  imgElm.style["objectFit"] = "cover";
  imgElm.classList.add("col");

  imgElm.classList.add("animation-from-top");

  // Populating DOM / Rendering
  imgElm.src = images[currentImg];
  rootDiv.append(imgElm);

  // Marking active bullet point
  bulletPoints[currentImg].classList.add("pagination-bullet--active");
}

const generatePaginationBullet = () => {
  paginationDiv.innerHTML = "";
  for (let i = 0; i < images.length; i++) {
    paginationDiv.innerHTML += `<div class="pagination-bullet" onclick="bulletPointListener(${i})"></div>`;
  }
};

// Event Listeners =============================================

window.onload = () => {
  prevBtn.click();
  console.log("currentImg", currentImg);
  generatePaginationBullet();
  const bulletPoints = document.getElementsByClassName("pagination-bullet");
  bulletPoints[currentImg].classList.add("pagination-bullet--active");
};

nextBtn.addEventListener("click", slideChanger("right", images));
prevBtn.addEventListener("click", slideChanger("left", images));

// Thanks to this blog
// https://dev.to/ranewallin/this-simple-math-hack-lets-you-create-an-image-carousel-without-any-if-statements-5chj
