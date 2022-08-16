export default class View {
  clear() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", data);
  }

  homeBtnHandler() {
    document.querySelector(".home-btn").addEventListener("click", function () {
      window.location.href = "../searchPage/searchPage.html";
    });
  }

  redirectHandler(handler) {
    window.addEventListener("load", handler);
  }

  redirectSetup(data) {
    // data = [keywords, advAge, advYear, advLang, pageNum]
    let i = 1;
    document.querySelectorAll(".selected").forEach((et) => {
      et.textContent = data[i] ? data[i] : et.textContent;
      i++;
    });

    document.querySelector(".input-field > #search").value = data[0];
  }
}
