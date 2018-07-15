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
      period is 20pi seconds
      
      schedule: (80pi seconds)
      - 1: go back and forth two times (40pi seconds)
      - 2: stay in the middle (10pi seconds)
      - 3: go back to the beginning (5pi seconds)
      - 4: create a sonic boom! (10pi seconds)
      - 5: go back to the middle (5pi seconds)
      - 6: stay in the middle (10pi seconds)
    */
    
    double timeBlock = t % (80*Math.PI);
    double output;
    // 1
    if(timeBlock < 40*Math.PI) {
      output = wallLength/2 + 50*Math.sin(t/10);
    }
    // 2
    else if(timeBlock < 50*Math.PI) {
      output = wallLength/2;
    }
    // 3
    else if(timeBlock < 55*Math.PI) {
      output = -wallLength/10 * (t - 55*Math.PI) / Math.PI;
    }
    // 4
    else if(timeBlock < 65*Math.PI) {
      output = 127/100.0 * Math.pow(t - 55*Math.PI, 2) / Math.PI / Math.PI;
    }
    // 5
    else if(timeBlock < 70*Math.PI) {
      output = -wallLength/10 * (t - 70*Math.PI) / Math.PI + wallLength/2;
    }
    // 6
    else {
      output = this.wallLength/2;
    }
    return (int) output;
  }
  public float yPos(float t) {
    return (float) (0.5 + Math.sin(t));
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
      slat.setTop((float) (1 - (1.0/(1.0+Math.abs(x - xPos(time))))));
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
