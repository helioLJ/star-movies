const generateButton = document.querySelector('#buttonGenerate')
const closeButton = document.querySelector('#closeBtn')
const buttonsTheme = document.querySelectorAll('#themeButtons button')

export default function Events({
  movies,
  generate,
  theme
}) {

  buttonsTheme.forEach(btn => {
    btn.onclick = () => {
      buttonsTheme.forEach(btn => btn.classList.remove('activeBtnTheme'))
      btn.classList.add('activeBtnTheme')
    }
  })

  generateButton.addEventListener('click', async () => {
    if (!movies.validation()) {
      alert('Selecione 4 filmes!')
      return
    }
    if (theme.getSelectedThemeButton() == null) {
      alert('Selecione um tema!')
      return
    }
    
    theme.setTheme()

    const movieDataOne = await movies.fetchMovieData(document.querySelector('#movieInputOne').value)
    generate.card(movieDataOne, 'card-1')
    const movieDataTwo = await movies.fetchMovieData(document.querySelector('#movieInputTwo').value)
    generate.card(movieDataTwo, 'card-2')
    const movieDataThree = await movies.fetchMovieData(document.querySelector('#movieInputThree').value)
    generate.card(movieDataThree, 'card-3')
    const movieDataFour = await movies.fetchMovieData(document.querySelector('#movieInputFour').value)
    generate.card(movieDataFour, 'card-4')

    generate.showCard()

  })

  closeButton.addEventListener('click', () => {
    theme.unsetTheme()
    theme.removeSelectedButtons()
    movies.cleanInputs()
    generate.closeCard()
  })
}