let closess = document.querySelectorAll(".flash span");

for(el of closess) {
    el.addEventListener("click", function() {
        if(document.querySelector(".success")){
        document.querySelector(".success").style.display = "none";
    }
    if(document.querySelector(".error")){
        document.querySelector(".error").style.display = "none";
    }
    })
}
