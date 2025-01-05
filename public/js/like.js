let heart = document.getElementById("heart");
let thumb = document.getElementById("thumb");
let btnDiv = document.querySelector("#btn");
let likeBtn = document.querySelector("#likebtn");
let loveBtn = document.querySelector("#lovebtn");

heart.addEventListener("click", (e) => {
    if (thumb.style.color == "blue") {
        thumb.style.color = "wheat";
        likeBtn.style.display = "none";
    }
    if (e.target.style.color == "red") {
        e.target.style.color = "wheat";
        loveBtn.style.display = "none";
    } else {
        e.target.style.color = "red"
        e.target.style.opacity = 1;
        btnDiv.style.display = "flex";
        likeBtn.style.display = "none";
        loveBtn.style.display = "block";
    }


});

thumb.addEventListener("click", (e) => {
    if (heart.style.color == "red") {
        heart.style.color = "wheat"
        loveBtn.style.display = "none";
    }

    if (e.target.style.color == "blue") {
        e.target.style.color = "wheat";
        likeBtn.style.display = "none";
    } else {
        e.target.style.color = "blue"
        e.target.style.opacity = 1;
        btnDiv.style.display = "flex";
        loveBtn.style.display = "none";
        likeBtn.style.display = "block";
    }

});
