
$( document ).ready(function() {

  var drinkIDs = [11001,11003,11006,11007,11008,11728,12196,11844,17198,17211,17255];
  var modalEl = $("#cocktail-modal");
  var btnEl = $("#find-cocktail");
  var containerEl = $("#cocktail-container");

  // event listener for cocktail button
  btnEl.on("click", function(event) {
    event.preventDefault();
  
    var queryCtURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkIDs[randomIndex(drinkIDs.length)];

    $.ajax({ 
      url: queryCtURL,
      method: "GET"
    })
      .then(function(cocktailData) {
        console.log(cocktailData);
        var info = cocktailData.drinks[0];
        modalEl.addClass("is-active"); 
        containerEl.empty();

        $("#cocktail-name").text(info.strDrink);
        if (info.strDrinkThumb) {
          $("#cocktail-thumbnail").attr("src", info.strDrinkThumb);
        }
        
        // display ingredients
        var iList = $("<ul>");
        var ingr = [];
        ingr[0] = $("<li>").text(info.strMeasure1 + " " + info.strIngredient1);
        ingr[1] = $("<li>").text(info.strMeasure2 + " " + info.strIngredient2);
        if (info.strIngredient3) {
          if (info.strMeasure3) {
          ingr[2] = $("<li>").text(info.strMeasure3 + " " + info.strIngredient3);
          } else {
            ingr[2] = $("<li>").text(info.strIngredient3);
          }
          if (info.strIngredient4) {
            if (info.strMeasure4) {
            ingr[3] = $("<li>").text(info.strMeasure4 + " " + info.strIngredient4);
            } else {
              ingr[3] = $("<li>").text(info.strIngredient4)
            }
            if (info.strIngredient5) {
              if (info.strMeasure5) {
                ingr[4] = $("<li>").text(info.strMeasure5 + " " + info.strIngredient5);
              } else {
                ingr[4] = $("<li>").text(info.strIngredient5)
              }
              if (info.strIngredient6) {
                if (info.strMeasure6) {
                  ingr[5] = $("<li>").text(info.strMeasure6 + " " + info.strIngredient6);
                } else {
                  ingr[5] = $("<li>").text(info.strIngredient6)
                }
              }
            }
          }
        }
        for (let i = 0; i < ingr.length; i++) {
          iList.append(ingr[i]);
        }
        containerEl.append(iList);
        containerEl.append("<br>");
        
        // display how-to if exists
        if (info.strInstructions) {
          var inst = $("<p>").text(info.strInstructions);
          containerEl.append(inst);
          containerEl.append("<br>");
        }
        // display embedded video if exists
        if (info.strVideo) {
          var video = $("<iframe>");
          var str = info.strVideo.split("=");
          var videoURL = "https://www.youtube.com/embed/" + str[1];
          video.attr("width", "560");
          video.attr("height", "315");
          video.attr("src", videoURL);
          containerEl.append(video);
        }


    });

  })
   
   
   
  $("#close-modal").click(function() {
   
    $("#cocktail-modal").removeClass("is-active");
  
  });

  function randomIndex(n) {
    return Math.floor(Math.random() * parseInt(n));
  }



});
