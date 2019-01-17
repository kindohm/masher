import 'p5/lib/addons/p5.sound';

import Drum1 from './sounds/dis/drum1.mp3';
import Drum1Accent from './sounds/dis/drum1Accent.mp3';
import Drum2 from './sounds/dis/drum2.mp3';
import Drum2Accent from './sounds/dis/drum2Accent.mp3';
import Drum3 from './sounds/dis/drum3.mp3';
import Drum3Accent from './sounds/dis/drum3Accent.mp3';
import Synth1 from './sounds/dis/synth1.mp3';
import Synth2 from './sounds/dis/synth2.mp3';
import Synth3 from './sounds/dis/synth3.mp3';
import Synth4 from './sounds/dis/synth4.mp3';
import Synth5 from './sounds/dis/synth5.mp3';

export default class Scene1 {
  drum1;
  drum1Accent;
  drum2;
  drum2Accent;
  drum3;
  drum3Accent;
  synth1;
  synth2;
  synth3;
  synth4;
  synth5;

  currentDrum;
  currentAccent;
  currentSynth;
  lastTriggeredSynth;

  colCount = 7;
  rowCount = 7;
  rows = [];

  constructor() {
    this.trigger = this.trigger.bind(this);
    this.preload = this.preload.bind(this);
    this.setup = this.setup.bind(this);
  }

  preload(p) {
    console.log('preloading');

    this.drum1 = p.loadSound(Drum1);
    this.drum1.setVolume(0.95);
    this.drum1.playMode('restart');

    this.drum1Accent = p.loadSound(Drum1Accent);
    this.drum1Accent.setVolume(0.95);
    this.drum1Accent.playMode('restart');

    this.drum2 = p.loadSound(Drum2);
    this.drum2.setVolume(0.95);
    this.drum2.playMode('restart');

    this.drum2Accent = p.loadSound(Drum2Accent);
    this.drum2Accent.setVolume(0.95);
    this.drum2Accent.playMode('restart');

    this.drum3 = p.loadSound(Drum3);
    this.drum3.setVolume(0.95);
    this.drum3.playMode('restart');

    this.drum3Accent = p.loadSound(Drum3Accent);
    this.drum3Accent.setVolume(0.95);
    this.drum3Accent.playMode('restart');

    this.synth1 = p.loadSound(Synth1);
    this.synth1.setVolume(0.95);
    this.synth1.playMode('restart');

    this.synth2 = p.loadSound(Synth2);
    this.synth2.setVolume(0.95);
    this.synth2.playMode('restart');

    this.synth3 = p.loadSound(Synth3);
    this.synth3.setVolume(0.95);
    this.synth3.playMode('restart');

    this.synth4 = p.loadSound(Synth4);
    this.synth4.setVolume(0.95);
    this.synth4.playMode('restart');

    this.synth5 = p.loadSound(Synth5);
    this.synth5.setVolume(0.95);
    this.synth5.playMode('restart');
  }

  setup(p) {
    this.currentDrum = this.drum1;
    this.currentAccent = this.drum1Accent;
    this.currentSynth = this.synth1;
  }

  update(p) {
    const rotationScale = p.map(p.mouseY, p.height, 0, 0, 1);

    this.rows.forEach(row => {
      row.forEach(thing => {
        thing.y += thing.velocity.y;
        thing.velocity.y += thing.acceleration.y;
        thing.rotation.x += thing.rotationVelocity.x * rotationScale;
        thing.rotation.y += thing.rotationVelocity.y * rotationScale;
        thing.rotation.z += thing.rotationVelocity.z * rotationScale;
      });
    });
  }

  draw(p) {
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.ambientLight(50, 50, 50);
    p.fill(0);

    this.rows.forEach(row => {
      row.forEach(thing => {
        const color = thing.color;
        p.noStroke();
        p.ambientMaterial(color.red, color.green, color.blue);

        p.rotateX(thing.rotation.x);
        p.rotateY(thing.rotation.y);
        p.rotateZ(thing.rotation.z);
        p.translate((-this.colCount * 85) / 2, 0, -400);
        p.translate(thing.x, thing.y, thing.z);
        p.box(thing.width, thing.height, thing.width);
        p.translate(-thing.x, -thing.y, -thing.z);
        p.translate((this.colCount * 85) / 2, 0, 400);
        p.rotateX(-thing.rotation.x);
        p.rotateY(-thing.rotation.y);
        p.rotateZ(-thing.rotation.z);
      });
    });
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  trigger({ accent }) {
    this.rows = Array(this.rowCount)
      .fill(null)
      .map((x, rowIndex) => {
        return Array(this.colCount)
          .fill(null)
          .map((val, index) => {
            return {
              x: index * 110,
              y: 170,
              z: rowIndex * 110,
              width: 80,
              height: 80,
              color: {
                red: this.getRandomIntInclusive(0, 255),
                green: this.getRandomIntInclusive(0, 255),
                blue: this.getRandomIntInclusive(0, 255)
              },
              velocity: {
                y: 0
              },
              acceleration: {
                y: this.getRandomArbitrary(-0.03, -0.3)
              },
              rotation: {
                x: 0,
                y: 0,
                z: 0
              },
              rotationVelocity: {
                x: this.getRandomArbitrary(-0.01, 0.01),
                y: this.getRandomArbitrary(-0.01, 0.01),
                z: this.getRandomArbitrary(-0.01, 0.01)
              }
            };
          });
      });

    if (
      this.lastTriggeredSynth &&
      this.lastTriggeredSynth !== this.currentSynth
    ) {
      this.lastTriggeredSynth.stop();
    }

    accent ? this.currentAccent.play() : this.currentDrum.play();
    this.currentSynth.play();
    this.lastTriggeredSynth = this.currentSynth;
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
      this.currentSynth = this.synth1;
    }

    // 2 = synth2
    if (p.keyCode === 50) {
      this.currentSynth = this.synth2;
    }

    // 3 = synth3
    if (p.keyCode === 51) {
      this.currentSynth = this.synth3;
    }

    // 4 = synth4
    if (p.keyCode === 52) {
      this.currentSynth = this.synth4;
    }

    // 5 = synth5
    if (p.keyCode === 53) {
      this.currentSynth = this.synth5;
    }

    // 7 = drum2 (snare)
    if (p.keyCode === 55) {
      this.currentDrum = this.drum2;
      this.currentAccent = this.drum2Accent;
    }

    // 8 = drum3 (rimshot)
    if (p.keyCode === 56) {
      this.currentDrum = this.drum3;
      this.currentAccent = this.drum3Accent;
    }

    // 9 = drum1 (kick drum)
    if (p.keyCode === 57) {
      this.currentDrum = this.drum1;
      this.currentAccent = this.drum1Accent;
    }
  }
}
