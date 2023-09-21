class Play {
  constructor(name, conductor, scenography, lighting, sound, imgUrl, cost, id) {
    this.name = name;
    //this.imageUrl =
    // imageUrl ||
    //   "https://live.staticflickr.com/65535/53153899787_3c801dcfa2_h.jpg";
    this.conductor = conductor;
    this.scenography = scenography;
    this.lighting = lighting;
    this.sound = sound;
    this.imgUrl = imgUrl;
    this.cost = cost;
    this.id = id || this.generateId();
  }
  generateId() {
    return Math.round(Math.random() * 1000);
  }
}
