import advOptsYearView from "./View/advOptsYearView.js";
import redirectView from "./View/redirectView.js";
import * as model from "./model.js";
// import optionsView from "./View/advOptsYearView";

async function redirectClick(e) {
  const data = redirectView.gatherData();
  await model.redirectSearch(data);
}

advOptsYearView.renderYears(73);
redirectView.redirectHandler(redirectClick);
