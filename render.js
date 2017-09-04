/*
  <p> This example shows how to draw a mesh with regl </p>
*/
const regl = require('regl')()
const mat4 = require('gl-mat4')
const fox = require('./fox.json')

// console.log(fox.faceColors)
window.fox = fox

const drawFox = regl({
  // vert: `
  // precision mediump float;
  // attribute vec3 position;
  // uniform mat4 model, view, projection;
  // void main() {
  //   gl_Position = projection * view * model * vec4(position, 1);
  // }`,
  vert: `
  precision mediump float;
  attribute vec3 position;
  attribute vec3 color;
  varying vec3 fragColor;
  uniform mat4 model, view, projection;
  void main() {
    fragColor = color/255.;
    gl_Position = projection * view * model * vec4(position, 1);
  }`,

  // frag: `
  // // precision mediump float;
  // // void main() {
  // //   gl_FragColor = vec4(255, 255, 255, 1);
  // // }`,
  frag: `
  precision mediump float;
  varying vec3 fragColor;
  uniform float tick;
  void main() {
    float a = 0.5+0.5*cos(tick*20.);
    // float a = 1.0;
    gl_FragColor = vec4(fragColor, a);
  }`,

  // this converts the vertices of the mesh into the position attribute
  attributes: {
    position: fox.positions,
    color: fox.faceColors,
  },

  // and this converts the faces fo the mesh into elements
  // elements: fox.cells,
  count: fox.positions.length*3,

  uniforms: {
    tick: ({tick}) => tick/1000,
    model: mat4.identity([]),
    view: ({tick}) => {
      const t = 0.01 * tick
      return mat4.lookAt([],
        [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
        [0, 2.5, 0],
        [0, 1, 0])
    },
    projection: ({viewportWidth, viewportHeight}) =>
      mat4.perspective([],
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        1000)
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  drawFox()
})
