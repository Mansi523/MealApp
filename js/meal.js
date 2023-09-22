//fetching data from local storage inside detailDisplay.
let detailDisplay = JSON.parse(window.localStorage.getItem("detailMeal"));
//fetching element by id.
let count = document.getElementById("like-conunt");
// fetching data from local storage inside favouritelistDisplay.
let favouriteListDisplay = JSON.parse(window.localStorage.getItem("favourite"));
count.innerHTML=favouriteListDisplay.length;
// fetching element by id
let Meal = document.getElementById("Meal");
let categoryname = document.getElementById("category-name");
let detailspara = document.getElementById("details-para");
let detailsimage = document.getElementById("details-image");
let watchvideo = document.getElementById("watch-video");

//setting data inside the elements
Meal.innerHTML = detailDisplay.strMeal;
categoryname.innerHTML = detailDisplay.strCategory;
detailspara.innerHTML = detailDisplay.strInstructions;
detailsimage.src  = detailDisplay.strMealThumb;
watchvideo.href = detailDisplay.strYoutube;



