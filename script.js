// level 350 - fetch live data
let allEpisodes; // global scope to be accessible from inside all functions
let selectedSeriesContainer = "";
let seriesList = getAllShows();

function setup() {
  makePageForShows(seriesList);
}
//sorting shows in alphabetical order
seriesList.sort(function (a, b) {
  return a.name.localeCompare(b.name);
});

//showing all shows

//////////////////////////////////////////
// level 500 - show list and search

// listing of all shows as a tile with info - list of shows comes from array
// make show tile clickable
// get show.id of clicked item
// then find the SHOW ID and use it in fetch https://api.tvmaze.com/shows/SHOW_ID/episodes to get the episodes.
// 1. then show's episodes should be fetched and displayed -- DONE!
// 2. hide show listing tiles // display: hidden
// add home button --> make shows appear
// add search for shows (through show names, genres, and summary texts)

function makePageForShows(seriesList) {
  const seriesPage = document.getElementById("series-page");

  document.getElementById("series-page").innerHTML = ""; // clear out old content so it is replaced by the new content
  for (i = 0; i < seriesList.length; i++) {
    // step 1 - create elements
    let seriesDivContainer = document.createElement("div");
    let seriesTitleElement = document.createElement("h3");
    let seriesInfoDivElement = document.createElement("div");
    let seriesImageElement = document.createElement("img");
    let seriesBlurbElement = document.createElement("p");
    let seriesRatingElement = document.createElement("p");

    seriesDivContainer.setAttribute("data-showID", seriesList[i].id);

    // assign the divs classes
    seriesDivContainer.classList.add("series-container");
    seriesTitleElement.classList.add("series-title");
    seriesInfoDivElement.classList.add("series-info");
    seriesImageElement.classList.add("series-image");
    seriesBlurbElement.classList.add("series-blurb");
    seriesRatingElement.classList.add("series-rating");

    // step 2 - contents of elements
    seriesTitleElement.innerHTML = `${seriesList[i].name}`;
    if (seriesList[i].image !== null) {
      seriesImageElement.src = `${seriesList[i].image.medium}`;
    }
    seriesBlurbElement.innerHTML = `${seriesList[i].summary}`;
    seriesRatingElement.innerHTML = `Rated: ${seriesList[i].rating.average} Genre: ${seriesList[i].genres} Status: ${seriesList[i].status} Runtime: ${seriesList[i].runtime}`;

    // step 3 - append elements to series-page
    document
      .getElementById("series-page")
      .appendChild(seriesDivContainer)
      .appendChild(seriesInfoDivElement);
    seriesInfoDivElement.appendChild(seriesTitleElement);
    seriesInfoDivElement.appendChild(seriesImageElement);
    seriesInfoDivElement.appendChild(seriesBlurbElement);
    seriesInfoDivElement.appendChild(seriesRatingElement);

    seriesDivContainer.addEventListener("click", function (eventObject) {
      // this is getting the show id of clicked box
      selectedSeriesContainer = eventObject.currentTarget;
      console.log(selectedSeriesContainer);
      fetch(
        `https://api.tvmaze.com/shows/${selectedSeriesContainer.dataset.showid}/episodes`
      )
        .then((response) => response.json())
        .then((data) => {
          allEpisodes = data; // this was done to move allEpisodes to global scope
          makePageForEpisodes(allEpisodes);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
}

window.onload = setup;
//////////////////////////////////////////////////////////////////

////////////////////////// HELP!! ///////////////////////////////
// Why is the fetch not fetching the episodes?

// function fetchAllEpisodes(selectedSeriesContainer) {
//   return fetch(
//     `https://api.tvmaze.com/shows/${selectedSeriesContainer}/episodes`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       allEpisodes = data; // this was done to move allEpisodes to global scope
//       makePageForEpisodes(allEpisodes);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// level 400 - show selector drop down

function tvSeriesSetup(seriesList) {
  // create show dropdown
  let showDropdown = document.getElementById("show-select");

  let defaultShowOption = document.createElement("option"); // step 1 createElement
  defaultShowOption.textContent = "Select Show"; // step 2 set textContent
  showDropdown.appendChild(defaultShowOption); // step 3 appendChild
  showDropdown.selectedIndex = 0;

  //sort happens here BEFORE for loop
  seriesList.sort(function (a, b) {
    return a.name.localeCompare(b.name); // localeCompare means you can compare strings not just numbers
  });

  for (i = 0; i < seriesList.length; i++) {
    let option = document.createElement("option");
    option.value = seriesList[i].id;
    option.textContent = `${seriesList[i].name}`;
    showDropdown.appendChild(option);
  }

  // get selectedIndex of dropdown & compare selectedIndex.value to show.name
  showDropdown.addEventListener("change", function () {
    fetchAllEpisodes(showDropdown.value);
  });
}

function setup() {
  const seriesList = getAllShows();
  tvSeriesSetup(seriesList);
  makePageForShows(seriesList);
  //makePageForEpisodes(episodeList); OG
}

/////////////////////////////////////////////////////

function makePageForEpisodes(episodeList) {
  const episodesPage = document.getElementById("episodes-page");

  // level 100
  document.getElementById("episodes-page").innerHTML = ""; // clear out old content so it is replaced by the new content
  for (i = 0; i < episodeList.length; i++) {
    // step 1 - create elements
    let episodeDivContainer = document.createElement("div");
    let episodeTitleElement = document.createElement("h3");
    let episodeImageElement = document.createElement("img");
    let episodeBlurbElement = document.createElement("p");

    // assign the divs classes
    episodeDivContainer.classList.add("episode-container");
    episodeTitleElement.classList.add("episode-title");
    episodeImageElement.classList.add("episode-image");
    episodeBlurbElement.classList.add("episode-blurb");

    // assign unique ID to individual episode-container
    episodeDivContainer.id = "episode-container" + i;

    // step 2 - contents of elements
    episodeTitleElement.innerHTML = `${episodeList[i].name}-S${String(
      episodeList[i].season
    ).padStart(2, "0")}E${String(episodeList[i].number).padStart(2, "0")}`;
    episodeImageElement.src = `${episodeList[i].image.medium}`;
    episodeBlurbElement.innerHTML = `${episodeList[i].summary}`;

    // step 3 - append elements to episodes-page
    document.getElementById("episodes-page").appendChild(episodeDivContainer);
    episodeDivContainer.appendChild(episodeTitleElement);
    episodeDivContainer.appendChild(episodeImageElement);
    episodeDivContainer.appendChild(episodeBlurbElement);
  }

  // level 300 - episode selector

  let episodeDropdown = document.getElementById("episode-select");

  let defaultEpisodeOption = document.createElement("option"); // step 1 createElement
  defaultEpisodeOption.textContent = "Select Episode"; // step 2 set textContent
  episodeDropdown.appendChild(defaultEpisodeOption); // step 3 appendChild
  episodeDropdown.selectedIndex = 0;

  for (i = 0; i < episodeList.length; i++) {
    let option = document.createElement("option");
    option.value = episodeList[i].name;
    option.textContent = `S${episodeList[i].season
      .toString()
      .padStart(2, "0")}E${episodeList[i].number
      .toString()
      .padStart(2, "0")} - ${episodeList[i].name}`;
    episodeDropdown.appendChild(option);
  }

  // level 300 cont. - jump to episode

  episodeDropdown.addEventListener("change", function () {
    let optionSelection = episodeDropdown.selectedIndex - 1; // get index of selected option (-1 for placeholder)
    let episodeDivContainer = document.getElementById(
      "episode-container" + optionSelection
    ); // finding the corresponding episodeDivContainer using the ID
    episodeDivContainer.scrollIntoView({ behavior: "smooth" }); //scrolling to said episodeDivContainer container
  });
}

//makePageForEpisodes(allEpisodes); // OG

// level 200 - search bar

document
  .getElementById("search-input")
  .addEventListener("input", searchEpisode);

function searchEpisode() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  const filteredEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.toLowerCase().includes(searchInput) ||
      episode.summary.toLowerCase().includes(searchInput)
    ) {
      return episode;
    }
  });

  document.getElementById("displaying-num").innerText = filteredEpisodes.length;
  makePageForEpisodes(filteredEpisodes);

  // BUG - will search for matches even in they are part of a longer word (eg. 'die' will also show 'soldier')
}

//////////////////////////////////////////

// BUG - if you have a search ongoing, the select will not work

//////////////////////////////////////////

// TODO
// - avoid using global variable
// - separate using functions

//////////////////////////////////////////

///// window.location.href = option.value = `${episode.url}` -> to open episode URL

//////////////////////////////////////////
