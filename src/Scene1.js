import 'p5/lib/addons/p5.sound';
import BD from './sounds/bd.wav';
import SD from './sounds/sd.wav';

export default function Scene1(p) {
  let bd, sd;
  let colCount = 5;
  let rowCount = 5;
  let rows = [];

  p.preload = function() {
    p.soundFormats('wav');
    bd = p.loadSound(BD);
    bd.setVolume(0.95);
    bd.playMode('restart');
    sd = p.loadSound(SD);
    sd.setVolume(0.95);
    sd.playMode('restart');
  };

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.update = function() {
    rows.forEach(row => {
      row.forEach(thing => {
        thing.y += thing.velocity.y;
        thing.velocity.y += thing.acceleration.y;
      });
    });
  };

  p.draw = function() {
    p.update();
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.translate((-colCount * 85) / 2, 0, -400);

    rows.forEach(row => {
      row.forEach(thing => {
        const color = thing.color;
        p.noStroke();
        p.ambientMaterial(color.red, color.green, color.blue);

        p.translate(thing.x, thing.y, thing.z);
        p.box(thing.width, thing.height, thing.width);
        p.translate(-thing.x, -thing.y, -thing.z);
      });
    });

    p.translate((colCount * 85) / 2, 0, 400);
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
            };
          });
      });

    bd.play();
    sd.play();
  }

  p.mouseClicked = function() {
    trigger();
  };

  p.keyPressed = function() {
    if (p.keyCode === 32) {
      trigger();
    }
  };
}
