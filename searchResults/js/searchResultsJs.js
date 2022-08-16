import * as model from "./model.js";
import optionsView from "./View/optionsView.js";
import resultsView from "./View/resultsView.js";
import searchView from "./View/searchView.js";
import yearView from "./View/advOptsYearView.js";
import paginationView from "./View/paginationView.js";
import View from "./View/View.js";
const view = new View();

async function searchMovies(data, fromRedirect = false) {
  try {
    // The data we receive is an array of the data in this format => [keywords, advAge, advYear, advLang] (if the adv option is not picked then its null)
    resultsView.renderSpinner();
    // This model function calls the data and updates model.state with the new data
    await model.getMovies(data);

    // Store the newly acquired data
    const searchResults = model.state.searchData;

    //Create markup
    const markup = resultsView._generateMarkup(searchResults);

    // Then we showcase the data using the view(properly formatted and everything)
    resultsView.render(markup);

    // Only used to showcase the total results besides the reset and search buttons
    resultsView.renderTotalResults(searchResults.total_results);

    // Handle the pagination
    determinePagionation(null, fromRedirect);
  } catch (err) {
    // This is only really used when there are no search results

    resultsView.renderError();
    paginationView.clear();
  }
}

async function determinePagionation(data, fromRedirect = false) {
  // Get the search data
  let searchResults = model.state.searchData;

  // fromRedirect is only used upon a redirect, it always triggers the first if statement
  // first if statement is trigged upon initial search
  if (data ? data.target.classList.contains("search") : fromRedirect) {
    paginationView.clear();
    // second if statement is triggered when clicking next or prev btns
  } else if (!data.target.classList.contains("search")) {
    resultsView.renderSpinner();

    // Get the new page number(stored in the html as a dataset)
    const newPage = Number(data.target.dataset.page);

    // Store the data needed for a new API call
    const data2 = [
      ...model.state.searchData.originalSearchData.slice(0, 4),
      newPage,
    ];

    // for the CURRENT page we go to the model and update the results(stored in the model as state)
    await model.nextPage(
      searchResults,
      data2,
      data.target.classList.contains("next-page")
    );

    // for the next page we decide whether a new api call is needed(we do this because this api gives results in increments of 20), therefore it's kind of complex
    if (
      (newPage > model.state.searchData.page &&
        !model.state.searchData.isFetchNeeded) ||
      (newPage < model.state.searchData.page &&
        !model.state.searchData.isFetchNeeded)
    ) {
      model.state.searchData.isFetchNeeded = true;
    } else {
      model.state.searchData.isFetchNeeded = false;
    }
    model.state.searchData.page = Number(newPage);

    // Update search results with new data
    searchResults = model.state.searchData;
    // Make the markup for the results
    const markup = resultsView._generateMarkup(searchResults);
    // Render the new data again
    resultsView.render(markup);
  }

  // Render the buttons
  paginationView.buttonRender(searchResults);
}

// This is only called once when the page loads
async function redirectLoader(data) {
  if (localStorage.getItem("redirectSearch")) {
    // Get the data
    const newData = JSON.parse(localStorage.getItem("redirectSearch"));
    // Update the advanced fields to the ones from the home page, as well as the query text
    view.redirectSetup(newData);

    // Search for movies with the data we've got
    await searchMovies(newData, true);

    // Remove it from the local storage
    localStorage.removeItem("redirectSearch");
  }
}

async function previewMovie(movieId) {
  await model.previewMovie(movieId);
}

function init() {
  searchView.searchHandler(searchMovies);
  searchView.resetHandler();
  yearView.renderYears(73);
  paginationView.paginationHandler(determinePagionation);
  view.redirectHandler(redirectLoader);
  view.homeBtnHandler();
  resultsView.previewMovieHandler(previewMovie);
}

init();
