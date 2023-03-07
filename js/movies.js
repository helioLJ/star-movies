export default function Movies({
  url,
  apiKey,
  movieInputs
}) {

  async function fetchMovieData(movieQuery) {
    if (movieQuery === undefined || movieQuery === "" || movieQuery === null) return
    const movie = movieQuery.replaceAll(" ", "%20")

    const response = await fetch(`${url}search/movie?${apiKey}&language=pt-BR&sort_by=popularity.desc&query=${movie}&page=1`)
    const data = await response.json()

    const resultsArray = data.results

    return {
      title: resultsArray[0].title,
      genres: await matchGenres(resultsArray[0].genre_ids),
      posterPath: resultsArray[0].poster_path
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

  function validation() {
    let array = []

    movieInputs.forEach(input => {
      if (input.value !== "") { array.push("passou!") }
    })

    return array.length == 4 ? true : false
  }

  function cleanInputs() {
    movieInputs.forEach(input => input.value = "")
  }

  return {
    fetchMovieData,
    validation,
    cleanInputs
  }
}