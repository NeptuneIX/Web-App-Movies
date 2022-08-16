`use strict`;

export async function redirectSearch(data) {
  localStorage.setItem("redirectSearch", JSON.stringify(data));

  function changePage() {
    window.location.href = "../searchResults/searchResults.html";
  }
  setTimeout(changePage, 10);
}
