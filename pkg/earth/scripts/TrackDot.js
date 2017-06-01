(function() {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by z on 2017/4/25.
	 */

	var TrackDot = function () {
	    function TrackDot(ctx, speed, width, height, radiusX, radiusY, revise) {
	        _classCallCheck(this, TrackDot);

	        this.ctx = ctx;
	        this.speed = speed || 0.001;
	        this.radiusX = radiusX || 0;
	        this.radiusY = radiusY || 0;
	        this.revise = revise || 0;

	        this.color = '#fff';
	        this.angle = 0;
	        this.rotation = 0;
	        this.scaleX = 1;
	        this.scaleY = 1;
	        this.x = 0;
	        this.y = 0;
	        this.radius = 5;

	        this.width = width;
	        this.height = height;

	        this.centerX = this.width / 2;
	        this.centerY = this.height / 2;
	    }

	    _createClass(TrackDot, [{
	        key: 'draw',
	        value: function draw() {

	            this.ctx.save();
	            this.ctx.translate(this.x, this.y - this.revise);
	            this.ctx.rotate(this.rotation);
	            this.ctx.scale(this.scaleX, this.scaleY);
	            this.ctx.fillStyle = this.color;
	            this.ctx.beginPath();
	            this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
	            this.ctx.closePath();
	            this.ctx.fill();
	            this.ctx.restore();
	        }
	    }, {
	        key: 'update',
	        value: function update() {

	            this.x = this.centerX + Math.cos(this.angle) * this.radiusX;
	            this.y = this.centerY + Math.sin(this.angle) * this.radiusY;

	            this.angle += this.speed;

	            this.draw();
	        }
	    }]);

	    return TrackDot;
	}();

	module.exports = TrackDot;

/***/ })