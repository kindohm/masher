import 'p5/lib/addons/p5.sound';
import { getRandomIntInclusive, getRandomArbitrary } from './Random';

export default class Scene2 {
  name = 'scene2';
  halfPi;
  netHalfPi;
  max = 25;
  size = 1;
  baseScale = 50;
  nodes;
  index;
  cameraRotation = 0;
  randSynths1 = [];
  randSynths2 = [];
  currentDrum;
  currentAccent;
  currentSynthBank;
  playingSynth;

  constructor(allSounds) {
    this.sounds = allSounds.like;
    this.randSynths1.push(this.sounds.synth1a);
    this.randSynths1.push(this.sounds.synth1b);
    this.randSynths1.push(this.sounds.synth1c);
    this.randSynths1.push(this.sounds.synth1d);
    this.randSynths1.push(this.sounds.synth1e);
    this.randSynths2.push(this.sounds.synth2a);
    this.randSynths2.push(this.sounds.synth2b);
    this.randSynths2.push(this.sounds.synth2c);
    this.randSynths2.push(this.sounds.synth2d);
    this.randSynths2.push(this.sounds.synth2e);
  }

  setup(p) {
    this.halfPi = p.PI / 2;
    this.negHalfPi = -p.PI / 2;

    this.currentDrum = this.sounds.bd1;
    this.currentAccent = this.sounds.cp1;
    this.currentSynthBank = this.randSynths1;
  }

  update(p) {
    const rotationScale = p.map(p.mouseY, p.height, 0, 0, 0.0625);
    const velocityScale = p.map(p.mouseX, 0, p.width, 0, 2);
    this.cameraRotation += 0.003;
    if (this.cameraRotation > Number.MAX_SAFE_INTEGER - 1)
      this.cameraRotation = 0;

    this.nodes &&
      this.nodes.forEach(node => {
        if (!node) return;
        node.rotation.x += node.rotationVelocity.x * rotationScale;
        node.rotation.y += node.rotationVelocity.y * rotationScale;
        node.rotation.z += node.rotationVelocity.z * rotationScale;
        node.x += node.velocity.x * velocityScale;
        node.y += node.velocity.y * velocityScale;
        node.z += node.velocity.z * velocityScale;
      });
  }

  draw(p) {
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.ambientLight(50, 50, 50);
    p.noStroke();
    p.fill(0);

    p.rotateY(this.cameraRotation);

    this.drawNodes(p);
    p.rotateY(this.halfPi);
    this.drawNodes(p);
    p.rotateY(this.halfPi);
    this.drawNodes(p);
    p.rotateY(this.halfPi);
    this.drawNodes(p);

    p.rotateY(this.negHalfPi);
    p.rotateY(this.negHalfPi);
    p.rotateY(this.negHalfPi);
  }

  drawNodes(p) {
    this.nodes &&
      this.nodes.forEach(node => {
        if (!node) return;
        p.ambientMaterial(node.color.r, node.color.g, node.color.b);

        p.translate(node.x, node.y, node.z);
        p.rotateX(node.rotation.x);
        p.rotateY(node.rotation.y);
        p.rotateZ(node.rotation.z);
        node.high
          ? p.sphere(node.width, 16, 16)
          : p.box(node.width, node.height, node.depth);
        p.rotateZ(-node.rotation.z);
        p.rotateY(-node.rotation.y);
        p.rotateX(-node.rotation.x);
        p.translate(-node.x, -node.y, -node.z);
      });
  }

  reset() {
    this.nodes = new Array(this.max).fill(null);
    this.index = 0;
  }

  randomSignum() {
    return getRandomArbitrary(-1, 1) > 0 ? 1 : -1;
  }

  trigger({ accent, p }) {
    if (!this.nodes || this.nodes[this.nodes.length - 1] !== null) {
      this.reset();
    }

    const lastNode = this.index === 0 ? null : this.nodes[this.index - 1];
    const scale = p.random(this.baseScale * 0.25, this.baseScale);
    const newNode = {
      x: lastNode ? lastNode.x + lastNode.width / 2 : 0,
      y: lastNode
        ? lastNode.y + (lastNode.height / 2) * this.randomSignum()
        : 0,
      z: lastNode ? lastNode.z + (lastNode.depth / 2) * this.randomSignum() : 0,
      velocity: {
        x: p.random(-1, 1),
        y: p.random(-1, 1),
        z: p.random(-1, 1)
      },
      scale,
      halfScale: scale / 2,
      width: this.size * scale,
      height: this.size * scale,
      depth: this.size * scale,
      high: accent,
      color: accent
        ? {
            r: 255,
            g: getRandomIntInclusive(0, 200),
            b: getRandomIntInclusive(0, 200)
          }
        : {
            r: getRandomIntInclusive(0, 200),
            g: getRandomIntInclusive(0, 200),
            b: 255
          },
      rotation: { x: p.random(-1, 1), y: p.random(-1, 1), z: p.random(-1, 1) },
      rotationVelocity: {
        x: p.random(-1, 1),
        y: p.random(-1, 1),
        z: p.random(-1, 1)
      }
    };

    this.nodes[this.index] = newNode;
    this.index++;

    if (this.playingSynth) {
      this.playingSynth.stop();
    }

    this.playingSynth = this.randSynths2[
      getRandomIntInclusive(0, this.currentSynthBank.length - 1)
    ];

    if (accent) {
      this.currentAccent.play();
    } else {
      this.currentDrum.play();
    }

    this.playingSynth.play();
  }

  hit(p) {
    this.trigger({ accent: false, p });
  }

  accent(p) {
    this.trigger({ accent: true, p });
  }

  changePatch() {}

  changeBank() {
    this.currentDrum =
      this.currentDrum === this.sounds.bd1 ? this.sounds.bd2 : this.sounds.bd1;

    this.currentAccent =
      this.currentAccent === this.sounds.cp1
        ? this.sounds.cp2
        : this.sounds.cp1;

    this.currentSynthBank =
      this.currentSynthBank === this.randSynths1
        ? this.randSynths2
        : this.randSynths1;
  }

  silence() {
    this.playingSynth && this.playingSynth.stop();
  }
}
