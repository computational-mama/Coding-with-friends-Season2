  //purple 8B5CF6
  //pink EC4899
  //red EF4444
  let myfont;
  const Y_AXIS = 1;
  const X_AXIS = 2;
  let c3, c1, c2;

  let voxels = [];
  let VOXEL_RESOLUTION = 32;
  let xresolution = 32;
  let yresolution = 18;
  let DISPLAY_SCALE = 60;
  let pixels = [];
  let p;

  function preload() {
    myfont = loadFont("SpaceMono-Bold.ttf")
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    p = createGraphics(xresolution, yresolution)
    c1 = color('#8B5CF6') //purple
    c2 = color('#EC4899') //pink
    c3 = color('#EF4444') //red 
    textFont(myfont)
    textAlign(CENTER)
    textSize(48)
    // p.translate(xresolution / 2, yresolution / 2)

  }

  function draw() {
    // background('#ffffff')
    background(255,10)
    // p.background(200,0,20)
    // //background gradient made with setGradient function below
    // push()
    // // translate(-width / 2, -height / 2, 0)
    // setGradient(0, 0, width, height, c1, c3, X_AXIS);
    // pop()

    // //coding with friends text
    // push()
    // translate(0, -100, 10)
    // fill(180)
    // text("CODING WITH FRIENDS", 0, 0, 0, 400)
    // pop()

    noStroke();
    strokeWeight(0.1);


    
    //let locX2 = - sin(frameCount * 0.05) * halfres + halfres;
    //let locY2 = - cos(frameCount * 0.07) * halfres + halfres;


    pixels = [];
    for (let y = 0; y < yresolution; y++) {
      let xRow = [];
      for (let x = 0; x < xresolution; x++) {
        xRow.push(noise(x * 0.05, y * 0.05, frameCount * 0.005) * 2);
      }
      pixels.push(xRow);
    }


    // put drawing code here
    scale(DISPLAY_SCALE);
    for (let y = 0; y < yresolution; y++) {
      let xRow = [];
      for (let x = 0; x < xresolution; x++) {
        // fill(pixels[y][x] * 128);
        // rect(x,y,1,1);
        // push();
        // translate(x, y);
        // fill(c1);
        // noStroke();
        // if (pixels[y][x] >= 1) rect(0, 0, 0.5);
        // pop();
      }
    }

    noFill();
    // strokeWeight(1.0/32.0);
    let lines = marchingSquares(pixels, 1);
    lines.map(function (a) {
      // stroke(c1)
      line(a[0], a[1], a[2], a[3]);
      // line(a[0] + 2, a[1] + 2, a[2] + 2, a[3] + 2);

      // setGradient(a[0], a[1], 4,4, c1, c3, X_AXIS);
      setGradient(a[0], a[1], 2,2, c1, c3, Y_AXIS);

    });

    
    push()    
    textAlign(CENTER)
    fill(c1)
    noStroke()
    textSize(2)
    text("CODING WITH FRIENDS", xresolution/2, yresolution/2-4, 0, 400)
    textSize(1)
    text("Streaming 16-20 July 2021", xresolution/2, yresolution/2+5)
    pop()

  }



  //function to set the gradient
  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let cl = lerpColor(c1, c2, inter);
        let c = lerpColor(cl, c2, inter)
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let cl = lerpColor(c1, c2, inter / 4);
        let c = lerpColor(cl, c2, inter)
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }