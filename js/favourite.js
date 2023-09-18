let favouriteListDisplay = JSON.parse(window.localStorage.getItem("favourite"));

const favDisplay = document.getElementById("display_common_food");

console.log("displayfav",favouriteListDisplay);


    favDisplay.innerHTML+= favouriteListDisplay.map((item,index)=>(
           `    <div class="items my-3 mx-1">
           <div class="container-main-meals my-4 ">
               <i class="fa-solid fa-trash"></i>
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
       </div>`
    ));