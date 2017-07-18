var input = document.getElementById('input');
var songList = document.getElementById('songlist');
var extra = "";
var links = [];
var searchIcon = document.getElementById('search');

// API call function
function APIcaller(event) {
  if (event.type === 'click' || event.type === 'keypress' && event.which === 13) {
      var artist = input.value;
      var xhr = new XMLHttpRequest();
      xhr.onload = pull;
      xhr.onerror = error;
      xhr.open('get', `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artist)}&limit=10&api_key=${YOUR-API-KEY}&format=json`);
      xhr.send();

    function pull () {
      var parsed = JSON.parse(this.responseText);
      displayContent(parsed);
    }

    function error (err) {  
      console.log('Error: ', err);  
	}
 } 
}

//keypress listener that calls the API and sends the parsed data to the displayContent function
input.addEventListener('keypress', APIcaller);

//click listener that calls API
searchIcon.addEventListener('click', APIcaller);

//prints songs to the html
function displayContent(songs) {
  songList.setAttribute("class", "ui raised container segment");

  var html = '<div class="ui items center aligned divided vertical segment">';
      html +=   '<div class="ui items center aligned divided vertical segment">';

      songs.toptracks.track.forEach(function(i) {
             var songName = i.name;
             var artist = input.value;
             var search = artist + ' ' + songName;
                html +=  '<div class="item">';
			    html +=    '<div class="content">';
			    html +=      '<h1 class="header">';
			    html +=       songName;
			    html +=      '</h1>';