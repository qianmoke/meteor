(function() {

	'use strict';

	var _three = require(./THREE);

	var THREE = _interopRequireWildcard(_three);

	var _Config = require(./Config);

	var _Config2 = _interopRequireDefault(_Config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * Created by z on 2017/4/27.
	 */

	var createCloud = function createCloud(radius, name) {

	    var cloudSphere = new THREE.SphereGeometry(radius, 40, 40);
	    var cloudMaterial = createClodMaterial();

	    var cloudMesh = new THREE.Mesh(cloudSphere, cloudMaterial);

	    cloudMesh.name = name;

	    return cloudMesh;

	    // group.add(cloudMesh);
	};

	var createClodMaterial = function createClodMaterial() {

	    // console.log(Config.Preload.buffer);
	    // let cloudTexture = new THREE.TextureLoader().load('./dist/img/earth_cloud.png');
	    var cloudTexture = _Config2.default.Preload.buffer.textures['earth_cloud'];

	    var material = new THREE.MeshPhongMaterial();
	    material.map = cloudTexture;
	    material.transparent = true;
	    material.opacity = 1;
	    material.blending = THREE.AdditiveBlending;

	    return material;
	};

	module.exports = {
	    createCloud: createCloud
	};

/***/ })