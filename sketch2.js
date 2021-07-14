let myfont;
  const Y_AXIS = 1;
  const X_AXIS = 2;
  let c3, c1, c2;
let p;

let pixels = []
let VOXEL_RESOLUTION = 16; // lower resolution
let DISPLAY_SCALE = 16
let FORESHORTENING = 0.01;

function preload() {
    myfont = loadFont("SpaceMono-Bold.ttf")
  }

function setup() {
    createCanvas(800, 800, WEBGL)
    p = createGraphics(400,400);
    c1 = color('#8B5CF6') //purple
    c2 = color('#EC4899') //pink
    c3 = color('#EF4444') //red 
    textFont(myfont)
    textAlign(CENTER)
     textSize(48)
    voxels = [];
    for (let z = 0; z < VOXEL_RESOLUTION; z++) {
        let thisSlice = [];
        for (let y = 0; y < VOXEL_RESOLUTION; y++) {
            let thisRow = [];
            for (let x = 0; x < VOXEL_RESOLUTION; x++) {
                thisRow.push(0);
            }
            thisSlice.push(thisRow);
        }
        voxels.push(thisSlice);
    }
    //populate array
    for (let z = 0; z < VOXEL_RESOLUTION; z++) {
        for (let y = 0; y < VOXEL_RESOLUTION; y++) {
            for (let x = 0; x < VOXEL_RESOLUTION; x++) {
                    voxels[x][y][z] = noise(x*0.01+ frameCount * 0.21,y*0.1 + frameCount * 0.002 ,z*0.01 + frameCount * 0.07) + noise(x*0.02 + frameCount * 0.03,y*0.03+ frameCount * 0.05 ,z*0.04 + frameCount * 0.01);
            }
        }
    }

}

function draw() {
    background(255);
    orbitControl()
    push()
    translate(-width / 2, -height / 2, 0)
    setGradient(0, 0, width, height, c1, c3, X_AXIS);
    pop()

    //coding with friends text
    push()
    translate(0,0,100)
    // fill(255)
    text("CODING WITH FRIENDS", 100, 100)
    pop()

    let halfRes = VOXEL_RESOLUTION * 0.5;
    blendMode(MULTIPLY);
    strokeWeight(1);
    for (let z = 0; z < VOXEL_RESOLUTION; z++) {
        for (let y = 0; y < VOXEL_RESOLUTION; y++) {
            for (let x = 0; x < VOXEL_RESOLUTION; x++) {
                let d = dist(x,y,z,VOXEL_RESOLUTION/2,VOXEL_RESOLUTION/2,VOXEL_RESOLUTION/2);
                if (d > VOXEL_RESOLUTION / 2) {
                    //cut it out
                    voxels[z][y][x] = 0;
                } else {
                    //it's inside the circle
                    voxels[z][y][x] = noise(x * 0.2 + frameCount * 0.003, y * 0.1, z * 0.4);
                }
            }
        }
    }
    push();
    translate(-(VOXEL_RESOLUTION * DISPLAY_SCALE) / 2,
        -(VOXEL_RESOLUTION * DISPLAY_SCALE) / 2);
    // rotateX(frameCount*0.01)
    push();
    scale(DISPLAY_SCALE);

    pop();
    strokeWeight(1);
    let sc = DISPLAY_SCALE; //scale
    //draw the marching sqUare output
    //run the marching squares
    for (let z = 0; z < VOXEL_RESOLUTION; z++) {

        let ret = marchingSquares(voxels[z], 0.5);
        ret.map(function (i) {
            noFill();
            stroke(z * (VOXEL_RESOLUTION / 255.0), 0, 0);

            let x1 = i[0];
            let y1 = i[1];
            let x2 = i[2];
            let y2 = i[3];
            let z1 = z - halfRes;
            let z2 = z - halfRes;
            //translate to origin for pivoting
            x1 -= halfRes;
            y1 -= halfRes;
            x2 -= halfRes;
            y2 -= halfRes;
            //convert to polar
            let radius1 = dist(x1, z1, 0, 0);
            let radius2 = dist(x2, z2, 0, 0);
            let theta1 = atan2(x1, z1);
            let theta2 = atan2(x2, z2);
            //rotate
            theta1 += frameCount * 0.01;
            theta2 += frameCount * 0.01;
            //convert back to cartesian
            x1 = radius1 * sin(theta1);
            x2 = radius2 * sin(theta2);
            z1 = radius1 * cos(theta1);
            z2 = radius2 * cos(theta2);

            //translate back from origin into center framing
            x1 += halfRes;
            y1 += halfRes;
            x2 += halfRes;
            y2 += halfRes;

            //project to 2-point perspective
            x1 = x1 + (halfRes - x1) * z1 * FORESHORTENING;
            y1 = y1 + (halfRes - y1) * z1 * FORESHORTENING;
            x2 = x2 + (halfRes - x2) * z2 * FORESHORTENING;
            y2 = y2 + (halfRes - y2) * z2 * FORESHORTENING;
            stroke((z1+halfRes) * 16,100,200);
            line(x1 * sc , y1 * sc , x2 * sc, y2 * sc);
        });
    }
    pop();
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