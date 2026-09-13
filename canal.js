function createCanalArt(container) {
  return new p5((p) => {
    const W = 1920;
    const H = 1080;
    const BLUE = [69, 138, 215];
    const RED = [198, 40, 40];
    const WHITE = [244, 248, 251];
    let trash = [];
    let particles = [];

    p.setup = () => {
      p.createCanvas(W, H);
      p.resizeCanvas(W, H);
      p.pixelDensity(1);
      p.frameRate(30);
      p.canvas.width = W;
      p.canvas.height = H;

      for (let i = 0; i < 7; i++) {
        trash.push({
          x: p.random(360, 850),
          y: p.random(250, 570),
          r: p.random(18, 32),
          seed: p.random(1000)
        });
      }

      if (window.stageCleanState && window.stageCleanState[1]) {
        trash.length = 0;
      }

      for (let i = 0; i < 90; i++) {
        particles.push({
          x: p.random(300, 900),
          y: p.random(200, 620),
          s: p.random(1, 3)
        });
      }
    };

    p.draw = () => {
      p.background(7, 35, 59);
      drawGrid();
      drawBanks();
      drawWater();
      drawParticles();
      drawTrash();
      drawLabels();
    };

    function drawGrid() {
      p.stroke(255, 255, 255, 14);
      p.strokeWeight(1);

      for (let x = 0; x < W; x += 50) p.line(x, 0, x, H);
      for (let y = 0; y < H; y += 50) p.line(0, y, W, y);
    }

    function bankPath(side) {
      const points = [];

      for (let y = 0; y <= H; y += 35) {
        const wave = p.sin(y * .012 + side) * 45 + p.sin(y * .028) * 20;

        points.push({
          x: side === 0 ? 300 + wave : 900 + wave,
          y
        });
      }

      return points;
    }

    function drawBanks() {
      p.noStroke();
      p.fill(29, 68, 85);

      const left = bankPath(0);
      const right = bankPath(2);

      p.beginShape();
      p.vertex(0, 0);
      for (const pt of left) p.vertex(pt.x, pt.y);
      p.vertex(0, H);
      p.endShape(p.CLOSE);

      p.beginShape();
      p.vertex(W, 0);
      for (const pt of right) p.vertex(pt.x, pt.y);
      p.vertex(W, H);
      p.endShape(p.CLOSE);
    }

    function drawWater() {
      p.noStroke();
      p.fill(BLUE);
      p.beginShape();

      for (let y = 0; y <= H; y += 20) {
        const left = 315 + p.sin(y * .012) * 45 + p.sin(y * .028) * 20;
        const right = 885 + p.sin(y * .012 + 2) * 45 + p.sin(y * .028) * 20;

        p.vertex(left, y);
        p.vertex(right, y);
      }

      p.endShape();
    }

    function drawParticles() {
      p.noStroke();
      p.fill(255, 255, 255, 100);

      for (const pt of particles) {
        pt.y += pt.s;
        if (pt.y > H) pt.y = 170;

        const left = 315 + p.sin(pt.y * .012) * 45 + p.sin(pt.y * .028) * 20;
        const right = 885 + p.sin(pt.y * .012 + 2) * 45 + p.sin(pt.y * .028) * 20;

        pt.x = p.constrain(pt.x, left + 15, right - 15);
        p.circle(pt.x, pt.y, pt.s * 2);
      }
    }

    function drawTrash() {
      p.noStroke();

      for (const item of trash) {
        item.y += p.sin(p.frameCount * .02 + item.seed) * .15;

        p.push();
        p.translate(item.x, item.y);
        p.rotate(p.sin(p.frameCount * .02 + item.seed) * .2);
        p.fill(RED);
        p.circle(0, 0, item.r * 1.4);
        p.rect(-item.r * .75, -item.r * .2, item.r * 1.5, item.r * .4, 5);
        p.pop();
      }
    }

    function drawLabels() {
      p.noStroke();
      p.fill(WHITE);
      p.textFont("monospace");
      p.textSize(11);
      p.text("CANAL / NODE 02", 32, 40);
      p.text("CONNECTED WATERWAY", 32, 58);
      p.text(`${trash.length.toString().padStart(2, "0")} POLLUTANTS`, 960, 40);
      p.text("CLICK RED ELEMENTS", 970, 660);
    }

    p.mousePressed = () => {
      for (let i = trash.length - 1; i >= 0; i--) {
        if (p.dist(p.mouseX, p.mouseY, trash[i].x, trash[i].y) < trash[i].r * 1.6) {
          trash.splice(i, 1);

          if (trash.length === 0 && window.markStageClean) {
            window.markStageClean(1);
          }

          return;
        }
      }
    };
  }, container);
}