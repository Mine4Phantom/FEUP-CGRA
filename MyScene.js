/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.quad = new MyQuad(this);
        this.cube = new Mycanyonmap(this);
        this.vehicle = new MyVehicle(this, 4, 1);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 6);


        //------ Applied Material
        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture('images/default.png');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.sphereMaterial = new CGFappearance(this);
        this.sphereMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sphereMaterial.setShininess(10.0);
        this.sphereMaterial.loadTexture("images/earth.jpg");
        this.sphereMaterial.setTextureWrap("Repeat", "Clamp to edge");

        //------

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCube = true;
        this.displayVehicle = true;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        //this.selectedTexture = -1;
        this.wrapS = 0;
        this.wrapT = 0;
        //this.lastUpdate = 0;

        this.textures = [this.texture1, this.texture2, this.texture3];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];

        this.textureIds = { 'Board': 0, 'Floor': 1, 'Window': 2 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
    }
    checkKeys() {
        var text = "Keys pressed: ";
        let keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelerate(0.01 * this.speedFactor);            
            keysPressed = true;
            
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelerate(-0.01 * this.speedFactor);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(5);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-5);
            keysPressed = true;
        }


        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
            keysPressed = true;
        }

        if (keysPressed)
            this.vehicle.update();
    }
    

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t){
        this.checkKeys();
        this.vehicle.update();
    }
    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.quadMaterial.setTexture(this.textures[this.selectedTexture]);
    }

    //Function that updates wrapping mode in quadMaterial
    updateTextureWrapping() {
        this.quadMaterial.setTextureWrap(this.wrappingMethods[this.wrapS], this.wrappingMethods[this.wrapT]);
    }

    //Function that updates texture coordinates in MyQuad
    updateTexCoords() {
        this.quad.updateTexCoords(this.texCoords);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();


        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        if (this.displayCylinder) {
            this.cylinder.display();
        }
      
        if (this.displaySphere) {
            this.sphereMaterial.apply();
            this.sphere.display();
        }

        if (this.displayVehicle) {
            //this.translate(this.vehicle.x, 10, this.vehicle.z);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            //this.translate(-this.vehicle.x, -10, -this.vehicle.z);
            this.vehicle.display();
        }
        
        if(this.displayCube){
            this.quadMaterial.apply();
            this.cube.display();
        }
 
        
        // ---- END Primitive drawing section
    }
}
