const key = "8HgOW5GqOaWadMpgPjSr_AmWs2PArjx8CrXslAfD7ho";
const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchInput");
const output = document.querySelector(".main");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");
const downloadBtn = document.getElementById("downloadBtn");
const categories = document.querySelectorAll(".category");
const themeToggle = document.getElementById("checkbox");
const menuItems = document.querySelector(".menu-items");
const menu = document.querySelector(".menu");

let keyword = "nature";
let page = 1;

// Fetch Images
async function fetchImages() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach(result => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "image-container";
        imgContainer.innerHTML = `<img src="${result.urls.small}" alt="${result.alt_description}">`;
        imgContainer.addEventListener("click", () => openPopup(result));
        output.appendChild(imgContainer);
    });
}

// Open Popup
function openPopup(image) {
    popupImg.src = image.urls.full;
    popup.style.display = "flex";
    downloadBtn.href = image.urls.full;
}

closePopup.addEventListener("click", () => popup.style.display = "none");



form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    keyword = input.value.trim();
    output.innerHTML = "";
    fetchImages();
});

loadMoreBtn.addEventListener("click", () => {
    page++;
    fetchImages();
});

categories.forEach(btn => btn.addEventListener("click", () => {
    keyword = btn.dataset.category;
    output.innerHTML = "";
    fetchImages();
}));

fetchImages();

let toggle = false
menu.addEventListener("click",()=>
{
    if(!toggle)
    {
        menuItems.style.display = "flex"
        toggle = true
    }
    else
    {
        menuItems.style.display = "none"
        toggle = false
    }

})
