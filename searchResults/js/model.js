import { RESULTS_PER_PAGE } from "./helpers.js";

export const state = {
  searchData: {
    searchResults: [],
    page: 1,
    total_pages: 500,
    total_results: 10000,
    full_results: [],
    isFetchNeeded: false,
    originalSearchData: [],
  },
  resultsPerPage: RESULTS_PER_PAGE,
};

// export async function loadMovies(data) {
//   state.searchData = data;
// }

export async function getMovies(data, isCalledByPagination = false) {
  // data = [keywords, advAge, advYear, pageNum]

  // Make an api call
  const fetchRequest = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=a2dc2dbc8a1e02d9b16c3bf2817e0e5b&language=en-US&query=${
      data[0]
    }&page=${data[3] ? Math.ceil(data[3] / 2) : "1"}
    }${data[2] ? `&year=${data[2]}` : ""}${
      data[1] ? `$region=${data[1] === "USA" ? "en-us" : "de"}` : ""
    }`
  );

  const moviesResults = await fetchRequest.json();

  // If there are no results, throw an error
  if (moviesResults.results.length < 1) throw new Error();

  // The API gives results in increments of 20, we only want to display 10
  const resultsToDisplay =
    data[3] % 2 === 1
      ? moviesResults.results.slice(0, state.resultsPerPage)
      : moviesResults.results.slice(state.resultsPerPage);

  // To deal with the API giving results in increments of 20, we do some things to make it work, such as:
  // 1) Multiplying the total pages
  // 2) When we go from the 1st page to the 2nd we only get the latter half of the results and display them(gets tricky with the pagination buttons)
  state.searchData = {
    searchResults: resultsToDisplay,
    page: isCalledByPagination ? ++data[3] : data[3],
    total_pages:
      moviesResults.total_results > 10
        ? moviesResults.total_pages * 2
        : moviesResults.total_pages,
    total_results: moviesResults.total_results,
    full_results: moviesResults.results,
    isFetchNeeded: data[3] % 2 === 1 ? false : true,
    originalSearchData: data,
  };
}

export async function nextPage(data, queryData, isNextPage) {
  // Honestly, the API made this so much harder. Do not even bother deciphering this as it's for such a specific need.

  // If we clicked the NEXT button
  if (isNextPage && data.isFetchNeeded) {
    await getMovies(queryData, true);
  } else if (isNextPage && !data.isFetchNeeded) {
    state.searchData.searchResults = state.searchData.full_results.slice(10);
  }

  // If we clicked the PREV button
  if (!isNextPage && !data.isFetchNeeded) {
    await getMovies(queryData, true);
  } else if (!isNextPage && data.isFetchNeeded) {
    state.searchData.searchResults = state.searchData.full_results.slice(
      0,
      RESULTS_PER_PAGE
    );
  }
}

export async function previewMovie(redirectToPreviewId) {
  localStorage.setItem("movieId", JSON.stringify(redirectToPreviewId));

  window.location.href = "../resultPreview/resultPreview.html";
}
