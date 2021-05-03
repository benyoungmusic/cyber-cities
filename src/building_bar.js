import Structure from "./asset_drawing";

export default class BuildingBar {
  constructor(ctx, screenSize, buildingBloom) {
    this.screenSizeX = screenSize[0];
    this.screenSizeY = screenSize[1];
    this.x = screenSize[0]/8;
    this.y = screenSize[1] - 2;
    this.x2 = screenSize[0] - this.x;
    this.y2 = screenSize[1]*(5/6);
    this.x3 = this.x * (7/8);
    this.x4 = this.screenSizeX - this.x3;
    this.ctx = ctx;
    this.bloomCtx = buildingBloom;
  }

  drawBuildingBar(ctx, bloomCtx) {
    this.buildingBarOutline();
    this.eightBase = new Structure({
      x: 150,
      y: 150,
      height: 50,
      width: 50,
      ctx: ctx,
      bloomctx: bloomCtx });
    this.eightBase.drawBase([this.screenSizeX/5, this.screenSizeY * (11/12)]);
    this.eightBase.drawTriangleBase([this.screenSizeX * 2/5, this.screenSizeY * (11/12)], this.ctx);
    this.eightBase.drawRedRoad([this.screenSizeX * 14/20, this.screenSizeY * (11/12)], [this.screenSizeX * 16/20, this.screenSizeY * (11/12)], this.ctx);
    this.eightBase.drawGreenRoad([this.screenSizeX * 11/20, this.screenSizeY * (11/12)], [this.screenSizeX * 13/20, this.screenSizeY * (11/12)], this.ctx);
  }

  buildingBarOutline() {
    this.bloomCtx.strokeStyle = 'rgb(100, 120, 0)';
    this.bloomCtx.lineWidth = 9;
    this.bloomCtx.beginPath();
    this.bloomCtx.moveTo(this.x, this.y);
    this.bloomCtx.lineTo(this.x3, this.y2);
    this.bloomCtx.lineTo(this.x4, this.y2);
    this.bloomCtx.lineTo(this.x2, this.y);
    this.bloomCtx.lineTo(this.x, this.y);
    this.bloomCtx.stroke();

    this.ctx.strokeStyle = 'rgb(100, 120, 0)';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x3, this.y2);
    this.ctx.lineTo(this.x4, this.y2);
    this.ctx.lineTo(this.x2, this.y);
    this.ctx.fillStyle = 'rgb(45, 50, 65)';
    this.ctx.lineTo(this.x, this.y);
    this.ctx.fill();
    this.ctx.stroke();
  }
}