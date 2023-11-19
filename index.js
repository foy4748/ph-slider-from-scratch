const images = [
	"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
	"https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
	"https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg",
	"https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_640.jpg",
	"https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_640.jpg",
]

// State Management
let currentImg = 0;

let rootDiv = document.getElementById("root");

//images.forEach(img => {
//	const imgElm = document.createElement("img");
//	imgElm.src = img;
//	// Styling the images a bit
//	//imgElm.height = "600"
//	imgElm.style['objectFit'] = "cover"
//	imgElm.style['width'] = "100%"
//	imgElm.classList.add("col")
//	imgElm.classList.add("animation")
//	rootDiv.append(imgElm)
//})

const slideChanger = (direction, images) => () => {
	console.log("currentImg", currentImg)
	const size = images.length
	let currentIdx = Math.abs(currentImg) % size;
	// First making sure the root Div is empty
	rootDiv.innerHTML = ""
	const imgElm = document.createElement("img");
	imgElm.src = images[currentIdx];

	// Styling a Bit
	imgElm.style['objectFit'] = "cover"
	imgElm.style['width'] = "100%"
	imgElm.classList.add("col")
	imgElm.classList.add("animation")
	rootDiv.append(imgElm)
	switch (direction) {
		case "left":
			currentIdx = Math.abs(currentIdx) + 1;
			break;
		case "right":
			if (currentIdx == 0) {
				currentIdx = size - 2;
			} else {
				currentIdx = Math.abs(currentIdx) - 1;
			}
	}
	// Updating  State
	// currentImg;
	currentImg = currentIdx;
}

window.onload = () => {
	const imgElm = document.createElement("img");
	imgElm.src = images[currentImg];
	currentImg++;
	rootDiv.append(imgElm)

}

document.getElementsByClassName("nav-next")[0].addEventListener("click", slideChanger("right", images));
document.getElementsByClassName("nav-prev")[0].addEventListener("click", slideChanger("left", images));
