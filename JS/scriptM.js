$("#find-food").on("click", randomFood);

function randomFood(event){
    event.preventDefault();
    const recipeNameEl = $("#recipeName");
    const mealPicEl = $("#mealPic");
    const recipeSiteEl = $("#recipeSite");

    let queryURL = "https://www.themealdb.com/api/json/v1/1/random.php"
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        console.log(response)
        recipeNameEl.html('<a href="'+ response.meals[0].strYoutube +'" target=\*"_blank\*">' + response.meals[0].strMeal + '</a>');
        mealPicEl.html('<img width=\"200\" height=\"200\" src="' + response.meals[0].strMealThumb + '">');
        recipeSiteEl.html('<a href="' + response.meals[0].strSource + '" target=\*"_blank\*>Recipe Here!</a>');    
    })
}