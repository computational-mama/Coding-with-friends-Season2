let resolution = 32
let p;
let pixels =[]
DISPLAY_SCALE = 32
function setup(){
    createCanvas(400,400)
    p =createGraphics(resolution,resolution)
}

function draw(){
    background(0);
    p.background(0,200,100)
    fill(255);
    a = 0;
    r = resolution/8;
    translate(width/2,height/2);
    p.translate(p.width/2,p.height/2)
    for (i = 0; i < TWO_PI; i += PI / 6) {
        x = resolution / 4 * cos(i);
        y = resolution / 4 * sin(i);
        p.circle(x, y, r);
      }
    image(p,0,0);
    pixels = []
    for (let y = 0; y < resolution; y++) {
      let xRow = []
      for (let x = 0; x < resolution; x++) {
        xRow.push(brightness(p.get(x, y)))
      }
      pixels.push(xRow)
    }
    // translate(-width / 2, -height / 2);
    // rotateZ(frameCount*0.01)
    push()
    scale(DISPLAY_SCALE / 2);
    strokeWeight(2);
    stroke(255)
    let lines = marchingSquares(pixels, 0.1)
    lines.map(function (i) {
      line(i[0], i[1], i[2], i[3])
    })
    pop()
}