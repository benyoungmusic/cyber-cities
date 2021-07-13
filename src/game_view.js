import Structure from './asset_drawing';
import BuildingBar from './building_bar';

export default class CityBuilder {
  constructor(canvas, bloom, dragCanvas, buildingBar, buildingBarBloom, buildingIcons) {
  canvas.width = 1000;
  this.screenWidth = 1000;
  canvas.height = 600;
  this.screenHeight = 600;
  bloom.width = 1000;
  bloom.height = 600;
  buildingBar.width = 1000;
  buildingBar.height = 600;
  buildingBarBloom.width = 1000;
  buildingBarBloom.height = 600;
  buildingIcons.width = 1000;
  buildingIcons.height = 600;
  const ctx = canvas.getContext('2d');
  this.ctx = ctx;
  this.buildingBarCtx = buildingBar.getContext('2d');
  this.buildingBloom = buildingBarBloom.getContext('2d')
  this.buildingIcons = buildingIcons.getContext('2d')
  this.offsetX = 0;
  this.offsetY = 0;
  this.canvas = canvas;
  this.bloom = bloom;
  this.drawingRoad = false;
  this.roadCursor = [];
  this.navStructures = {
    base: {
      center: [this.screenWidth/5, this.screenHeight * (11/12)],
      radius: this.screenWidth/50
    },
    building: {
      start: [this.screenWidth * 2/5, this.screenHeight * (11/12)]
    },
    redRoad: {
      start: [this.screenWidth * 14/20, this.screenHeight * (11/12)],
      end: [this.screenWidth * 16/20, this.screenHeight * (11/12)]
    },
    greenRoad: {
      start: [this.screenWidth * 11/20, this.screenHeight * 11/12],
      end: [this.screenWidth * 13/20, this.screenHeight * 11/12]
    }
  }
  this.structures = {
    base: [],
    building: [],
    redRoad: [],
    greenRoad: [],
    people: []
  }
  this.dragCanvas = dragCanvas;
  this.dragCtx = dragCanvas.getContext('2d');
  // window.ctx = ctx;
  this.dimensions = { width: canvas.width, height: canvas.height };
  this.bloomctx = bloom.getContext('2d')
  // this.mouseStuff()
  this.start();

  this.baseOnMouseMove = this.baseOnMouseMove.bind(this);
  this.baseOnMouseUp = this.baseOnMouseUp.bind(this);
  this.buildingOnMouseMove = this.buildingOnMouseMove.bind(this);
  this.buildingOnMouseUp = this.buildingOnMouseUp.bind(this);
  this.redRoadOnMouseMove1 = this.redRoadOnMouseMove1.bind(this);
  this.redRoadOnMouseDown1 = this.redRoadOnMouseDown1.bind(this);
  this.redRoadOnMouseMove2 = this.redRoadOnMouseMove2.bind(this);
  this.redRoadOnMouseDown2 = this.redRoadOnMouseDown2.bind(this);
  this.greenRoadOnMouseMove1 = this.greenRoadOnMouseMove1.bind(this);
  this.greenRoadOnMouseDown1 = this.greenRoadOnMouseDown1.bind(this);
  this.greenRoadOnMouseMove2 = this.greenRoadOnMouseMove2.bind(this);
  this.greenRoadOnMouseDown2 = this.greenRoadOnMouseDown2.bind(this);

  }


  
  start() {
    // this.drawBackground(this.ctx)
    this.buildingBar = new BuildingBar(
      this.buildingBarCtx, [this.screenWidth, this.screenHeight],
      this.bloomctx
      );
    this.buildingBar.drawBuildingBar(this.buildingIcons, this.buildingBloom);
    this.firstStructure = new Structure({
      x: 150,
      y: 150,
      height: 50,
      width: 50,
      ctx: this.ctx,
      bloomctx: this.bloomctx })
    // this.firstStructure.drawRects(this.ctx, [460, 200], 50, 20)
    // this.firstStructure.drawRect(this.buildingIcons, [this.screenWidth * 14/20 - 10, this.screenHeight * (11/12) - 10], this.screenWidth * 2/20 + 20, 20)
    // this.firstStructure.drawTriangleBase()
    // this.firstStructure.drawBase();
    this.draw();
    this.newMouseStuff();
  }

