import Movies from "./movies.js"
import Theme from "./theme.js"
import Generate from "./generate.js"
import Events from "./events.js"
import {
  apiKey,
  url,
  movieInputs
} from "./elements.js"

const movies = Movies({
  url,
  apiKey,
  movieInputs
})

const theme = Theme({

})

const generate = Generate({
  movieInputs
})

Events({ movies, generate, theme })