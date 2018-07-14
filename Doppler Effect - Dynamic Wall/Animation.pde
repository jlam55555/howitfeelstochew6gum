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
  float interval = 100 / 6;
  
  // for points propagating outward
  public class Point {
    public int x;
    public float y;
    public boolean goingRight;
    public Point(int x, float y, boolean goingRight) {
      this.x = x;
      this.y = y;
      this.goingRight = goingRight;
    }
    public void update() {
      this.x += this.goingRight ? propSpeed : -propSpeed;
      if(this.x >= 0 && this.x < wallLength) {
        positions[this.x] = this.y;
      }
    }
  }
  
  // for x and y positions of particle
  public int xPos(float t) {
    return (int) (this.wallLength/2 + 50*Math.sin(t));
  }
  public float yPos(float t) {
    return (float) (0.5 + Math.sin(t*8));
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
    int x = 0;
    for (DWSlat slat : wall.slats) {
      slat.setBottom( (float) (1.0 / (1.0 + -Math.abs(x - xPos(time) ) ) ) );
      slat.setTop(positions[x++]);
    }
    
    // update time
    time += interval/1000.0;
    
    // create new points
    points.add(new Point(xPos(time), yPos(time), true));
    points.add(new Point(xPos(time), yPos(time), false));
    
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
