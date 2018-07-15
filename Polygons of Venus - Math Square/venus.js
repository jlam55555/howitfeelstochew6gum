/* MoMath Math Square Behavior
 *
 *        Title: Spirographs of Venus
 *  Description: Display user blobs and sensors (same as debug)
 * Scheduler ID:
 *    Framework: P5
 *       Author: Dylan Simon <dylan@dylex.net>
 *      Created: 2017-04
 *       Status: works
 */

import P5Behavior from 'p5beh';

const pb = new P5Behavior();

// for WEBGL: pb.renderer = 'webgl';

pb.preload = function(p) {
  /* this == pb.p5 == p */
}

pb.setup = function(p) {
  p.frameRate(60)
}

let width = this.width
let height = this.height
let lineTick = 0
let orbits = []
let radii = []
let lines = []

function Orbit(x, y, radius, p) {
  this.lines = []
  this.age = 0
  this.decay = false
  this.alpha = 255
  this.red = p.random(256)
  this.green = p.random(256)
  this.blue = p.random(256)
  this.lr = 255;
  this.lb = 255;
  this.lg = 255;
  this.radius = radius
  this.diameter = radius * 2
  this.angle = Math.atan2((y-p.height/2),(x-p.width/2)); //Only works for half of circle?
  this.x = p.width / 2 + this.radius * Math.cos(this.angle)
  this.y = p.height / 2 + this.radius * Math.sin(this.angle)
  this.speed = p.random([-1,1]) * 2*Math.PI / this.diameter
  this.update = function() {
    this.x = p.width / 2 + this.radius * Math.cos(this.angle)
    this.y = p.height / 2 + this.radius * Math.sin(this.angle)
    p.stroke(255, parseInt(this.alpha))
    p.strokeWeight(1)
    p.noFill()
    p.ellipse(p.width / 2, p.height / 2, this.radius * 2) //orbit path
    p.fill(this.red,this.green,this.blue,this.alpha)
    p.noStroke()
    p.ellipse(this.x, this.y, 20)
    this.angle += this.speed;
    this.age++
      if ((this.age >= 750 && orbits.length >= 4 && orbits.indexOf(this) == 0) || this.lines.length > 700) { //If orbital is old on cluttered screen or if has been vacant for a while.
        this.decay = true
      }
    if (this.decay) {
      this.alpha -= 1
        if (this.alpha < 0) {
          radii.splice(radii.indexOf(this.radius), 1)
          orbits.splice(orbits.indexOf(this), 1)
        }
    }
  }
  this.updateLines = function(p) {
    p.stroke(this.lr,this.lg,this.lb,this.alpha) // sets the line color
    for (let l of this.lines) {
      l.render()
    }
  }
}

function Line(x1, y1, x2, y2, p) {
  this.render = function() {
    p.strokeWeight(1)
    p.line(x1, y1, x2, y2);
  }
}

function getRadius(user) {
  let centerX = pb.p5.width / 2
  let centerY = pb.p5.height / 2
  let x = user.x - centerX
  let y = user.y - centerY
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

pb.draw = function(floor, p) {
  /* this == pb.p5 == p */
  p.background('#100030')

  p.fill("#EEEE00")
  for (let o of orbits) {
    o.updateLines(p)
  }
  p.ellipse(p.width / 2, p.height / 2, 50)
  // draw here

  for (let u of floor.users) {
    //console.log(u)
    pb.drawUser(u)
    let radius = Math.round(getRadius(u) / 50) * 50
    if (radii.includes(radius)) {
      orbits[radii.indexOf(radius)].age = 0;
    } else if (orbits.length > 3) {
      orbits[0].decay = true
      orbits.push(new Orbit(u.x, u.y, radius, p))
      radii.push(radius);
    } else {
      orbits.push(new Orbit(u.x, u.y, radius, p))
      radii.push(radius);
    }
  }
  //add a line every five
  if (lineTick >= 4) {
    for (let i = 0; i < orbits.length - 1; i++) {
      let x1 = orbits[i].x
      let y1 = orbits[i].y
      let x2 = orbits[i + 1].x
      let y2 = orbits[i + 1].y
      orbits[i].lr = (orbits[i].red + orbits[i+1].red)/2
      orbits[i].lg = (orbits[i].green + orbits[i+1].green)/2
      orbits[i].lb = (orbits[i].blue + orbits[i+1].blue)/2
      orbits[i].lines.push(new Line(x1, y1, x2, y2, p)
    }
    lineTick = 0
  } else {
    lineTick++
  }
  for (let o of orbits) {
    o.update();
  }
};

export const behavior = {
  title: "Spirographs of Venus",
  init: pb.init.bind(pb),
  frameRate: 'animate',
  render: pb.render.bind(pb),
  numGhosts: 1
  ghostRate: 0
};
export default behavior
