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
let input = document.querySelector("#input");
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies);
  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${movie.Poster}">
      <h1> ${movie.Title}</h1>
    `;
    document.querySelector("#target").appendChild(div);
  }
};
input.addEventListener("input", middleware.debouncer(onInput, 500));
