function deletePlay(event) {
  try {
    console.log("deletePlay function called");

    // Get the playId from the data attribute
    const playId = event.target.getAttribute("data-play-id");

    // Check if playId is correctly retrieved
    console.log("Play ID to delete: " + playId);

    // Add a prefix to the key to make it unique
    const storageKey = playId;

    // Remove the play from localStorage
    localStorage.removeItem(storageKey);

    // Optionally, you can refresh the UI or perform other actions
    // ...

    // Prevent the default behavior of the anchor tag (if it's an anchor)
    event.preventDefault();
  } catch (error) {
    console.error("Error in deletePlay:", error);
  }
}

class PlayController {
  constructor() {
    this.playService = new PlayService();
  }
  createPlay() {
    const play = new Play();
    play.name = this.getInputValue("#inputName");
    play.conductor = this.getInputValue("#inputConductor");
    play.scenography = this.getInputValue("#inputScenography");
    play.lighting = this.getInputValue("#inputLighting");
    play.sound = this.getInputValue("#inputSound");
    play.cost = this.getInputValue("#inputCost");

    this.playService.savePlay(play);
    document.querySelector("#addPlayForm").reset();
    alert("Added successfully");
  }
  getInputValue(selector) {
    return document.querySelector(selector).value;
  }

  displayPlays() {
    const plays = this.playService.getAllPlays();

    let allPlaysAsHtml = `
        <li class="container-fluid bt-2 row border border-dark">
            <span class="col">Play</span>
            <span class="col">Conductor</span>
            <span class="col">Scenography</span>
            <span class="col">Lights</span>
            <span class="col">Sound</span>
            <span class="col">Cost</span>
            <span class="col"></span>
        </li>`;
    const storageService = new StorageService();
    plays.forEach((play) => {
      allPlaysAsHtml += `
            <li class="container-fluid row border-bottom py-3">
                <span class="col">${play.name}</span>
                <span class="col">${play.conductor}</span>
                <span class="col">${play.scenography}</span>
                <span class="col">${play.lighting}</span>
                <span class="col">${play.sound}</span>
                <span class="col">${play.cost}</span>
                <span class="col">
                    <div style="display: flex;">
                        <span style="margin-right:10px"><a class="btn btn-primary" href="/displaySinglePlay.html?playId=${play.id}">Edit</a></span>
                        <span><a class="btn btn-primary" data-play-id="${play.id}" onclick="deletePlay(event)">Delete</a></span>                    </div>
                </span>
            </li>
        `;
    });

    document.querySelector("#playDisplayArea").innerHTML = allPlaysAsHtml;
  }

  displaySinglePlay() {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("function runs");

    const play = this.playService.findPlayById(searchParams.get("playId"));

    // const play = { name: "Lear3", conductor: "Lee Taul" };
    const nameDiv = document.createElement("h2");
    nameDiv.innerText = play.name;
    nameDiv.classList.add("display-2");

    const imgDiv = document.createElement("img");
    imgDiv.src = play.imgUrl;
    imgDiv.classList.add("img-fluid");

    const conductorDiv = document.createElement("div");
    conductorDiv.innerText = "Conductor: " + play.conductor;
    conductorDiv.classList.add("h3");

    const scenographyDiv = document.createElement("div");
    scenographyDiv.innerText = "Scenography: " + play.scenography;
    scenographyDiv.classList.add("h3");

    const lightingDiv = document.createElement("div");
    lightingDiv.innerText = "Lighting: " + play.lighting;
    lightingDiv.classList.add("h3");

    const soundDiv = document.createElement("div");
    soundDiv.innerText = "Sound: " + play.sound;
    soundDiv.classList.add("h3");

    // nameDiv.innerText = play.name;

    const infoBlock = document.createElement("div");
    infoBlock.append(nameDiv);
    infoBlock.append(conductorDiv);
    infoBlock.append(scenographyDiv);
    infoBlock.append(lightingDiv);
    infoBlock.append(soundDiv);
    infoBlock.append(imgDiv);

    const displayTag = document.querySelector("#displaySinglePlayArea");
    displayTag.append(infoBlock);
  }
}
