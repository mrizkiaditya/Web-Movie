import axios from 'axios'

export const getMovieList = async () => {
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=129a94e2fed90c5d7ebedc197910b363`)
    return movie.data.results
}

export const searchMovie = async (q) => {
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}&page=1&api_key=129a94e2fed90c5d7ebedc197910b363`)
    return search.data
}