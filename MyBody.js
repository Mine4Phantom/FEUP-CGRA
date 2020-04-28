class MyBody extends CGFobject {
    constructor(scene) {
        super(scene);
        //this.initMaterials(scene);
        this.scene = scene;
        this.body = new MySphere(scene, 16, 8);
        this.cockpit = new MyCockpit(this.scene)
        
    }

   
    display() {
        //Estrutura
        this.scene.setDiffuse(102/255, 0, 102/255, 102/255);       
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,1);
        this.body.display();
        this.scene.popMatrix();

        //Cockpit
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.setDiffuse(1, 102/255, 0, 0);        
        this.cockpit.display();
        this.scene.popMatrix();

        //Motor R
        this.scene.pushMatrix();
        this.scene.translate(0.12, -0.55, -0.2)
        this.scene.scale(0.045,0.045,0.1);
        this.scene.setDiffuse(1,1,0);
        this.body.display();
        this.scene.popMatrix();

        //Motor L
        this.scene.pushMatrix();
        this.scene.translate(-0.12, -0.55, -0.2)
        this.scene.scale(0.045,0.045,0.1);
        this.scene.setDiffuse(1,1,0);
        this.body.display();
        this.scene.popMatrix();

    }

    setFillMode() {this.primitiveType=this.scene.gl.TRIANGLES;}

    setLineMode() {this.primitiveType=this.scene.gl.LINE_STRIP;};
}