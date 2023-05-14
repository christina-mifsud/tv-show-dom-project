// level 350 - fetch live data
let allEpisodes; // global scope to be accessible from inside all functions

//////////////////////////////////////////

/////////////// HELP!! //////////////////
// Do I have to keep everything the same as I will still be displaying the episodes of the selected show?

const allShows = getAllShows();
//let showID = show.id;

function fetchAllEpisodes() {
  return fetch(`https://api.tvmaze.com/shows/${showID}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data; // this was done to move allEpisodes to global scope
      makePageForEpisodes(allEpisodes);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//////////////////////////////////////////

function setup() {
  const allShows = getAllShows();
  fetchAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  // makePageForEpisodes(allShows); // array is being accessed
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // level 100
  document.getElementById("root").innerHTML = ""; // clear out old content so it is replaced by the new content
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

    // step 3 - append elements to root
    document.getElementById("root").appendChild(episodeDivContainer);
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

  //////////////////////////////////////////

  // level 400 - show selector

  // select dropdown for shows - list of shows comes from array
  // get selectedIndex of dropdown
  // compare selectedIndex.value to show.id.
  // then find the SHOW ID and use it in fetch https://api.tvmaze.com/shows/SHOW_ID/episodes to get the episodes.
  // then show's episodes should:
  // 1. be fetched and
  // 2. be displayed
  // shows to be alphabetic order (.toLowerCase then sort() method - new array ?) and case-insensitive - https://www.freecodecamp.org/news/how-to-sort-alphabetically-in-javascript/

  // create show dropdown
  let showDropdown = document.getElementById("show-select");

  let defaultShowOption = document.createElement("option"); // step 1 createElement
  defaultShowOption.textContent = "Select Show"; // step 2 set textContent
  showDropdown.appendChild(defaultShowOption); // step 3 appendChild
  showDropdown.selectedIndex = 0;

  for (i = 0; i < showsList.length; i++) {
    // why can't I access this showList?
    let option = document.createElement("option");
    option.value = showList[i].name;
    option.textContent = `${showList[i].name}`;
    showDropdown.appendChild(option);
  }

  // get selectedIndex of dropdown & compare selectedIndex.value to show.name
  showDropdown.addEventListener("change", function () {
    let showOptionSelection = showDropdown.selectedIndex - 1; // get index of selected option (-1 for placeholder)
    // finding the corresponding show object and get the showID
    if (showOptionSelection === showList.id) {
    }
  });

  //////////////////////////////////////////
}

window.onload = setup;
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

// BUG - if you have a search ongoing, the select will not work

//////////////////////////////////////////

///// window.location.href = option.value = `${episode.url}` -> to open episode URL

//////////////////////////////////////////
