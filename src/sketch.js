let bd, sd
let circleCount = 5
let circles = []

function preload() {
  soundFormats('wav')
  bd = loadSound('../assets/bd.wav')
  bd.setVolume(0.95)
  bd.playMode('restart')
  sd = loadSound('../assets/sd.wav')
  sd.setVolume(0.95)
  sd.playMode('restart')
}

function setup() {
  createCanvas(640, 480)
}

function update() {
  circles.forEach(circle => {
    circle.x += circle.velocity.x
    circle.y += Math.max(circle.velocity.y, -100)
    circle.velocity.x += circle.acceleration.x
    circle.velocity.y += circle.acceleration.y
    circle.width *= Math.min(1 + circle.growth, 500)
    circle.height *= Math.min(1 + circle.growth, 500)
  })
}

function draw() {
  update()
  clear()
  circles.forEach(circle => {
    const color = circle.color
    stroke(color.blue, color.red, color.green)
    fill(color.red, color.green, color.blue)
    ellipse(circle.x, circle.y, circle.width, circle.height)
  })
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function trigger() {
  circles = Array(circleCount)
    .fill(null)
    .map((val, index) => {
      return {
        x: index * (80 + 20) + 55,
        y: 400,
        width: 80,
        height: 80,
        velocity: {
          x: 0,
          y: 0
        },
        acceleration: {
          x: 0,
          y: getRandomArbitrary(-0.05, -0.3)
        },
        growth: getRandomArbitrary(0, 0.01),
        color: {
          red: getRandomIntInclusive(0, 255),
          green: getRandomIntInclusive(0, 255),
          blue: getRandomIntInclusive(0, 255)
        }
      }
    })

  console.log(circles)
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
