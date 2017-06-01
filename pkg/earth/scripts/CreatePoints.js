(function() {

	'use strict';

	var _Config = require(./Config);

	var _Config2 = _interopRequireDefault(_Config);

	var _three = require(./THREE);

	var THREE = _interopRequireWildcard(_three);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by z on 2017/4/28.
	 */
	var createPoints = function createPoints(pos, name) {

	    var imgGeometry = new THREE.Geometry();
	    var gVertices = new THREE.Vector3(pos.x, pos.y, pos.z);
	    imgGeometry.vertices.push(gVertices);

	    var pointsMaterial = createPointsMaterial(name);

	    var points = new THREE.Points(imgGeometry, pointsMaterial);
	    points.name = name;

	    points.material.map.minFilter = THREE.LinearFilter;

	    return points;
	};

	var createPointsMaterial = function createPointsMaterial(name) {

	    // let pointsTexture = new THREE.TextureLoader().load('./dist/img/i_namibia.png');
	    var pointsTexture = _Config2.default.Preload.buffer.textures[name];
	    var material = new THREE.PointsMaterial();

	    material.map = pointsTexture;
	    material.size = 64 / 16;
	    material.transparent = true;

	    return material;
	};

	module.exports = {
	    createPoints: createPoints
	};

/***/ })