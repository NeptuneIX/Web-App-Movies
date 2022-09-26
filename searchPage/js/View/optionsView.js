export default class OptionsView {
  // _selected = document.querySelectorAll(".selected");
  // _optionsContainer = document.querySelectorAll(".option-container");
  // _optionsList = document.querySelectorAll(".option");

  optionsHandler() {
    const _selected = document.querySelectorAll(".selected");
    const _optionsContainer = document.querySelectorAll(".option-container");
    const _optionsList = document.querySelectorAll(".option");

    // When its clicked, add the active class to the options container(they get displayed)
    _selected.forEach((select, i) => {
      select.addEventListener("click", () => {
        _optionsContainer[i].classList.toggle("active");
        _selected[i].classList.toggle("active");
      });
    });

    // If an option is clicked, update the selected option corresponding to its correct parent element
    _optionsList.forEach((o) => {
      o.addEventListener("click", (e) => {
        const parentContainer = e.target.parentNode;
        const parentContainerSelected = e.target.parentNode.nextElementSibling;
        parentContainerSelected.innerHTML = o.querySelector("label").innerHTML;
        parentContainer.classList.remove("active");
        parentContainer.nextElementSibling.classList.remove("active");
      });
    });
  }
}
