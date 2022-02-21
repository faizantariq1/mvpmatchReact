const API_KEY = "ae99278bfaf274d364b94a57db9e4025"
const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchSearchMovieShow: `/search/multi?api_key=ae99278bfaf274d364b94a57db9e4025&language=en-US&`
}
export default requests