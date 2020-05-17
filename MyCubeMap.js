/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class Mycanyonmap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);
        this.initBuffers();
        this.initTextures(scene);
	}

	initTextures(scene){
        this.left = new CGFappearance(this.scene);
        this.left.setShininess(10.0);
        this.left.setDiffuse(0,0,0, 1);
        this.left.setSpecular(0, 0, 0, 1);
        this.left.setAmbient(0.9, 0.9, 0.9, 1);
        this.left.setEmission(0.5, 0.5, 0.5, 1);
        this.left.loadTexture('images/split_canyonmap/left.png');
        this.left.setTextureWrap('REPEAT', 'REPEAT');

        this.front = new CGFappearance(this.scene);
        this.front.setShininess(10.0);
        this.front.setDiffuse(0,0,0, 1);
        this.front.setSpecular(0, 0, 0, 1);
        this.front.setAmbient(0.9, 0.9, 0.9, 1);
        this.front.setEmission(0.5, 0.5, 0.5, 1);
        this.front.loadTexture('images/split_canyonmap/front.png');
        this.front.setTextureWrap('REPEAT', 'REPEAT');

        this.back = new CGFappearance(this.scene);
        this.back.setShininess(10.0);
        this.back.setDiffuse(0, 0, 0, 1);
        this.back.setSpecular(0, 0, 0, 1);
        this.back.setAmbient(0.9, 0.9, 0.9, 1);
        this.back.setEmission(0.5, 0.5, 0.5, 1);
        this.back.loadTexture('images/split_canyonmap/back.png');
        this.back.setTextureWrap('REPEAT', 'REPEAT');

        this.right = new CGFappearance(this.scene);
        this.right.setShininess(10.0);
        this.right.setDiffuse(0, 0, 0, 1);
        this.right.setSpecular(0, 0, 0, 1);
        this.right.setAmbient(0.9, 0.9, 0.9, 1);
        this.right.setEmission(0.5, 0.5, 0.5, 1);
        this.right.loadTexture('images/split_canyonmap/right.png');
        this.right.setTextureWrap('REPEAT', 'REPEAT');

        this.top = new CGFappearance(this.scene);
        this.top.setAmbient(0.9, 0.9, 0.9, 1);
        this.top.setDiffuse(0, 0, 0, 1);
        this.top.setSpecular(0, 0, 0, 1);
        this.top.setShininess(10.0);
        this.top.setEmission(0.5, 0.5, 0.5, 1);
        this.top.loadTexture('images/split_canyonmap/top.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(this.scene);
        this.bottom.setAmbient(0.9, 0.9, 0.9, 1);
        this.bottom.setDiffuse(0, 0, 0, 1);
        this.bottom.setSpecular(0, 0, 0, 1);
        this.bottom.setShininess(10.0);
        this.bottom.setEmission(0.5, 0.5, 0.5, 1);
        this.bottom.loadTexture('images/split_canyonmap/bottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');
	}
    

	display(){

        //back
        this.scene.pushMatrix();
        this.scene.scale (50,50,50);
        this.scene.translate(0, 0, -0.5);
        this.front.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI,0,1,0);
        this.scene.scale (50,50,50);
        this.scene.translate(0, 0, -0.5);
        this.back.apply();
        this.quad.display();
        this.scene.popMatrix();
        

        //right
        this.scene.pushMatrix();
        this.scene.scale (50,50,50);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0, 0, -0.5);
        this.right.apply();
        this.quad.display();
        this.scene.popMatrix();


        //left
        this.scene.pushMatrix();
        this.scene.scale (50,50,50);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0, 0, -0.5);
        this.left.apply();
        this.quad.display();
        this.scene.popMatrix();

        
        //top
        this.scene.pushMatrix();
        this.scene.scale (50,50,50);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0, 0, -0.5);
        this.top.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        //bottom
        this.scene.pushMatrix();
        this.scene.scale (50,50,50);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0, 0, -0.5);
        this.bottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        
    }

    enableNormalViz(){
        this.quad.enableNormalViz();
    }

    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}

