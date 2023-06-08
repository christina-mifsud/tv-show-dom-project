//level 400
const allShows = getAllShows();
function setup() {
  makePageForShow(allShows);
}
//sorting shows in alphabetical order
allShows.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});
//showing all shows
function makePageForShow(shows) {
  let showsEle = document.getElementById("show_div");
  showsEle.innerHTML = "";
  for (let show of shows) {
    const divEle = document.createElement("div");
    divEle.className = "show_card";

    const firstDiv = document.createElement("div");
    firstDiv.className = "first";
    const showName = document.createElement("h1");
    showName.innerText = show.name;
    firstDiv.append(showName);
    const image = document.createElement("img");
    image.className = "image_1";
    if (show.image) {
      image.src = show.image.medium;
    }
    firstDiv.append(image);
    const secondDiv = document.createElement("div");
    secondDiv.className = "second";
    const showSummary = document.createElement("p");
    showSummary.className = "summary";
    showSummary.innerHTML = show.summary;
    secondDiv.append(showSummary);
    const thirdDiv = document.createElement("div");
    thirdDiv.className = "third";
    const ratingEle = document.createElement("P");
    ratingEle.innerText = `Rated : ${show.rating.average}`;
    thirdDiv.appendChild(ratingEle);
    const genreEle = document.createElement("p");
    genreEle.innerText = `Genres : ${show.genres}`;
    thirdDiv.appendChild(genreEle);
    const statusEle = document.createElement("p");
    statusEle.innerText = `Status : ${show.status}`;
    thirdDiv.appendChild(statusEle);
    const runTimeEle = document.createElement("p");
    runTimeEle.innerText = `Runtime : ${show.runtime}`;
    thirdDiv.appendChild(runTimeEle);

    //navigating to episodes page by clicking show iamge.
    image.addEventListener("click", function () {
      let showId = show.id;
      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
        .then(function (response) {
          return response.json();
        })
        .then((result) => {
          makePageForEpisodes(result);
        });
    });
    divEle.append(firstDiv, secondDiv, thirdDiv);
    showsEle.appendChild(divEle);
  }
}

window.onload = setup;

/////////////////////////////////////////////////////
//Adding reset button to go back to home page.
const button = document.getElementById("home");
button.addEventListener("click", function () {
  makePageForShow(allShows);
});

//Adding search bar for shows
function searchForShow(showlist) {
  const searchEle = document.querySelector("#searching");
  searchEle.addEventListener("input", function searchshows() {
    const searchInput = searchEle.value.toLowerCase();
    const filteredshows = showlist.filter((show) => {
      if (
        show.name.toLowerCase().includes(searchInput) ||
        show.summary.toLowerCase().includes(searchInput) ||
        show.genres.toLowerCase().includes(searchInput)
      ) {
        return show;
      }
    });
    document.querySelector("#number").innerText = filteredshows.length;
    function selectAShow() {
      makePageForShow(filteredshows);
    }
  });
}

//select menu for shows
let showEle = document.getElementById("select-show");
let optionEle = document.createElement("option");
optionEle.innerText = "Select a show";
showEle.appendChild(optionEle);
function showsList() {
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerText = show.name;
    showEle.appendChild(option);
  });
}
showsList();
showEle.addEventListener("change", selectAShow);
function selectAShow() {
  const showName = showEle.value;
  const selectedShow = allShows.filter((show) => showName === show.name);
  let showId = selectedShow[0].id;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      makePageForShow(result);
      makePageForEpisodes(result);
      selectMenu(result);
      searchBar(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
///////////////////////////////////////////////////////////////
