function createRiverArt(container) {

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
      drawRiver();
      drawSecondaryRiver();
      drawCells();
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


    function drawRiver() {

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(6);

      p.beginShape();

      for (
        let x = 0;
        x <= p.width;
        x += 15
      ) {

        const y =
          p.height / 2 +
          p.sin(
            x * 0.01
          ) * 80;

        p.curveVertex(
          x,
          y
        );

      }

      p.endShape();

    }


    function drawSecondaryRiver() {

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(2);

      p.beginShape();

      for (
        let x = 0;
        x <= p.width;
        x += 15
      ) {

        const y =
          p.height / 2 +
          p.sin(
            x * 0.014 + 2
          ) * 65;

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


    function drawParticles() {

      p.noStroke();
      p.fill("#458AD7");

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
            p.random(-100, 100);

        }

      }

    }


    function createParticles() {

      for (let i = 0; i < 70; i++) {

        particles.push({
          x: p.random(p.width),
          y:
            p.height / 2 +
            p.random(-100, 100),
          size: p.random(3, 7),
          speed: p.random(0.3, 1.3)
        });

      }

    }


    function createCells() {

      for (let i = 0; i < 10; i++) {

        cells.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(20, 55)
        });

      }

    }

  });

}