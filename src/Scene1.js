import 'p5/lib/addons/p5.sound';

export default class Scene1 {
  name = 'scene1';
  sounds;
  currentDrum;
  currentAccent;
  currentSynth;
  lastTriggeredSynth;

  colCount = 7;
  rowCount = 7;
  rows = [];

  constructor(allSounds) {
    this.sounds = allSounds.dis;
    this.trigger = this.trigger.bind(this);
    this.currentDrum = this.sounds.drum2;
    this.currentAccent = this.sounds.drum2Accent;
    this.currentSynth = this.sounds.synth1;
  }

  setup(p) {}

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
    p.noStroke();

    this.rows.forEach(row => {
      row.forEach(thing => {
        const color = thing.color;
        p.ambientMaterial(color.red, color.green, color.blue);

        p.rotateX(thing.rotation.x);
        p.rotateY(thing.rotation.y);
        p.rotateZ(thing.rotation.z);
        p.translate(
          (-this.colCount * 85) / 2 + thing.x,
          0 + thing.y,
          -400 + thing.z
        );
        p.box(thing.width, thing.height, thing.width);
        p.translate(
          (this.colCount * 85) / 2 - thing.x,
          0 - thing.y,
          400 - thing.z
        );
        p.rotateZ(-thing.rotation.z);
        p.rotateY(-thing.rotation.y);
        p.rotateX(-thing.rotation.x);
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

  hit() {
    this.trigger({ accent: false });
  }

  accent() {
    this.trigger({ accent: true });
  }

  changePatch() {
    this.currentSynth =
      this.currentSynth === this.sounds.synth1
        ? this.sounds.synth2
        : this.currentSynth === this.sounds.synth2
        ? this.sounds.synth3
        : this.currentSynth === this.sounds.synth3
        ? this.sounds.synth4
        : this.currentSynth === this.sounds.synth4
        ? this.sounds.synth5
        : this.sounds.synth1;
  }

  changeBank() {
    this.currentDrum =
      this.currentDrum === this.sounds.drum1
        ? this.sounds.drum2
        : this.currentDrum === this.sounds.drum2
        ? this.sounds.drum3
        : this.sounds.drum1;

    this.currentAccent =
      this.currentAccent === this.sounds.drum1Accent
        ? this.sounds.drum2Accent
        : this.currentAccent === this.sounds.drum2Accent
        ? this.sounds.drum3Accent
        : this.sounds.drum1Accent;
  }

  silence() {
    this.lastTriggeredSynth && this.lastTriggeredSynth.stop();
  }
}
