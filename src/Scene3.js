import 'p5/lib/addons/p5.sound';

import Bd1 from './sounds/friend/bd01.mp3';
import Sd1 from './sounds/friend/sd01.mp3';
import Bd2 from './sounds/friend/bd02.mp3';
import Sd2 from './sounds/friend/sd02.mp3';
import Synth1a from './sounds/friend/synth1a.mp3';
import Synth1b from './sounds/friend/synth1b.mp3';
import Synth1c from './sounds/friend/synth1c.mp3';
import Synth1d from './sounds/friend/synth1d.mp3';
import Synth1e from './sounds/friend/synth1e.mp3';
import Synth2a from './sounds/friend/synth2a.mp3';
import Synth2b from './sounds/friend/synth2b.mp3';
import Synth2c from './sounds/friend/synth2c.mp3';
import Synth2d from './sounds/friend/synth2d.mp3';
import Synth2e from './sounds/friend/synth2e.mp3';

export default function Scene3(p) {
  const baseSize = 75;
  const cellSize = 120;
  const rowCount = 4;
  const colCount = 4;
  const slotCount = 4;

  const standardXTranslation = ((colCount - 1) * -cellSize) / 2;
  const standardYTransltion = ((slotCount - 1) * -cellSize) / 2;
  const standardZTranslation = ((rowCount - 1) * -cellSize) / 2;

  let rows;
  let cameraRotX = 0;
  let cameraRotY = 0;
  let cameraRotZ = 0;
  let otherBank = false;
  let bd1,
    bd2,
    sd1,
    sd2,
    synth1a,
    synth1b,
    synth1c,
    synth1d,
    synth1e,
    synth2a,
    synth2b,
    synth2c,
    synth2d,
    synth2e;
  let currentSynth, currentKick, currentSnare, playingSynth;

  p.preload = function() {
    p.soundFormats('mp3');

    bd1 = p.loadSound(Bd1);
    bd1.setVolume(0.95);
    bd1.playMode('restart');

    sd1 = p.loadSound(Sd1);
    sd1.setVolume(0.95);
    sd1.playMode('restart');

    bd2 = p.loadSound(Bd2);
    bd2.setVolume(0.95);
    bd2.playMode('restart');

    sd2 = p.loadSound(Sd2);
    sd2.setVolume(0.95);
    sd2.playMode('restart');

    synth1a = p.loadSound(Synth1a);
    synth1a.setVolume(0.95);
    synth1a.playMode('restart');

    synth1b = p.loadSound(Synth1b);
    synth1b.setVolume(0.95);
    synth1b.playMode('restart');

    synth1c = p.loadSound(Synth1c);
    synth1c.setVolume(0.95);
    synth1c.playMode('restart');

    synth1d = p.loadSound(Synth1d);
    synth1d.setVolume(0.95);
    synth1d.playMode('restart');

    synth1e = p.loadSound(Synth1e);
    synth1e.setVolume(0.95);
    synth1e.playMode('restart');

    synth2a = p.loadSound(Synth2a);
    synth2a.setVolume(0.95);
    synth2a.playMode('restart');

    synth2b = p.loadSound(Synth2b);
    synth2b.setVolume(0.95);
    synth2b.playMode('restart');

    synth2c = p.loadSound(Synth2c);
    synth2c.setVolume(0.95);
    synth2c.playMode('restart');

    synth2d = p.loadSound(Synth2d);
    synth2d.setVolume(0.95);
    synth2d.playMode('restart');

    synth2e = p.loadSound(Synth2e);
    synth2e.setVolume(0.95);
    synth2e.playMode('restart');

    currentSynth = synth1a;
    currentKick = bd1;
    currentSnare = sd1;
  };

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    rows = new Array(rowCount).fill(
      new Array(colCount).fill(new Array(slotCount).fill(null))
    );
    // reset({ accent: false });
  };

  p.update = function() {
    cameraRotX -= 0.001;
    cameraRotY -= 0.006;
    cameraRotZ += 0.0001;

    const rotationScale = p.map(p.mouseY, p.height, 0, 0.002, -0.002);
    const growthScale = p.map(p.mouseX, 0, p.width, -0.05, 0.05);

    let cell;
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          cell = rows[r][c][s];
          if (!cell) continue;
          cell.rotation += rotationScale;
          cell.size += growthScale;
        }
      }
    }
  };

  p.draw = function() {
    p.update();
    p.background('black');
    p.noFill();
    p.strokeWeight(2);

    p.rotateX(cameraRotX);
    p.rotateY(cameraRotY);
    p.rotateZ(cameraRotZ);
    p.translate(
      standardXTranslation,
      standardYTransltion,
      standardZTranslation
    );

    if (!rows) return;

    let cell;

    p.ambientMaterial(0, 0, 0);
    p.stroke(0, 0, 255);

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          cell = rows[r][c][s];
          if (!cell) continue;
          p.translate(c * cellSize, r * cellSize, s * cellSize);
          p.rotateX(cell.rotation);
          if (cell.high) {
            drawTriangle(cell.size, cell.size);
          } else {
            p.box(cell.size, cell.size, 1);
          }
          p.rotateX(-cell.rotation);
          p.translate(-c * cellSize, -r * cellSize, -s * cellSize);
        }
      }
    }
  };

  function reset({ accent }) {
    cameraRotX = 0;
    cameraRotY = 0;
    cameraRotZ = 0;

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          rows[r][c][s] = {
            size: baseSize,
            rotation: 0,
            high: accent
          };
        }
      }
    }
  }

  function trigger({ accent }) {
    reset({ accent });

    if (playingSynth) {
      playingSynth.stop();
    }

    if (accent) {
      currentSnare.play();
    } else {
      currentKick.play();
    }

    currentSynth.play();
    playingSynth = currentSynth;
  }

  p.keyPressed = function() {
    if (p.keyCode === 90) {
      return trigger({ accent: false });
    }

    if (p.keyCode === 88) {
      return trigger({ accent: true });
    }

    // 1 = synth1
    if (p.keyCode === 49) {
      currentSynth = otherBank ? synth2a : synth1a;
    }

    // 2 = synth2
    if (p.keyCode === 50) {
      currentSynth = otherBank ? synth2b : synth1b;
    }

    // 3 = synth3
    if (p.keyCode === 51) {
      currentSynth = otherBank ? synth2c : synth1c;
    }

    // 4 = synth4
    if (p.keyCode === 52) {
      currentSynth = otherBank ? synth2d : synth1d;
    }

    // 5 = synth5
    if (p.keyCode === 53) {
      currentSynth = otherBank ? synth2e : synth1e;
    }

    // 7 = bank 1
    if (p.keyCode === 55) {
      otherBank = false;
      currentKick = bd1;
      currentSnare = sd1;
      currentSynth = synth1a;
    }

    // 8 = bank 2
    if (p.keyCode === 56) {
      otherBank = true;
      currentKick = bd2;
      currentSnare = sd2;
      currentSynth = synth2a;
    }
  };

  function drawTriangle(sizeX, sizeY) {
    p.beginShape();

    p.vertex(-sizeX, sizeY, 0);
    p.vertex(sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.vertex(sizeX, sizeY, 0);
    p.vertex(sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.vertex(sizeX, sizeY, 0);
    p.vertex(-sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.vertex(-sizeX, sizeY, 0);
    p.vertex(-sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.endShape();
  }
}
