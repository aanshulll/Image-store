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
        imgContainer.innerHTML = `<img src="${result.urls.medium}" alt="${result.alt_description}">`;
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
        menu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(250,243,88,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>`
        toggle = true
        
    }
    else
    {
        menuItems.style.display = "none"
        menu.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(238,211,61,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>`
        toggle = false
        
    }
    
})
