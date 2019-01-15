import 'p5/lib/addons/p5.sound';

export default function Scene3(p) {
  const baseSize = 75;
  const cellSize = 120;
  const rowCount = 4;
  const colCount = 4;
  const slotCount = 4;

  const standardXTranslation = ((colCount - 1) * -cellSize) / 2;
  const standardYTransltion = ((slotCount - 1) * -cellSize) / 2;
  const standardZTranslation = ((rowCount - 1) * -cellSize) / 2;

  let rows;
  let cameraRotX = 0;
  let cameraRotY = 0;
  let cameraRotZ = 0;

  p.preload = function() {};
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    rows = new Array(rowCount).fill(
      new Array(colCount).fill(new Array(slotCount).fill(null))
    );
    reset({ accent: false });
  };

  p.update = function() {
    cameraRotX -= 0.001;
    cameraRotY -= 0.006;
    cameraRotZ += 0.0001;

    const rotationScale = p.map(p.mouseY, p.height, 0, 0.002, -0.002);
    const growthScale = p.map(p.mouseX, 0, p.width, -0.05, 0.05);

    let cell;
    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          cell = rows[r][c][s];
          if (!cell) continue;
          cell.rotation += rotationScale;
          cell.size += growthScale;
        }
      }
    }
  };

  p.draw = function() {
    p.update();
    p.background('black');
    p.noFill();
    p.strokeWeight(2);

    p.rotateX(cameraRotX);
    p.rotateY(cameraRotY);
    p.rotateZ(cameraRotZ);
    p.translate(
      standardXTranslation,
      standardYTransltion,
      standardZTranslation
    );

    if (!rows) return;

    let cell;

    p.stroke(0, 0, 255);

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          cell = rows[r][c][s];
          if (!cell) continue;
          p.translate(c * cellSize, r * cellSize, s * cellSize);
          p.rotateX(cell.rotation);
          (cell.high && drawTriangle(cell.size, cell.size)) ||
            p.box(cell.size, cell.size, 1);
          p.rotateX(-cell.rotation);
          p.translate(-c * cellSize, -r * cellSize, -s * cellSize);
        }
      }
    }
  };

  function reset({ accent }) {
    cameraRotX = 0;
    cameraRotY = 0;
    cameraRotZ = 0;

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        for (let s = 0; s < slotCount; s++) {
          rows[r][c][s] = {
            size: baseSize,
            rotation: 0,
            high: accent
          };
        }
      }
    }
  }

  function trigger({ accent }) {
    reset({ accent });
  }

  p.keyPressed = function() {
    if (p.keyCode === 90) {
      return trigger({ accent: false });
    }

    if (p.keyCode === 88) {
      return trigger({ accent: true });
    }
  };

  function drawTriangle(sizeX, sizeY) {
    p.beginShape();

    p.vertex(-sizeX, sizeY, 0);
    p.vertex(sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.vertex(sizeX, sizeY, 0);
    p.vertex(sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.vertex(sizeX, sizeY, 0);
    p.vertex(-sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.vertex(-sizeX, sizeY, 0);
    p.vertex(-sizeX, sizeY, 0);
    p.vertex(0, -sizeY, 0);

    p.endShape();
  }
}
