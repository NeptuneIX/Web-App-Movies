export default class View {
  clear() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    this.clear();
    this._parentEl.insertAdjacentHTML("afterbegin", data);
  }
}
