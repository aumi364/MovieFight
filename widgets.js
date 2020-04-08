let widget = {
  autocomplete() {
    const root = document.querySelector(".autocomplete");
    root.innerHTML = `
       <label><b>Search For a movie</b></label>
       <input class="input" />
       <div class="dropdown ">
      
         <div class="dropdown-menu">
             <div class="dropdown-content results">
             </div>
         </div>
       </div>`;
  },
};
