let data = [];
const fetchData = async (searchData) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ef1ef5c3",
      s: searchData,
    },
  });
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};
widget.autocomplete();
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  if (movies.length > 0) {
    dropdown.classList.add("is-active");
  }

  for (let movie of movies) {
    const dropdownList = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    dropdownList.classList.add("dropdown-item");
    dropdownList.innerHTML = `
      <img src="${imgSrc}">
       ${movie.Title}
    `;
    dropdownList.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
    });
    resultsWrapper.appendChild(dropdownList);
  }
};
input.addEventListener("input", middleware.debouncer(onInput, 500));
const root = document.querySelector(".autocomplete");
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
