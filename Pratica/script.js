const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");

const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");

const movieListContainer = document.getElementById("movie-list");

// ?? - utilizado para fazer a comparação e retornar uma ação
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

searchButton.addEventListener("click", async () => {
  try {
    const nomeFilme = movieNameParametro();
    const anoFilme = movieYearParametro();

    let url = `http://www.omdbapi.com/?apikey=${key}${nomeFilme}${anoFilme}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("data: ", data);

    if (data.Error) {
      throw new Error("Filme não encontrado");
    }

    //chama a função de modal.js passando o valores da variavel data
    createModal(data);

    overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
});

function movieNameParametro() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado!");
  }
  return `&t=${movieName.value.split(" ").join("+")}`;
}

function movieYearParametro() {
  if (movieYear.value === "") {
    return ``;
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido.");
  }
  return `&y=${movieYear.value}`;
}

//adiciona objeto na lista movieList
function addToList(movieObject) {
  movieList.push(movieObject);
}

function upDateUI(movieObject) {
  movieListContainer.innerHTML += `
  <article id=movie-card-${movieObject.imdbID}>
        <img
          src="${movieObject.Poster}"
          alt="Poster de ${movieObject.Poster}">
        <button type="button" class="remove-button" onclick="removeFilmFromList('${movieObject.imdbID}')"><i class="bi bi-trash"></i> Remover</button>
    </article>`;
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  // método para puxar um dado da lista como verdadeiro ou falso
  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function removeFilmFromList(id) {
  notie.confirm({
    text: "Deseja remover o filme de sua lista?",
    submitText: "Sim",
    cancelText: "Não",
    position: "top",
    submitCallback: function remove() {
      {
        //verifica se eo id passado é diferente dos ids na listas
        movieList = movieList.filter((movie) => movie.imdbID !== id);
        document.getElementById(`movie-card-${id}`).remove();
        upDateLocalStore();
      }
    },
  });
}

function upDateLocalStore() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  upDateUI(movieInfo);
}
