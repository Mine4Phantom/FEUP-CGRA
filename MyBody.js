class MyBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initTexture(scene);
        this.scene = scene;
        this.body = new MySphere(scene, 16, 8);
        this.cockpit = new MyCockpit(this.scene);
        this.rudder = new MyRudder(this.scene);
        this.prope = new MyPropeller(this.scene);
        
    }

    initTexture(scene){
        this.tex = new CGFappearance(scene);
        this.tex.setAmbient(0.9, 0.9, 0.9, 1);
        this.tex.setDiffuse(0.7, 0.7, 0.7, 1);
        this.tex.setSpecular(0.3, 0.3, 0.3, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('textures/aviao2.jpg');
        this.tex.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
   
    display() {
        //Motor R
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(0.12, -0.55, -0.2)
        this.scene.scale(0.045,0.045,0.1);
        this.body.display();
        this.scene.popMatrix();

        //Motor L
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(-0.12, -0.55, -0.2)
        this.scene.scale(0.045,0.045,0.1);
        this.body.display();
        this.scene.popMatrix();

        //Estrutura
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,1);
        this.tex.apply();
        this.body.display();
        this.scene.popMatrix();

        //Cockpit
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(0.1,0.1,0.1);
        this.tex.apply();
        this.cockpit.display();
        this.scene.popMatrix();
        //Leme R
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(0.3, 0, -0.6);
        this.scene.rotate(90*Math.PI/180.0, 0, 0, 1);
        this.rudder.display();
        this.scene.popMatrix();


        //Leme L
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(-0.3, 0, -0.6);
        this.scene.rotate(90*Math.PI/180.0, 0, 0, 1);
        this.rudder.display();
        this.scene.popMatrix();

        //Leme U
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(0, 0.3, -0.6);
        this.scene.rotate(90*Math.PI / 9.0, 0, 1, 0);
        if (this.scene.gui.isKeyPressed("KeyD"))
            this.scene.rotate(Math.PI / 9.0, 0, 1, 0);
        if (this.scene.gui.isKeyPressed("KeyA"))
            this.scene.rotate(-Math.PI / 9.0, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();


        //Leme D
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(0, -0.3, -0.6);
        this.scene.rotate(90*Math.PI / 9.0, 0, 1, 0);
        if (this.scene.gui.isKeyPressed("KeyD"))
            this.scene.rotate(Math.PI / 9.0, 0, 1, 0);
        if (this.scene.gui.isKeyPressed("KeyA"))
            this.scene.rotate(-Math.PI / 9.0, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();

        //Ventoinha R
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(0.12, -0.55, -0.30);
        this.scene.rotate(this.scene.vehicle.propellerAng, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.02);
        this.prope.display();
        this.scene.popMatrix();

        //Ventoinha L
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 1, 0, 0); 
        this.scene.translate(-0.12, -0.55, -0.30);
        this.scene.rotate(this.scene.vehicle.propellerAng, 0, 0, 1);
        this.scene.scale(0.02, 0.02, 0.02);
        this.prope.display();
        this.scene.popMatrix();

    }

    setFillMode() {this.primitiveType=this.scene.gl.TRIANGLES;}

    setLineMode() {this.primitiveType=this.scene.gl.LINE_STRIP;};
}