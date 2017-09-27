var input = document.getElementById("input");
var songList = document.getElementById("songlist");
var extra = "";
var links;
var searchIcon = document.getElementById("search");
var lastfmKey = process.env.lastfmKey;
var youtubeKey = process.env.youtubeKey;

// API call function
function APIcaller(event) {
  if (
    event.type === "click" ||
    (event.type === "keypress" && event.which === 13)
  ) {
    links = [];
    var artist = input.value;
    var xhr = new XMLHttpRequest();
    xhr.onload = pull;
    xhr.onerror = error;
    xhr.open(
      "get",
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
        artist
      )}&limit=10&api_key=${lastfmKey}&format=json`
    );
    xhr.send();

    function pull() {
      var parsed = JSON.parse(this.responseText);
      displayContent(parsed);
    }

    function error(err) {
      console.log("Error: ", err);
    }
  }
}

//keypress listener that calls the API and sends the parsed data to the displayContent function
input.addEventListener("keypress", APIcaller);

//click listener that calls API
searchIcon.addEventListener("click", APIcaller);

//prints songs to the html
function displayContent(songs) {
  songList.setAttribute("class", "ui raised container segment");

  var html = '<div class="ui items center aligned divided vertical segment">';
  html += '<div class="ui items center aligned divided vertical segment">';

  songs.toptracks.track.forEach(function(i, index) {
    var songName = i.name;
    var artist = input.value;
    var search = artist + " " + songName;
    html += '<div class="item">';
    html += '<div class="content">';
    html += '<h1 class="header">';
    html += songName;
    html += "</h1>";
    html += '<div class="extra">';
    html += "</div>";
    html += "</div>";
    html += "</div>";
    youTube(search, index);
  });
  html += "</div>";
  html += "</div>";

  songList.innerHTML = html;
  extra = document.querySelectorAll(".extra");
}

function youTube(search) {
  var xhr = new XMLHttpRequest();
  xhr.onload = ytListener;
  xhr.onerror = ytError;
  xhr.open(
    "get",
    `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(search)}&maxResults=1&part=snippet&key=${youtubeKey}`
  );
  xhr.send();

  function ytListener() {
    var parse = JSON.parse(this.responseText);
    var id = parse.items[0].id.videoId;
    extra.item(index).innerHTML += '<a class="ui mini basic green button" id="songlink" href="https://www.youtube.com/watch?v=' + id + '">Listen</a>';
  }

  function ytError(err) {
    console.log("Error: ", err);
  }
}
