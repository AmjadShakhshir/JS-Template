const mainColors = window.localStorage.getItem("main-color");

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

// //Random Background Option
// let backgroundOptions = false;

// //Variable To Control The Background Interval
// let backgroundInterval;

// const randomBackgroundsLocalItem = window.localStorage.getItem("background");

// // Check if there's Background chosen earlier in localStorage
// if(randomBackgroundsLocalItem !== null){
//   if (randomBackgroundsLocalItem === "true") {
//     backgroundOptions = true;
//   } else{
//     backgroundOptions = false;
//   }
//     //Remove active Class from all childrens
//     document.querySelectorAll(".random-backgrounds span").forEach(element => {
//         element.classList.remove("active");
//     });  
//     //Add class active in case the background option === background in localStorage
//     if (randomBackgroundsLocalItem === "true") {
//         document.querySelectorAll(".random-backgrounds .yes").classList.add("active");
//     } else{
//         document.querySelectorAll(".random-backgrounds .no").classList.add("active");

//     }
// }

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
        
        handleActive(e);
    });
});

// // Switch Random Backgrounds
// const randomBackgroundsElement = document.querySelectorAll(".random-backgrounds span");

// // Loop in all spans
// randomBackgroundsElement.forEach(spanElement => {

//     //click on span
//     spanElement.addEventListener("click", (e) =>{

//         //Remove active Class from all childrens
//         e.target.parentElement.querySelectorAll(".active").forEach(element => {
//             document.documentElement.style.setProperty('--random-background', e.target.dataset.background);

//             //set Main Background Option in localStorage
//             if (e.target.dataset.background === "yes") {
//                 window.localStorage.setItem("random-background", true);
//             } else{
//                 window.localStorage.setItem("random-background", false);
//             }
            
//             element.classList.remove("active");
//         });

//         //Add class active on self
//         e.target.classList.add("active");

//         if(e.target.dataset.background === "yes"){

//             backgroundOptions = true;

//             randomizeImgs();

//         } else{
            
//             backgroundOptions = false;

//             clearInterval(backgroundInterval);

//         }
//     });
// });

// Switch Background Image
const backgroundImgLi = document.querySelectorAll(".backgrounds-list li");
// Loop in all Backgrounds list item
backgroundImgLi.forEach(imageElement => {
    //click on Image item
    imageElement.addEventListener("click", (e) =>{
       document.documentElement.style.setProperty('--background-img', `url("/${e.currentTarget.dataset.backgroundimg}")`);
        //set Main Background Image in localStorage
        window.localStorage.setItem("background-img", e.currentTarget.dataset.backgroundimg);

        handleActive(e)
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of imgs
let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];


// function randomizeImgs() {
//     if (backgroundOptions === true){
//         backgroundInterval = setInterval(() => {
//             //Get Random Number
//             let randomNumber = Math.floor(Math.random() * imgsArray.length);

//             //Change Background Image Url
//             landingPage.style.backgroundImage = `url("imgs/${randomNumber+1}.jpg")`;
//         }, 1000);
//     }
// }

// function addSkillToOptionBox() {
//     const addSkill = document.querySelector(".skills-list");
//     const addSkillDiv = document.createElement("div");
//     const addSkillLi = document.createElement("li");

//     addSkillDiv.className = "popup";
//     addSkillDiv.style.cssText = "width: 300px; height: 160px; background-color: #f6f6f6; border-radius: 6px; position:fixed; top: 31%; left: 10%; display: flex;color: #ef0008;";

//     addSkillDiv.innerHTML = '<span style="margin-left:10px;"><p>Skill: </p><input type="text" style="width:130px;" name="skill" value="" /><p> Progress: </p><input type="text" style="width:130px;" name="progress" value="" /></span>';

//     addSkill.insertBefore(addSkillDiv, addSkill.lastElementChild);
    
//     addSkillDiv.addEventListener("keypress", (e) => {
//         if (e.key === "Enter") {
            
//             const addSkillLiPara = document.createTextNode(e.currentTarget.querySelector("input[name='skill']").value);
//             addSkillLi.appendChild(addSkillLiPara);
//             addSkill.insertBefore(addSkillLi, addSkill.lastElementChild);
//             addSkillDiv.remove();
//             console.log(e.currentTarget.querySelector("input[name='progress']").value);
//         }
            
//     });
// }

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });

    }

}; 


// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All menuLinks
const allLinks = document.querySelectorAll(".menuLinks a");

function scrollToTheSection(elements) {
    elements.forEach( element => {
        if (element !== null) {
            element.addEventListener("click", (e) =>{

                e.preventDefault();

                document.querySelector(e.target.dataset.section).scrollIntoView({

                    behavior: 'smooth'
                });
            });
        }
        
    });
}

scrollToTheSection(allBullets);
scrollToTheSection(allLinks);

function handleActive(e) {
    
    //Remove active Class from all childrens
    e.currentTarget.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    
    // Add class active on self
    e.currentTarget.classList.add("active");

}


// Show Bullets Option

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === "block") {

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");
        
    } else {

        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");

    }
    
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (e.target.dataset.display === "yes") {

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets-option", "block");

        } else {

            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets-option", "none");


        }

        handleActive(e);

    });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
    
    localItems = ["bullets-option", "main-color", "background-img"];

    localItems.forEach(item => {

        localStorage.removeItem(item);

        // Reload the page after Reset options
        window.location.reload();

    });

};