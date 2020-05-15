const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {

    constructor(scene) {
        super(scene);
        this.supplyFalling = new MySupplyFalling(this.scene);
        this.supplyLanded = new MySupplyLanded(this.scene);
        this.state = SupplyStates.INACTIVE;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    update(){
         if (this.state == SupplyStates.FALLING) {
            this.y = this.y - 10/60;
        }
    }

    drop(x, z){
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.z = z;
    }

    land(){
        if (this.y <= -5) {
            this.state = SupplyStates.LANDED;
        }
    }

    display(){
        if(this.state == SupplyStates.FALLING){
            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);
            this.supplyFalling.display();
            this.scene.popMatrix();
            this.land();
        }
        
        else if(this.state == SupplyStates.LANDED){
            this.scene.pushMatrix();
            this.scene.translate(this.x, -5, this.z);
            this.supplyLanded.display();
            this.scene.popMatrix();
        }
    }    

    reset() {
        this.state = SupplyStates.INACTIVE;
        this.display();
    }
}