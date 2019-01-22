import 'p5/lib/addons/p5.sound';

const baseSize = 75;
const cellSize = 120;
const rowCount = 4;
const colCount = 4;
const slotCount = 4;

const standardXTranslation = ((colCount - 1) * -cellSize) / 2;
const standardYTransltion = ((slotCount - 1) * -cellSize) / 2;
const standardZTranslation = ((rowCount - 1) * -cellSize) / 2;

export default class Scene3 {
  name = 'scene3';
  rows;
  cameraRotX = 0;
  cameraRotY = 0;
  cameraRotZ = 0;
  otherBank = false;
  currentSynth;
  currentKick;
  currentSnare;
  playingSynth;

  constructor(allSounds) {
    this.sounds = allSounds.friend;
    this.drawTriangle = this.drawTriangle.bind(this);
    this.currentSynth = this.sounds.synth1a;
    this.currentKick = this.sounds.bd1;
    this.currentSnare = this.sounds.sd1;
  }

  setup(p) {
    this.rows = new Array(rowCount).fill(
      new Array(colCount).fill(new Array(slotCount).fill(null))
    );
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
      this.currentSynth = this.otherBank
        ? this.sounds.synth2a
        : this.sounds.synth1a;
    }

    // 2 = synth2
    if (p.keyCode === 50) {
      this.currentSynth = this.otherBank
        ? this.sounds.synth2b
        : this.sounds.synth1b;
    }

    // 3 = this.sounds.synth3
    if (p.keyCode === 51) {
      this.currentSynth = this.otherBank
        ? this.sounds.synth2c
        : this.sounds.synth1c;
    }

    // 4 = this.sounds.synth4
    if (p.keyCode === 52) {
      this.currentSynth = this.otherBank
        ? this.sounds.synth2d
        : this.sounds.synth1d;
    }

    // 5 = this.sounds.synth5
    if (p.keyCode === 53) {
      this.currentSynth = this.otherBank
        ? this.sounds.synth2e
        : this.sounds.synth1e;
    }

    // 7 = bank 1
    if (p.keyCode === 55) {
      this.otherBank = false;
      this.currentKick = this.sounds.bd1;
      this.currentSnare = this.sounds.sd1;
      this.currentSynth = this.sounds.synth1a;
    }

    // 8 = bank 2
    if (p.keyCode === 56) {
      this.otherBank = true;
      this.currentKick = this.sounds.bd2;
      this.currentSnare = this.sounds.sd2;
      this.currentSynth = this.sounds.synth2a;
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
