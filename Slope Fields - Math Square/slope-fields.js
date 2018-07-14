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

  var ugX = this.width/12;
  var ugY = this.height/12;

  this.clear();
  this.fill(255,255,255);
  for(var x = -6; x<=6; x++){
    for(var y = -6; y<=6; y++){
      var tempAng = this.atan2(dydx(x,y),1);
      this.stroke(127,127,127);
      this.strokeWeight(2);
      this.line(ugX*(6+x)-10*Math.cos(tempAng),ugY*(6+y)-10*Math.sin(tempAng),ugX*(6+x)+10*Math.cos(tempAng),ugY*(6+y)+10*Math.sin(tempAng));
      this.noStroke();
      this.ellipse(ugX*(6+x),ugY*(6+y),5,5);
    }
  }
  function euler(x,y,step){
    var eulx = x;
    var euly = y;
    p.stroke(255,0,0);
    p.strokeWeight(2);
    while(eulx>=-6){
      p.line(ugX*(6+eulx),ugY*(6+euly),ugX*(6+eulx-step),ugY*(6+euly-dydx(eulx,euly)*step));
      euly = euly - dydx(eulx,euly)*step;
      eulx = eulx-step
    }
    eulx = x;
    euly = y;

    while(eulx<=6){
      p.line(ugX*(6+eulx),ugY*(6+euly),ugX*(6+eulx+step),ugY*(6+euly+dydx(eulx,euly)*step));
      euly = euly+dydx(eulx,euly)*step;
      eulx = eulx+step
    }
  }

  //euler(0,1,0.01)

  for (let u of floor.users) {
    pb.drawUser(u);
    euler(u.x*12/p.width-6,u.y*12/p.height-6,0.01);
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
