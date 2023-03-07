export default function Theme() {

  function getSelectedThemeButton() {
    const selectedThemeButton = document.querySelector('.activeBtnTheme')
    return selectedThemeButton ? selectedThemeButton.textContent : null
  }

  function removeSelectedButtons() {
    const themeButtons = document.querySelectorAll('#themeButtons button')
    themeButtons.forEach(btn => btn.classList.remove('activeBtnTheme'))
  }

  function setTheme() {
    let themeName = getSelectedThemeButton()
    const root = document.querySelector(':root')
    root.classList.add(themeName)
  }

  function unsetTheme() {
    const root = document.querySelector(':root')
    const selectedThemeButton = document.querySelector('.activeBtnTheme')
    root.classList.remove(selectedThemeButton.textContent)
  }

  return {
    getSelectedThemeButton,
    setTheme,
    removeSelectedButtons,
    unsetTheme
  }
}