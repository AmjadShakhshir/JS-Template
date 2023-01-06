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

//Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // Toggle Class Fa-spin rotation on self 
    this.classList.toggle("fa-spin");

    //Toggle Class open On main settings Box
    document.querySelector(".settings-box").classList.toggle("open");
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop in all list item
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
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of imgs
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];


setInterval(() => {
    //Get Random Number
    let randomNumber = Math.floor(Math.random() * imgsArray.length);

    //Change Background Image Url
    landingPage.style.backgroundImage = `url("imgs/${randomNumber+1}.jpg")`;
}, 10000);

