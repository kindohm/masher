export default class TestScene1 {
  rotation = 0;
  preload() {}

  setup() {}

  update() {
    this.rotation += 0.01;
  }

  draw(p) {
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.ambientLight(50, 50, 50);

    p.ambientMaterial(255, 255, 0);

    p.rotateY(this.rotation);
    p.rotateX(0.21);
    p.rotateZ(0.13);
    p.box(50, 50, 50);
  }
}
