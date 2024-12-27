let leftIcon = document.querySelectorAll(".dynamicImg i");
let counter=0;

for(left of leftIcon){
    left.addEventListener("click", function(){
        this.style.color = "rgba(255, 255, 255, 0.2)";
    
        setTimeout(()=>{
            this.style.color = "rgba(245, 222, 179, 0.863)"
        }, 100);
    });
};

let slides = document.querySelectorAll(".slide");

slides.forEach(
    (slide, index) => {
        slide.style.left = `${index*100}%`;
    }
)

const slideImage = ()=> {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter*100}%)`;
    })
}

const goPrev = () => {
    if(counter>=0){
        counter--;
        slideImage();
    }
}

const goNext = () => {
    if(counter<5){
        counter++;
        slideImage();
    }

}

