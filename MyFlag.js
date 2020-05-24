/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
		
        this.flag = new MyPlane(this.scene, 20);
        this.cube = new MyUnitCubeQuad(this.scene);

        this.initMaterials();
    }

    initMaterials(){
        //------ bandeira texture
        this.cubeTex = new CGFappearance(this.scene);
        this.cubeTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTex.setShininess(10.0);
        this.cubeTex.loadTexture('images/rainbow.png');
        this.cubeTex.setTextureWrap('REPEAT', 'REPEAT');
        //------ bandeira texture
        this.cubeTexx = new CGFappearance(this.scene);
        this.cubeTexx.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeTexx.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeTexx.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTexx.setShininess(10.0);
        this.cubeTexx.loadTexture('images/rainbow2.png');
        this.cubeTexx.setTextureWrap('REPEAT', 'REPEAT');
        //------ coisos q seguram a bandeira
        this.cubeTex1 = new CGFappearance(this.scene);
        this.cubeTex1.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeTex1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeTex1.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTex1.setShininess(10.0);
        this.cubeTex1.loadTexture('images/arcoiris.png');
        this.cubeTex1.setTextureWrap('REPEAT', 'REPEAT');

    }

    display(){
        //um lado da bandeira
        this.scene.setActiveShader(this.scene.flagShader);
        this.cubeTex.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -4);
        this.scene.scale(1, 1, 2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();

        //outro lado da bandeira
        this.scene.setActiveShader(this.scene.otherFlagSideShader);
        this.cubeTexx.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -4);
        this.scene.scale(1, -1, 2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();

        //cubos de ligação, mudar
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.pushMatrix();
        this.scene.rotate(0.14, 1, 0, 0);
        this.scene.translate(0, 0, -2.5);
        this.scene.scale(0.1, 0.1, 1.5);
        this.cubeTex1.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-0.14, 1, 0, 0);
        this.scene.translate(0, 0, -2.5);
        this.scene.scale(0.1, 0.1, 1.5);
        this.cubeTex1.apply();
        this.cube.display();
        this.scene.popMatrix();
    }



}