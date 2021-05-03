// rectangle examples:

export default class Structure {
  constructor(params) {
    this.params = params;
    this.x = this.params.x;
    this.y = this.params.y;
    this.height = this.params.height;
    this.width = this.params.width;
    this.ctx = params.ctx
    this.bloomctx = params.bloomctx
  }

  drawRect(ctx, center, width, height) {
    ctx.strokeStyle = 'rgb(75, 255, 255)';
    // ctx.strokeRect(center[0] - width/2, center[1] - height/2, width, height); // outline of a rectangle
    ctx.strokeRect(center[0], center[1], width, height); // outline of a rectangle

    // this.bloomctx.lineWidth = 6
    // this.bloomctx.strokeStyle = 'rgb(75, 255, 255)';
    // this.bloomctx.strokeRect(center[0] - width/2, center[1] - height/2, width, height); // outline of a rectangle
  }



  drawRects(ctx, center, width, height) {
    this.drawRect(ctx, center, width, height)
    ctx.translate(center[0], center[1]);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-1 * center[0], -1 * center[1]);
    this.drawRect(ctx, center, width, height)
    ctx.translate(center[0], center[1]);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-1 * center[0], -1 * center[1]);
    this.drawRect(ctx, center, width, height);
    ctx.translate(center[0], center[1]);
    ctx.rotate(Math.PI / 4);
    ctx.translate(-1 * center[0], -1 * center[1]);
    this.drawRect(ctx, center, width, height)
    // ctx.translate(center[0], center[1]);
    // ctx.rotate(Math.PI / 6);
    // ctx.translate(-1 * center[0], -1 * center[1]);
    // this.drawRect(ctx, center, width, height)
    // ctx.translate(center[0], center[1]);
    // ctx.rotate(Math.PI / 6);
    // ctx.translate(-1 * center[0], -1 * center[1]);
    // this.drawRect(ctx, center, width, height)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawBase(center = [260, 200], lineWidth = 3) {
    this.ctx.strokeStyle = 'rgb(75, 255, 255)';
    this.ctx.lineWidth = lineWidth;
    this.drawThreeEights(this.ctx, center)
    this.bloomctx.lineWidth = 4.8;
    this.bloomctx.strokeStyle = 'rgb(75, 255, 255)';
    this.drawThreeEights(this.bloomctx, center)
  }

  drawThreeEights(ctx, center = [260, 200], size = [50, 30]) {
    this.drawEight(ctx, center, size);
    ctx.translate(center[0], center[1]);
    ctx.rotate(Math.PI / 3);
    ctx.translate(-1 * center[0], -1 * center[1]);
    this.drawEight(ctx, center, size);
    ctx.translate(center[0], center[1]);
    ctx.rotate(Math.PI / 3);
    ctx.translate(-1 * center[0], -1 * center[1]);
    this.drawEight(ctx, center, size);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawTriangleBase(start = [100, 100], ctx = this.ctx) {
    ctx.strokeStyle = 'rgb(75, 255, 255)';
    ctx.lineWidth = 2;
    this.drawTriangles(ctx, start);
    this.bloomctx.lineWidth = 3;
    this.bloomctx.strokeStyle = 'rgb(75, 255, 255)';
    this.drawTriangles(this.bloomctx, start)
  }

  drawTriangles(ctx = this.ctx, start = [100, 100]) {
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawUpgradedTriangles(ctx = this.ctx, start = [100, 100]) {
    this.drawTriangle(ctx, start)
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, start)
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, start)
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, start)
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 3);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])
    ctx.translate(start[0], start[1]);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-1 * start[0], -1 * start[1]);
    this.drawTriangle(ctx, [start[0] - 20, start[1] -12])

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawRedRoad(start = [100, 100], finish = [200, 200], ctx = this.ctx) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(finish[0], finish[1]);
    ctx.stroke();
    ctx.closePath();
    this.bloomctx.beginPath();
    this.bloomctx.lineWidth = 7;
    this.bloomctx.strokeStyle = 'rgb(255, 0, 0)';
    this.bloomctx.moveTo(start[0], start[1]);
    this.bloomctx.lineTo(finish[0], finish[1]);
    this.bloomctx.stroke();
    this.bloomctx.closePath();
  }

    drawGreenRoad(start = [100, 100], finish = [200, 200], ctx = this.ctx) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(0, 255, 0)';
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(finish[0], finish[1]);
    ctx.stroke();
    ctx.closePath();
    this.bloomctx.beginPath();
    this.bloomctx.lineWidth = 7;
    this.bloomctx.strokeStyle = 'rgb(0, 255, 0)';
    this.bloomctx.moveTo(start[0], start[1]);
    this.bloomctx.lineTo(finish[0], finish[1]);
    this.bloomctx.stroke();
    this.bloomctx.closePath();
  }

  drawTriangle(ctx = this.ctx, start = [400, 400]) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(start[0] + 20, start[1]);
    ctx.lineTo(start[0] + 9, start[1] + 10);
    ctx.lineTo(start[0], start[1]);
    ctx.stroke();
  }

  drawEight(ctx, center = [260, 200], size = [50, 30]) {
    let centerX = center[0];
    let centerY = center[1];
    let sizeX = size[0];
    let sizeY = size[1];
    //
    // this.ctx.rotate(45 * Math.PI / 180)
    // ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      centerX - sizeX/(10/3),
      centerY,
      sizeY/2,
      .5 * Math.PI,
      1.5 * Math.PI
    );
    ctx.quadraticCurveTo(
      centerX - sizeX/(20/3),
      centerY - sizeY/2,
      centerX,
      centerY
    );
    ctx.quadraticCurveTo(
      centerX + sizeX/(20/3),
      centerY + sizeY/2,
      centerX + sizeX/(10/3),
      centerY + sizeY/2,
    );
    ctx.arc(
      centerX + sizeX / (10/3),
      centerY,
      sizeY/2,
      .5 * Math.PI,
      1.5 * Math.PI,
      true
    );
    ctx.quadraticCurveTo(
      centerX + sizeX/(20/3),
      centerY - sizeY/2,
      centerX,
      centerY
    );
    ctx.quadraticCurveTo(
      centerX - sizeX/(20/3),
      centerY + sizeY/2,
      centerX - sizeX/(10/3),
      centerY + sizeY/2,
    );
    ctx.stroke();
    ctx.closePath();
  }

  bloom() {
    const scale = 50;
    const alpha = 0.3;
    this.drawRect(this.bloomctx, 6)
  }
}
