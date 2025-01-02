let delt = document.getElementsByClassName("delete");
for(el of delt){
el.addEventListener
('click', function () {
    let ids = this.getAttribute("id");
    document.getElementById(`${ids}-cont`).style.display="block";
    // alertBox.style.display = "block";
});
}

let closes = document.querySelectorAll(".close");
for(elss of closes){
    elss.addEventListener
    ('click', function () {
        let cont = document.querySelectorAll(".fullscreen-container");
        for( els of cont) {
        els.style.display = "none";
    }
    });
    }
