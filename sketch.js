  //purple 8B5CF6
  //pink EC4899
  //red EF4444
  let myfont;
  const Y_AXIS = 1;
  const X_AXIS = 2;
  let c3, c1, c2;

  let voxels = [];
  let VOXEL_RESOLUTION = 32;
  let resolution = 64;
  let DISPLAY_SCALE = 8;
  let pixels = [];
  let p;

  function preload() {
    myfont = loadFont("SpaceMono-Bold.ttf")
  }

  function setup() {
    createCanvas(800, 800, WEBGL);
    p = createGraphics(resolution, resolution)
    c1 = color('#8B5CF6') //purple
    c2 = color('#EC4899') //pink
    c3 = color('#EF4444') //red 
    textFont(myfont)
    textAlign(CENTER)
    textSize(48)
    p.translate(resolution/2,resolution/2)
    
  }

  function draw() {
    background('#ffffff')
    
    // //background gradient made with setGradient function below
    push()
    translate(-width / 2, -height / 2, 0)
    setGradient(0, 0, width, height, c1, c3, X_AXIS);
    pop()

    // //coding with friends text
    push()
    translate(0, -100, 10)
    fill(180)
    text("CODING WITH FRIENDS", 0, 0, 0, 400)
    pop()

    p.background(0)
    p.fill(255)
    push()

    // p.circle(x+16,y+16,resolution/8)
    push()
    a = frameCount*0.01
    q = cos(a)
    s = sin(a)
    translate(p.width/2,p.height/2)
    // p.circle(q,s,4)
    pop()
    // a = 0
    r = resolution / 10
    p.textSize(r*2)
    // p.text("CODING WITH FRIENDS", 0,0,resolution/2,resolution)
   
    for (i = 0; i < TWO_PI; i += PI / 6) {
      x = resolution / 4 * cos(i+a*2)
      y = resolution / 4 * sin(i+a)
      p.circle(x, y, r)
    }
    // image(p,0,0)
    pop()

    pixels = []
    for (let y = 0; y < resolution; y++) {
      let xRow = []
      for (let x = 0; x < resolution; x++) {
        xRow.push(brightness(p.get(x, y)))
      }
      pixels.push(xRow)
    }

    rotateZ(frameCount*0.01)
    translate(-width/2-120,-height/2-100, 0)
    scale(DISPLAY_SCALE * 2)
    strokeWeight(1)
    stroke(180)
    // rectMode(CENTER)
    let lines = marchingSquares(pixels, 1)
    lines.map(function (i) {
      
      line(i[0], i[1], i[2], i[3])
      line(i[0]+1,i[1]+1,i[2]+1,i[3]+1);
push()
rectMode(CENTER)
      fill(c3)
      rect(i[0], i[1],0.3)
pop()
    })
  
    
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