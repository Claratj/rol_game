const W = 300, H = 385;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 1);
  rectMode(CENTER);
  background(0.05);
}

function draw() {
  background(0.05, 0);
  translate(width / 2, height / 2);
  strokeWeight(1);
  stroke(0.1);
  curvyborder();
  border();
  
  aurora();
}

function aurora() {
  let ratio = H / W;
  stroke(1, 0.01);
  strokeWeight(1);
  randomSeed(0);
  for (let n = 0; n < 1000; n++) {
    let x = map(random(), 0, 1, -1, 1);
    let y = map(random(), 0, 1, -1, 1);
    
    for (let i = 0; i < 20; i++) {
      let t = i + 0.01 * frameCount;
      x += sin(cos(x - y) + t) - cos(sin(x ** 2) + y);
      y += cos(sin(y - x) + t) + sin(cos(y ** 2) + x);
      
      point(0.25 * x * W, 0.25 * y * H);
    }
  }
}

function border() {
  noFill();
  rect(0, 0, W, H);
}

function curvyborder() {
  const w = W * 1.1;
  const h = H * 1.1;
  const w2 = w / 2;
  const h2 = h / 2;
  
  noFill();
  
  // Top
  curvyline(-w2, -h2, w);
  
  // Right  
  push();
  translate(w2, -h2);
  rotate(PI / 2);
  curvyline(0, 0, h);
  pop();
  
  // Bottom  
  push();
  translate(w2, h2);
  rotate(PI);
  curvyline(0, 0, w);
  pop();
  
  // Left
  push();
  translate(-w2, h2);
  rotate(-PI / 2);
  curvyline(0, 0, h);
  pop();
}

function curvyline(px, py, length) {
  beginShape();
  
  const gapSize = (W / 10);
  const gapRadius = 8;
  
  for (let t = 0; t < length; t += 1) {
    let inc = t % gapSize;
    inc -= gapSize / 2;
    
    let delta = gapRadius ** 2 - inc ** 2;
    let y = delta > 0 ? sqrt(gapRadius ** 2 - inc ** 2) : 0;
    
    if (t >= gapSize / 2 && t <= length - gapSize / 2)
      vertex(px + t, py + y);
  }
  
  endShape();
  
  line(px, py, px + gapSize / 2, py);
  line(px + length, py, px + length - gapSize / 2, py);
}



<div class="card-container">

<div class="card-background">

  <div class="card-frame">

    <div class="frame-header">
      <h1 class="name">Oath of Nissa</h1>
      <!-- here goes the mana icon -->
    </div>

    <!-- Here goes the illustration -->

    <div class="frame-type-line">
      <h1 class="type">Legendary Enchantment</h1>
      <!-- Here goes the set icon -->
    </div>

    <div class="frame-text-box">
      
      <p class="description ftb-inner-margin">When Oath of Nissa enters the battlefield, look at the top three cards of your library. You may reveal a creature, land, or planeswalker card from among them and put it into your hand. Put the rest on the bottom of your library in any order. </p>
      
      <p class="description">You may spend mana as though it were mana of any color to cast planeswalker spells.</p>
      
      <p class="flavour-text">"For the life of every plane, I will keep watch."</p>
    
    </div>

    <div class="frame-bottom-info inner-margin">
      <div class="fbi-left">
        <p>140/184 R</p>
        <p>OGW &#x2022; EN <!-- paintbrush symbol --> Wesley Burt</p>
      </div>

      <div class="fbi-center"></div>

      <div class="fbi-right">
        &#x99; &amp; &#169; 2016 Wizards of the Coast
      </div>
    </div>

  </div>

</div>

</div>