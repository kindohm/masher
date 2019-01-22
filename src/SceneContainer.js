import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import { getSounds } from './Sound';

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
    scenes[currentScene].keyPressed(p);
  };
}
