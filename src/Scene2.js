import 'p5/lib/addons/p5.sound';
import { getRandomIntInclusive, getRandomArbitrary } from './Random';

import Bd1 from './sounds/like/bd1.mp3';
import Bd2 from './sounds/like/bd2.mp3';
import Cp1 from './sounds/like/cp1.mp3';
import Cp2 from './sounds/like/cp2.mp3';

export default class Scene2 {
  halfPi;
  netHalfPi;
  max = 25;
  size = 1;
  baseScale = 50;
  nodes;
  index;
  cameraRotation = 0;
  otherBank;

  bd1;
  bd2;
  cp1;
  cp2;

  preload(p) {
    this.halfPi = p.PI / 2;
    this.negHalfPi = -p.PI / 2;

    p.soundFormats('mp3');

    this.bd1 = p.loadSound(Bd1);
    this.bd1.setVolume(0.95);
    this.bd1.playMode('restart');

    this.bd2 = p.loadSound(Bd2);
    this.bd2.setVolume(0.95);
    this.bd2.playMode('restart');

    this.cp1 = p.loadSound(Cp1);
    this.cp1.setVolume(0.95);
    this.cp1.playMode('restart');

    this.cp2 = p.loadSound(Cp2);
    this.cp2.setVolume(0.95);
    this.cp2.playMode('restart');
  }

  setup(p) {
    // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
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

    if (accent) {
      if (this.otherBank) {
        this.cp2.play();
      } else {
        this.cp1.play();
      }
    } else {
      if (this.otherBank) {
        this.bd2.play();
      } else {
        this.bd1.play();
      }
    }
  }

  keyPressed(p) {
    if (p.keyCode === 90) {
      return this.trigger({ accent: false, p });
    }

    if (p.keyCode === 88) {
      return this.trigger({ accent: true, p });
    }

    // 1 = bank1
    if (p.keyCode === 49) {
      this.otherBank = false;
    }

    // 2 = bank2
    if (p.keyCode === 50) {
      this.otherBank = true;
    }
  }
}
