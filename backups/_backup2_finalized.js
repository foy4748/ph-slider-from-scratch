const images = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
    "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
    "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_640.jpg",
    "https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_640.jpg",
];

//// Main Div
let mainDiv = document.getElementsByClassName("main-div")[0];

//// Main Image Container
let rootDiv = document.getElementById("root");

//// Navigation Buttons
let nextBtn = document.getElementsByClassName("navigate-next")[0];
let prevBtn = document.getElementsByClassName("navigate-prev")[0];

//// Pagination Bullet Container
let paginationDiv = document.getElementsByClassName("pagination")[0];

// CurrentImage Index 
let currentImgIdx = -1;

const renderImg = (imgIdx, optionalClass = "animation-from-top") => {
    // Deleting any previous image which was displaying / rendering
    rootDiv.innerHTML = "";

    // Creating Img Elemenet
    const imgElement = document.createElement("img");
    imgElement.src = images[imgIdx];
    imgElement.classList.add("col");
    imgElement.classList.add(optionalClass);

    // Appending created new image to root div
    rootDiv.append(imgElement);
}

const renderActiveBullet = (prevActive) => (nextActive) => {
    const bullets = document.getElementsByClassName("pagination-bullet");
    /*
    for (let bullet of bullets) {
        bullet.classList.remove("pagination-bullet--active")
    }
    */

    bullets[prevActive]?.classList.remove("pagination-bullet--active");
    bullets[nextActive]?.classList.add("pagination-bullet--active");
}

const nextBtnClick = () => {


    const prevRemoved = renderActiveBullet(currentImgIdx)
    // Updating CurrentImg / State
    let temp = currentImgIdx + 1
    currentImgIdx = temp == images.length ? 0 : temp;

    renderImg(currentImgIdx, "animation-from-right");
    //renderActiveBullet(currentImg);
    prevRemoved(currentImgIdx);

}

const prevBtnClick = () => {

    const prevRemoved = renderActiveBullet(currentImgIdx)
    // Updating CurrentImg / State
    let temp = currentImgIdx - 1;
    currentImgIdx = temp == -1 ? 4 : temp;

    renderImg(currentImgIdx, "animation-from-left");
    prevRemoved(currentImgIdx);
}

const goToSlide = (slideIdx) => {
    const prevRemoved = renderActiveBullet(currentImgIdx)
    currentImgIdx = slideIdx;
    renderImg(currentImgIdx);
    //renderActiveBullet(currentImg);
    prevRemoved(currentImgIdx);
}
const populatePaginationBullet = () => {

    for (let i = 0; i < images.length; i++) {
        paginationDiv.innerHTML += `
      <div class="pagination-bullet" onclick="goToSlide(${i})"></div>
        `;
    }
}

let autoSlideTimer;

const autoSlide = () => {
    autoSlideTimer = setInterval(() => {
        nextBtn.click();
    }, 1000)
}



// Introducing Event Listeners =========
nextBtn.addEventListener("click", nextBtnClick);
prevBtn.addEventListener("click", prevBtnClick);

mainDiv.addEventListener("mouseenter", () => {
    clearInterval(autoSlideTimer);
})

mainDiv.addEventListener("mouseleave", () => {
    autoSlide();
})

window.onload = () => {

    const prevRemoved = renderActiveBullet(currentImgIdx);
    nextBtn.click();

    populatePaginationBullet();
    prevRemoved(currentImgIdx);
    autoSlide();

}