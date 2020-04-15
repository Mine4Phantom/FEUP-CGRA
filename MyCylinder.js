/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords=[];

        var ang = 0;
        var alpha = 2*Math.PI/this.slices;
        var texture = 0;
        var texturemapadd = 1/this.slices;

        for (var i=0; i<=this.slices; i++){
            var x = Math.cos(ang);
            var z = -Math.sin(ang);

            this.vertices.push(x, 0, z);
            this.texCoords.push(texture, 1);
            this.vertices.push(x, 1, z);
            this.texCoords.push(texture, 0);
            this.normals.push(x, 0, z, x, 0, z)
            
            if (i > 0){
                this.indices.push((i*2), (i*2+1), (i*2-1));
            	this.indices.push((i*2), (i*2-1), (i*2-2));
            }

            this.normals.push(x, 0, z);
            this.normals.push(x, 0, z);
            this.texCoords.push(texture, 0);
            this.texCoords.push(texture, 1);
    
            texture += texturemapadd;
            ang += alpha;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity);
        this.initBuffers();
        this.initNormalVizBuffers();
    }


}