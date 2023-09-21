class PlayService {
  playListID = "playList";
  playList = [];

  constructor() {
    this.storageService = new StorageService();
    this.playList = this.getPlaysFromStorage();
  }
  savePlay(play) {
    this.playList.push(play);
    this.storageService.addOrUpdateItem(
      this.playListID,
      JSON.stringify(this.playList)
    );
  }
  findPlayById(playId) {
    return this.playList.find((play) => play.id == playId);
  }
  getAllPlays() {
    return this.playList;
  }
  getPlaysFromStorage() {
    try {
      const playListJson = this.storageService.getItem(this.playListID);
      if (playListJson == null || playListJson == undefined)
        throw new Error("No plays to display");

      return JSON.parse(playListJson);
    } catch (ex) {
      console.warn(ex);
      return [];
    }
  }
}
