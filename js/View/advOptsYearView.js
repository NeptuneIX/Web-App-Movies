import View from "./View.js";
import optionsView from "./optionsView.js";

class yearView extends View {
  _parentEl = document.querySelector(".dropdown--3 .option-container");

  renderYears(totalyears) {
    let html = `<div class="option">
    <input
      type="radio"
      class="radio"
      id="null"
      name="category"
    />
    <label for="null">SELECT YEAR</label>
  </div>`;
    let i = 0;
    while (i != totalyears) {
      const l = new Date().getFullYear();
      html = html.concat(`
                <div class="option">
                        <input
                          type="radio"
                          class="radio"
                          id="${l - i}"
                          name="category"
                        />
                        <label for="${l - i}">${l - i}</label>
                      </div>
                `);
      i++;
    }
    this.render(html);
    const OptionsView = new optionsView();
    OptionsView.optionsHandler();
  }
}

export default new yearView();
