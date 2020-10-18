$(document).ready(function () {
    // moment ().format
    var currentDay = moment().format('dddd');
    $("#currentDayOf").text("Today is: " + currentDay);
    var currentTime = moment().format('h:mm A');
    $("#currentDay").text("It is " + currentTime);
});

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
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=" + APIKey + "&limit=50";
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

// night planner time slots 
function nightPlannerTimeSlots() {
    // get the current day and time from https://momentjs.com/ and display it to the user
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm a"));
    // for loop to create the main content - rows, columns, user input form, and the save button
    for (let i = 0; i < 9; i++) {
        // rows 
        let newRow = $("<div>");
        newRow.addClass("columns timeSlotRow");
        // hourColumn
        let hourColumn = $("<div>");
        hourColumn.addClass("column is-2 is-offset-1 timeSlotHourColumn");
        // if statements to determine the hour column text using index i. The work-hour attribute set here is used later in the code to determine if the row is in the past, present, or future
        if (i < 6) {
            hourColumn.text(i + 6 + "PM");
            hourColumn.attr("work-hour", i + 18);
        } else if (i === 6) {
            hourColumn.text("12AM");
            hourColumn.attr("work-hour", 0);
        } else {
            hourColumn.text(i - 6 + "AM");
            hourColumn.attr("work-hour", i - 6);
        }

        // inputColumn
        let inputColumn = $("<div>");
        inputColumn.addClass("column is-7");
        // get the current hour in 24-hour format from https://momentjs.com/ so it can be compared with the work-hour attribute to determine whether the row is in the past, present, or future
        let current24Hour = moment().format("H");
        let current12Hour = parseInt(hourColumn.attr("work-hour"));
        if (current12Hour < current24Hour) {
            inputColumn.addClass("past");
        } else if (current12Hour > current24Hour) {
            inputColumn.addClass("future");
        } else {
            inputColumn.addClass("present");
        }

        // form for user input
        let userInputForm = $("<form>");
        let userInputText = $("<textarea>");
        userInputText.attr("type", "text");
        userInputForm.append(userInputText);
        inputColumn.append(userInputForm);
        // check if there is data saved to localStorage and if so, get it and add it to the correct row
        if (localStorage.getItem(i) === null) {
            userInputText.text("");
        } else {
            userInputText.text(localStorage.getItem(i));
        }

        // saveButtonColumn
        let saveButton = $("<button>");
        saveButton.addClass("column is-2 saveBtn");
        saveButton.attr("button-data-index", i);
        let saveButtonIcon = $("<i>");
        saveButtonIcon.addClass("far fa-save");
        saveButtonIcon.attr({
            "button-data-index": i,
            style: "font-size:20px"
        });
        // append the icon to the button
        saveButton.append(saveButtonIcon);
        // append all of the columns to the row in order
        newRow.append(hourColumn, inputColumn, saveButton);
        // append the row to the div container for display to the user
        $("#time-slots").append(newRow);
    }
    // save button event listener. this listener is put specifically on the button element so event delegation can be used to also handle if the user clicks on the icon, which is a child of the button element
    $("button").on("click", saveButtonHandler);
}

function notesSection() {
    // new row
    let notesRow = $("<div>");
    notesRow.addClass("columns");
    // hourColumn
    let hourColumn = $("<div>");
    hourColumn.addClass("column is-2 timeSlotHourColumn notesSlotRow is-vcentered");
    hourColumn.text("Notes");
    // inputColumn
    let notesColumn = $("<div>");
    notesColumn.addClass("column is-6 present");
    // form for user input
    let userInputForm = $("<form>");
    let userInputText = $("<textarea>");
    userInputText.attr({
        type: "text",
        rows: 10
    });
    userInputForm.append(userInputText);
    notesColumn.append(userInputForm);
    // check if there is data saved to localStorage and if so, get it and add it to the correct row
    if (localStorage.getItem("notes") === null) {
        userInputText.text("");
    } else {
        userInputText.text(localStorage.getItem("notes"));
    }
    // saveButtonColumn
    let saveButton = $("<button>");
    saveButton.addClass("column is-2 saveBtn notesSlotRow");
    saveButton.attr("button-data-index", "notes");
    let saveButtonIcon = $("<i>");
    saveButtonIcon.addClass("far fa-save");
    saveButtonIcon.attr({
        "button-data-index": "notes",
        style: "font-size:20px"
    });
    // append the icon to the button
    saveButton.append(saveButtonIcon);
    // append all of the columns to the row in order
    notesRow.append(hourColumn, notesColumn, saveButton);
    // append the row to the div container for display to the user
    $("#notes").append(notesRow);
    $("button").on("click", saveButtonHandler);
}

// this function handles the click event, whether it be on the icon or the blue area around the icon. this function uses an if statement to determine what the user pressed (blue area or icon) and saves the user's input to local storage using DOM traversal
function saveButtonHandler(event) {
    event.preventDefault();
    if (event.target.matches("i")) {
        var buttonIndex = event.target.getAttribute("button-data-index");
        var textInput = event.target.parentElement.previousElementSibling.lastChild.childNodes[0].value;
        localStorage.setItem(buttonIndex, textInput);
    } else if (event.target.matches("button")) {
        var buttonIndex = event.target.getAttribute("button-data-index");
        var textInput = event.target.previousElementSibling.lastChild.childNodes[0].value;
        localStorage.setItem(buttonIndex, textInput);
    }
}

nightPlannerTimeSlots();
notesSection();