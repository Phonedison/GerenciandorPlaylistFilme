const background = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");

const addMovietoList = document.getElementById("add-to-list");

let currentMovie = {};

function backgroundClickHandler() {
  overlay.classList.remove("open");
}

function addCurrentMovieToList() {
  if (isMovieAlreadyOnList(currentMovie.imdbID)) {
    notie.alert({ type: "error", text: "Filme já está na sua lista!" });
    return;
  }

  addToList(currentMovie);
  upDateUI(currentMovie);
  upDateLocalStore();
  backgroundClickHandler();
}

function createModal(data) {
  currentMovie = data;

  modalContainer.innerHTML = `
  <h2 id="modal-title">${data.Title} - ${data.Year}</h2>
        <section id="modal-body">
          <img id="movie-poster"
            src=${data.Poster}
            alt=" Poster do Filme - ${data.Title}" />
          <div id="movie-info">
            <h3 id="movie-plot">${data.Plot}</h3>
            <div id="movie-cast">
              <h4>Elenco:</h4>
              <h5>${data.Actors}</h5>
            </div>
            <div id="movie-genre">
              <h4>Gênero:</h4>
              <h5>${data.Genre}</h5>
            </div>
            <div id="movie-director">
              <h4>Diretor:</h4>
              <h5>${data.Director}</h5>
            </div>
            <div id="movie-awards">
              <h4>Premiações:</h4>
              <h5>${data.Awards}</h5>
            </div>
          </div>
        </section>
        <section id="modal-footer">
          <button id="add-to-list" onclick="addCurrentMovieToList()">Adicionar à Lista</button>
        </section>`;
}

background.addEventListener("click", backgroundClickHandler);

// createModal(data);

//addMovietoList.addEventListener("click", addCurrentMovieToList);
