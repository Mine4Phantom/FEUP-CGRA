/**
* MyCockpit
* @constructor
*/
class MyCockpit extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.sphere = new MySphere(this.scene, 16, 8);
        this.cylinder = new MyCylinder(this.scene, 10);
    }

    display(){
        //Main
        this.scene.pushMatrix();
        this.scene.translate(0,0,-3);
        this.scene.scale(1,1,6);
        this.scene.rotate(90*Math.PI/180.0, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,2.8);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-2.8);
        this.sphere.display();
        this.scene.popMatrix();
    }
}