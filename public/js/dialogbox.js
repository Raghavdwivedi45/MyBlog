let alertBox = document.querySelector(".alertBox");
let del =document.getElementsByClassName("delete");
let close = document.querySelector(".close");
let off = document.querySelector(".off");
let cont = document.querySelector(".fullscreen-container");

for(el of del){
el.addEventListener
('click', function () {
    document.querySelector(".fullscreen-container").style.display="block";
    // alertBox.style.display = "block";
});
}

close.addEventListener
('click', function () {
    cont.style.display = "none";
});

off.addEventListener
('click', function () {
    cont.style.display = "none";
});

async function Rate() {
    let url = document.querySelector("#rate-id").value;
    let currStar = 0;
    let ele = document.getElementsByName('rating');
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            currStar = ele[i].value;
    }
    console.log(currStar);

    await axios.put(url, { rating: Math.floor(currStar) });
}