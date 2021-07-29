import CityBuilder from './game_view';

export default class HomePage {
  constructor(canvas, bloom, dragCanvas, buildingBar, buildingBarBloom, buildingIcons) {
    canvas.width = 1000;
    canvas.height = 600;

    this.canvas = canvas;
    this.bloom = bloom;
    this.dragCanvas = dragCanvas;
    this.buildingBar = buildingBar;
    this.buildingBarBloom = buildingBarBloom;
    this.buildingIcons = buildingIcons;

    this.ctx = canvas.getContext('2d');
    this.homePageRender(canvas);

    this.gameRender = this.gameRender.bind(this);
    this.homePageRender = this.homePageRender.bind(this);
  }

  homePageRender(canvas) {
    let ctx = canvas.getContext('2d');
    console.log(canvas.width)
    console.log("homepagerender canvas", this.canvas)
    ctx.font = "30px Arial";
    ctx.fillStyle = "#42eff5";
    ctx.textAlign = "center";
    ctx.fillText("Digital Cities", canvas.width/2, canvas.height/2);
    ctx.font = "25px Arial";
    ctx.fillText("Click Anywhere to Begin", canvas.width/2, canvas.height/1.6);
    document.body.addEventListener("mousedown", e => {
      this.gameRender(this.canvas, this.bloom, this.dragCanvas, this.buildingBar, this.buildingBarBloom, this.buildingIcons)},
      {once : true});
  }

  gameRender(canvas, bloom, dragCanvas, buildingBar, buildingBarBloom, buildingIcons) {
    console.log("gamerender canvas", this.canvas)
    new CityBuilder(canvas, bloom, dragCanvas, buildingBar, buildingBarBloom, buildingIcons);
  }


}