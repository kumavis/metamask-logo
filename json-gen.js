// var parseObj = require('parse-wavefront-obj');
var parseObj = require('./parseObj');
var foxColors = require('./fox_colors.json')
var fs = require('fs');

var buf = fs.readFileSync('fox.obj');
var mesh = parseObj(buf);

// console.log(mesh);

mesh.faceColors = mesh.faceColors.map((name)=>{
  return foxColors[name].map((amp)=>Math.floor(amp*255))
})

// resize mesh
var size = 0.1
mesh.positions=mesh.positions.map((pos)=>{
  return [pos[0]*size,pos[1]*size,pos[2]*size]
})

var partialMesh = {
  cells: mesh.cells,
  positions: mesh.positions,
  faceColors: mesh.faceColors,
}
fs.writeFileSync('fox.json', JSON.stringify(partialMesh))
