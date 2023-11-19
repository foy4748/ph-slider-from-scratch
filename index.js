const images = [
	"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
	"https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
	"https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
	"https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_640.jpg",
	"https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_640.jpg",
]

// State Management
let currentImg = -1;

let rootDiv = document.getElementById("root");


const slideChanger = (direction, images) => () => {
	const size = images.length
	// First making sure the root Div is empty
	rootDiv.innerHTML = ""
	const imgElm = document.createElement("img");

	// Styling a Bit
	imgElm.style['objectFit'] = "cover"
	imgElm.style['width'] = "100%"
	imgElm.classList.add("col")
	imgElm.classList.add("animation")
	switch (direction) {
		case "left":
			currentImg = (currentImg + 1) % size;
			imgElm.classList.add("animation-from-right")
			break;
		case "right":
			currentImg = (currentImg - 1 + size) % size;
			imgElm.classList.add("animation-from-left")
			break;
		default:
			break;
	}
	console.log('currentImg', currentImg)
	imgElm.src = images[currentImg];
	rootDiv.append(imgElm)
	// Updating  State
	// currentImg;
}

window.onload = () => {
	document.getElementsByClassName("nav-prev")[0].click();
	console.log('currentImg', currentImg)
}

document.getElementsByClassName("nav-next")[0].addEventListener("click", slideChanger("right", images));
document.getElementsByClassName("nav-prev")[0].addEventListener("click", slideChanger("left", images));

// Thanks to this blog
// https://dev.to/ranewallin/this-simple-math-hack-lets-you-create-an-image-carousel-without-any-if-statements-5chj
