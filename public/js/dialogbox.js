let alertBox = document.querySelector(".alertBox");
let del =document.querySelector(".delete");
let close = document.querySelector(".close");
let off = document.querySelector(".off");

del.addEventListener
('click', function () {
    document.querySelector(".fullscreen-container").style.display="block";
    // alertBox.style.display = "block";
});

close.addEventListener
('click', function () {
    document.querySelector(".fullscreen-container").style.display = "none";
});

off.addEventListener
('click', function () {
    document.querySelector(".fullscreen-container").style.display = "none";
});