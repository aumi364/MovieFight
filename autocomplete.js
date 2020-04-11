const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = htmlTemplate.autocomplete();
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    if (items.length > 0) {
      dropdown.classList.add("is-active");
    }

    for (let item of items) {
      const dropdownList = document.createElement("a");

      dropdownList.classList.add("dropdown-item");
      dropdownList.innerHTML = renderOption(item);
      dropdownList.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(dropdownList);
    }
  };
  input.addEventListener("input", middleware.debouncer(onInput, 500));

  //closing the dropdown
  document.addEventListener("click", () => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
  //clicking input toggle the dropdown
  input.addEventListener("click", () => {
    const x = resultsWrapper.childElementCount;

    if (input.contains(event.target) & (x > 0)) {
      dropdown.classList.add("is-active");
    }
  });
};
