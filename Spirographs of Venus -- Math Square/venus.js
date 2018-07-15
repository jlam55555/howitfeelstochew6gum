/* MoMath Math Square Behavior
 *
 *        Title: Spirographs of Venus
 *  Description: Graphs the distance between planets as the orbit the 'center'.
 *    Framework: P5
 *       Author: Finn Navin
 *      Created: 2018-07
 */

import P5Behavior from 'p5beh';

const pb = new P5Behavior();

// for WEBGL: pb.renderer = 'webgl';
pb.setup = function(p) {
  p.frameRate(60)
}

let width = this.width
let height = this.height
let lineTick = 0
let orbitals = []
let radii = []

//HSB to RGB color function taken from ___
function hsvToRgb(h, s, v) {
  var r, g, b;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return [ r * 255, g * 255, b * 255 ];
}
function getRadius(x,y) {
  let centerX = pb.p5.width / 2
  let centerY = pb.p5.height / 2
  let x = x - centerX
  let y = y - centerY
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

//redefining drawUser as drawuser
function drawuser(user: User,p,r) {
  if(radii.indexOf(r) >=0){
    let color = orbitals[radii.indexOf(r)].color
  } else{
    color = [255,255,255]
  }
  p.fill(color[0],color[1],color[2]);
  p.noStroke();
  p.ellipse(user.x, user.y, 24);
  p.noFill();
  p.stroke(68);
  p.strokeWeight(1);
  p.ellipse(user.x, user.y, 31);
}

function Orbit(x, y, radius, p) {
  this.lines = []
  this.age = 0
  this.decay = false
  this.expand = 0.01
  this.alpha = 255
  //(0-300),100,50
  p.colorMode('hsv');
  this.color = hsvToRgb(((getRadius(x,y))/350),1,1)
  p.colorMode('rgb');
  this.red = this.color[0]
  this.green = this.color[1]
  this.blue = this.color[2]
  this.lr = 255;
  this.lb = 255;
  this.lg = 255;
  this.radius = radius
  this.diameter = radius * 2
  this.angle = Math.atan2((y - p.height / 2), (x - p.width / 2)); //Only works for half of circle?
  this.x = p.width / 2 + this.radius * Math.cos(this.angle)
  this.y = p.height / 2 + this.radius * Math.sin(this.angle)
  this.speed = p.random([-1,1,1,1]) * 2 * Math.PI / this.diameter
  this.update = function() {
    this.x = p.width / 2 + this.radius * Math.cos(this.angle)
    this.y = p.height / 2 + this.radius * Math.sin(this.angle)
    p.stroke(255, parseInt(this.alpha))
    p.strokeWeight(1)
    p.noFill()
    if(this.expand < Math.PI){ //runs the pretty opening animation
      this.startAngle = this.angle
      p.arc(p.width/2,p.height/2,this.diameter,this.diameter,this.startAngle,this.startAngle + this.expand)
      p.arc(p.width/2,p.height/2,this.diameter,this.diameter,this.startAngle-this.expand,this.startAngle)
      this.expand += .1
    } else{
      p.ellipse(p.width / 2, p.height / 2, this.radius * 2) //orbit
    }
    p.fill(this.red, this.green, this.blue, this.alpha)
    p.noStroke()
    p.ellipse(this.x, this.y, 20)
    this.angle += this.speed;
    this.age++
    if ((this.age >= 750 && orbitals.length >= 4 && orbitals.indexOf(this) == 0) || (orbitals.length >= 5 && orbitals.indexOf(this) == 0) || this.lines.length > 700) { //If orbital is old on cluttered screen or if has been vacant for a while.
      this.decay = true
    }
    if (this.decay) {
      this.alpha -= 1
      if (this.alpha < 0) {
        radii.splice(radii.indexOf(this.radius), 1)
        orbitals.splice(orbitals.indexOf(this), 1)
      }
    }
  }
  this.updateLines = function(p) {
    p.stroke(this.lr, this.lg, this.lb, this.alpha) // sets the line color
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


pb.draw = function(floor, p) {
    /* this == pb.p5 == p */
    p.background('#100030')

    p.fill("#EEEE00")
    for (let o of orbitals) {
      o.updateLines(p)
    }
    p.ellipse(p.width / 2, p.height / 2, 50)
    // draw here

    for (let u of floor.users) {
      let radius = Math.round(getRadius(u.x,u.y) / 50) * 50
      drawuser(u,p,radius)
      if (radii.includes(radius)) {
        orbitals[radii.indexOf(radius)].age = 0;
      } else if (radius > 0) {
        orbitals.push(new Orbit(u.x, u.y, radius, p))
        radii.push(radius);
      }
    }

    if (lineTick >= 4) {
      for (let i = 0; i < orbitals.length - 1; i++) {
        let x1 = orbitals[i].x
        let y1 = orbitals[i].y
        let x2 = orbitals[i + 1].x
        let y2 = orbitals[i + 1].y
        orbitals[i].lr = (orbitals[i].red + orbitals[i + 1].red) / 2
        orbitals[i].lg = (orbitals[i].green + orbitals[i + 1].green) / 2
        orbitals[i].lb = (orbitals[i].blue + orbitals[i + 1].blue) / 2
        orbitals[i].lines.push(new Line(x1, y1, x2, y2, p)
        }
        lineTick = 0
      } else {
        lineTick++
      }
    for (let o of orbitals) {
      o.update();
    }
  };

    export const behavior = {
      title: "Spirographs of Venus",
      init: pb.init.bind(pb),
      frameRate: 'animate',
      render: pb.render.bind(pb),
      numGhosts: 0
    };
    export default behavior
