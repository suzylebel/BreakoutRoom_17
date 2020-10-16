// giphy api

// event listeners for cocktail and food buttons
$("#find-cocktail").on("click", searchProduct);
$("#find-food").on("click", searchProduct);
$("#find-mood").on("click", searchProduct);
// function to search for a random giphy based off of what the product is, in this case cocktails or food 
function searchProduct(event) {
    event.preventDefault();
    console.log(event.target.value);
    console.log("function invoked");
    let searchItem = event.target.value;
    let APIKey = "GYo1Mdaf1E5B3knaTHWgaW01cgg9CMRp";
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=" + APIKey + "&limit=50";
    // make ajax call 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // check the response 
        console.log(response);
        // use Math.random() to choose a random giphy
        let randomIndex = Math.floor(Math.random() * 50);
        console.log("Random index: " + randomIndex);
        testURL = response.data[randomIndex].images.fixed_height.url;
        // the following ids are test ids to append the images to the html. make sure these ids are changed to whatever is used in the main index.html
        if (searchItem === "Cocktail") {
            $("#cocktail-giphy").empty();
            $("#cocktail-giphy").append($("<img>").attr("src", testURL));
        } else if (searchItem === "Food") {
            $("#food-giphy").empty();
            $("#food-giphy").append($("<img>").attr("src", testURL));
        } else if (searchItem === "Happy") {
            $("#mood-giphy").empty();
            $("#mood-giphy").append($("<img>").attr("src", testURL));
        }
    });
}
// trying to use the embed_url throws a CORB error in the console -- do not use response.data[0].embed_url