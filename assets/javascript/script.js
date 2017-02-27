var topics; // holds searches
topics = ["rabbit","shoebill","lion"];
//theme: animals
//10 static images per search
//images should animate on click
//display image rating
//http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
/*

    q - search query term or phrase
    limit - (optional) number of results to return, maximum 100. Default 25.
    offset - (optional) results offset, defaults to 0.
    rating - (optional) limit results to those rated (y,g, pg, pg-13 or r).
    lang - (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code. See list of supported languages here
    fmt - (optional) return results in html or json format (useful for viewing responses as GIFs to debug/test)
*/

//make button
$("#add").on("click", function(event) {
	event.preventDefault();
	
	console.log(event.preventDefault());

	var entry = $("#tag-input").val().trim();
	var btn = $("<button>");

	topics.push(entry);
	btn.attr("data-search",entry);
	btn.attr("id","search");
	btn.text(entry);
	$("#buttons").append(btn);
})

//search button item
$("#search").on("click", function(){
	console.log("searching...");
	var target = $(this).attr("data-search").replace(/\s/,"+");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + target + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		var div = $("<div>");
		var img = $("<img>");
		var p = $("<p>");
		p.text("Rating: " + data.rating.toUpperCase());
		img.attr("src", data.images.original_still.url);
		img.attr("state","still");
		img.attr("data-still", data.images.original_still.url);
		img.attr("data-animated", data.images.original.url);
		div.append(p);
		div.append(img);


	}).fail(function(err) {
	  throw err;
	});
})