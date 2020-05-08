class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.stacks = stacks;
        this.slices = slices;

        this.body = new MyBody(this.scene);
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angleYY = 0;
        this.speed = 0;
        this.propellerAng = 0;

        this.initBuffers();
    }
  
    updateBuffers(complexity){
      this.slices = 3 + Math.round(9 * complexity); 

      this.initBuffers();
      this.initNormalVizBuffers();
    }

    update(){
      this.x += this.speed * Math.sin(this.angleYY*Math.PI/180);
      this.z += this.speed * Math.cos(this.angleYY*Math.PI/180);

      this.propellerAng += 25 * this.speed;
    }

    turn(val){
      this.angleYY += val;
    }

    accelerate(val){
      this.speed += val;
      if(this.speed<0) this.speed=0;
    }

    reset(){
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.speed = 0;
      this.angleYY = 0;
    }

    display() {

      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(this.angleYY*Math.PI/180.0, 0, 1, 0);
      this.body.display();
      this.scene.popMatrix();
    }
    
    setFillMode() {
      this.primitiveType=this.scene.gl.TRIANGLES;
    }

    setLineMode() {
      this.primitiveType=this.scene.gl.LINE_STRIP;
    }
}
  