const buttonsTheme = document.querySelectorAll('#themeButtons button')
const apiKey = "api_key=e16d59788beadaf8addd0a7856320f7a"
const url = "https://api.themoviedb.org/3/"

const movieInputs = document.querySelectorAll('input')
const genreSelects = document.querySelectorAll('select')
const themeButtons = document.querySelectorAll('#themeButtons button')
const generateButton = document.querySelector('#buttonGenerate')

const moviesArray = []
const idArrays = ["card-1", "card-2", "card-3", "card-4"]

buttonsTheme.forEach(btn => {
  btn.onclick = () => {
    buttonsTheme.forEach(btn => btn.classList.remove('activeBtnTheme'))
    btn.classList.add('activeBtnTheme')
  }
})

generateButton.addEventListener('click', () => {
  if(isThereAnyUndefinedGenre() === null) {
    alert('Defina um gênero de filme')
    return
  }
  if (isThereAnyUndefinedMovie()) {
    alert('Preencha 4 filmes!')
    return
  }

  if (getSelectedThemeButton() === null) {
    alert('Sem tema')
    return
  }
  generate()
})

function generate() {
  movieInputs.forEach(async (input, index) => {
    let movie = await fetchMovieData(input.value)
    changeCardContent(movie, idArrays[index])
  })
}

function isThereAnyUndefinedMovie() {
  return Array.from(movieInputs).some(input => input.value === "" || input.value === undefined)
}

function isThereAnyUndefinedGenre() {
  const genreSelectsArray = Array.from(genreSelects)
  genreSelectsArray.forEach(({ value }) => console.log(value))
  return genreSelectsArray.some(({ value }) => value === "" || value === null )
}

function changeCardContent({ title, posterURL, genres }, cardID) {
  document.querySelector(`#${cardID} .card-content p`).textContent = title
  document.querySelector(`#${cardID} .card-content span`).textContent = genres
  document.querySelector(`#${cardID} img`).src = posterURL
}

async function fetchMovieData(movieQuery) {
  if (movieQuery === undefined || movieQuery === "" || movieQuery === null) return
  const movie = movieQuery.replaceAll(" ", "%20")

  const response = await fetch(`${url}search/movie?${apiKey}&language=pt-BR&query=${movie}&page=1`)
  const data = await response.json()

  const resultsArray = data.results
  const firstResult = resultsArray[0]

  const movieGenresIDs = firstResult.genre_ids

  const title = firstResult.title
  const posterURL = `https://image.tmdb.org/t/p/w185/${firstResult.poster_path}`
  const genres = await matchGenres(movieGenresIDs)

  return {
    title,
    posterURL,
    genres
  }
}

async function matchGenres(IDs) {
  const allGenres = await fetchAllGenres()
  const genres = []

  IDs.forEach(id => {
    allGenres.forEach(genre => {
      if (genre.id === id) { genres.push(genre.name) }
    })
  })

  return genres.join(", ")
}

async function fetchAllGenres() {
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}&language=pt-BR`)
  const data = await response.json()
  const allGenres = data.genres

  return allGenres
}

async function addGenresToSelects() {
  const genres = await fetchAllGenres()

  genreSelects.forEach(select => {
    genres.forEach(({ name }) => {
      let option = document.createElement('option')
      option.value = name
      option.innerHTML = name
      select.appendChild(option)
    })
  })


}

function getSelectedThemeButton() {
  const selectedThemeButton = document.querySelector('.activeBtnTheme')
  return selectedThemeButton ? selectedThemeButton.textContent : null
}

addGenresToSelects()