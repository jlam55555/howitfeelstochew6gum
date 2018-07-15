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
  function euler(x,y,step){
    var eulx = x;
    var euly = y;
    p.stroke(255,0,0);
    p.strokeWeight(2);
    while(eulx>=-bounds){
      p.line(ugX*(bounds+eulx),ugY*(bounds+euly),ugX*(bounds+eulx-step),ugY*(bounds+euly-dydx(eulx,euly)*step));
      euly = euly - dydx(eulx,euly)*step;
      eulx = eulx-step
    }
    eulx = x;
    euly = y;

    while(eulx<=bounds){
      p.line(ugX*(bounds+eulx),ugY*(bounds+euly),ugX*(bounds+eulx+step),ugY*(bounds+euly+dydx(eulx,euly)*step));
      euly = euly+dydx(eulx,euly)*step;
      eulx = eulx+step
    }
  }

  //euler(0,1,0.01)

  for (let u of floor.users) {
    pb.drawUser(u);
    euler(u.x*(2*bounds)/p.width-bounds,u.y*(2*bounds)/p.height-bounds,0.01);
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
