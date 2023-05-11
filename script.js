// level 350
function fetchAllEpisodes() {
  return (
    fetch("https://api.tvmaze.com/shows/82/episodes")
      .then((response) => response.json())
      // .then((data) => {
      //   makePageForEpisodes(data);
      // })
      .catch(function (error) {
        console.log(error);
      })
  );
}
/////// allEpisodes scope is messed up

async function setup() {
  const allEpisodes = await fetchAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  // level 100
  document.getElementById("root").innerHTML = "";
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

  let dropdown = document.getElementById("episode-select");

  let defaultOption = document.createElement("option"); // step 1 createElement
  defaultOption.textContent = "Select Episode"; // step 2 set textContent
  dropdown.appendChild(defaultOption); // step 3 appendChild
  dropdown.selectedIndex = 0;

  for (i = 0; i < episodeList.length; i++) {
    let option = document.createElement("option");
    option.value = episodeList[i].name;
    option.textContent = `S${episodeList[i].season
      .toString()
      .padStart(2, "0")}E${episodeList[i].number
      .toString()
      .padStart(2, "0")} - ${episodeList[i].name}`;
    dropdown.appendChild(option);
  }

  // level 300 cont. - jump to episode

  dropdown.addEventListener("change", function () {
    let position = dropdown.selectedIndex - 1; // get index of selected option (-1 for placeholder)
    let episodeDivContainer = document.getElementById(
      "episode-container" + position
    ); // finding the corresponding episodeDivContainer
    episodeDivContainer.scrollIntoView({ behavior: "smooth" }); //scrolling to said episodeDivContainer container
  });
}

window.onload = setup;
makePageForEpisodes(allEpisodes); // OG

// level 200 - search bar

document
  .getElementById("search-input")
  .addEventListener("input", searchEpisode);

function searchEpisode() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();

  /// HELP getting error saying allEpisodes not defined after adding fetch.

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

///// window.location.href = option.value = `${episode.url}` -> to open episode URL

//////////////////////////////////////////
