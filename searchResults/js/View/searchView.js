import View from "./View.js";

class SearchView extends View {
  _parentEl = document.querySelectorAll(".search");

  searchHandler(handler) {
    this._parentEl.forEach((el) => {
      function handler2(e) {
        // We get the input data
        const data = document.querySelector("#search").value;

        // if (!data) {
        //   this.renderError();
        //   throw new Error();
        // }
        // We get the data from the advanced options
        const genre = Array.from(document.querySelectorAll(".selected")).map(
          (data) =>
            data.textContent !==
            data.previousElementSibling.firstElementChild.lastElementChild
              .textContent
              ? data.textContent
              : null
        );

        const formattedData = [data, ...genre, 1];
        // Call the handler function and give it the correct data
        handler(formattedData, e);
      }
      el.addEventListener("click", handler2.bind(this));
    });
  }

  resetHandler() {
    const reset = document.querySelector(".btn-delete");
    reset.addEventListener("click", function () {
      document.querySelector("#search").value = "";

      // Go through each of the adv options and set the text content back to the default
      Array.from(document.querySelectorAll(".selected")).forEach((option) => {
        option.textContent =
          option.previousElementSibling.firstElementChild.lastElementChild.textContent;
      });
    });
  }
}

export default new SearchView();
