public static class Animation extends WallAnimation {
  
  // First, we add metadata to be used in the MoMath system. Change these
  // strings for your behavior.
  String behaviorName = "Example Dynamic Wall Behavior";
  String author = "MoMath";
  String description = "Simple forward-backward behavior.";

  // Number of wall slats
  int wallLength = 128;
  
  // global variables
  int particlePos;
  float time = 0f;
  int propSpeed = 1;
  float[] positions = new float[wallLength];
  ArrayList<Point> points = new ArrayList<Point>();
  float interval = 1000 / 6.0;
  float period = 40*PI;
  float b = 2*PI/period;
  
  // for points propagating outward
  public class Point {
    public int x;
    public float y;
    public boolean goingRight;
    public Point(int x, float y, boolean goingRight) {
      this.x = x;
      this.y = y;
      this.goingRight = goingRight;
      positions[this.x] = this.y;
    }
    public void update() {
      this.x += this.goingRight ? propSpeed : -propSpeed;
      if(this.x >= 0 && this.x < wallLength) {
        positions[this.x] = this.y;
      }
    }
  }
  
  // for x and y positions of source particle
  public int xPos(float t) {
    
    /*
      timing function of source particle
      
      schedule: (4 periods)
      - 1: go back and forth two times (2 periods seconds)
      - 2: stay in the middle (1/2 period)
      - 3: go back to the beginning (1/4 period)
      - 4: create a sonic boom! (1/2 period)
      - 5: go back to the middle (1/4 period)
      - 6: stay in the middle (1/2 period)
    */
    
    double timeBlock = t % (4*period);
    double output;
    // 1
    if(timeBlock < 2*period) {
      output = wallLength/2 + 50*Math.sin(b*t);
    }
    // 2
    else if(timeBlock < 5.0/2*period) {
      output = wallLength/2.0;
    }
    // 3
    else if(timeBlock < 11.0/4*period) {
      output = -2.0*wallLength/period * (timeBlock - 11.0/4*period);
    }
    // 4
    else if(timeBlock < 13.0/4*period) {
      output = 127.0/Math.pow(period/2, 2) * Math.pow(timeBlock - 11.0/4*period, 2);
    }
    // 5
    else if(timeBlock < 7.0/2*period) {
      output = -2.0*wallLength/period * (timeBlock - 7.0/2*period) + wallLength/2;
    }
    // 6
    else {
      output = this.wallLength/2;
    }
    return (int) Math.floor(output);
  }
  public float yPos(float t) {
    return (float) (0.5 + 0.5*Math.sin(t));
  }
  
  // The setup block runs at the beginning of the animation. You could
  // also use this function to initialize variables, load data, etc.
  void setup() {
    for(int x = 0; x < wallLength; x++) {
      positions[x] = 0.5;
    }
  }		 

  // The update block will be repeated for each frame. This is where the
  // action should be programmed.
  void update() {
    
    // update time
    time += interval/1000.0;
    
    // create new points
    points.add(new Point(xPos(time), yPos(time), true));
    points.add(new Point(xPos(time), yPos(time), false));
    
    // move slats
    int x = 0;
    for (DWSlat slat : wall.slats) {
      slat.setTop((float) (1 - (0.5/(1.0+Math.abs(x - xPos(time))))));
      slat.setBottom(positions[x++]);
    }
    
    // update points and remove if necessary
    for(int i = 0; i < points.size(); i++) {
      points.get(i).update();
      if(points.get(i).x < 0 || points.get(i).x >= 128) {
        points.remove(i);
        i--;
      }
    }
  }

  // Leave this function blank
  void exit() {
  }
  
  // You can ignore everything from here.
  String getBehaviorName() {
    return behaviorName;
  }
  
  String getAuthorName() {
    return author;
  }
  
  String getDescription() {
    return description;
  }
  
}
