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