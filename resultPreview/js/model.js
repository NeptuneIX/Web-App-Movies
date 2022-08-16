export let state = {
  name: "",
  poster_path: "",
  backdrop_path: "",
  vote_average: 0,
  vote_count: 0,
  overview: "",
  cast: [],
  directors: [],
  writers: [],
  stars: [],
  genres: [],
  release_date: "",
  runtime: 0,
  age_rating: "",
};

export async function getMovies(movieData = 293660) {
  let movie = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${movieData}?api_key=a2dc2dbc8a1e02d9b16c3bf2817e0e5b&language=en-US`
    ).then((val) => val.json()),
    fetch(
      `https://api.themoviedb.org/3/movie/${movieData}/credits?api_key=a2dc2dbc8a1e02d9b16c3bf2817e0e5b&language=en-US`
    ).then((val) => val.json()),
  ]);
  state = {
    name: movie[0].title,
    poster_path: movie[0].poster_path,
    backdrop_path: movie[0].backdrop_path,
    vote_average: movie[0].vote_average,
    vote_count: movie[0].vote_count,
    overview: movie[0].overview,
    cast: movie[1].cast.slice(0, 9),
    director: movie[1].crew.find((el) => el.job === "Director"),
    writers: movie[1].crew.filter((el) => el.job === "Writer"),
    stars: movie[1].cast.slice(0, 4),
    genres: movie[0].genres,
    release_date: movie[0].release_date,
    runtime: movie[0].runtime,
    age_rating: !movie[0].adult ? "<18" : "+18",
  };
}
