/**PRACTICA DE HECTOR TORIBIO GONZALEZ EN LA QUE SE MUESTRA UN MODELO DEL ROBOT R2D2, SE PUEDE MOVER LA CAMARA, HACER ZOOM CON LA RULETA DEL RATON, CONTROLAR EL ROBOT CON:
  	A -> MOVER IZQUIERDA
	W -> MOVER ADELANTE
	S -> MOVER ATRAS
	D -> MOVER DERECHA

	Z -> MOVER CABEZA IZQUIERDA
	X -> MOVER CABEZA DERECHA

	HAY UNA LUZ AMBIENTE, UN SPOTLIGHT Y UN POINT LIGHT PARA VER COMO REACCIONA EL ROBOT CON LA LUZ. LA PRACTICA SOLO ME FUNCIONA EN MOZILLA FIREFOX Y HAY
	UN PEQUEÑO ERROR CON LA CAMARA. TRAS MOVER AL ROBOT LA CAMARA SE VUELVE A SITUAL EN EL PUNTO (0, 0, 20), NO HE CONSEGUIDO ARREGLARLO PERO AUN QUE
	EXISTA ESTE ERROR SE PUEDE OBSERVAR PERFECTAMENTE EL ROBOT Y COMO SE MUEVE Y REACCIONA CON LA LUZ
**/


import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';

//CREACION DE ESCENA, CAMARA, RENDER Y AJUSTE DE TAMAÑOS
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.updateShadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


//CONSTANTE QUE VAMOS A USAR PARA LA CREACION DE LAS PATAS DE R2D2
const shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, 8 );
shape.lineTo( 12, 8 );
shape.lineTo( 12, 0 );
shape.lineTo( 0, 0 );

//CONFIGURACION DE LAS PATAS
const extrudeSettings = {
	steps: 10,
	depth: -3,
	bevelEnabled: true,
	bevelThickness: 5,
	bevelSize: 0.2,
	bevelOffset: -5,
	bevelSegments: 5
};

//INICIALIZACION DE TODOS LOS OBJETOS QUE VAMOS A USAR PARA EL ROBOT JUNTO CON LOS COLORES Y TEXTURAS
//USAREMOS TEXTURAS PARA LA CABEZA, EL CUADRO DE MANDOS DEL ROBOT, LAS RUEDAS Y EL SUELO
var geometryCuerpo = new THREE.CylinderGeometry(5, 5, 10, 32);
var materialCuerpo = new THREE.MeshToonMaterial({color: 0xD4D4D4});

var geometryCabeza = new THREE.SphereGeometry(5, 32, 16, 0, 3.2, 0, Math.PI);
var materialCabeza = new THREE.MeshToonMaterial({map: THREE.ImageUtils.loadTexture('cabeza.jpg')});

var geometryAbajo = new THREE.CylinderGeometry(5, 3, 1, 10);
var materialAbajo = new THREE.MeshToonMaterial({color: 0xA8B0B6});

var geometryPie = new THREE.CylinderGeometry(1, 2, 2.5, 4);
var materialPie = new THREE.MeshToonMaterial({color: 0xD9E1E6});

var geometryAspira = new THREE.CylinderGeometry(1, 3, 1.5, 4);
var materialAspira = new THREE.MeshToonMaterial({color: 0xffffff});

var geometryCuadradoCabeza = new THREE.CylinderGeometry(1.2, 2, 1, 4, 1, false, 0.8, 6.28);
var materialCuadradoCabeza = new THREE.MeshToonMaterial({color: 0x0000ff})

var geometryOjo = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 64, 1, false, 0, 6.2831);
var materialOjo = new THREE.MeshToonMaterial({color: 0x000000})

var geometryPecho = new THREE.BoxGeometry(10.3, 1, 5, 1, 1, 1);
var materialPecho = new THREE.MeshToonMaterial({color: 0x0000ff});

var geometryAzulLados = new THREE.CylinderGeometry(2, 2, 4, 64, 1, false, 0, 6.28);
var materialAzulLaos = new THREE.MeshToonMaterial({color: 0x0000ff});

var geometryControl = new THREE.BoxGeometry(5, 5, 5, 1, 1, 1);
var materialControl =  new THREE.MeshToonMaterial({map: THREE.ImageUtils.loadTexture('IMG_R_0001.jpg')});

var geometryComienzo = new THREE.CylinderGeometry(1, 1.5, 1, 64, 1, false, 0, 6.28);
var materialComienzo = new THREE.MeshToonMaterial({color: 0xa5b9c8});

