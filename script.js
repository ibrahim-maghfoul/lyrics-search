const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiUrl = "https://api.lyrics.ovh";

// Functions

async function searchSongs(term) {
  const res = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  console.log(data);

  let outout = "";
  data.data.forEach((song) => {
    outout += `<li>
        <span>
        <strong>${song.artist.name}
        </strong>${song.title}
        </span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`;
  });
  result.innerHTML = `<ul class="songs">${outout}</ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `${
      data.prev
        ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }`;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}

// Event Listners

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("enter a word");
  } else {
    searchSongs(searchTerm);
  }
});
