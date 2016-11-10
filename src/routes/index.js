import Home from './Home'
import Counter from './Counter'
import Lyrics from './Lyrics'
import Preface from './Preface'
import About from './About'
import Favourite from './Favourite'
import Search from './Search'

export default {
	indexRoute: Home,
	childRoutes: [Lyrics, Preface, About, Favourite, Search]
}