var geometryPata = new THREE.ExtrudeGeometry(shape, extrudeSettings);
var materialPata = new THREE.MeshToonMaterial({color: 0xffffff});


var geometrysuelo = new THREE.PlaneGeometry(1000, 1000, 1, 1);
var materialsuelo = new THREE.MeshToonMaterial({map: THREE.ImageUtils.loadTexture('suelobueno (2).jpg')});

var geometryRueda = new THREE.SphereGeometry(1, 64, 32, 0, 6.2, 0, 6.2);
var materialRueda = new THREE.MeshToonMaterial({map: THREE.ImageUtils.loadTexture('ruedas.jpg')});


//CREAMOS LOS OBJETOS CON SU GEOMETRIA Y MATERIALES
var suelo = new THREE.Mesh(geometrysuelo, materialsuelo);
var cabeza = new THREE.Mesh(geometryCabeza, materialCabeza);
var cuerpo = new THREE.Mesh(geometryCuerpo, materialCuerpo);
var abajocil = new THREE.Mesh(geometryAbajo, materialAbajo);
var aspira = new THREE.Mesh(geometryAspira, materialAspira);
var comienzoIz = new THREE.Mesh(geometryComienzo, materialComienzo);
var comienzoDer = new THREE.Mesh(geometryComienzo, materialComienzo);
var pataDer = new THREE.Mesh(geometryPata, materialPata);
var pataIz = new THREE.Mesh(geometryPata, materialPata);
var pieDer = new THREE.Mesh(geometryPie, materialPie);
var pieIz = new THREE.Mesh(geometryPie, materialPie);
var cuadradoCabeza = new THREE.Mesh(geometryCuadradoCabeza, materialCuadradoCabeza);
var ojo = new THREE.Mesh(geometryOjo, materialOjo);
var pecho1 =  new THREE.Mesh(geometryPecho, materialPecho);
var pecho2 = new THREE.Mesh(geometryPecho, materialPecho);
var lado1 = new THREE.Mesh(geometryAzulLados, materialAzulLaos);
var lado2 = new THREE.Mesh(geometryAzulLados, materialAzulLaos);
var control =  new THREE.Mesh(geometryControl, materialControl);
var rueda1 =  new THREE.Mesh(geometryRueda, materialRueda);
var rueda2 =  new THREE.Mesh(geometryRueda, materialRueda);

//HACEMOS QUE LOS OBJETOS ADMITAN Y MUESTREN SOMBREADO
cabeza.receiveShadow = true;
cuerpo.receiveShadow = true;
abajocil.receiveShadow = true;
aspira.receiveShadow = true;
comienzoDer.receiveShadow = true;
comienzoIz.receiveShadow = true;
pataDer.receiveShadow = true;
pataIz.receiveShadow = true;
pieDer.receiveShadow = true;
pieIz.receiveShadow = true;
cuadradoCabeza.receiveShadow = true;
suelo.receiveShadow = true;
ojo.receiveShadow = true;
pecho1.receiveShadow = true;
pecho2.receiveShadow = true;
lado1.receiveShadow = true;
lado2.receiveShadow = true;
control.receiveShadow =  true;
rueda1.receiveShadow =  true;
rueda2.receiveShadow = true;

//INICIALIZAMOS UN GRUPO PARA EL CUERPO
var grupo = new THREE.Group();
//AÑADIMOS LOS OBJETOS AL GRUPO
grupo.add(
	cuerpo,
	abajocil,
	aspira,
	comienzoDer,
	comienzoIz,
	pataDer,
	pataIz,
	pieDer,
	pieIz,
	suelo,
	pecho1,
	pecho2,
	lado1,
	lado2,
	control,
	rueda1,
	rueda2, 
	rueda1, 
	rueda2);

//INICIALIZAMOS UN GRUPO PARA LA CABEZA
var grupoCabeza = new THREE.Group();
//AÑADIMOS LOS OBJETOS AL GRUPO
grupoCabeza.add(
	cabeza,
	cuadradoCabeza,
	ojo,
);



