function createStormDrainArt(container) {

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
      drawDrain();
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


    function drawDrain() {

      p.rectMode(p.CENTER);

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(4);

      p.rect(
        p.width / 2,
        p.height / 2,
        300,
        180,
        25
      );


      for (
        let i = -2;
        i <= 2;
        i++
      ) {

        p.line(
          p.width / 2 + i * 45,
          p.height / 2 - 60,
          p.width / 2 + i * 45,
          p.height / 2 + 60
        );

      }

    }


    function drawPollution() {

      p.noFill();
      p.stroke("#C62828");
      p.strokeWeight(3);

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
            p.random(p.height);

        }

      }

    }


    function createParticles() {

      for (let i = 0; i < 60; i++) {

        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(3, 8),
          speed: p.random(0.3, 1.5)
        });

      }

    }


    function createCells() {

      for (let i = 0; i < 12; i++) {

        cells.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(15, 45)
        });

      }

    }

  });

}