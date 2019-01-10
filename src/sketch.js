let bd, sd
let colCount = 5
let rowCount = 5
let rows = []

function preload() {
  soundFormats('wav')
  bd = loadSound('assets/bd.wav')
  bd.setVolume(0.95)
  bd.playMode('restart')
  sd = loadSound('assets/sd.wav')
  sd.setVolume(0.95)
  sd.playMode('restart')
}

function setup() {
  createCanvas(640, 480, WEBGL)
}

function update() {
  rows.forEach(row => {
    row.forEach(thing => {
      thing.y += thing.velocity.y
      thing.velocity.y += thing.acceleration.y
    })
  })
}

function draw() {
  update()
  background('black')
  directionalLight(250, 250, 250, 0.45, 0.25, -0.35)
  translate((-colCount * 85) / 2, 0, -400)

  rows.forEach(row => {
    row.forEach(thing => {
      const color = thing.color
      noStroke()
      ambientMaterial(color.red, color.green, color.blue)

      translate(thing.x, thing.y, thing.z)
      box(thing.width, thing.height, thing.width)
      translate(-thing.x, -thing.y, -thing.z)
    })
  })

  translate((colCount * 85) / 2, 0, 400)
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function trigger() {
  rows = Array(rowCount)
    .fill(null)
    .map((x, rowIndex) => {
      return Array(colCount)
        .fill(null)
        .map((val, index) => {
          return {
            x: index * 110,
            y: 170,
            z: rowIndex * 110,
            width: 80,
            height: 80,
            color: {
              red: getRandomIntInclusive(0, 255),
              green: getRandomIntInclusive(0, 255),
              blue: getRandomIntInclusive(0, 255)
            },
            velocity: {
              y: 0
            },
            acceleration: {
              y: getRandomArbitrary(-0.03, -0.2)
            }
          }
        })
    })

  bd.play()
  sd.play()
}

function mouseClicked() {
  trigger()
}

function keyPressed() {
  if (keyCode === 32) {
    trigger()
  }
}
