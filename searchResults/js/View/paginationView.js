import View from "./View.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pages");

  paginationHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("page-btn")) {
        // We get the data from the button, most importantly the page we're going to.
        // Eg. We're on 2 and we click next we get 3 from this data
        handler(e);
      }
    });
  }

  buttonRender(newData) {
    this.clear();
    let html = "";
    let data = {
      ...newData,
    };
    if (data.total_pages === 1) return;
    if (data.page === 1) {
      html = html.concat(`
      <div></div>
      <div class="page-btn next-page" data-page="${++data.page}">Next ${
        data.page
      }</div>
      `);
      this._parentEl.insertAdjacentHTML("afterbegin", html);
      return;
    }
    if (data.page === data.total_pages) {
      html = html.concat(`
      <div class="page-btn prev-page" data-page="${--data.page}">Prev ${
        data.page
      }</div>
      <div></div>
      `);
      this._parentEl.insertAdjacentHTML("afterbegin", html);
      return;
    }
    const next = data.page + 1;
    const prev = data.page - 1;
    html = html.concat(`
    <div class="page-btn prev-page" data-page="${prev}">Prev ${prev}</div>
    <div class="page-btn next-page" data-page="${next}">Next ${next}</div>
    `);

    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }
}

export default new PaginationView();
