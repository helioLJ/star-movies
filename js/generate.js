export default function Generate({
  
}) {

  function card({ title, genres, posterPath }, cardID) {
    document.querySelector(`#${cardID} .card-content p`).textContent = title
    document.querySelector(`#${cardID} .card-content span`).textContent = genres
    document.querySelector(`#${cardID} img`).src = `https://image.tmdb.org/t/p/w185/${posterPath}`
  }

  function showCard() {
    const card = document.querySelector('.screen2')
    card.style.transform = 'translateY(-103%)'
  }

  function closeCard() {
    const card = document.querySelector('.screen2')
    card.style.transform = 'translateY(0%)'
  }

  return {
    card,
    showCard,
    closeCard
  }
}