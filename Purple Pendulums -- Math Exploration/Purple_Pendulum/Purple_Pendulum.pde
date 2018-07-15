class Pendulum{
  float length;
  float r;
  float g;
  float b;
  float greenness = 255;
  Pendulum(float l){
    length = l;
    r = 200 * (1.0 - length / 200.0) + random(-15,55);
    g = 0;
    b = 200 * length/200.0 + random(-15,55);  
  }
  void display(float t){
    PVector temp = PVector.fromAngle(PI*cos(1*t/sqrt(length))/6+PI*3/2);
    strokeWeight(2);
    line(250,200,250+length*temp.x,200-length*temp.y);
    strokeWeight(1);
    ellipse(250+length*temp.x,200-length*temp.y,20,20);
    fill(0,255,0,greenness);
    ellipse(250+length*temp.x,200-length*temp.y,20,20);
    greenness-=15;
    if(cos(1*t/sqrt(length))>0.95){
      greenness = 255;
    }
  }
}
ArrayList<Pendulum> pends = new ArrayList<Pendulum>();

void setup(){
  frameRate(60);
  size(500,500);

  for(int i = 0; i<5; i++){
    pends.add(new Pendulum(40+40*i));
  }
}

float t = 0;
boolean going = true;
boolean slomo = true;

void draw(){
  if(going){
  background(210,160,255);
  for(int i = 4; i>=0; i--){
    fill(pends.get(i).r,pends.get(i).g,pends.get(i).b);
    pends.get(i).display(t);
  }
  fill(120);
  ellipse(250,200,8,8);
  
  t += slomo ? .5 : 1;
  
  }
  fill(255,120,120);
  rect(20,20,80,80);
  fill(120,255,120);
  rect(120,20,80,80);
  fill(slomo?color(120,120,255):color(80,80,160));
  rect(400,20,80,80);
  fill(127);
  rect(35,30,20,60);
  rect(65,30,20,60);
  triangle(137,30,137,90,187,60);
  triangle(410,30,410,90,450,60);
  triangle(430,30,430,90,470,60);
  
}

void mousePressed(){
  if(mouseX>20&&mouseX<100&&mouseY>20&&mouseY<100){
    going = false;
  }
  if(mouseX>120&&mouseX<200&&mouseY>20&&mouseY<100){
    going = true;
  }
  if(mouseX>400&&mouseX<480&&mouseY>20&&mouseY<100){
    slomo = !slomo;
  }
}
