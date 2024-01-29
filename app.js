const APIkey = "OeDDVUPBbonCzgR8xLPm-gV_DOSfTpMOpqYAqePea90";

const form = document.querySelector("form");
const input = document.getElementById("searchInput");
const searchRes = document.querySelector("#imageContainer");
const showMore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${APIkey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchRes.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("image");
        imageWrapper.style.marginBottom = "10px";

        const Img = document.createElement('img');
        Img.src = result.urls.small;
        Img.alt = result.alt_description;
        Img.style.width = "100%";

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageLink.style.display = "block";

        imageWrapper.appendChild(Img);
        imageWrapper.appendChild(imageLink);
        searchRes.appendChild(imageWrapper);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
        showMore.style.position = "absolute";
        showMore.style.left = "50%";
        showMore.style.transform = "translateX(-50%)";
    }
}

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener("click", () => {
    searchImage();
});