// variables
let favouriteListDisplay = [];
// fetch element by id
const favDisplay = document.getElementById("display_common_food");
const displayfav = document.getElementById("display-fav");
const goback = document.getElementById("go-back");
let count = document.getElementById("like-conunt");

// function for handling favourite section.
 function addfav(){
     favDisplay.innerHTML = "";
      favouriteListDisplay = JSON.parse(window.localStorage.getItem("favourite"));
        count.innerHTML=favouriteListDisplay.length;
         if(favouriteListDisplay.length<=0){
            displayfav.style.display="none";
            goback.style.display="flex";
         }else{
            displayfav.style.display="block";
            goback.style.display="none";
         }
         favDisplay.innerHTML+= favouriteListDisplay.map((item,index)=>(
            ` <div class="items my-3 mx-1">
                <div class="container-main-meals my-4 ">
                <i onclick="handleDelete(${item.idMeal})" class="fa-solid fa-trash"></i>
                <img
                   src="${item.strMealThumb}" />
                                         
               <div class="container-main-meals-all">

                   <div class="container-meals-left">
                       <span>${item.strMeal}</span>
                   </div>

                   <div class="container-meals-right py-3">
                       <i class="fa-solid fa-heart"></i>
                       <span>₹${Math.floor(Math.random()*1000)}</span>
                   </div>

               </div>

              </div>
           </div>
       `
    ));

    }

  // function for handling delete section.
   const handleDelete=(id)=>{
    const result = favouriteListDisplay.filter((item)=>(
         item.idMeal != id
    ));
    
  // setting data for local storage of the favourite section.
    window.localStorage.setItem("favourite",JSON.stringify(result));
     alert("Item deleted succesfully");
     addfav();
   }

   addfav();


