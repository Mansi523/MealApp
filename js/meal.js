let detailDisplay = JSON.parse(window.localStorage.getItem("detailMeal"));
console.log("detailDisplay",detailDisplay);

let count = document.getElementById("like-conunt");
let favouriteListDisplay = JSON.parse(window.localStorage.getItem("favourite"));
count.innerHTML=favouriteListDisplay.length;

let Meal = document.getElementById("Meal");

let categoryname = document.getElementById("category-name");
// let Instruction = document.getElementById("Instruction");
let detailspara = document.getElementById("details-para");
let detailsimage = document.getElementById("details-image");
let watchvideo = document.getElementById("watch-video");


Meal.innerHTML = detailDisplay.strMeal;
categoryname.innerHTML = detailDisplay.strCategory;
detailspara.innerHTML = detailDisplay.strInstructions;
detailsimage.src  = detailDisplay.strMealThumb;
watchvideo.href = detailDisplay.strYoutube;



