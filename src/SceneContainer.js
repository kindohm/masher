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
  let currentScene = 'scene1';

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
    currentScene = props.scene;
  };

  const update = scene => {
    scene.update(p);
  };

  p.draw = () => {
    update(scenes[currentScene]);
    scenes[currentScene].draw(p);
  };

  p.keyPressed = () => {
    const scene = scenes[currentScene];

    if (p.keyCode === HIT) {
      scene.hit(p);
    }

    if (p.keyCode === ACCENT) {
      scene.accent(p);
    }

    if (p.keyCode === CHANGE_PATCH) {
      scene.changePatch();
    }

    if (p.keyCode === CHANGE_BANK) {
      scene.changeBank();
    }
  };
}
