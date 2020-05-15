class MySupplyFalling extends CGFobject {
    constructor(scene) {
        super(scene);

        this.face = new MyQuad(this.scene);
        this.initTexture(scene);
    }

    initTexture(scene){
        this.tex = new CGFappearance(scene);
        this.tex.setAmbient(0.9, 0.9, 0.9, 1);
        this.tex.setDiffuse(0.0, 0.0, 0.0, 1);
        this.tex.setSpecular(0.0, 0.0, 0.0, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('textures/suppliestext.jpg');
        this.tex.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display() {
        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.translate(0,0,0.25);
        this.scene.scale(0.5,0.5,0.5);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.translate(0,0,-0.25);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.translate(0, -0.25, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.translate(0, 0.25, 0);
        this.scene.rotate(-90.0*Math.PI/180.0, 1, 0, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.translate(0.25, 0, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 0, 1, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.translate(-0.25, 0, 0);
        this.scene.rotate(-90.0*Math.PI/180.0, 0, 1, 0);
        this.scene.scale(0.5,0.5,0.5);
        this.face.display();
        this.scene.popMatrix();
    }
}