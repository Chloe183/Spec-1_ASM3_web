function createCanalArt(container) {

  return new p5((p) => {

    let particles = [];
    let cells = [];

    p.setup = function () {

      const canvas =
        p.createCanvas(900, 500);

      canvas.parent(container);

      p.pixelDensity(1);

      createParticles();
      createCells();

    };


    p.draw = function () {

      p.background("#06131C");

      drawGrid();
      drawWater();
      drawCells();
      drawPollution();
      drawParticles();

    };


    function drawGrid() {

      p.stroke("#102B37");
      p.strokeWeight(1);

      for (
        let x = 0;
        x < p.width;
        x += 45
      ) {

        p.line(
          x,
          0,
          x,
          p.height
        );

      }


      for (
        let y = 0;
        y < p.height;
        y += 45
      ) {

        p.line(
          0,
          y,
          p.width,
          y
        );

      }

    }


    function drawWater() {

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(5);

      p.beginShape();

      for (
        let x = 0;
        x <= p.width;
        x += 10
      ) {

        const y =
          p.height / 2 +
          p.sin(x * 0.015) * 40 +
          p.sin(x * 0.035) * 15;

        p.curveVertex(
          x,
          y
        );

      }

      p.endShape();

    }


    function drawCells() {

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(2);

      for (const cell of cells) {

        p.circle(
          cell.x,
          cell.y,
          cell.size
        );

      }

    }


    function drawPollution() {

      p.noFill();
      p.stroke("#C62828");
      p.strokeWeight(3);

      for (let i = 0; i < 12; i++) {

        const x =
          (i * 97 + p.frameCount * 0.2)
          % p.width;

        const y =
          p.height / 2 +
          p.sin(i * 2 + p.frameCount * 0.01) * 70;

        p.circle(
          x,
          y,
          15 + (i % 3) * 8
        );

      }

    }


    function drawParticles() {

      p.noStroke();
      p.fill("#C62828");

      for (const particle of particles) {

        p.circle(
          particle.x,
          particle.y,
          particle.size
        );


        particle.x +=
          particle.speed;


        if (
          particle.x >
          p.width + 10
        ) {

          particle.x = -10;

          particle.y =
            p.height / 2 +
            p.random(-80, 80);

        }

      }

    }


    function createParticles() {

      for (let i = 0; i < 60; i++) {

        particles.push({
          x: p.random(p.width),
          y:
            p.height / 2 +
            p.random(-80, 80),
          size: p.random(3, 8),
          speed: p.random(0.3, 1.2)
        });

      }

    }


    function createCells() {

      for (let i = 0; i < 12; i++) {

        cells.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(20, 65)
        });

      }

    }

  });

}