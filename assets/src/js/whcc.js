$(document).ready(function() {
	// Set up variables
	const url = 'https://hacker-news.firebaseio.com/v0/';
	const newStories = 'newstories.json';
	const articlesPerLoad = 20;
	const $wrapper = $('.wrapper');
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	let articlesLoaded = 0;
	let maxArticles = 500; // We'll assign this later just to be sure

	// Get story IDs
	$.ajax({
		url: url + newStories,
		dataType: 'json',
		success: function (data) {
			storyIDs = data;
			maxArticles = storyIDs.length;
			// load initial articles
			loadArticles();

			// load more articles when we read the bottom of the screen
			initScrollListener();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log("Status: " + textStatus); 
			console.log("Error: " + errorThrown); 
		}
	});

	/*
	 * FUNCTIONS
	 */

	// Loads i articles, i = articlesPerLoad
	function loadArticles() {
		// Count Down
		let i = articlesPerLoad; 
		
		while (i > 0) {
			if(articlesLoaded <= maxArticles) {
				// "articlesLoaded" is also the key of the array
				getArticleData(storyIDs[articlesLoaded]); 
				articlesLoaded++;
			}
			i--;
		}
	}

	// Get data for an article and append it to the appropriate HTML element
	function getArticleData(articleID) {
		$.ajax({
			url: url + 'item/' + articleID + '.json',
			dataType: 'json',
			success: function (data) {
				// Get URL, Title, Author, Posted Time
				// console.log(data.url);
				// console.log(data.title);
				// console.log(data.by);
				// console.log(prettyTime(data.time));

				let html = '';
				html += '<article>';
				html += '<a href="' + data.url + '" target="_blank"><h2>' + data.title + '</h2></a>';
				html += '<p>';
				html += '<strong>' + data.by + '</strong><br/>';
				html += '<span style="font-style:italic;">' + prettyTime(data.time) + '</span><br/>';
				html += '</p>';
				html += '</article>';

				$wrapper.append(html)
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Status: " + textStatus); 
				console.log("Error: " + errorThrown); 
			}
		});
	}

	function prettyTime(unixTimestamp) {
		let time = new Date(unixTimestamp * 1000);
		let day = days[time.getDay()];
		let month = months[time.getMonth()];
		let date = time.getDate();
		let year = time.getFullYear();
		let clock = time.getHours() + ':' + time.getMinutes();

		// Display in [Day] [Month] [Date] [Year] : [24:00]
		return day + ', ' + month + ' ' + date + ' ' + year + ' - ' + clock;
	}

	function initScrollListener() {
		const $window = $(window);
		const $document = $(document);

		// Listen for scroll and resize, since resize could put user at bottom of screen also
		$window.on('scroll resize', function(){
			if($window.scrollTop() + $window.height() == $document.height()) {
				// If we are on the bottom, load more articles
				loadArticles();
			}
		});
	}
});