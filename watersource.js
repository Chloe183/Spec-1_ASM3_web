function createWaterSourceArt(container) {

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
      drawSource();
      drawWater();
      drawCells();
      drawParticles();
      drawCheck();

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


    function drawSource() {

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(5);

      p.circle(
        p.width / 2,
        p.height / 2,
        280
      );

      p.strokeWeight(3);

      p.circle(
        p.width / 2,
        p.height / 2,
        205
      );

      p.circle(
        p.width / 2,
        p.height / 2,
        125
      );

    }


    function drawWater() {

      p.noFill();
      p.stroke("#458AD7");
      p.strokeWeight(4);

      for (let i = 0; i < 3; i++) {

        p.beginShape();

        for (
          let x = 250;
          x <= 650;
          x += 15
        ) {

          const y =
            350 +
            i * 20 +
            p.sin(
              x * 0.02 + i
            ) * 15;

          p.curveVertex(
            x,
            y
          );

        }

        p.endShape();

      }

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


        particle.y -=
          particle.speed;


        if (
          particle.y < -10
        ) {

          particle.y =
            p.height + 10;

          particle.x =
            p.random(p.width);

        }

      }

    }


    function drawCheck() {

      p.noFill();

      p.stroke("#FFFFFF");
      p.strokeWeight(6);

      p.strokeCap(p.ROUND);
      p.strokeJoin(p.ROUND);

      const cx =
        p.width / 2;

      const cy =
        p.height / 2;


      p.line(
        cx - 35,
        cy,
        cx - 5,
        cy + 30
      );


      p.line(
        cx - 5,
        cy + 30,
        cx + 50,
        cy - 40
      );

    }


    function createParticles() {

      for (let i = 0; i < 50; i++) {

        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(3, 7),
          speed: p.random(0.2, 1)
        });

      }

    }


    function createCells() {

      for (let i = 0; i < 8; i++) {

        cells.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(20, 55)
        });

      }

    }

  });

}