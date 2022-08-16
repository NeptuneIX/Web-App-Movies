import View from "./View.js";

// class SearchView{
//     _parentEl = document.querySelector(".search-result");
// }

// export default new SearchView();

class ResultsView extends View {
  _parentEl = document.querySelector(".search-results");
  _genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Scifi",
    10770: "Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  renderError() {
    const searchResults = document.querySelector(".search-results");
    searchResults.innerHTML = "";
    const data = `<div class="error-wrapper">
    <div class="error">No results. &#9785;</div>
  </div>`;
    searchResults.insertAdjacentHTML("afterbegin", data);
  }

  /**
   *
   * @param {String} data The title that's longer than 23 char
   * @returns {String} The formatted string
   */
  shortenTitle(data) {
    let newData = data;

    // Cut off one word
    newData = data.split(" ");
    newData = newData.slice(0, newData.length - 1);

    // Join the array
    const finalData = newData.join(" ");

    // If its still longer then use recursion to get it to a point where its less than 23
    if (finalData.length > 23) {
      newData = this.shortenTitle(finalData);
    } // We must have this for the recursion to work
    else {
      newData = finalData;
    }

    return newData;
  }

  /**
   *
   * @param {Object} data The data for each film
   * @returns Formatted HTML with all the results in it
   */
  _generateMarkup(data) {
    let html = "";
    const results = data.searchResults;
    results.forEach((data) => {
      const pep = data.genre_ids
        .slice(0, 3)
        .map((id, i) => this._genres[id] + "<br>")
        .join("<br>");

      // Only format the title if its longer than 23 chars
      const formattedTitle =
        data.title.length > 23
          ? this.shortenTitle(data.title).concat("...")
          : data.title;
      html = html.concat(`
      <div class="search-result" data-id="${data.id}">
      <img class="result-image" src="${
        data.poster_path
          ? `https://image.tmdb.org/t/p/original${data.poster_path}`
          : "images/noimage.png"
      }">
        <div class="result-details">
          <div class="result-name">
            <div class="result-name-title">${formattedTitle}</div>
            <div class="result-name-authors">${data.release_date}</div>
          </div>
          <div class="result-extra-details">
            <div class="result-rating">Avg.<br> ${data.vote_average}</div>
            <div class="result-agerating">${data.adult ? `18+` : "<18"}</div>
            <div class="result-maingenre">${
              data.genre_ids.length !== 0
                ? data.genre_ids
                    .slice(0, 3)
                    .map((id, i) => this._genres[id])
                    .join("<br>")
                : "Not found"
            }</div>
          </div>
        </div>
      </div>
      `);
    });
    return html;
  }
  renderSpinner() {
    const data = '<div class="loader-wrap"><div class="loader"></div></div>';
    this._parentEl.insertAdjacentHTML("afterbegin", data);
  }

  previewMovieHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const result = e.target.closest(".search-result");
      if (!result) return;
      handler(Number(result.dataset.id));
    });
  }

  renderTotalResults(data) {
    const element = document.querySelector(".result-count");
    element.textContent = `${data} results`;
  }
}

export default new ResultsView();
