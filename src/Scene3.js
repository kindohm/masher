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

const baseSize = 75;
const cellSize = 120;
const rowCount = 4;
const colCount = 4;
const slotCount = 4;

const standardXTranslation = ((colCount - 1) * -cellSize) / 2;
const standardYTransltion = ((slotCount - 1) * -cellSize) / 2;
const standardZTranslation = ((rowCount - 1) * -cellSize) / 2;

export default class Scene3 {
  rows;
  cameraRotX = 0;
  cameraRotY = 0;
  cameraRotZ = 0;
  otherBank = false;
  bd1;
  bd2;
  sd1;
  sd2;
  synth1a;
  synth1b;
  synth1c;
  synth1d;
  synth1e;
  synth2a;
  synth2b;
  synth2c;
  synth2d;
  synth2e;
  currentSynth;
  currentKick;
  currentSnare;
  playingSynth;

  constructor() {
    this.drawTriangle = this.drawTriangle.bind(this);
  }

  preload(p) {
    p.soundFormats('mp3');

    this.bd1 = p.loadSound(Bd1);
    this.bd1.setVolume(0.95);
    this.bd1.playMode('restart');

    this.sd1 = p.loadSound(Sd1);
    this.sd1.setVolume(0.95);
    this.sd1.playMode('restart');

    this.bd2 = p.loadSound(Bd2);
    this.bd2.setVolume(0.95);
    this.bd2.playMode('restart');

    this.sd2 = p.loadSound(Sd2);
    this.sd2.setVolume(0.95);
    this.sd2.playMode('restart');

    this.synth1a = p.loadSound(Synth1a);
    this.synth1a.setVolume(0.95);
    this.synth1a.playMode('restart');

    this.synth1b = p.loadSound(Synth1b);
    this.synth1b.setVolume(0.95);
    this.synth1b.playMode('restart');

    this.synth1c = p.loadSound(Synth1c);
    this.synth1c.setVolume(0.95);
    this.synth1c.playMode('restart');

    this.synth1d = p.loadSound(Synth1d);
    this.synth1d.setVolume(0.95);
    this.synth1d.playMode('restart');

    this.synth1e = p.loadSound(Synth1e);
    this.synth1e.setVolume(0.95);
    this.synth1e.playMode('restart');

    this.synth2a = p.loadSound(Synth2a);
    this.synth2a.setVolume(0.95);
    this.synth2a.playMode('restart');

    this.synth2b = p.loadSound(Synth2b);
    this.synth2b.setVolume(0.95);
    this.synth2b.playMode('restart');

    this.synth2c = p.loadSound(Synth2c);
    this.synth2c.setVolume(0.95);
    this.synth2c.playMode('restart');

    this.synth2d = p.loadSound(Synth2d);
    this.synth2d.setVolume(0.95);
    this.synth2d.playMode('restart');

    this.synth2e = p.loadSound(Synth2e);
    this.synth2e.setVolume(0.95);
    this.synth2e.playMode('restart');

    this.currentSynth = this.synth1a;
    this.currentKick = this.bd1;
    this.currentSnare = this.sd1;
  }

  setup(p) {
    console.log('setup!');
    // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    this.rows = new Array(rowCount).fill(
      new Array(colCount).fill(new Array(slotCount).fill(null))
    );

    // reset({ accent: false });
  }

  update(p) {
    this.cameraRotX -= 0.001;
    this.cameraRotY -= 0.006;
    this.cameraRotZ += 0.0001;

    const rotationScale = p.map(p.mouseY, p.height, 0, 0.002, -0.002);
    const growthScale = p.map(p.mouseX, 0, p.width, -0.05, 0.05);

    let cell;
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          cell = this.rows[r][c][s];
          if (!cell) continue;
          cell.rotation += rotationScale;
          cell.size += growthScale;
        }
      }
    }
  }

  draw(p) {
    p.background('black');
    p.noFill();
    p.strokeWeight(2);

    if (!this.rows) return;
    let cell;

    p.ambientMaterial(0, 0, 0);
    p.stroke(0, 0, 255);

    p.rotateX(this.cameraRotX);
    p.rotateY(this.cameraRotY);
    p.rotateZ(this.cameraRotZ);
    p.translate(
      standardXTranslation,
      standardYTransltion,
      standardZTranslation
    );

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          cell = this.rows[r][c][s];
          if (!cell) continue;
          p.translate(c * cellSize, r * cellSize, s * cellSize);
          p.rotateX(cell.rotation);
          if (cell.high) {
            this.drawTriangle(p, cell.size, cell.size);
          } else {
            p.box(cell.size, cell.size, 1);
          }
          p.rotateX(-cell.rotation);
          p.translate(-c * cellSize, -r * cellSize, -s * cellSize);
        }
      }
    }

    p.rotateX(-this.cameraRotX);
    p.rotateY(-this.cameraRotY);
    p.rotateZ(-this.cameraRotZ);
    p.translate(
      -standardXTranslation,
      -standardYTransltion,
      -standardZTranslation
    );
  }

  reset({ accent }) {
    this.cameraRotX = 0;
    this.cameraRotY = 0;
    this.cameraRotZ = 0;

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          this.rows[r][c][s] = {
            size: baseSize,
            rotation: 0,
            high: accent
          };
        }
      }
    }
  }

  trigger({ accent }) {
    this.reset({ accent });

    if (this.playingSynth) {
      this.playingSynth.stop();
    }

    if (accent) {
      this.currentSnare.play();
    } else {
      this.currentKick.play();
    }

    this.currentSynth.play();
    this.playingSynth = this.currentSynth;
  }

  keyPressed(p) {
    if (p.keyCode === 90) {
      return this.trigger({ accent: false });
    }

    if (p.keyCode === 88) {
      return this.trigger({ accent: true });
    }

    // 1 = synth1
    if (p.keyCode === 49) {
      this.currentSynth = this.otherBank ? this.synth2a : this.synth1a;
    }

    // 2 = synth2
    if (p.keyCode === 50) {
      this.currentSynth = this.otherBank ? this.synth2b : this.synth1b;
    }

    // 3 = this.synth3
    if (p.keyCode === 51) {
      this.currentSynth = this.otherBank ? this.synth2c : this.synth1c;
    }

    // 4 = this.synth4
    if (p.keyCode === 52) {
      this.currentSynth = this.otherBank ? this.synth2d : this.synth1d;
    }

    // 5 = this.synth5
    if (p.keyCode === 53) {
      this.currentSynth = this.otherBank ? this.synth2e : this.synth1e;
    }

    // 7 = bank 1
    if (p.keyCode === 55) {
      this.otherBank = false;
      this.currentKick = this.bd1;
      this.currentSnare = this.sd1;
      this.currentSynth = this.synth1a;
    }

    // 8 = bank 2
    if (p.keyCode === 56) {
      this.otherBank = true;
      this.currentKick = this.bd2;
      this.currentSnare = this.sd2;
      this.currentSynth = this.synth2a;
    }
  }

  drawTriangle(p, sizeX, sizeY) {
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
