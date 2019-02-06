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

  hit() {
    this.trigger({ accent: false });
  }

  accent() {
    this.trigger({ accent: true });
  }

  changePatch() {
    if (this.otherBank) {
      this.currentSynth = this.currentSynth =
        this.currentSynth === this.sounds.synth2a
          ? this.sounds.synth2b
          : this.currentSynth === this.sounds.synth2b
          ? this.sounds.synth2c
          : this.currentSynth === this.sounds.synth2c
          ? this.sounds.synth2d
          : this.currentSynth === this.sounds.synth2d
          ? this.sounds.synth2e
          : this.sounds.synth2a;
    } else {
      this.currentSynth =
        this.currentSynth === this.sounds.synth1a
          ? this.sounds.synth1b
          : this.currentSynth === this.sounds.synth1b
          ? this.sounds.synth1c
          : this.currentSynth === this.sounds.synth1c
          ? this.sounds.synth1d
          : this.currentSynth === this.sounds.synth1d
          ? this.sounds.synth1e
          : this.sounds.synth1a;
    }
  }

  changeBank() {
    this.currentKick =
      this.currentKick === this.sounds.bd1 ? this.sounds.bd2 : this.sounds.bd1;

    this.currentSnare =
      this.currentSnare === this.sounds.sd1 ? this.sounds.sd2 : this.sounds.sd1;

    this.currentSynth = this.otherBank
      ? this.sounds.synth1a
      : this.sounds.synth2a;

    this.otherBank = !this.otherBank;
  }

  silence() {
    this.playingSynth && this.playingSynth.stop();
  }
}
