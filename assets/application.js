var videoFiles = [
	{"file": "spencer-sleeping-la", "title": "Sleeping in LA" },
	{"file": "spencer-sleeping-santa-monica", "title": "Sleeping in Santa Monica" },
	{"file": "sleeping-mv-08-20-2012", "title": "Sleeping in Mountain View"},
	{"file": "sleeping-vegas-08-19-2012", "title": "Sleeping in Vegas"},
	{"file": "sleeping-vegas-desert-08-19-2012", "title": "Sleeping in the Vegas Desert"},
];

var t = 1;
var globalPosition = Math.floor((Math.random()*videoFiles.length));

function playVideoWithPosition(position) {
	var title = videoTitleFromPosition(position);
	var videoFile = videoFileFromPosition(position);
	var posterFile = posterFileFromPosition(position);

	if($("div.videoBG_wrapper").length)
		$("div.videoBG_wrapper").remove();

	if($("div.video-background").length)
		$("div.video-background").remove();

	$("div#title").html(title);
	$('body').append("<div class='video-background'></div>");

	$('.video-background').videobackground({
		videoSource: [
				[videoFile + '.mp4', 'video/mp4'],
				[videoFile + '.webm', 'video/webm'], 
				[videoFile + '.ogv', 'video/ogg']
			], 
		poster: posterFile,
		endedCallback: function() {
			nextVideo(globalPosition);
		}
	});
}

function videoFileFromPosition(position) {
	return "videos/" + videoFiles[position]['file'];
}

function videoTitleFromPosition(position) {
	return videoFiles[position]['title'];
}

function posterFileFromPosition(position) {
	return "videos/" + videoFiles[position]['file'] + ".jpg";
}

function nextVideo(position) {
	var nextPosition = position += 1;
	if(nextPosition >= videoFiles.length)
		nextPosition = 0;

	globalPosition = nextPosition;
	playVideoWithPosition(nextPosition);
}

function previousVideo(position) {
	var prevPosition = position -= 1;
	if(prevPosition < 0)
		prevPosition = videoFiles.length - 1;

	globalPosition = prevPosition;
	playVideoWithPosition(prevPosition);
}

$(document).keydown(function(e){
    if (e.keyCode == 37) { // left
       	previousVideo(globalPosition);
       	return false;
    } else if (e.keyCode == 39) {
    	nextVideo(globalPosition);
    	return false;
    }
});

$(document).ready(function() {
	playVideoWithPosition(globalPosition);

	setInterval(function(){
		t += 1;
		$('span#time').html(t);

		var meta = $("div.sleep-time").html();
	}, 1000);

	$('span.next').live('click', function(){
		nextVideo(globalPosition);
	});

	$('span.previous').live('click', function(){
		previousVideo(globalPosition);
	});
});