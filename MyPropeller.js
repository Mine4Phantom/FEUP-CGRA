class MyPropeller extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.sphere = new MySphere(scene, 16, 8);
        this.triangle = new MyTriangle(scene);
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-0.5,-0.5,0.5);
        this.scene.rotate(45*Math.PI/180.0, 0, 1, 0);
        this.scene.translate(1,-0.8,0.3);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(120*Math.PI/180.0, 0, 0, 1);
        this.scene.translate(-0.5,-0.5,0.5);
        this.scene.rotate(45*Math.PI/180.0, 0, 1, 0);
        this.scene.translate(1,-0.8,0.3);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(240*Math.PI/180.0, 0, 0, 1);
        this.scene.translate(-0.5,-0.5,0.5);
        this.scene.rotate(45*Math.PI/180.0, 0, 1, 0);
        this.scene.translate(1,-0.8,0.3);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.6, 0.6, 0.6)
        this.sphere.display();
        this.scene.popMatrix();
    }
}