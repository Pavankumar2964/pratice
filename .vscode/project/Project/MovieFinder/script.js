const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesDiv = document.getElementById("movies");

const API_KEY = "YOUR_OMDB_API_KEY"; // <-- replace this
const API_URL = "https://www.omdbapi.com/";

searchBtn.addEventListener("click", searchMovie);

function searchMovie() {
  const query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a movie name");
    return;
  }

  moviesDiv.innerHTML = "<p>Loading...</p>";

  fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "False") {
        moviesDiv.innerHTML = `<p>No movies found</p>`;
        return;
      }
      displayMovies(data.Search);
    })
    .catch(() => {
      moviesDiv.innerHTML = `<p>Error fetching data</p>`;
    });
}

function displayMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    moviesDiv.appendChild(card);
  });
}
