(function() {

	'use strict';

	var _three = require(./THREE);

	var THREE = _interopRequireWildcard(_three);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// 创建全局光源
	var createAmbient = function createAmbient() {

	    // let ambientLight = new THREE.AmbientLight(0x111111, 1);
	    var ambientLight = new THREE.AmbientLight(0x393939, 0.5);
	    ambientLight.name = 'ambient';

	    return ambientLight;
	};

	// 创建平行光源
	/**
	 * Created by z on 2017/4/27.
	 */
	var createDirectional = function createDirectional() {

	    var directionalLight = new THREE.DirectionalLight(0xffffff);
	    directionalLight.position.x = 0;
	    directionalLight.position.y = 0;
	    directionalLight.position.z = -500;
	    directionalLight.intensity = 1;
	    // directionalLight
	    directionalLight.name = 'directional';
	    // scene.add(directionalLight);

	    return directionalLight;
	};

	var createSpot = function createSpot() {

	    var spotLight = new THREE.SpotLight(0xffffff);

	    // let spotLight = new THREE.SpotLight(0xcccccc);
	    spotLight.intensity = 1.2;
	    spotLight.position.x = -26;
	    spotLight.position.y = 11;
	    spotLight.position.z = -11;
	    // spotLight.position.x = 0;
	    // spotLight.position.y = 0;
	    // spotLight.position.z = 20;
	    spotLight.angle = 0.2;
	    spotLight.castShadow = false;
	    spotLight.penumbra = 0.4;
	    spotLight.distance = 124;
	    spotLight.decay = 1;
	    spotLight.shadow.camera.near = 50;
	    spotLight.shadow.camera.far = 200;
	    spotLight.shadow.camera.fov = 35;
	    spotLight.shadow.mapSize.height = 1024;
	    spotLight.shadow.mapSize.width = 1024;

	    spotLight.name = 'spotLight';

	    return spotLight;
	};

	module.exports = {
	    createAmbient: createAmbient,
	    createDirectional: createDirectional,
	    createSpot: createSpot
	};

/***/ })