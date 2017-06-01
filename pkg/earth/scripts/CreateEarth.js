(function() {

	'use strict';

	var _Config = require(./Config);

	var _Config2 = _interopRequireDefault(_Config);

	var _three = require(./THREE);

	var THREE = _interopRequireWildcard(_three);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by z on 2017/4/21.
	 */
	var mapSiz = {
	    width: 2048,
	    height: 1024
	};

	var createEarth = function createEarth() {

	    var sphere = new THREE.SphereGeometry(5, 40, 40);
	    var material = createEarthMaterial();

	    var earth = new THREE.Mesh(sphere, material);
	    earth.name = 'earth';

	    return earth;
	};

	// 创建地球材质
	var createEarthMaterial = function createEarthMaterial() {

	    var mapCanvas = document.createElement('canvas');

	    var context = mapCanvas.getContext('2d');

	    mapCanvas.width = mapSiz.width;

	    mapCanvas.height = mapSiz.height;

	    context.drawImage(_Config2.default.Preload.buffer.textures['earth_cover'].image, 0, 0);

	    var planetTexture = new THREE.Texture(mapCanvas);
	    planetTexture.needsUpdate = true;

	    var bumpTexture = _Config2.default.Preload.buffer.textures['earth_bump'];
	    var specTexture = _Config2.default.Preload.buffer.textures['earth_spec'];

	    var material = new THREE.MeshPhongMaterial();
	    material.transparent = true;
	    material.map = planetTexture;

	    material.bumpMap = bumpTexture;
	    material.bumpScale = 0.15;

	    material.specularMap = specTexture;
	    material.specular = new THREE.Color('#909090');

	    material.shininess = 5;

	    return material;
	};

	module.exports = {
	    createEarth: createEarth
	};

/***/ })