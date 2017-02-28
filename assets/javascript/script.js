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
		var btn = $("<button>");
		topics.push(entry);
		btn.attr("data-search",entry);
		btn.addClass("search");
		btn.text(entry);
		$("#buttons").append(btn);
	}
});

//search button item
$(document.body).on("click", ".search", function(){
	console.log("searching...");
	var target = $(this).attr("data-search").replace(/\s/,"+");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + target + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		response = response.data;
		var length = response.length;
		console.log(length);

		for (var i = 0; i < length; i++) {
			console.log("loop " + i);
			var div = $("<div>");
			var img = $("<img>");
			var p = $("<p>");
			p.text("Rating: " + response[i].rating.toUpperCase());
			img.attr("src", response[i].images.original_still.url);
			img.attr("state","still");
			img.attr("data-still", response[i].images.original_still.url);
			img.attr("data-animated", response[i].images.original.url);
			div.append(p);
			div.append(img);
			$("#images").append(div);
		}


	}).fail(function(err) {
	  throw err;
	});
});