function createWaterSourceArt(container) {
  return new p5((p) => {
    const W = 1920;
    const H = 1080;
    const BLUE = [69, 138, 215];
    const RED = [198, 40, 40];
    const WHITE = [244, 248, 251];
    let trash = [];
    let rings = [];

    p.setup = () => {
      p.createCanvas(W, H);
      p.resizeCanvas(W, H);
      p.pixelDensity(1);
      p.frameRate(30);
      p.canvas.width = W;
      p.canvas.height = H;

      for (let i = 0; i < 6; i++) {
        const a = (p.TWO_PI / 6) * i;
        trash.push({
          x: W / 2 + Math.cos(a) * 190,
          y: H / 2 + Math.sin(a) * 190,
          r: 22,
          angle: a
        });
      }

      if (window.stageCleanState && window.stageCleanState[3]) {
        trash.length = 0;
      }

      for (let i = 0; i < 7; i++) {
        rings.push({
          r: 80 + i * 55,
          speed: .3 + i * .05
        });
      }
    };

    p.draw = () => {
      p.background(7, 35, 59);
      drawGrid();
      drawNetwork();
      drawHeart();
      drawTrash();
      drawLabels();
    };

    function drawGrid() {
      p.stroke(255, 255, 255, 14);
      p.strokeWeight(1);
      for (let x = 0; x < W; x += 50) p.line(x, 0, x, H);
      for (let y = 0; y < H; y += 50) p.line(0, y, W, y);
    }

    function drawNetwork() {
      p.noFill();
      p.stroke(BLUE[0], BLUE[1], BLUE[2], 100);
      p.strokeWeight(4);

      for (const ring of rings) {
        ring.r += ring.speed;
        if (ring.r > 450) ring.r = 80;
        p.circle(W / 2, H / 2, ring.r);
      }

      p.stroke(WHITE[0], WHITE[1], WHITE[2], 80);
      p.strokeWeight(2);

      for (let i = 0; i < 16; i++) {
        const a = p.TWO_PI / 16 * i;
        p.line(
          W / 2 + Math.cos(a) * 60,
          H / 2 + Math.sin(a) * 60,
          W / 2 + Math.cos(a) * 310,
          H / 2 + Math.sin(a) * 310
        );
      }
    }

    function drawHeart() {
      p.noStroke();
      p.fill(BLUE);
      p.beginShape();
      p.vertex(W / 2, H / 2 + 100);
      p.bezierVertex(
        W / 2 - 150,
        H / 2,
        W / 2 - 100,
        H / 2 - 130,
        W / 2,
        H / 2 - 40
      );
      p.bezierVertex(
        W / 2 + 100,
        H / 2 - 130,
        W / 2 + 150,
        H / 2,
        W / 2,
        H / 2 + 100
      );
      p.endShape();
    }

    function drawTrash() {
      p.noStroke();

      for (const item of trash) {
        item.angle += .003;
        item.x = W / 2 + Math.cos(item.angle) * 190;
        item.y = H / 2 + Math.sin(item.angle) * 190;

        p.fill(RED);
        p.circle(item.x, item.y, item.r * 1.5);
        p.rect(item.x - item.r * .7, item.y - 3, item.r * 1.4, 6, 4);
      }
    }

    function drawLabels() {
      p.noStroke();
      p.fill(WHITE);
      p.textFont("monospace");
      p.textSize(11);
      p.text("WATER SOURCE / NODE 04", 32, 40);
      p.text("VITAL SYSTEM / HEART", 32, 58);
      p.text(`${trash.length.toString().padStart(2, "0")} CONTAMINANTS`, 32, 80);
      p.text("FINAL SOURCE STATUS", 925, 40);
      p.text(trash.length === 0 ? "STABLE" : "AT RISK", 925, 60);
      p.text("CLICK RED ELEMENTS", 960, 665);
    }

    p.mousePressed = () => {
      for (let i = trash.length - 1; i >= 0; i--) {
        if (p.dist(p.mouseX, p.mouseY, trash[i].x, trash[i].y) < trash[i].r * 1.8) {
          trash.splice(i, 1);

          if (trash.length === 0 && window.markStageClean) {
            window.markStageClean(3);
          }

          return;
        }
      }
    };
  }, container);
}