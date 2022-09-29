import View from "./View.js";

class RedirectView {
  _parentEl = document.querySelectorAll(".search");
  redirectHandler(handler) {
    this._parentEl.forEach((ser) => {
      ser.addEventListener("click", handler);
    });
  }

  gatherData() {
    // data = [keywords, advAge, advYear, advLang, pageNum]
    const options = document.querySelectorAll(".selected");
    const data = document.querySelector("#search").value;

    if (!data) {
      this.renderError();
      throw new Error();
    }
    // We get the data from the advanced options
    const genre = Array.from(options).map((data) =>
      data.textContent !==
      data.previousElementSibling.firstElementChild.lastElementChild.textContent
        ? data.textContent
        : null
    );

    const formattedData = [data, ...genre, 1];
    return formattedData;
  }
}

export default new RedirectView();
