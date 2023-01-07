const mainColors = window.localStorage.getItem("color");

// Check if there's color chosen earlier in localStorage
if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color',mainColors);

     //Remove active Class from all childrens
        document.querySelectorAll(".colors-list li").forEach(element => {
            element.classList.remove("active");

        //Add class active in case the color option === color in localStorage
            if (element.dataset.color === mainColors) {
                element.classList.add("active");
            }
        });
        
}

const randomBackgrounds = window.localStorage.getItem("background");

// Check if there's Background chosen earlier in localStorage
if(randomBackgrounds !== null){
    document.documentElement.style.setProperty('--background-img',randomBackgrounds);

     //Remove active Class from all childrens
        document.querySelectorAll(".random-backgrounds span").forEach(element => {
            element.classList.remove("active");
            
        //Add class active in case the background option === background in localStorage
            if (element.dataset.background === randomBackgrounds) {
                element.classList.add("active");
            }
        });
        
}

//Random Background Option
let backgroundOptions = true;

//Variable To Control The Background Interval
let backgroundInterval;

//Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // Toggle Class Fa-spin rotation on self 
    this.classList.toggle("fa-spin");

    //Toggle Class open On main settings Box
    document.querySelector(".settings-box").classList.toggle("open");
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop in all color list item
colorsLi.forEach(li => {
    //click on color item
    li.addEventListener("click", (e) =>{
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set Main Color in localStorage
        window.localStorage.setItem("main-color", e.target.dataset.color);
        
        //Remove active Class from all childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        //Add class active on self
        e.target.classList.add("active");
    });
});


// Switch Random Backgrounds
const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");

// Loop in all spans
randomBackgroundsElement.forEach(spanElement => {

    //click on span
    spanElement.addEventListener("click", (e) =>{

        //Remove active Class from all childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            document.documentElement.style.setProperty('--background-img', e.target.dataset.background);

            //set Main Background color in localStorage
            window.localStorage.setItem("background-color", e.target.dataset.background);

            element.classList.remove("active");
        });

        //Add class active on self
        e.target.classList.add("active");

        if(e.target.dataset.background === "yes"){

            backgroundOptions = true;

            randomizeImgs();

        } else{
            
            backgroundOptions = false;

            clearInterval(backgroundInterval);

        }
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of imgs
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];


function randomizeImgs() {
    if (backgroundOptions === true){
        backgroundInterval = setInterval(() => {
            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            //Change Background Image Url
            landingPage.style.backgroundImage = `url("imgs/${randomNumber+1}.jpg")`;
        }, 1000);
    }
}

randomizeImgs();
