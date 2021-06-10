import Structure from './asset_drawing';
import CityBuilder from './game_view';
import HomePage from './homepage';

console.log("webpack is working")
document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('canvas');
  const bloom = document.getElementById('bloom');
  const dragCanvas = document.getElementById('drag-canvas');
  const buildingBar = document.getElementById('building-bar');
  const buildingBarBloom = document.getElementById('building-bar-bloom');
  const buildingIcons = document.getElementById('building-icons');
  // new CityBuilder(canvas, bloom, dragCanvas, buildingBar, buildingBarBloom, buildingIcons);
  new HomePage(canvas, bloom, dragCanvas, buildingBar, buildingBarBloom, buildingIcons);
  
})