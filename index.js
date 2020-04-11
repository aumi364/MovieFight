const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSrc}">
     ${movie.Title}
  `;
  },

  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchData) {
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
  },
};
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector(".left-autocomplete"),
  onOptionSelect(movie) {
    const tutorial = document
      .querySelector(".tutorial")
      .classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector(".left-summary"), "left");
  },
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector(".right-autocomplete"),
  onOptionSelect(movie) {
    const tutorial = document
      .querySelector(".tutorial")
      .classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector(".right-summary"), "right");
  },
});
let leftMovie, rightMovie;
//do another request
const onMovieSelect = async (movie, summary, side) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ef1ef5c3",
      i: movie.imdbID,
    },
  });

  summary.innerHTML = htmlTemplate.movieTemplate(response.data);
  console.log(response.data);

  if (side === "left") {
    leftMovie = response.data;
  } else if (side === "right") {
    rightMovie = response.data;
  }
  if (rightMovie && leftMovie) {
    const left = document
      .querySelector(".left-summary")
      .querySelectorAll(".notification");
    console.log(left);
    const right = document
      .querySelector(".right-summary")
      .querySelectorAll(".notification");
    const side = runComparison(left, right);
  }
};
const convertArray = (nodeList) => {
  const arr = [];
  for (let item of nodeList) {
    arr.push(item.dataset.value);
  }
  return arr;
};
const compare = (leftArr, rightArr) => {
  let countLeft = 0;
  let countRight = 0;
  leftArr.forEach((leftStat, index) => {
    const rightStat = rightArr[index];
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);
    if (leftSideValue > rightSideValue) {
      leftStat.classList.remove("is-normal");
      leftStat.classList.add("is-success");
      rightStat.classList.remove("is-normal");
      rightStat.classList.add("is-danger");
      countLeft++;
    } else {
      rightStat.classList.remove("is-normal");
      rightStat.classList.add("is-success");
      leftStat.classList.remove("is-normal");
      leftStat.classList.add("is-danger");
      countRight++;
    }
  });
  return countLeft > countRight ? "left" : "right";
};
const runComparison = (left, right) => {
  const leftArr = [...convertArray(left)];
  const rightArr = [...convertArray(right)];
  const comparedSide = compare(left, right);
  return comparedSide;
};
