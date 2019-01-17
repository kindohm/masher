import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';

export default function SceneContainer(p) {
  let scenes = {};
  let currentScene = 'scene1';

  p.preload = () => {
    p.soundFormats('mp3');

    let scene1 = new Scene1();
    scene1.preload(p);
    scenes.scene1 = scene1;

    let scene2 = new Scene2();
    scene2.preload(p);
    scenes.scene2 = scene2;

    let scene3 = new Scene3();
    scene3.preload(p);
    scenes.scene3 = scene3;
  };

  p.setup = () => {
    scenes.scene1.setup(p);
    scenes.scene2.setup(p);
    scenes.scene3.setup(p);
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
