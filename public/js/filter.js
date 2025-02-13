let filter = document.querySelector("#filter");
let tags = document.querySelector(".tags");
let tagClose = document.querySelector(".tag-close");

filter.addEventListener("click", ()=> {
    tags.style.display = "flex";
})

tagClose.addEventListener("click", ()=> {
    tags.style.display = "none";
})