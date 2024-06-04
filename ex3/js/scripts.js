window.onload = () => {
    initRectangles();
};

//rectangle part

const colors = ["#640D6B", "#B51B75", "#E65C19", "#F8D082"];
const fullName = "Vladimir Lihatchov";
const characters = fullName.split(/\s*/);

let currentColorIndex = 0;
let currentCharIndex = 0;

function chooseRectangleColor() {
    const color = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    return color;
}

function initRectangles() {
    const wrapper = document.getElementById("wrapper");
    for (let i = 0; i < characters.length; i++) {
        addRectangle();
    }
}

function addRectangle() {
    if (isShowingRectangles) {
        const wrapper = document.getElementById("wrapper");
        const charBox = document.createElement("div");
        const char = characters[currentCharIndex];
        charBox.textContent = char;
        charBox.classList.add("square");
        charBox.style.backgroundColor = chooseRectangleColor();
        wrapper.appendChild(charBox);
        currentCharIndex = (currentCharIndex + 1) % characters.length;
    }
}

function subtractRectangle() {
    if (isShowingRectangles) {
        const wrapper = document.getElementById("wrapper");
        if (wrapper.lastChild) {
            wrapper.removeChild(wrapper.lastChild);
            currentCharIndex =
                (currentCharIndex - 1 + characters.length) % characters.length;
            currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
        }
    }
}

//songs part

function initSongs() {
    fetch("data/music.json")
        .then((response) => response.json())
        .then((data) => populateSongsInList(data))
        .catch((error) => console.error("Error loading music:", error));
}

function populateSongsInList(data) {
    const wrapper = document.getElementById("wrapper");
    const musicTitle = document.createElement("h1");
    wrapper.appendChild(musicTitle);
    document.querySelector("h1").innerHTML = `${data.title}`;
    const ulFrag = document.createDocumentFragment();
    const musicList = document.createElement("ul");
    ulFrag.appendChild(musicList);

    data.songs.forEach((song) => {
        const songItem = document.createElement("li");
        songItem.innerHTML = `${song.id}. ${song.artist} - ${song.title}`;
        musicList.appendChild(songItem);
    });
    wrapper.appendChild(ulFrag);
}

//transition part

let isShowingRectangles = true;

function switchRectanglesSongs() {
    const switchButton = document.getElementById("switchButton");
    isShowingRectangles = !isShowingRectangles;
    if (isShowingRectangles) {
        switchButton.innerText = "Switch to songs";
        wrapper.innerHTML = "";
        if (rectState) {
            rectState.forEach((item) => {
                const square = document.createElement("div");
                square.classList.add("square");
                square.style.backgroundColor = item.color;
                square.innerText = item.char;
                wrapper.appendChild(square);
            });
        } else {
            initRectangles();
        }
    } else {
        switchButton.innerText = "Switch to rectangles";
        rectState = saveRectanglesState();
        wrapper.innerHTML = "";
        initSongs();
    }
}

function saveRectanglesState() {
    const wrapper = document.getElementById("wrapper");
    const rectangles = Array.from(wrapper.querySelectorAll(".square")).map(
        (square) => ({
            char: square.textContent,
            color: square.style.backgroundColor,
        })
    );
    return rectangles;
}

