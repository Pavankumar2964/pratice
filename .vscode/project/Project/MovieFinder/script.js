const form=document.querySelector('form');
const container=document.querySelector('.Image-container');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let query=form.querySelector('input').value;
  console.log(query);

  if(query==""){
    query="marvel"
  }
  tvMazeApi(query);
  form.reset()
})

async function tvMazeApi(query) {
 const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

  const movies= await req.json();

  makeImages(movies);
  
}


function makeImages(movies) {
  container.innerHTML = "";

  for (let movie of movies) {
    const show = movie.show;

    // 1. Get Image
    let src = show.image
      ? show.image.medium
      : "https://via.placeholder.com/210x295?text=No+Image";

    // 2. Create Card Container
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // 3. Determine Streaming Platform
    // TVMaze uses 'network' for TV and 'webChannel' for streaming services (Netflix, HBO Max, etc.)
    const platform = show.network ? show.network.name : (show.webChannel ? show.webChannel.name : "Not Listed");

    // 4. Build the HTML inside the card
    card.innerHTML = `
      <img src="${src}" alt="${show.name}">
      <div class="movie-info-overlay">
        <h3>${show.name}</h3>
        <p><strong>Platform:</strong> ${platform}</p>
        <a href="${show.url}" target="_blank" class="movie-link">View Details</a>
      </div>
    `;

    // Click event for the image (optional, keeps your previous logic)
    card.querySelector("img").addEventListener("click", () => {
      showMovieDetails(show);
    });

    container.appendChild(card);
  }
}



