export default class TestScene2 {
  rotation = 0;
  preload() {}

  setup() {}

  update() {
    this.rotation += 0.018;
  }

  draw(p) {
    p.background('black');
    p.directionalLight(250, 250, 250, -0.45, -0.25, 0.35);
    p.ambientLight(50, 50, 50);

    p.ambientMaterial(255, 0, 255);

    p.rotateX(0.21 + this.rotation);
    p.rotateY(this.rotation);
    p.translate(65, 1, 2);
    p.rotateZ(0.13 - this.rotation);

    p.box(50, 70, 20);
  }
}
