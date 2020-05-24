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

        //Textures
        this.heightTex = new CGFtexture(this, 'textures/heightmap.jpg');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.quad = new MyQuad(this);
        this.cube = new Mycanyonmap(this);
        this.vehicle = new MyVehicle(this, 4, 1);
        this.sphere = new MySphere(this, 16, 8);
        this.terrain = new MyPlane(this, 20);
        this.billboard = new MyBillboard(this, 20);
        this.s1 = new MySupply(this);
        this.s2 = new MySupply(this);
        this.s3 = new MySupply(this);
        this.s4 = new MySupply(this);
        this.s5 = new MySupply(this);

        this.supplies = [this.s1, this.s2, this.s3, this.s4, this.s5];


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

        this.terrainMaterial = new CGFappearance(this);
		this.terrainMaterial.setAmbient(0.2, 0.4, 0.8, 1);
		this.terrainMaterial.setDiffuse(0.2, 0.7, 0.7, 1);
		this.terrainMaterial.setSpecular(0.0, 0.0, 0.0, 1);
		this.terrainMaterial.setShininess(120);
		this.terrainMaterial.loadTexture('images/terrain.jpg');
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.billboardMaterial = new CGFappearance(this);
		this.billboardMaterial.setAmbient(0.2, 0.4, 0.8, 1);
		this.billboardMaterial.setDiffuse(0.2, 0.7, 0.7, 1);
		this.billboardMaterial.setSpecular(0.0, 0.0, 0.0, 1);
		this.billboardMaterial.setShininess(120);
		this.billboardMaterial.loadTexture('images/gray.png');
		this.billboardMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        //------ Flag Texture Material
        this.flagTex = new CGFappearance(this);
        this.flagTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.flagTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.flagTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.flagTex.setShininess(10.0);
        this.flagTex.loadTexture('images/red.png');
        this.flagTex.setTextureWrap('REPEAT', 'REPEAT');

        //------Shaders
        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainShader.setUniformsValues({uSampler2: 1});
        
        this.flagShader = new CGFshader(this.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagShader.setUniformsValues({ timeFactor: 0 });
        this.flagShader.setUniformsValues({velocity: Math.abs(this.vehicle.speed)});

        this.billboardShader = new CGFshader(this.gl, "shaders/billboard.vert", "shaders/billboard.frag");
        this.billboardShader.setUniformsValues({ percentageDelivered: 0.0});

        this.otherFlagSideShader = new CGFshader(this.gl, "shaders/otherflagside.vert", "shaders/flag.frag");
        this.otherFlagSideShader.setUniformsValues({ timeFactor: 0 });
        this.otherFlagSideShader.setUniformsValues({velocity: Math.abs(this.vehicle.speed)});

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCube = true;
        this.displayVehicle = true;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayTerrain = true;
        this.displayBillboard = true;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        var t = 0;
        this.nSuppliesDelivered = 0;


        this.textures = [this.texture1, this.texture2, this.texture3];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];
    }
    checkKeys() {
        var text = "Keys pressed: ";
        let keysPressed = false;

    
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW") && !this.vehicle.autopilot) {
            this.vehicle.accelerate(0.01 * this.speedFactor);            
            keysPressed = true;
            
        }

        if (this.gui.isKeyPressed("KeyS") && !this.vehicle.autopilot) {
            this.vehicle.accelerate(-0.01 * this.speedFactor);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyA") && !this.vehicle.autopilot) {
            this.vehicle.turn(5);
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyD") && !this.vehicle.autopilot) {
            this.vehicle.turn(-5);
            keysPressed = true;
        }


        if (this.gui.isKeyPressed("KeyR")) {
            
            this.vehicle.reset();
            this.nSuppliesDelivered=0;
            this.billboard.reset();
            for (var i=0 ; i<5; i++){
                this.supplies[i].reset();
            }
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyP") && !this.vehicle.autopilot) {

            this.vehicle.startAutoPilot();
            keysPressed = true;

        }

        if (this.gui.isKeyPressed("KeyL") && !this.vehicle.autopilot) {
            
            if (this.nSuppliesDelivered <= 4){
              this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x, this.vehicle.z);
              this.nSuppliesDelivered++;
            }
            keysPressed = true;
        }
       
            
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
        this.vehicle.update(t);
        //flag updates
        this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
        this.flagShader.setUniformsValues({velocity: Math.abs(this.vehicle.speed)});
        this.otherFlagSideShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
        this.otherFlagSideShader.setUniformsValues({velocity: Math.abs(this.vehicle.speed)});
        this.billboardShader.setUniformsValues({ percentageDelivered: this.nSuppliesDelivered/5});

        this.s1.update();
        this.s2.update();
        this.s3.update();
        this.s4.update();
        this.s5.update();
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
        
      
        //Sphere display
        if (this.displaySphere) {
            this.sphereMaterial.apply();
            this.sphere.display();
        }

        //Vehicle display
        if (this.displayVehicle) {
            this.pushMatrix();
            //this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            //this.translate(-this.vehicle.x, -this.vehicle.y, -this.vehicle.z);
            this.vehicle.display();
            this.popMatrix();
        }

        //CubeMap display
        if(this.displayCube){
            this.quadMaterial.apply();
            this.cube.display();
        }

        if(this.displayTerrain){
            //apply default terrain appearance
            this.terrainMaterial.apply();

            //Terrain display
            // bind additional texture to texture unit 1
            this.heightTex.bind(1);
            this.setActiveShader(this.terrainShader);
            this.pushMatrix();
            this.translate(0, -10, 0);
            this.scale(50, 8, 50);
            this.rotate(-Math.PI / 2, 1, 0, 0);
            this.terrain.display();
            this.popMatrix();
            // restore default shader (will be needed for drawing the axis in next frame)
		    this.setActiveShader(this.defaultShader);

            this.setDefaultAppearance();
        }

        if(this.displayBillboard){
            this.pushMatrix();
            this.translate(0, -10, -5);
            this.billboard.display();
            this.popMatrix();
        }
        

        this.s1.display();
        this.s2.display();
        this.s3.display();
        this.s4.display();
        this.s5.display();

        
        
        // ---- END Primitive drawing section
    }
}
