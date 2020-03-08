const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by Song or Artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Show Search Results in DOM
function showData(data) {
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      song =>
        `
  <li>
  <span><strong>${song.artist.name} - ${song.title}</strong></span>
  <button class="btn" data-artist="${song.artist.name}" 
  data-songtitle="${song.title}" >Get Lyrics</button> 
  </li>`
    )
    .join("")}
  </ul> 
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      } 
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      } 
      `;
  } else {
    more.innerHTML = "";
  }
}

// Get Previous and Next Songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}
// Search for Lyrics API Call
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist} - ${songTitle}</strong></h2>
  <div>${lyrics}</div>`;

  more.innerHTML = "";
}

// Event Listeners
form.addEventListener("submit", e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please enter a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get Lyrics Button Click
result.addEventListener("click", e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
