const images = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
    "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
    "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_640.jpg",
    "https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_640.jpg",
];

// State Variable
let currentImgIdx = -1;

const rootDiv = document.getElementById("root");

const nextBtn = document.getElementsByClassName("navigate-next")[0];
const prevBtn = document.getElementsByClassName("navigate-prev")[0];

const paginationDiv = document.getElementsByClassName("pagination")[0];
const mainDiv = document.getElementsByClassName("main-div")[0];


function renderSliderImage(imgIdx, customClass) {
    const imgElement = document.createElement("img");
    imgElement.src = images[imgIdx];
    imgElement.classList.add("col");
    imgElement.classList.add(customClass);
    rootDiv.innerHTML = "";
    rootDiv.append(imgElement);
}

const handleBulletActive = (previousIdx) => (updatedIdx) => {
    const bullets = document.getElementsByClassName("pagination-bullet");

    bullets[previousIdx]?.classList.remove("pagination-bullet--active");

    bullets[updatedIdx]?.classList.add("pagination-bullet--active");

}

nextBtn.addEventListener("click", () => {

    const previousHandled = handleBulletActive(currentImgIdx);

    let forChecking = currentImgIdx + 1;
    if (forChecking == images.length) {
        currentImgIdx = 0;
    } else {
        currentImgIdx = currentImgIdx + 1;

    }

    previousHandled(currentImgIdx);

    renderSliderImage(currentImgIdx, "animation-from-right");

})

prevBtn.addEventListener("click", () => {


    const previousHandled = handleBulletActive(currentImgIdx);
    let forChecking = currentImgIdx - 1
    if (forChecking == -1) {
        currentImgIdx = images.length - 1;
    } else {
        currentImgIdx = currentImgIdx - 1;

    }

    previousHandled(currentImgIdx);

    renderSliderImage(currentImgIdx, "animation-from-left");
})


function paginationClick(index) {
    const previousHandled = handleBulletActive(currentImgIdx);

    currentImgIdx = index;

    previousHandled(currentImgIdx);

    renderSliderImage(currentImgIdx, "animation-from-top");
}

function generatePaginationBullet() {
    paginationDiv.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
        const bulletElm = `<div onclick="paginationClick(${i})" class="pagination-bullet"></div>`
        paginationDiv.innerHTML += bulletElm
    }
}

let timerStorage;

function autoSlide() {

    timerStorage = setInterval(() => {
        nextBtn.click();
    }, 1000);

}

mainDiv.addEventListener("mouseenter", () => {
    clearInterval(timerStorage);
})

mainDiv.addEventListener("mouseleave", () => {
    autoSlide();
})

generatePaginationBullet();
nextBtn.click();
autoSlide();