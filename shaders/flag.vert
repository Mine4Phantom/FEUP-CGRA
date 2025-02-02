#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float velocity;
varying vec2 vTextureCoord;

uniform float normScale;

//adicionar velocidade a equacao


void main() {
	vec3 offset=vec3(0.0,0.0,1.0);
	
	vTextureCoord = aTextureCoord;


	offset *= sin((timeFactor + (aTextureCoord.x) * 10.0)*(velocity*7.0+0.2)) / 4.5 * aTextureCoord.x;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset , 1.0);
}