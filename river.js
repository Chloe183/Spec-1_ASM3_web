function createRiverArt(container) {
  return new p5((p) => {
    const W = 1920;
    const H = 1080;
    const BLUE = [69, 138, 215];
    const RED = [198, 40, 40];
    const WHITE = [244, 248, 251];
    let trash = [];
    let branches = [];

    p.setup = () => {
      p.createCanvas(W, H);
      p.resizeCanvas(W, H);
      p.pixelDensity(1);
      p.frameRate(30);
      p.canvas.width = W;
      p.canvas.height = H;

      for (let i = 0; i < 9; i++) {
        trash.push({
          x: p.random(300, 900),
          y: p.random(160, 600),
          r: p.random(14, 27),
          phase: p.random(p.TWO_PI)
        });
      }

      if (window.stageCleanState && window.stageCleanState[2]) {
        trash.length = 0;
      }

      for (let i = 0; i < 18; i++) {
        branches.push({
          x: p.random(80, 1120),
          y: p.random(120, 620),
          len: p.random(70, 170),
          angle: p.random(-.7, .7)
        });
      }
    };

    p.draw = () => {
      p.background(7, 35, 59);
      drawGrid();
      drawRiver();
      drawBranches();
      drawTrash();
      drawData();
    };

    function drawGrid() {
      p.stroke(255, 255, 255, 14);
      p.strokeWeight(1);

      for (let x = 0; x < W; x += 50) p.line(x, 0, x, H);
      for (let y = 0; y < H; y += 50) p.line(0, y, W, y);
    }

    function riverWidth(y) {
      return 125 + y * .32 + p.sin(y * .012) * 30;
    }

    function riverCenter(y) {
      return W / 2 + p.sin(y * .009) * 170 + p.sin(y * .022) * 40;
    }

    function drawRiver() {
      p.noStroke();
      p.fill(BLUE);
      p.beginShape();

      for (let y = 0; y <= H; y += 20) {
        const cx = riverCenter(y);
        p.vertex(cx - riverWidth(y), y);
      }

      for (let y = H; y >= 0; y -= 20) {
        const cx = riverCenter(y);
        p.vertex(cx + riverWidth(y), y);
      }

      p.endShape(p.CLOSE);

      p.noFill();
      p.stroke(255, 255, 255, 80);
      p.strokeWeight(2);

      for (let i = 0; i < 9; i++) {
        p.beginShape();

        for (let y = 0; y <= H; y += 30) {
          const cx = riverCenter(y) + p.sin(y * .02 + i) * 35;
          p.curveVertex(cx, y);
        }

        p.endShape();
      }
    }

    function drawBranches() {
      p.noFill();
      p.stroke(BLUE[0], BLUE[1], BLUE[2], 110);
      p.strokeWeight(4);

      for (const b of branches) {
        p.beginShape();
        p.vertex(b.x, b.y);

        p.quadraticVertex(
          b.x + p.cos(b.angle) * b.len * .5,
          b.y + p.sin(b.angle) * b.len * .5,
          b.x + p.cos(b.angle) * b.len,
          b.y + p.sin(b.angle) * b.len
        );

        p.endShape();
      }
    }

    function drawTrash() {
      p.noStroke();

      for (const item of trash) {
        item.x += p.sin(p.frameCount * .018 + item.phase) * .25;
        item.y += .35;

        if (item.y > H + 30) item.y = 120;

        p.fill(RED);
        p.circle(item.x, item.y, item.r * 1.5);
        p.rect(item.x - item.r * .75, item.y - 3, item.r * 1.5, 6, 4);
      }
    }

    function drawData() {
      p.noStroke();
      p.fill(WHITE);
      p.textFont("monospace");
      p.textSize(11);
      p.text("RIVER / NODE 03", 32, 40);
      p.text("DOWNSTREAM NETWORK", 32, 58);
      p.text(`${trash.length.toString().padStart(2, "0")} POLLUTION POINTS`, 32, 80);
      p.text("FLOW →", 1080, 660);
      p.text("CLICK RED ELEMENTS", 950, 680);
    }

    p.mousePressed = () => {
      for (let i = trash.length - 1; i >= 0; i--) {
        if (p.dist(p.mouseX, p.mouseY, trash[i].x, trash[i].y) < trash[i].r * 1.7) {
          trash.splice(i, 1);

          if (trash.length === 0 && window.markStageClean) {
            window.markStageClean(2);
          }

          return;
        }
      }
    };
  }, container);
}