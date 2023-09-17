
const category = document.getElementById("category");
const mainFoodSection = document.getElementById("display_common_food");
let categoryList=[];
let categoryname = {};
let MainFoodList =[];
let dummy = "";
//for handling the section in the categories.
  const handleCategoryList =(e)=>{
    categoryname = categoryList.find((item,index)=>(index === e));
    console.log("e",categoryname);
    window.localStorage.setItem("category",JSON.stringify(categoryname));
    dummy="";
    MainDisplay();
}

// Category section using IIFE.

(function () {
    // fetched data from api in the category section.
    async function handleCategory(){
        const categoryapi = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const categorydata = await categoryapi.json();
        console.log(categorydata);
        categoryList=categorydata.categories.slice(0,5);

        showInCategory();
      }
      
      handleCategory();
        //function for showing category
      function showInCategory(){
        console.log(categoryList.categories);
        category.innerHTML += categoryList.map((categories,index)=>(
    
                  `
                  <div class="item" onclick="handleCategoryList(${index})">
                   
                  <img src="${categories.strCategoryThumb
                  }"/>
                  </div>

                  `         
        ))
     }

  })();

  
// display food section.

function MainDisplay(){
    // fetched data from api in the category section.
    let categoryname = "";
    async function handleMainFood(){
        dummy =document.getElementById("InputValue").value;
         document.getElementById("InputValue").value="";
    
      const localcategory = window.localStorage.getItem("category");
   

      
        try {
          const categoryObject = JSON.parse(localcategory);
          console.log("***", categoryObject.strCategory);
           categoryname = categoryObject.strCategory;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      
        console.log(dummy);
        console.log(categoryname,localcategory);
        try{
          const categoryapi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ dummy===""?categoryname:dummy }`);
          const categorydata = await categoryapi.json();
         
          MainFoodList=categorydata.meals;
          console.log("MainFoodList",MainFoodList);
          showInMain();
        }catch(err){
              alert("Sorry,this item is not available right now!!")
        }
     
      }
     
      handleMainFood();
        //function for showing category
      function showInMain(){
          mainFoodSection.innerHTML="";
          console.log("mainFoodSection",MainFoodList)
        mainFoodSection.innerHTML += MainFoodList.map((meals,index)=>(
                  `
             
                  <div class="items my-3 mx-1" >
                   <div class="container-main-meals my-4 ">
                   <img src="${meals.strMealThumb
                   }"/>

                   <div class="container-main-meals-all">

                   <div class="container-meals-left">
                   <span>${meals.strMeal
                   }</span>
                   </div>
           
                   <div class="container-meals-right py-3">
                   <i class="fa-solid fa-heart"></i>
                  <span>₹${Math.floor(Math.random()*1000)}</span>
                   </div>

                   </div>

                    </div>
                   </div>

                  `         
        ))
     }

    }

    MainDisplay();

   const handleScearch=()=>{
   
    MainDisplay();
   }
