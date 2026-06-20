const images = 
[
   "../images/slide1.png",
    "../images/slide2.png",
    "../images/slide3.png",
    "../images/slide4.png",
    "../images/slide5.png",
];

let current = 0;

const heroImage = document.getElementById("heroImage");

setInterval(() => {

    heroImage.style.opacity = "0";

    setTimeout(() => {

        current++;

        if (current >= images.length) {
            current = 0;
        }

        heroImage.src = images[current];
        heroImage.style.opacity = "1";

    }, 500);

}, 3000);
//Side Nav Bar

let menubar = document.getElementById("menubar")
let sidenavbar = document.getElementById("sidenavbar")
let closeicon = document.getElementById("closeicon")

menubar.addEventListener("click", function(){
    sidenavbar.classList.remove("translate-x-full")

})

closeicon.addEventListener("click", function(){
    sidenavbar.classList.add("translate-x-full")
})