//FUNCION QUE COLOCA CADA OBJETO EN SU LUGAR CORRESPONDIENTE PARA CREAR AL ROBOT
function recoloca(){
	//SITUAMOS EL SUELO
	suelo.rotateX(-1.58);
	suelo.position.y = -7.5;

	//SITUAMOS LA CABEZA
	cabeza.position.x = 0;
	cabeza.position.y = 0;
	cabeza.position.z = 0;

	//SITUAMOS LOS SALIENTES AZULES DEL PECHO
	pecho1.rotateY(1.58)
	pecho1.position.z = 0.05
	pecho1.position.y = 4
	pecho2.rotateY(1.58)
	pecho2.position.z = 0.05
	pecho2.position.y = 2.5

	//SITUAMOS LAS ZONAS AZULES DE LOS LATERALES
	lado1.position.x = 3;
	lado1.position.z = -1
	lado1.position.y = -1
	lado2.position.x = -3;
	lado2.position.z = -1
	lado2.position.y = -1

	//SITUAMOSEL PANEL DE CONTROL DEL PECHO
	control.position.z = -2.5
	control.position.y = -0.8

	//SITUAMOS LA CABEZA
	cabeza.translateY(5).rotateX(-1.58);

	//SIUTUAMOS LAS UNIONES ENTRE LAS PIERNAS Y EL CUERPO
	comienzoIz.position.x = 5
	comienzoIz.position.y = 2
	comienzoIz.rotateZ(-1.58)
	comienzoDer.position.x = -5
	comienzoDer.position.y = 2
	comienzoDer.rotateZ(1.58)

	//SITUAMOS EL SOPORTE PARA LA CAMARA DE LA CABEZA
	cuadradoCabeza.position.y = 8
	cuadradoCabeza.position.z = -4
	cuadradoCabeza.rotateX(-1)

	//SITUAMOS LA CAMARA DE LA CABEZA
	ojo.position.y = 8.3
	ojo.position.z = -4.5
	ojo.rotateX(2.2)

	//SITUAMOS LOS PIES
	pieDer.translateY(-6.5).rotateY(2.38)
	pieDer.position.x = 6.75
	pieDer.position.y = -5.8
	pieIz.translateY(-6.5).rotateY(2.38)
	pieIz.position.x = -6.75
	pieIz.position.y = -5.8

	//SITUAMOS LAS PATAS
	pataDer.rotateX(-1.58)
	pataDer.position.x = 0.65
	pataDer.position.y = 0.5
	pataDer.position.z = 4
	pataIz.rotateX(-1.58)
	pataIz.position.x = -12.65
	pataIz.position.y = 0.5
	pataIz.position.z = 4

	//SITUAMOS LAS RUEDAS
	rueda1.position.y = -7
	rueda2.position.y = -7
	rueda1.position.x = 6.8
	rueda2.position.x = -6.8

	//SITUAMOS EL SOPORTE DEL PIE CENTRAL
	abajocil.translateY(-5.5)

	//SITUAMOS EL PIE CENTRAL
	aspira.translateY(-6.5).rotateY(2.38);

	//AÑADIMOS TODO A LA ESCENA
	scene.add(grupo, suelo, grupoCabeza);
	
}

//AÑADIMOS LAS LUCES, HABRA UNA LUZ AMBIENTAL PARA PODER VER TODO EL SUELO, OTRA SPOTLIGHT BLANCA QUE APUNTE DESDE UNA ZONA DEL SUELO A LA ZONA EN LA QUE ESTA EL ROBOT
//Y, POR ULTIMO, UN PUNTO DE LUZ ENCIMA DEL ROBOT DE COLOR AZUL. DE ESTA MANERA PODEMOS VER COMO REACCIONA EL ROBOT CON DIFERENTES LUCES
function luz(){
	//LUZ AMBIENTE
	const ambiente = new THREE.AmbientLight( 0x404040 ); 
	scene.add( ambiente );

	//SPOTLIGHT
	var luz = new THREE.SpotLight(0xffffff);
	luz.position.set(-200, 0, 0);
	luz.castShadow = true;
	luz.penumbra = 0.2;
	scene.add(luz);
	
	//LUZ PUNTUAL
	const puntual = new THREE.PointLight( 0x0000ff, 1, 100 );
	puntual.position.set( 0, 10, 0 );
	scene.add( puntual );

	
}

//FUNCION PRINCIPAL QUE LLAMA A TODAS LAS DEMAS
function init(){
	recoloca();
	luz();
	//COLOCAMOS LA CAMARA CERCA DEL ROBOT, NO SE POR QUE PERO DESPUES DE MOVER AL ROBOT LA CAMARA VA MAL
	
	renderer.render(scene, camera);
	camera.position.z = cuerpo.position.z+20;
	camera.position.x = cuerpo.position.x;
	camera.position.y = cuerpo.position.y;
	animate();
	
	//PARA PODER MOVER LA CAMARA CON EL RATON
	var controls = new OrbitControls( camera, renderer.domElement );

}


//VARIABLE PARA RENDERIZAR CONSTANTEMENTE LA ESCENA
var animate = function(){
	
    requestAnimationFrame(animate);
	
    renderer.render(scene, camera);
	

}

