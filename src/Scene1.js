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

export default function Scene1(p) {
  let drum1,
    drum1Accent,
    drum2,
    drum2Accent,
    drum3,
    drum3Accent,
    synth1,
    synth2,
    synth3,
    synth4,
    synth5;
  let currentDrum, currentAccent, currentSynth, lastTriggeredSynth;
  let colCount = 7;
  let rowCount = 7;
  let rows = [];

  p.preload = function() {
    p.soundFormats('mp3');

    drum1 = p.loadSound(Drum1);
    drum1.setVolume(0.95);
    drum1.playMode('restart');

    drum1Accent = p.loadSound(Drum1Accent);
    drum1Accent.setVolume(0.95);
    drum1Accent.playMode('restart');

    drum2 = p.loadSound(Drum2);
    drum2.setVolume(0.95);
    drum2.playMode('restart');

    drum2Accent = p.loadSound(Drum2Accent);
    drum2Accent.setVolume(0.95);
    drum2Accent.playMode('restart');

    drum3 = p.loadSound(Drum3);
    drum3.setVolume(0.95);
    drum3.playMode('restart');

    drum3Accent = p.loadSound(Drum3Accent);
    drum3Accent.setVolume(0.95);
    drum3Accent.playMode('restart');

    synth1 = p.loadSound(Synth1);
    synth1.setVolume(0.95);
    synth1.playMode('restart');

    synth2 = p.loadSound(Synth2);
    synth2.setVolume(0.95);
    synth2.playMode('restart');

    synth3 = p.loadSound(Synth3);
    synth3.setVolume(0.95);
    synth3.playMode('restart');

    synth4 = p.loadSound(Synth4);
    synth4.setVolume(0.95);
    synth4.playMode('restart');

    synth5 = p.loadSound(Synth5);
    synth5.setVolume(0.95);
    synth5.playMode('restart');
  };

  p.setup = function() {
    currentDrum = drum1;
    currentAccent = drum1Accent;
    currentSynth = synth1;
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.update = function() {
    const rotationScale = p.map(p.mouseY, p.height, 0, 0, 1);

    rows.forEach(row => {
      row.forEach(thing => {
        thing.y += thing.velocity.y;
        thing.velocity.y += thing.acceleration.y;
        thing.rotation.x += thing.rotationVelocity.x * rotationScale;
        thing.rotation.y += thing.rotationVelocity.y * rotationScale;
        thing.rotation.z += thing.rotationVelocity.z * rotationScale;
      });
    });
  };

  p.draw = function() {
    p.update();
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.ambientLight(50, 50, 50);

    rows.forEach(row => {
      row.forEach(thing => {
        const color = thing.color;
        p.noStroke();
        p.ambientMaterial(color.red, color.green, color.blue);

        p.rotateX(thing.rotation.x);
        p.rotateY(thing.rotation.y);
        p.rotateZ(thing.rotation.z);
        p.translate((-colCount * 85) / 2, 0, -400);
        p.translate(thing.x, thing.y, thing.z);
        p.box(thing.width, thing.height, thing.width);
        p.translate(-thing.x, -thing.y, -thing.z);
        p.translate((colCount * 85) / 2, 0, 400);
        p.rotateX(-thing.rotation.x);
        p.rotateY(-thing.rotation.y);
        p.rotateZ(-thing.rotation.z);
      });
    });
  };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function trigger({ accent }) {
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
                y: getRandomArbitrary(-0.03, -0.3)
              },
              rotation: {
                x: 0,
                y: 0,
                z: 0
              },
              rotationVelocity: {
                x: getRandomArbitrary(-0.01, 0.01),
                y: getRandomArbitrary(-0.01, 0.01),
                z: getRandomArbitrary(-0.01, 0.01)
              }
            };
          });
      });

    if (lastTriggeredSynth && lastTriggeredSynth !== currentSynth) {
      lastTriggeredSynth.stop();
    }

    accent ? currentAccent.play() : currentDrum.play();
    currentSynth.play();
    lastTriggeredSynth = currentSynth;
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
      currentSynth = synth1;
    }

    // 2 = synth2
    if (p.keyCode === 50) {
      currentSynth = synth2;
    }

    // 3 = synth3
    if (p.keyCode === 51) {
      currentSynth = synth3;
    }

    // 4 = synth4
    if (p.keyCode === 52) {
      currentSynth = synth4;
    }

    // 5 = synth5
    if (p.keyCode === 53) {
      currentSynth = synth5;
    }

    // 7 = drum2 (snare)
    if (p.keyCode === 55) {
      currentDrum = drum2;
      currentAccent = drum2Accent;
    }

    // 8 = drum3 (rimshot)
    if (p.keyCode === 56) {
      currentDrum = drum3;
      currentAccent = drum3Accent;
    }

    // 9 = drum1 (kick drum)
    if (p.keyCode === 57) {
      currentDrum = drum1;
      currentAccent = drum1Accent;
    }
  };
}
