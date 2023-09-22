// fetch element by id
const category = document.getElementById("category");
const mainFoodSection = document.getElementById("display_common_food");
let count = document.getElementById("like-conunt");
const InputValue = document.getElementById("InputValue");
const suggestion = document.getElementById("suggestion");
const btnsearch = document.getElementById("btnsearch");
const displaysuggestion = document.getElementById("display_suggestion");
// variables for declaring values.
let categoryList = [];
let categoryname = {};
let MainFoodList = [];
let suggestedFoodList = [];
let suggestdata = "";
let dummy = "";
// fetching data from the local storage

let favouriteItemList =
  JSON.parse(window.localStorage.getItem("favourite")) || [];

count.innerHTML = favouriteItemList.length;

// eventlistner for making the display none when clicking outside the input section.

document.addEventListener("click", (event) => {
  if (event.target !== suggestion && event.target !== InputValue) {
    suggestion.style.display = "none";

    InputValue.style.borderRadius = "20px 0 0  20px";
    InputValue.style.borderBottom = "2px solid black";
    btnsearch.style.borderBottom = "2px solid black";
    btnsearch.style.borderRadius = " 0 20px 20px 0 ";
    btnsearch.style.height = "46px";
  }
});

// function for handling show suggestion in the main section.
function showSuggestion() {
  mainFoodSection.innerHTML = "";
  mainFoodSection.innerHTML += MainFoodList.map(
    (meals, index) =>
      `     
          <div class="items my-3 mx-1" >
           <div class="container-main-meals my-4 ">
           <img onclick="addMeal(${meals.idMeal})" src="${meals.strMealThumb}"/>

           <div class="container-main-meals-all">

           <div class="container-meals-left">
           <span onclick="addMeal(${meals.idMeal})">${meals.strMeal}</span>
           </div>
   
           <div class="container-meals-right py-3">
        
           <i onclick="handlefavourite(${
             meals.idMeal
           })" class="fa-solid fa-heart"></i>
          
           <span>₹${Math.floor(Math.random() * 1000)}</span>
           </div>

           </div>

            </div>
           </div>

          `
  );
}

// function for handling suggestion.

const handlesuggestion = async (id) => {
  const suggestiondisplay = suggestedFoodList.find((item) => item.idMeal == id);

  try {
    const categoryapi = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${suggestiondisplay.strMeal}`
    );
    const categorydata = await categoryapi.json();
    MainFoodList = categorydata.meals;
    showSuggestion();
  } catch (err) {
    console.log(err);
    alert("Sorry,this item is not available right now!!");
  }
};

// for handling scearch bar suggestion.

InputValue.addEventListener("input", async () => {
  const inputdata = InputValue.value;
  InputValue.style.borderRadius = "20px 0 0  0";
  suggestion.style.display = "block";
  InputValue.style.borderBottom = "none";
  btnsearch.style.borderBottom = "none";
  btnsearch.style.borderRadius = " 0 20px 0 0 ";
  suggestion.style.border = "2px solid black";
  suggestion.style.borderTop = "none";
  btnsearch.style.borderLeft = "none";
  btnsearch.style.height = "45px";

  try {
    const suggestionapi = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputdata}`
    );
    const suggestiondata = await suggestionapi.json();

    suggestedFoodList = suggestiondata.meals;
    if (suggestedFoodList == null) {
      return;
    }
  } catch (err) {
    console.log(err);
  }

  displaysuggestion.innerHTML = "";
  displaysuggestion.innerHTML += suggestedFoodList
    ?.map(
      (item, index) =>
        `
      <li onclick="handlesuggestion(${item.idMeal})"><i class="fa-regular fa-clock"></i><span>${item.strMeal}</span></li>
      
      `
    )
    .join("");
});

//for handling the section in the categories.

const handleCategoryList = (e) => {
  categoryname = categoryList.find((item, index) => index === e);
  window.localStorage.setItem("category", JSON.stringify(categoryname));
  dummy = "";
  MainDisplay();
};

// Category section using IIFE.

(function () {
  // fetched data from api in the category section.
  async function handleCategory() {
    const categoryapi = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categorydata = await categoryapi.json();
    categoryList = categorydata.categories;

    showInCategory();
  }

  handleCategory();

  //function for showing category
  function showInCategory() {
    category.innerHTML += categoryList.map(
      (categories, index) =>
        `
                  <div class="swiper-slide pb-5"
                  onclick="handleCategoryList(${index})">
                  <div class="img-box text-center">
                      <img src="${categories.strCategoryThumb}" alt=""/>
                      <span class="text-d">${categories.strCategory}</span>
                    </div>
                  </div>
          
                  `
    );
  }
})();

// display food section.

function MainDisplay() {
  // fetched data from api in the category section.
  let categorynamemain = "p";

  async function handleMainFood() {
    dummy = document.getElementById("InputValue").value;
    document.getElementById("InputValue").value = "";

    const localcategory = window.localStorage.getItem("category");

    try {
      const categoryObject = JSON.parse(localcategory);
      categorynamemain = categoryObject.strCategory;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    try {
      const categoryapi = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${
          dummy === "" ? categorynamemain : dummy
        }`
      );
      const categorydata = await categoryapi.json();

      MainFoodList = categorydata.meals;
      console.log("MainFoodList", MainFoodList);
      if (MainFoodList === null) {
        alert("Sorry,this item is not available right now!!");
        return;
      }
      showInMain();
    } catch (err) {
      alert("Sorry,this item is not available right now!!");
      console.log("err", err);
    }
  }

  handleMainFood();
  //function for showing category
  function showInMain() {
    mainFoodSection.innerHTML = "";
    console.log("mainFoodSection", MainFoodList);
    mainFoodSection.innerHTML += MainFoodList?.map(
      (meals, index) =>
        `
             
                  <div class="items my-3 mx-1" id="item-imp" >
                   <div class="container-main-meals my-4 ">
                   <img onclick="addMeal(${meals.idMeal})" src="${
          meals.strMealThumb
        }"/>

                   <div class="container-main-meals-all">

                   <div class="container-meals-left">
                   <span onclick="addMeal(${meals.idMeal})">${
          meals.strMeal
        }</span>
                   </div>
           
                   <div class="container-meals-right py-3">
                
                   <i onclick="handlefavourite(${
                     meals.idMeal
                   })" class="fa-solid fa-heart"></i>
                  
                   <span>₹${Math.floor(Math.random() * 1000)}</span>
                   </div>

                   </div>

                    </div>
                   </div>

                  `
    );
  }
}

MainDisplay();

const handleScearch = () => {
  MainDisplay();
};

//handlefavourite food function

const handlefavourite = (id) => {
  const fav = MainFoodList.find((item) => item.idMeal == id);
  const fav1 = favouriteItemList.find((item) => item.idMeal == fav.idMeal);

  if (fav1 === undefined) {
    alert("item is added!!");
    favouriteItemList.push(fav);
    window.localStorage.setItem("favourite", JSON.stringify(favouriteItemList));
    count.innerHTML = favouriteItemList.length;
  } else {
    alert("Item already exist");
  }
};

//add meal page

const addMeal = (id) => {
  const addmealfav = MainFoodList.find((item) => item.idMeal == id);
  window.localStorage.setItem("detailMeal", JSON.stringify(addmealfav));
  window.location.href = "http://127.0.0.1:5500/meal.html";
};
