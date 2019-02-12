import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import { getSounds } from './Sound';
import KeyCodes from './KeyCodes';

const HIT = KeyCodes.F;
const ACCENT = KeyCodes.D;
const CHANGE_BANK = KeyCodes.E;
const CHANGE_PATCH = KeyCodes.R;

export default function SceneContainer(p) {
  let scenes = {};
  let currentSceneName = 'scene1';
  let previousSceneName;

  p.preload = () => {
    p.soundFormats('mp3');

    const sounds = getSounds(p);

    [new Scene1(sounds), new Scene2(sounds), new Scene3(sounds)].forEach(
      scene => {
        scene.setup(p);
        scenes[scene.name] = scene;
      }
    );
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    previousSceneName = currentSceneName;
    currentSceneName = props.scene;
  };

  const update = scene => {
    scene.update(p);
  };

  p.draw = () => {
    update(scenes[currentSceneName]);
    scenes[currentSceneName].draw(p);
  };

  p.keyPressed = () => {
    const scene = scenes[currentSceneName];
    const previousScene = previousSceneName ? scenes[previousSceneName] : null;

    if (p.keyCode === HIT) {
      previousScene && previousScene.silence();
      scene.hit(p);
    }

    if (p.keyCode === ACCENT) {
      previousScene && previousScene.silence();
      scene.accent(p);
    }

    if (p.keyCode === CHANGE_PATCH) {
      scene.changePatch();
    }

    if (p.keyCode === CHANGE_BANK) {
      scene.changeBank();
    }
  };

  p.touchStarted = () => {
    const scene = scenes[currentSceneName];
    const previousScene = previousSceneName ? scenes[previousSceneName] : null;

    const halfWidth = window.innerWidth / 2;
    const thirdishHeight = window.innerHeight / 100 * 40;

    if (p.mouseX < halfWidth && p.mouseY < thirdishHeight) {
      scene.changeBank();
    }

    if (p.mouseX > halfWidth && p.mouseY < thirdishHeight) {
      scene.changePatch();
    }

    if (p.mouseX < halfWidth && p.mouseY > thirdishHeight) {
      previousScene && previousScene.silence();
      scene.accent(p);
      return false;
    }

    if (p.mouseX > halfWidth && p.mouseY > thirdishHeight) {
      previousScene && previousScene.silence();
      scene.hit(p);
      return false;
    }
  }
}
