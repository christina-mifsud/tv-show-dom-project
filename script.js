//You can edit ALL of the code here
let allEpisodes;

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
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
    episodeTitleElement.innerHTML = `${show.name}`;
    episodeImageElement.src = `${show.image.medium}`;
    episodeBlurbElement.innerHTML = `${show.summary}`;

    // append elements to root
    document.getElementById("root").appendChild(episodeDivContainer);
    episodeDivContainer.appendChild(episodeTitleElement);
    episodeDivContainer.appendChild(episodeImageElement);
    episodeDivContainer.appendChild(episodeBlurbElement);
  }
}

window.onload = setup;
makePageForEpisodes(allEpisodes);

// for (i = 0; i < episodeList.length; i++) {
//   // create elements
//   let episodeDivContainer = document.createElement("div");
//   let episodeTitleElement = document.createElement("h3");
//   let episodeImageElement = document.createElement("img");
//   let episodeBlurbElement = document.createElement("p");

//   // assign the divs classes
//   episodeDivContainer.classList = "episode-container";
//   episodeTitleElement.classList = "episode-title";
//   episodeImageElement.classList = "episode-image";
//   episodeBlurbElement.classList = "episode-blurb";

//   // contents of elements
//   episodeTitleElement.innerHTML = `${show.name}`;
//   episodeImageElement.src = `${show.image.medium}`;
//   episodeBlurbElement.innerHTML = `${show.summary}`;

//   // append elements to root
//   document.getElementById("root").appendChild(episodeDivContainer);
//   episodeDivContainer.appendChild(episodeTitleElement);
//   episodeDivContainer.appendChild(episodeImageElement);
//   episodeDivContainer.appendChild(episodeBlurbElement);
// }

////////////////////////////////////////////////////////////////

// forEach

//   const episodeContainer = document.getElementById("episodeContainer");
//   rootElem.appendChild(episodeContainer);

//   const episodeBlurb = document.createElement("p");
//   const episodeStill = document.createElement("img");

//   let episodeObject = getAllEpisodes(episodes); // get the episode object
//   let episodeTitle = episodeObject.name; // then get the episode name
//   let episodeImage = episodeObject(image).medium; // then get the episode image
//   let episodeSummary = episodeObject.summary; // then get the episode summary

//   episodeBlurb.innerText = episodeSummary;

//   episodeContainer.appendChild(episodeTitle);
//   episodeContainer.appendChild(episodeStill);
//   episodeContainer.appendChild(episodeBlurb);
// }
