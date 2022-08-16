import * as model from "./model.js";
import previewView from "./View/previewView.js";

async function checkMovie() {
  const movieId = localStorage.getItem("movieId");
  if (movieId) {
    // Call the movie
    const movie = await model.getMovies(movieId);

    // Render markup
    const html = previewView.generateMarkup(model.state);

    // Place in the html
    previewView.render(html);

    // Handle the user rating
    previewView.starRenderer();

    // Remove the wall blocking you from seeing the page as it's done loading
    previewView.removeLoader();
  }
}

previewView.redirectHandler(checkMovie);
previewView.homeBtnHandler();

// document.querySelectorAll("a").forEach((el) => {
//   console.log(el.innerHTML.split(" ").join("+"));
//   el.href = `http://www.google.com/search?q=${el.innerHTML
//     .split(" ")
//     .join("+")}`;
// });
