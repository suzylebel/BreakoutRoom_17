$(document).ready(function () {
    $("#find-food").on("click", function(event){
    
        event.preventDefault();
        const recipeNameEl = $("#recipeName");
        const mealPicEl = $("#mealPic");
        const recipeSiteEl = $("#recipeSite");
        const foodContainerEl=$("#food-container");
        const foodModal=$('#food-modal');
        let queryURL = "https://www.themealdb.com/api/json/v1/1/random.php"
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            foodModal.addClass("is-active"); 
            foodContainerEl.empty();
            console.log(response)
            recipeNameEl.html('<a href="' + response.meals[0].strYoutube + '" target=\*"_blank\*">' + response.meals[0].strMeal + '</a>');
            foodContainerEl.append(recipeNameEl);
            mealPicEl.html('<img width=\"200\" height=\"200\" src="' + response.meals[0].strMealThumb + '">');
            foodContainerEl.append(mealPicEl);
            recipeSiteEl.html('<a href="' + response.meals[0].strSource + '" target=\*"_blank\*>Recipe Here!</a>');
            foodContainerEl.append(recipeSiteEl);
            // foodModal.addClass("is-active"); 
            
        })
    })
      $("#modal-close").click(function() {

         $("#food-modal").removeClass("is-active");
      
      });

});