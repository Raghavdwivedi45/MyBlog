let dlt = document.querySelector(".delete");
let close = document.querySelector(".close");
let off = document.querySelector(".off");
let cont = document.querySelector(".fullscreen-container");

dlt.addEventListener
('click', function () {
    cont.style.display="block";

});

close.addEventListener
('click', function () {
    cont.style.display = "none";
});

off.addEventListener
('click', function () {
    cont.style.display = "none";
});

