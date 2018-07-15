/* MoMath Math Square Behavior
 *
 *        Title: P5 Example
 *  Description: Display user blobs and sensors (same as debug)
 * Scheduler ID:
 *    Framework: P5
 *       Author: Dylan Simon <dylan@dylex.net>
 *      Created: 2017-04
 *       Status: works
 */

import P5Behavior from 'p5beh';

const pb = new P5Behavior();

var bounds = 6;

// two modes: mathy and colorful mode
// set mode = 0 for mathy, mode = 1 for colorful
const mode = 0;

// for WEBGL: pb.renderer = 'webgl';

function dydx(x,y){ //comment out any functions not being used
  //return x*y;
  return x+y;
}

pb.preload = function (p) {
  /* this == pb.p5 == p */
  // ...
}

pb.setup = function (p) {
  /* this == pb.p5 == p */
  /* P5Behavior already calls createCanvas for us */
  // setup here...
};

pb.draw = function (floor, p) {
  /* this == pb.p5 == p */
  // draw here...

  var ugX = this.width/(2*bounds);
  var ugY = this.height/(2*bounds);

  this.clear();
  if(mode)
    this.background(255, 255, 255);
  else {
    this.fill(255,255,255);
    for(var x = -bounds; x<=bounds; x++){
      for(var y = -bounds; y<=bounds; y++){
        var tempAng = this.atan2(dydx(x,y),1);
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
        p.line(ugX*(bounds+eulx),ugY*(bounds+euly),ugX*(bounds+eulx-step),ugY*(bounds+euly-dydx(eulx,euly)*step));
      euly = euly - dydx(eulx,euly)*step;
      eulx = eulx-step;

      points.unshift([ugX*(bounds+eulx), ugY*(bounds+euly)]);
    }
    eulx = x;
    euly = y;

    while(eulx<=bounds){
      if(!mode)
        p.line(ugX*(bounds+eulx),ugY*(bounds+euly),ugX*(bounds+eulx+step),ugY*(bounds+euly+dydx(eulx,euly)*step));
      euly = euly+dydx(eulx,euly)*step;
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
    // else check if end slope is down or up
    else if(dydx(points[points.length-1])) {
    } else {
      fillUp = true;
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
        p.vertex(point[0], point[1]);
      });
      p.endShape(p.CLOSE);
    }
  }


  //euler(0,1,0.01)

  const colors = [ p.color(255,0,0,50), p.color(0,255,0,50), p.color(0,0,255,50) ];
  for (let i = 0; i < floor.users.length; i++) {
    let u = floor.users[i];
    pb.drawUser(u);
    u.color = u.color || colors[Math.floor(Math.random() * colors.length)];
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
