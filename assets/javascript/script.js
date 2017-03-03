var topics; // holds searches
topics = ["rabbit","shoebill","lion","sunfish","turtle","space","galaxy","sun","planets","cooking"];
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
		$("#tag-input").val("");
	}
});

$("#tag-input").on("keypress", function(event) {
	
	if (!event) {event = window.event};

	//keycode 13 == enter key
	if (event.keyCode == "13") {
		var entry = $("#tag-input").val().trim();
		if (entry == ""){} //do nothing
		else {
			displayTopic(entry);
			$("#tag-input").val("");
		}
	}
});


function displayTopic(entry) {
	entry = entry || ""; //set entry to be optional argument
	if (entry == "" || topics.includes(entry)){//do nothing if entry is empty string or is in array already	
		if (topics.includes(entry)) {
			alert("Entry already exists.");
		}
	} 
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

function animate(img) {
	$(img).attr("state","animate");
	$(img).attr("src",$(img).attr("data-animated"));
	$(img).parent().children("#play").css("display","none");
}

function pause(img) {
	$(img).attr("state","still");
	$(img).attr("src",$(img).attr("data-still"));
	$(img).parent().children("#play").css("display","initial");
}

//animates image on click
$(document.body).on("click", "img", function(){
	var img = $(this);
	var state = img.attr("state");

	if (state == "still") {
		animate(img);
	}
	else {
		pause(img);
	}

});

//animates on hover
$(document.body).on("mouseenter mouseleave", "img", function(){
	var img = $(this);
	var state = img.attr("state");

	if (state == "still") {
		animate(img);
	}
	else {
		pause(img);
	}

});

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
			var span = $("<span>");
			var p = $("<p>");
			div.attr("id","image-holder");
			p.text("Rating: " + response[i].rating.toUpperCase());
			img.attr("src", response[i].images.original_still.url);
			img.attr("state","still");
			img.attr("data-still", response[i].images.original_still.url);
			img.attr("data-animated", response[i].images.original.url);
			div.append(img);
			div.append("<img src=\"assets/images/play.png\" id=\"play\">");
			div.append(p);
			list.append(div);
			$("#list").append(list);
			//to add overlay image of play button. prepend? append?
		}


	}).fail(function(err) {
	  throw err;
	});
});

displayTopic();