function createStormDrainArt(container) {
  return new p5((p) => {
    const W = 1920;
    const H = 1080;
    const BLUE = [69, 138, 215];
    const RED = [198, 40, 40];
    const WHITE = [244, 248, 251];
    let trash = [];
    let drops = [];

    p.setup = () => {
      p.createCanvas(W, H);
      p.resizeCanvas(W, H);
      p.pixelDensity(1);
      p.frameRate(30);
      p.canvas.width = W;
      p.canvas.height = H;

      for (let i = 0; i < 8; i++) {
        trash.push({
          x: p.random(150, 1050),
          y: p.random(250, 430),
          r: p.random(18, 34),
          type: i % 3
        });
      }

      if (window.stageCleanState && window.stageCleanState[0]) {
        trash.length = 0;
      }

      for (let i = 0; i < 50; i++) {
        drops.push({
          x: p.random(W),
          y: p.random(H),
          s: p.random(1, 4)
        });
      }
    };

    p.draw = () => {
      p.background(8, 36, 62);
      drawGrid();
      drawStreet();
      drawDrain();
      drawFlow();
      drawTrash();
      drawTechnicalData();
    };

    function drawGrid() {
      p.stroke(255, 255, 255, 16);
      p.strokeWeight(1);
      for (let x = 0; x < W; x += 50) p.line(x, 0, x, H);
      for (let y = 0; y < H; y += 50) p.line(0, y, W, y);
    }

    function drawStreet() {
      p.noStroke();
      p.fill(23, 55, 78);
      p.rect(0, 0, W, 245);

      p.fill(31, 68, 91);
      p.rect(0, 245, W, 185);

      p.fill(48, 84, 103);
      p.rect(0, 430, W, 270);

      p.fill(WHITE);
      p.textFont("monospace");
      p.textSize(12);
      p.text("URBAN SURFACE / RAIN EVENT", 35, 42);

      p.stroke(255, 255, 255, 80);
      p.strokeWeight(3);
      for (let x = 50; x < W; x += 130) {
        p.line(x, 250, x + 70, 250);
      }
    }

    function drawDrain() {
      p.noStroke();
      p.fill(5, 20, 32);
      p.rect(390, 450, 420, 170, 25);

      p.fill(BLUE);
      p.rect(410, 470, 380, 130, 18);

      p.stroke(WHITE[0], WHITE[1], WHITE[2], 80);
      p.strokeWeight(4);
      for (let x = 440; x < 780; x += 55) {
        p.line(x, 480, x + 30, 590);
      }

      p.noStroke();
      p.fill(WHITE);
      p.textSize(13);
      p.text("STORM DRAIN", 420, 650);
    }

    function drawFlow() {
      p.noFill();
      p.stroke(BLUE[0], BLUE[1], BLUE[2], 170);
      p.strokeWeight(5);

      for (let i = 0; i < 7; i++) {
        const y = 110 + i * 42;
        p.beginShape();
        for (let x = 100; x < 1100; x += 25) {
          p.curveVertex(x, y + p.sin(x * .012 + p.frameCount * .025 + i) * 15);
        }
        p.endShape();
      }

      p.noStroke();
      p.fill(BLUE);
      for (const d of drops) {
        d.y += d.s;
        if (d.y > 430) d.y = 0;
        p.circle(d.x, d.y, d.s * 2);
      }
    }

    function drawTrash() {
      p.noStroke();
      for (const item of trash) {
        p.push();
        p.translate(item.x, item.y);
        p.rotate(p.sin(p.frameCount * .02 + item.x) * .08);
        p.fill(RED);

        if (item.type === 0) {
          p.rect(-item.r * .6, -item.r * .9, item.r * 1.2, item.r * 1.8, 7);
        } else if (item.type === 1) {
          p.circle(0, 0, item.r * 1.4);
          p.rect(-item.r * .8, -item.r * .15, item.r * 1.6, item.r * .3, 5);
        } else {
          p.rect(-item.r, -item.r * .5, item.r * 2, item.r, 6);
        }

        p.pop();
      }
    }

    function drawTechnicalData() {
      p.noStroke();
      p.fill(WHITE);
      p.textFont("monospace");
      p.textSize(10);
      p.text("RUNOFF", 35, 590);
      p.text("POLLUTANTS", 35, 610);
      p.text(`${trash.length.toString().padStart(2, "0")} DETECTED`, 35, 630);
      p.text("CLICK RED ELEMENTS TO REMOVE", 900, 650);
    }

    p.mousePressed = () => {
      if (p.mouseX < 0 || p.mouseX > W || p.mouseY < 0 || p.mouseY > H) return;

      for (let i = trash.length - 1; i >= 0; i--) {
        if (p.dist(p.mouseX, p.mouseY, trash[i].x, trash[i].y) < trash[i].r * 1.5) {
          trash.splice(i, 1);

          if (trash.length === 0 && window.markStageClean) {
            window.markStageClean(0);
          }

          return;
        }
      }
    };
  }, container);
}