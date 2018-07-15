/* MoMath Math Square Behavior
 *
 *        Title: Slope Fields
 *  Description: Generate slope fields and show solutions through walked-on points
 * Scheduler ID:
 *    Framework: P5
 *       Author: LINK Team MoMath 2018
 *      Created: 2017-04
 *       Status: works
 */

import P5Behavior from 'p5beh';
const pb = new P5Behavior();

// graph goes from -bounds to bounds on both axes
const bounds = 6;

// two modes: mathy and colorful mode
// set mode = 0 for mathy, mode = 1 for colorful
const mode = 1;

// choose function with id
function dydx(x,y,p,id){
  switch(id) {
    case 0:
      return Math.sin(x + (p.frameCount/40)) + Math.cos(y/4);
    case 1:
      return x*y;
    case 2:
      return x+y;
  }
}

// setup
pb.preload = function (p) {};
pb.setup = function (p) {};

let frameRate;
pb.draw = function (floor, p) {
  frameRate = frameRate || p.frameRate();

  var ugX = this.width/(2*bounds);
  var ugY = this.height/(2*bounds);

  let frameBlock = p.frameCount % (18 * frameRate);
  let animId;
  if(frameBlock < 6 * frameRate)
    animId = 0;
  else if(frameBlock < 12 * frameRate)
    animId = 1;
  else
    animId = 2;

  this.clear();
  if(mode)
    this.background(250, 250, 250);
  else {
    this.fill(236, 239, 241);
    for(var x = -bounds; x<=bounds; x++){
      for(var y = -bounds; y<=bounds; y++){
        var tempAng = this.atan2(dydx(x,y,p,animId),1);
        this.stroke(127,127,127);
        this.strokeWeight(2);
        this.line(ugX*(bounds+x)-10*Math.cos(tempAng),ugY*(bounds+y)-10*Math.sin(tempAng),ugX*(bounds+x)+10*Math.cos(tempAng),ugY*(bounds+y)+10*Math.sin(tempAng));
        this.noStroke();
        this.ellipse(ugX*(bounds+x),ugY*(bounds+y),5,5);
      }
    }
  }
  function euler(x,y,step,color){
    var eulx = x;
    var euly = y;
    p.stroke(255,0,0);
    p.strokeWeight(2);

    var points = [];

    while(eulx>=-bounds){
      if(!mode)
        p.line(ugX*(bounds+eulx),ugY*(bounds+euly),ugX*(bounds+eulx-step),ugY*(bounds+euly-dydx(eulx,euly,p,animId)*step));
      euly = euly - dydx(eulx,euly,p,animId)*step;
      eulx = eulx-step;

      points.unshift([ugX*(bounds+eulx), ugY*(bounds+euly)]);
    }
    eulx = x;
    euly = y;

    while(eulx<=bounds){
      if(!mode)
        p.line(ugX*(bounds+eulx),ugY*(bounds+euly),ugX*(bounds+eulx+step),ugY*(bounds+euly+dydx(eulx,euly,p,animId)*step));
      euly = euly+dydx(eulx,euly,p,animId)*step;
      eulx = eulx+step

      points.push([ugX*(bounds+eulx), ugY*(bounds+euly)]);
    }

    // determine fill up or down
    let fillUp;
    // check if both ends are above or below
    if(points[0][1] < 0 || points[points.length-1][1] < 0) {
      fillUp = true;
    } else if(points[0][1] > 576 || points[points.length-1][1] > 576) {
      fillUp = false;
    }
    // else check if endpoints closer to bottom or top
    else if(points[0][1] + points[points.length-1][1] < 576) {
      fillUp = true;
    } else {
      fillUp = false;
    }

    // create extra vertices for fill up / down
    if(fillUp) {
      points.unshift([-10,-10]);
      points.push([586,-10]);
    } else {
      points.unshift([-10,700]);
      points.push([586,700]);
    }

    // fill!
    if(mode) {
      p.fill(color);
      p.noStroke();
      p.beginShape();
      points.forEach(point => {
        p.vertex(point[0], Math.min(Math.max(point[1], -10), 586));
      });
      p.endShape(p.CLOSE);
    }
  }

  //euler(0,1,0.01)

  const colors = [
    p.color(255,87,51,128),
    p.color(186,104,200,128),
    p.color(100,181,246,128),
    p.color(129,199,132,128),
    p.color(255,255,0,128),
    p.color(255,183,77,128),
  ];
  let chooseColor = () => {
    let color;
    do
      color = colors[Math.floor(Math.random() * colors.length)]
    while(floor.users.length < colors.length && floor.users.find(user => user.color === color) !== undefined);
    return color;
  };

  let users = [
    { x: 24, y: 24, color: colors[0], id: -1e2 },
    { x: 576-24, y: 24, color: colors[1], id: -1e2 },
    { x: 24, y: 576-24, color: colors[2], id: -1e2 },
    { x: 576-24, y: 576-24, color: colors[3], id: -1e2 }
  ].slice(floor.users.filter(user => user.id > 0).length).concat(floor.users);
  for (let i = 0; i < users.length; i++) {
    let u = users[i];
    if(u.id > -1e2)
      pb.drawUser(u);
    u.color = u.color || chooseColor();
    euler(u.x*(2*bounds)/p.width-bounds,u.y*(2*bounds)/p.height-bounds,0.01,u.color);
  }
  this.fill(128, 128, 128, 128);
  this.noStroke();
  pb.drawSensors(floor.sensors);
};

export const behavior = {
  title: "Sensor Debug (P5)",
  init: pb.init.bind(pb),
  frameRate: 'sensors',
  render: pb.render.bind(pb),
  numGhosts: 2
};
export default behavior
