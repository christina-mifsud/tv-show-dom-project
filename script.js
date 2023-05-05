//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  document.getElementById("root").innerHTML = "";
  for (i = 0; i < episodeList.length; i++) {
    // create elements
    let episodeDivContainer = document.createElement("div");
    let episodeTitleElement = document.createElement("h3");
    let episodeImageElement = document.createElement("img");
    let episodeBlurbElement = document.createElement("p");

    // assign the divs classes
    episodeDivContainer.classList = "episode-container";
    episodeTitleElement.classList = "episode-title";
    episodeImageElement.classList = "episode-image";
    episodeBlurbElement.classList = "episode-blurb";

    // contents of elements
    episodeTitleElement.innerHTML = `${episodeList[i].name}-S${String(
      episodeList[i].season
    ).padStart(2, "0")}E${String(episodeList[i].number).padStart(2, "0")}`;
    episodeImageElement.src = `${episodeList[i].image.medium}`;
    episodeBlurbElement.innerHTML = `${episodeList[i].summary}`;

    // append elements to root
    document.getElementById("root").appendChild(episodeDivContainer);
    episodeDivContainer.appendChild(episodeTitleElement);
    episodeDivContainer.appendChild(episodeImageElement);
    episodeDivContainer.appendChild(episodeBlurbElement);
  }
}

window.onload = setup;
makePageForEpisodes(allEpisodes);

// search bar
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
