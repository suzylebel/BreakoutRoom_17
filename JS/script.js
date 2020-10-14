const recipeNameEl = $("#recipeName");
const mealPicEl = $("#mealPic");
const recipeSiteEl = $("#recipeSite")
const videoTurtEl = $("#videoTutorial")

let queryURL = "https://www.themealdb.com/api/json/v1/1/random.php"
console.log(queryURL)

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response){
    console.log(response)
    recipeNameEl.text(response.meals[0].strMeal);
    mealPicEl.html('<img width=\"200\" height=\"200\" src="' + response.meals[0].strMealThumb + '">');
    recipeSiteEl.html('<a href="' + response.meals[0].strSource + '">Recipe Here!</a>');
    videoTurtEl.text(response.meals[0].strYoutube);
})
