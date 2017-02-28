var topics; // holds searches
topics = ["rabbit","shoebill","lion"];
//theme: animals
//10 static images per search
//images should animate on click
//display image rating

//make button
$("#add").on("click", function(event) {
	event.preventDefault();

	var entry = $("#tag-input").val().trim();
	if (entry == ""){} //do nothing
	else {
		displayTopic(entry);
	}
});

function displayTopic(entry) {
	entry = entry || ""; //set entry to be optional argument
	if (entry == ""){} //do nothing if entry is empty string
	else {
		topics.push(entry);
	}
	var length = topics.length
	$("#buttons").empty();

	for (var i = 0; i < length; i++) {
		var btn = $("<button>");
		btn.attr("data-search", topics[i]);
		btn.addClass("search");
		btn.text(topics[i]);
		$("#buttons").append(btn);		
	}
}

//animates image
$(document.body).on("click", "img", function(){
	var state = $(this).attr("state");

	if (state == "still") {
		$(this).attr("state","animate");
		$(this).attr("src",$(this).attr("data-animated"));
	}
	else {
		$(this).attr("state","stille");
		$(this).attr("src",$(this).attr("data-still"));
	}

})

//search button item
$(document.body).on("click", ".search", function(){
	$("#list").empty();

	var target = $(this).attr("data-search").replace(/\s/,"+");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + target + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		response = response.data;
		var length = response.length;
		
		var imageList = $("<ul>")

		for (var i = 0; i < length; i++) {
			var list = $("<li>");
			var div = $("<div>");
			var img = $("<img>");
			var p = $("<p>");
			p.text("Rating: " + response[i].rating.toUpperCase());
			img.attr("src", response[i].images.original_still.url);
			img.attr("state","still");
			img.attr("data-still", response[i].images.original_still.url);
			img.attr("data-animated", response[i].images.original.url);
			div.append(img);
			div.append(p);
			list.append(div);
			$("#list").append(list);
		}


	}).fail(function(err) {
	  throw err;
	});
});

displayTopic();