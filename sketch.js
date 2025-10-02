// --- Dimensioni canvas
let xMax = 500;
let yMax = 400;

// --- Stato del pesce (equivalente a xRocket / yRocKet nel modello)
let xFish = -90;             // parte da sinistra, fuori schermo
let yFish = yMax * 0.55;     // altezza di nuoto
let fishSpeed = 2.0;         // velocità orizzontale

// --- Misure del pesce (rombo = corpo)
let bodyW = 120;             // larghezza del rombo (orizzontale)
let bodyH = 70;              // altezza del rombo (verticale)

function setup() {
  createCanvas(xMax, yMax);
}

function draw() {
  // sfondo (mare scuro)
  background(10, 25, 50);

  // mostrare un testo bianco
  // che dice le coordinate del mouse
  // sul foglio da disegno
  fill(255);
  // stringa, x,y (come nel modello)
  text("mouseX: " + mouseX + ",    mouseY:" + mouseY, 16, 22);

  // -------------------------------------------------
  // disegnare le bolle
  // 40
  // tre tipi di bolle: a, b, c
  // fino a che abbiamo 40 bolle
  // bolle ellipse (algoritmo deterministico a moduli, come le stelle)
  push();
    for (let i = 0; i < 40; i++) {
      // sequenza pseudo-casuale con moduli + piccoli offset (senza random())
      let bubbleX = (i * 37) % width + (i % 3) * 5;
      let bubbleY = (i * 73) % height + (i % 7);

      if (i == 0) {
        fill(185, 225, 255, 160);
        ellipse(bubbleX, bubbleY, 10);
      } else if (i == 1) {
        fill(205, 240, 255, 150);
        ellipse(bubbleX, bubbleY, 10);
      } else {
        fill(165, 210, 245, 145);
        ellipse(bubbleX, bubbleY, 10);
      }
    }
  pop();
  // -------------------------------------------------

  // contesto di disegno
  push();

    // PESCE (3 forme: ROMBO + TRIANGOLO + CERCHIO)
    // ROMBO = corpo con quad() centrato in (xFish, yFish)
    // vertici del rombo (top, right, bottom, left)
    let topV    = { x: xFish,              y: yFish - bodyH / 2 };
    let rightV  = { x: xFish + bodyW / 2,  y: yFish };
    let bottomV = { x: xFish,              y: yFish + bodyH / 2 };
    let leftV   = { x: xFish - bodyW / 2,  y: yFish };

    // Corpo (ROMBO)
    fill(240, 140, 60); // arancione
    stroke(40);
    strokeWeight(2);
    quad(topV.x, topV.y, rightV.x, rightV.y, bottomV.x, bottomV.y, leftV.x, leftV.y);

    // Coda (TRIANGOLO) attaccata al vertice sinistro del rombo
    fill(220, 110, 50);
    noStroke();
    triangle(
      leftV.x, leftV.y,            // attacco al corpo
      leftV.x - 40, leftV.y - 25,  // punta alto
      leftV.x - 40, leftV.y + 25   // punta basso
    );

    // Occhio (CERCHIO) sul lato destro del corpo
    fill(255);
    stroke(30);
    strokeWeight(1.5);
    let eyeX = xFish + bodyW * 0.25;
    let eyeY = yFish - bodyH * 0.18;
    ellipse(eyeX, eyeY, 16, 16);

    // Pupilla (CERCHIO) – opzionale, rimane “cerchio” come nel soggetto
    noStroke();
    fill(30);
    ellipse(eyeX, eyeY, 7, 7);

  // finire contesto
  pop();

  // -------------------------------------------------

  // animazione semplice: scorrimento orizzontale e riavvio
  xFish = xFish + fishSpeed;

  // soglia e riavvio (stile del modello)
  let soglia = xMax + bodyW / 2 + 40;
  if (xFish > soglia) {
    xFish = -bodyW / 2 - 40; // rientra da sinistra
    // opzionale: piccola variazione dell'altezza (deterministica)
    yFish = yMax * 0.45 + 35 * sin(frameCount * 0.05);
  }
}
