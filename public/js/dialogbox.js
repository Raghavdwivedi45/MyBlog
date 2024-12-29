let alertBox = document.querySelector(".alertBox");
let del =document.querySelector(".delete");
let close =document.querySelector(".close");

del.addEventListener
('click', function () {
    document.querySelector(".fullscreen-container").style.display="block";
    // alertBox.style.display = "block";
});

close.addEventListener
('click', function () {
    document.querySelector(".fullscreen-container").style.display = "none";
});