  drawBackground(ctx) {
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  animate() {
    

  }





  circleCollision(point1, point2, radius) {
      if (Math.sqrt((point1[0] - point2[0])*(point1[0] - point2[0])
      + (point1[1] - point2[1])*(point1[1] - point2[1])) < radius) {
        return true;
      }
  }

  newMouseStuff() {
    document.body.addEventListener("mousedown", e => {
      let windowWidth = document.body.clientWidth;
      console.log("windowWidth :", windowWidth)
      if (this.circleCollision(
        [this.navStructures.base.center[0] + ((windowWidth - 1000) / 2), this.navStructures.base.center[1]], [e.clientX, e.clientY],
        this.navStructures.base.radius)
        ) {
          console.log("test");
          this.offsetX = e.clientX - this.navStructures.base.center[0];
          this.offsetY = e.clientY - this.navStructures.base.center[1];
          console.log("bases", this.structures.base)
          document.body.addEventListener("mousemove", this.baseOnMouseMove);
          document.body.addEventListener("mouseup", this.baseOnMouseUp);
          this.structures.base.push(this.navStructures.base.center);
      } else if (
        e.clientX > this.navStructures.building.start[0] - 20 + ((windowWidth - 1000) / 2) &&
        e.clientX < this.navStructures.building.start[0] + 20 + ((windowWidth - 1000) / 2)  &&
        e.clientY > this.navStructures.building.start[1] - 20 &&
        e.clientY < this.navStructures.building.start[1] + 20         
        ) {
          console.log("building")
          this.offsetX = e.clientX - this.navStructures.building.start[0];
          this.offsetY = e.clientY - this.navStructures.building.start[1];
          document.body.addEventListener("mousemove", this.buildingOnMouseMove)
          document.body.addEventListener("mouseup", this.buildingOnMouseUp)
          console.log("buildings", this.structures.building)        
          this.structures.building.push(this.navStructures.building.start)  
        } else if (
          e.clientX > this.navStructures.redRoad.start[0] - 10 + ((windowWidth - 1000) / 2)  &&
          e.clientX < this.navStructures.redRoad.end[0] + 10 + ((windowWidth - 1000) / 2)  &&
          e.clientY > this.navStructures.redRoad.start[1] - 10 &&
          e.clientY < this.navStructures.redRoad.end[1] + 10) {
          console.log("red road")
          this.drawingRoad = "red";
          this.structures.roadCursor = [e.clientX, e.clientY];
          document.body.addEventListener("mousemove", this.redRoadOnMouseMove1)
          document.body.addEventListener("mousedown", this.redRoadOnMouseDown1)
        } else if (
          e.clientX > this.navStructures.greenRoad.start[0] - 10 + ((windowWidth - 1000) / 2) &&
          e.clientX < this.navStructures.greenRoad.end[0] + 10 + ((windowWidth - 1000) / 2)  &&
          e.clientY > this.navStructures.greenRoad.start[1] - 10 &&
          e.clientY < this.navStructures.greenRoad.end[1] + 10) {
          console.log("green road")
          this.drawingRoad = "green";
          this.structures.roadCursor = [e.clientX, e.clientY];
          document.body.addEventListener("mousemove", this.greenRoadOnMouseMove1)
          document.body.addEventListener("mousedown", this.greenRoadOnMouseDown1)
        }
    })    
  }
//[this.screenWidth * 14/20 - 10, this.screenHeight * (11/12) - 10], this.screenWidth * 2/20 + 20, 20

  greenRoadOnMouseMove1(e) {
    let windowWidth = document.body.clientWidth;
    this.roadCursor = [e.clientX - ((windowWidth - 1000) / 2), e.clientY];
  }

  greenRoadOnMouseDown1(e) {
    let windowWidth = document.body.clientWidth;
    console.log("green road mouse down1", this.structures.greenRoad)
    this.structures.greenRoad.push([[e.clientX - ((windowWidth - 1000) / 2), e.clientY], [e.clientX - ((windowWidth - 1000) / 2), e.clientY]])
    document.body.removeEventListener("mousemove", this.greenRoadOnMouseMove1);
    document.body.removeEventListener("mousedown", this.greenRoadOnMouseDown1);
    document.body.addEventListener("mousemove", this.greenRoadOnMouseMove2);
    document.body.addEventListener("mousedown", this.greenRoadOnMouseDown2);
  }

  greenRoadOnMouseMove2(e) {
    let windowWidth = document.body.clientWidth;
    console.log(this.structures.greenRoad)
    this.roadCursor = [e.clientX - ((windowWidth - 1000) / 2), e.clientY];
    this.structures.greenRoad[this.structures.greenRoad.length - 1][1] = [e.clientX - ((windowWidth - 1000) / 2), e.clientY];
  }

  greenRoadOnMouseDown2(e) {
    console.log("green road mouse down2");
    this.drawingRoad = false;
    document.body.removeEventListener("mousemove", this.greenRoadOnMouseMove2);
    document.body.removeEventListener("mousedown", this.greenRoadOnMouseDown2);
    let lastGreenRoad = this.structures.greenRoad[this.structures.greenRoad.length - 1]
    setInterval(() => {
      this.structures.people.push({
        vector: this.getVector(lastGreenRoad[0], lastGreenRoad[1]),
        end: lastGreenRoad[1],
        current: lastGreenRoad[0],
        delete: false
      })
    }, 1000);
  }

  baseOnMouseMove(e) {
    this.structures.base[this.structures.base.length - 1] = 
      [e.clientX - this.offsetX, e.clientY - this.offsetY];
  }

  buildingOnMouseMove(e) {
    this.structures.building[this.structures.building.length - 1] = 
      [e.clientX - this.offsetX, e.clientY - this.offsetY];
  }

  redRoadOnMouseMove1(e) {
    let windowWidth = document.body.clientWidth;
    this.roadCursor = [e.clientX - ((windowWidth - 1000) / 2), e.clientY];
  }

  redRoadOnMouseDown1(e) {
    let windowWidth = document.body.clientWidth;
    console.log("red road mouse down1", this.structures.redRoad)
    this.structures.redRoad.push([[e.clientX - ((windowWidth - 1000) / 2), e.clientY], [e.clientX - ((windowWidth - 1000) / 2), e.clientY]])
    document.body.removeEventListener("mousemove", this.redRoadOnMouseMove1);
    document.body.removeEventListener("mousedown", this.redRoadOnMouseDown1);
    document.body.addEventListener("mousemove", this.redRoadOnMouseMove2);
    document.body.addEventListener("mousedown", this.redRoadOnMouseDown2);
  }

  redRoadOnMouseMove2(e) {
    let windowWidth = document.body.clientWidth;
    console.log(this.structures.redRoad)
    this.roadCursor = [e.clientX - ((windowWidth - 1000) / 2), e.clientY];
    this.structures.redRoad[this.structures.redRoad.length - 1][1] = [e.clientX - ((windowWidth - 1000) / 2), e.clientY];
  }

  redRoadOnMouseDown2(e) {
    this.drawingRoad = false;
    document.body.removeEventListener("mousemove", this.redRoadOnMouseMove2);
    document.body.removeEventListener("mousedown", this.redRoadOnMouseDown2);
    let lastRedRoad = this.structures.redRoad[this.structures.redRoad.length - 1]
    setInterval(() => {
      this.structures.people.push({
        vector: this.getVector(lastRedRoad[0], lastRedRoad[1]),
        end: lastRedRoad[1],
        current: lastRedRoad[0],
        delete: false
      })
    }, 1000);
  }

  baseOnMouseUp(e) {
    console.log("basemouseup")
    document.body.removeEventListener("mousemove", this.baseOnMouseMove)
    document.body.removeEventListener("mouseup", this.baseOnMouseUp) 
  }

  buildingOnMouseUp(e) {
    console.log("buildingmouseup")
    document.body.removeEventListener("mousemove", this.buildingOnMouseMove)
    document.body.removeEventListener("mouseup", this.buildingOnMouseUp) 
  }

  draw() {
    this.dragCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.bloomctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.firstStructure.drawBase(this.navStructures.base.center);
    this.firstStructure.drawTriangleBase(this.navStructures.building.start);
    this.structures.base.forEach(center => this.firstStructure.drawBase(center));
    this.structures.building.forEach(start => this.firstStructure.drawTriangleBase(start));
    if (this.drawingRoad) {
      if (this.drawingRoad === "red") {
        this.firstStructure.drawRedCursor(this.roadCursor)
      } else if (this.drawingRoad === "green") {
        this.firstStructure.drawGreenCursor(this.roadCursor)
      }
    }
    this.structures.redRoad.forEach(coords => this.firstStructure.drawRedRoad(coords[0], coords[1]));
    this.structures.greenRoad.forEach(coords => this.firstStructure.drawGreenRoad(coords[0], coords[1]));
    this.structures.people.forEach((person, i) => (
      this.structures.people[i].current = this.movePerson(person)
      ));
    this.structures.people.forEach((person, i) => {
      this.structures.people[i].delete = this.checkPersonDelete(person);
    })
    this.structures.people = this.structures.people.filter(person => person.delete === false)
    this.structures.people.forEach(person => this.firstStructure.drawPeople([person.current[0], person.current[1]]));
    requestAnimationFrame(this.draw.bind(this));
  }

  getVector(start, end) {
    let diff = [(end[0] - start[0]), (end[1] - start[1])];
    let distance = Math.sqrt((diff[0] * diff[0]) + (diff[1] * diff[1]));
    let vector = [(diff[0] / distance), (diff[1] / distance)];
    return vector;
  }

  movePerson(person) {
    return [person.current[0] + person.vector[0], person.current[1] + person.vector[1]];
  }

  checkPersonDelete(person) {
    let direction = [];
    if (person.vector[0] > 0) {direction[0] = 1} else {direction[0] = (-1)};
    if (person.vector[1] > 0) { direction[1] = 1 } else {direction[1] = (-1)};

    if (direction[0] === 1) {
      if (person.current[0] > person.end[0]) { return true }
    } else {
      if (person.current[0] < person.end[0]) { return true }
    }

    if (direction[1] === 1) {
      if (person.current[1] > person.end[1]) { return true }
    } else {
      if (person.current[1] < person.end[1]) { return true }
    }

    return false
  }


}

// each person:
// {
//    vector: [x, y]
//    end: [x, y]
//    current: [x, y]
// }