let htmlTemplate = {
  autocomplete() {
    return `
         <label><b>Search For a movie</b></label>
         <input class="input" />
         <div class="dropdown ">
             <div class="dropdown-menu">
               <div class="dropdown-content results"></div>
             </div>
         </div>`;
  },
  movieTemplate(movieDetail) {
    const dollars = parseInt(
      movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    );
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseInt(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));

    const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
      const value = parseInt(word);
      if (isNaN(value)) {
        return prev;
      } else {
        return prev + value;
      }
    }, 0);

    console.log(awards);

    return `
    <article class="media">
       <figure class="media-left">
          <p class="image">
            <img src="${movieDetail.Poster}" />
          </p>
       </figure>
      <div className="media-content">
          <div className="content">
            <h1>${movieDetail.Title}</h1>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
          </div>
      </div>
    </article>
    <article data-value=${awards} class="notification is-normal">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle"> Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-normal">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle"> Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-normal">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle"> Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-normal">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle"> IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-normal">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle"> IMDB Votes</p>
    </article>
    `;
  },
};