/**LISTENER PARA LOS EVENTOS DE LAS TECLAS:
	A -> MOVER IZQUIERDA
	W -> MOVER ADELANTE
	S -> MOVER ATRAS
	D -> MOVER DERECHA

	Z -> MOVER CABEZA IZQUIERDA
	X -> MOVER CABEZA DERECHA

	LAS RUEDAS ROTAN CADA VEZ QUE LO MOVEMOS PARA HACER LA ANIMACION DE QUE SE MUEVE
	INTENTÉ ANIMAR EL ROBOT PARA QUE GIRASE HACIA AL LADO AL QUE IBA PERO ERA MUY COMPLCADO Y NO LO CONSEGUI 
**/
document.addEventListener("keydown", pulsaTecla, false);
function pulsaTecla(event){
	var tecla =  event.which;


	//w
	if (tecla == 87){

		cuerpo.position.z -=0.5; 
		abajocil.position.z -=0.5; 
		aspira.position.z -=0.5; 
		comienzoDer.position.z -=0.5; 
		comienzoIz.position.z -=0.5; 
		pataDer.position.z -=0.5; 
		pataIz.position.z -=0.5; 
		pieDer.position.z -=0.5; 
		pieIz.position.z -=0.5; 
		grupoCabeza.position.z -=0.5; 
		pecho1.position.z -=0.5; 
		pecho2.position.z -=0.5; 
		lado1.position.z -=0.5; 
		lado2.position.z -=0.5; 
		camera.position.z -=0.5;
		control.position.z -=0.5;
		rueda1.position.z -=0.5;
		rueda2.position.z -=0.5;
		rueda1.rotateX(0.5)
		rueda2.rotateX(0.5)
		
	}

	//a
	if (tecla == 65){

		cuerpo.position.x -=0.5; 
		abajocil.position.x -=0.5; 
		aspira.position.x -=0.5; 
		comienzoDer.position.x -=0.5; 
		comienzoIz.position.x -=0.5; 
		pataDer.position.x -=0.5; 
		pataIz.position.x -=0.5; 
		pieDer.position.x -=0.5; 
		pieIz.position.x -=0.5; 
		grupoCabeza.position.x -=0.5; 
		pecho1.position.x -=0.5; 
		pecho2.position.x -=0.5; 
		lado1.position.x -=0.5; 
		lado2.position.x -=0.5; 
		control.position.x -=0.5; 
		camera.position.x -=0.5;
		rueda1.position.x -=0.5;
		rueda2.position.x -=0.5;
		rueda1.rotateX(0.5)
		rueda2.rotateX(0.5)
	}

	//s
	if (tecla == 83){
		
		cuerpo.position.z +=0.5; 
		abajocil.position.z +=0.5; 
		aspira.position.z +=0.5; 
		comienzoDer.position.z +=0.5; 
		comienzoIz.position.z +=0.5; 
		pataDer.position.z +=0.5; 
		pataIz.position.z +=0.5; 
		pieDer.position.z +=0.5; 
		pieIz.position.z +=0.5; 
		grupoCabeza.position.z +=0.5; 
		pecho1.position.z +=0.5; 
		pecho2.position.z +=0.5; 
		lado1.position.z +=0.5; 
		lado2.position.z +=0.5; 
		control.position.z +=0.5; 
		camera.position.z +=0.5;
		rueda1.position.z +=0.5;
		rueda2.position.z +=0.5;
		rueda1.rotateX(0.5)
		rueda2.rotateX(0.5)
	}

	//d
	if (tecla == 68){


		cuerpo.position.x +=0.5; 
		abajocil.position.x +=0.5; 
		aspira.position.x +=0.5; 
		comienzoDer.position.x +=0.5; 
		comienzoIz.position.x +=0.5; 
		pataDer.position.x +=0.5; 
		pataIz.position.x +=0.5; 
		pieDer.position.x +=0.5; 
		pieIz.position.x +=0.5; 
		grupoCabeza.position.x +=0.5; 
		pecho1.position.x +=0.5; 
		pecho2.position.x +=0.5; 
		lado1.position.x +=0.5; 
		lado2.position.x +=0.5; 
		control.position.x +=0.5; 
		camera.position.x +=0.5;
		rueda1.position.x +=0.5;
		rueda2.position.x +=0.5;
		rueda1.rotateX(0.5)
		rueda2.rotateX(0.5)
		

	}

	//z
	if (tecla == 90){
		grupoCabeza.rotateY(0.1)
	}

	//x
	if (tecla == 88){
		grupoCabeza.rotateY(-0.1)
	}
}
//INICIAMOS EL PROGRAMA
init();


