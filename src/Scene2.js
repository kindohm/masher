import 'p5/lib/addons/p5.sound';
import { getRandomIntInclusive, getRandomArbitrary } from './Random';

import Bd1 from './sounds/like/bd1.mp3';
import Bd2 from './sounds/like/bd2.mp3';
import Cp1 from './sounds/like/cp1.mp3';
import Cp2 from './sounds/like/cp2.mp3';

export default function Scene2(p) {
  const max = 25;
  const size = 1;
  const baseScale = 50;
  let nodes;
  let index;
  const halfPi = p.PI / 2;
  const negHalfPi = -p.PI / 2;
  let cameraRotation = 0;
  let otherBank;

  let bd1, bd2, cp1, cp2;

  p.preload = function() {
    p.soundFormats('mp3');

    bd1 = p.loadSound(Bd1);
    bd1.setVolume(0.95);
    bd1.playMode('restart');

    bd2 = p.loadSound(Bd2);
    bd2.setVolume(0.95);
    bd2.playMode('restart');

    cp1 = p.loadSound(Cp1);
    cp1.setVolume(0.95);
    cp1.playMode('restart');

    cp2 = p.loadSound(Cp2);
    cp2.setVolume(0.95);
    cp2.playMode('restart');
  };

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.update = function() {
    const rotationScale = p.map(p.mouseY, p.height, 0, 0, 0.0625);
    const velocityScale = p.map(p.mouseX, 0, p.width, 0, 2);
    cameraRotation += 0.003;
    if (cameraRotation > Number.MAX_SAFE_INTEGER - 1) cameraRotation = 0;

    nodes &&
      nodes.forEach(node => {
        if (!node) return;
        node.rotation.x += node.rotationVelocity.x * rotationScale;
        node.rotation.y += node.rotationVelocity.y * rotationScale;
        node.rotation.z += node.rotationVelocity.z * rotationScale;
        node.x += node.velocity.x * velocityScale;
        node.y += node.velocity.y * velocityScale;
        node.z += node.velocity.z * velocityScale;
      });
  };

  p.draw = function() {
    p.update();
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.ambientLight(50, 50, 50);
    p.noStroke();

    p.rotateY(cameraRotation);

    drawNodes();
    p.rotateY(halfPi);
    drawNodes();
    p.rotateY(halfPi);
    drawNodes();
    p.rotateY(halfPi);
    drawNodes();

    p.rotateY(negHalfPi);
    p.rotateY(negHalfPi);
    p.rotateY(negHalfPi);
  };

  function drawNodes() {
    nodes &&
      nodes.forEach(node => {
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

  function reset() {
    nodes = new Array(max).fill(null);
    index = 0;
  }

  function randomSignum() {
    return getRandomArbitrary(-1, 1) > 0 ? 1 : -1;
  }

  function trigger({ accent }) {
    if (!nodes || nodes[nodes.length - 1] !== null) {
      reset();
    }

    const lastNode = index === 0 ? null : nodes[index - 1];
    const scale = p.random(baseScale * 0.25, baseScale);
    const newNode = {
      x: lastNode ? lastNode.x + lastNode.width / 2 : 0,
      y: lastNode ? lastNode.y + (lastNode.height / 2) * randomSignum() : 0,
      z: lastNode ? lastNode.z + (lastNode.depth / 2) * randomSignum() : 0,
      velocity: {
        x: p.random(-1, 1),
        y: p.random(-1, 1),
        z: p.random(-1, 1)
      },
      scale,
      halfScale: scale / 2,
      width: size * scale,
      height: size * scale,
      depth: size * scale,
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

    nodes[index] = newNode;
    index++;

    if (accent) {
      if (otherBank) {
        cp2.play();
      } else {
        cp1.play();
      }
    } else {
      if (otherBank) {
        bd2.play();
      } else {
        bd1.play();
      }
    }
  }

  p.keyPressed = function() {
    if (p.keyCode === 90) {
      return trigger({ accent: false });
    }

    if (p.keyCode === 88) {
      return trigger({ accent: true });
    }

    // 1 = bank1
    if (p.keyCode === 49) {
      otherBank = false;
    }

    // 2 = bank2
    if (p.keyCode === 50) {
      otherBank = true;
    }
  };
}
