(function() {

	'use strict';

	var _createClass = function () { 
		function defineProperties(target, props) { 
			for (var i = 0; i < props.length; i++) { 
				var descriptor = props[i]; 
				descriptor.enumerable = descriptor.enumerable || false; 
				descriptor.configurable = true; 
				if ("value" in descriptor) descriptor.writable = true; 
				Object.defineProperty(target, descriptor.key, descriptor); 
			} 
		} 
		return function (Constructor, protoProps, staticProps) { 
			if (protoProps) defineProperties(Constructor.prototype, protoProps); 
			if (staticProps) defineProperties(Constructor, staticProps); 
			return Constructor; 
	}; }();
	
	import THREE as _three from './THREE.js' ;

	import './OrbitControls';

	import './EffectComposer';

	import './RenderPass';

	import './ShaderPass';

	import './MaskPass';

	import './CopyShader';

	import _earth from './createEarth';

	import _cloud from './createCloud';

	import _light from './createLight';

	import _points from './createPoints';

	import  _outerGlow from './createOuterGlow';

	function _classCallCheck(instance, Constructor) { 
		if (!(instance instanceof Constructor)) { 
			throw new TypeError("Cannot call a class as a function"); 
		}
	}

	var SceneView = function () {
	    function SceneView(el, data) {
	        _classCallCheck(this, SceneView);

	        this.$el = el;
	        this.$text = $('.index-box .text');

	        this.raycaster = new THREE.Raycaster();
	        this.touch = new THREE.Vector2();
	        this.data = data;
	        this.dataLen = this.data.length;

	        this.scopeIndex = 0;

	        this.rotAuto = false;
	        this.isEnd = false;

	        this.rotSpeed = 0.001;
	        this.count = 0;

	        this.isStart = false;

	        // this.angleDistance = 2 * Math.PI / 5;
	        // this.angleDef = -2.863;
	        // this.angleDef = 3.015;
	        this.init();
	    }

	    _createClass(SceneView, [{
	        key: 'init',
	        value: function init() {

	            this.width = 750;
	            this.height = 1200;
	            this.scene = new THREE.Scene();

	            this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 1000);
	            this.camera.position.x = 3.55;
	            // this.camera.position.z = -328;
	            this.camera.position.z = -328;
	            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
	            this.renderer.setSize(this.width, this.height);
	            this.renderer.autoClear = true;
	            this.renderer.setClearColor(0x000000, 0);

	            this.controls = new THREE.OrbitControls(this.camera);
	            this.controls.rotateSpeed = 0.3;
	            this.controls.autoRotate = false;
	            this.controls.enableZoom = false;
	            this.controls.enablePan = false;
	            this.controls.enabled = false;
	            //
	            this.group = new THREE.Group();

	            this.scene.add(this.group);

	            var pointsGroup = new THREE.Group();
	            pointsGroup.name = 'pointsGroup';
	            this.group.add(pointsGroup);
	            this.group.rotation.y = 2 * Math.PI;

	            $(this.renderer.domElement).css({
	                'width': '375px',
	                'height': '600px'
	            });

	            this.$el.append(this.renderer.domElement);

	            this.earth = (0, _earth.createEarth)();
	            this.cloud1 = (0, _cloud.createCloud)(5.1, 'cloud1');
	            this.cloud2 = (0, _cloud.createCloud)(5.2, 'cloud2');
	            this.cloud2.rotation.y = Math.PI;

	            this.group.add(this.earth);
	            this.group.add(this.cloud1);
	            this.group.add(this.cloud2);

	            for (var i = 0; i < this.dataLen; i++) {
	                pointsGroup.add((0, _points.createPoints)(this.data[i].dotPosition, this.data[i].dotImgName));
	            }

	            this.scene.add((0, _light.createAmbient)());

	            this.spotLight = (0, _light.createSpot)();
	            this.camera.add(this.spotLight);
	            this.scene.add(this.camera);

	            // this.$el.on('touchstart', this.rotationStartHandler.bind(this));

	            this.$el.on('touchend', this.rotationEndHandler.bind(this));

	            this.createOuterFlow();

	            this.animate();
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            if (this.isStart) {
	                this.blurComposer.render();
	                this.sceneComposer.render();
	            } else {
	                this.renderer.render(this.scene, this.camera);
	                this.isStart = true;
	            }
	        }
	    }, {
	        key: 'animate',
	        value: function animate() {
	            var _this = this;

	            if (this.controls) {
	                this.controls.update();
	            }

	            this.cloud1.rotation.y -= this.rotSpeed / 4;
	            this.cloud2.rotation.y -= this.rotSpeed / 4;

	            if (this.rotAuto) {
	                this.rotAutoHandler();
	            }

	            this.render();

	            requestAnimationFrame(function () {
	                _this.animate();
	            });
	        }

	        // 外发光

	    }, {
	        key: 'createOuterFlow',
	        value: function createOuterFlow() {

	            this.blurScene = new THREE.Scene();

	            this.glowGroup = (0, _outerGlow.createOuterGlow)();

	            this.blurScene.add(this.glowGroup);

	            var renderTargetParameters = {
	                minFilter: THREE.LinearFilter,
	                magFilter: THREE.LinearFilter,
	                format: THREE.RGBAFormat,
	                stencilBuffer: true
	            };

	            var blurRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height, renderTargetParameters);

	            var blurRenderPass = new THREE.RenderPass(this.blurScene, this.camera);

	            var sceneRenderPass = new THREE.RenderPass(this.scene, this.camera);

	            this.blurComposer = new THREE.EffectComposer(this.renderer, blurRenderTarget);

	            this.blurComposer.addPass(blurRenderPass);

	            this.sceneComposer = new THREE.EffectComposer(this.renderer, blurRenderTarget);

	            this.sceneComposer.addPass(sceneRenderPass);

	            var effectBlend = new THREE.ShaderPass(_outerGlow.AdditiveBlendShader, 'tSampler1');

	            effectBlend.uniforms['tSampler2'].value = this.blurComposer.renderTarget2.texture;

	            effectBlend.renderToScreen = true;

	            this.sceneComposer.addPass(effectBlend);
	        }

	        // 旋转开始
	        // rotationStartHandler (e) {
	        //
	        //     this.rotAuto = false;
	        //     $('.btn-tips').addClass('hide');
	        //     $('.btn-show-parallax').addClass('show');
	        //     $('.index-box .name').removeClass(this.data[this.scopeIndex].dotImgName);
	        //
	        // }

	        // 旋转结束

	    }, {
	        key: 'rotationEndHandler',
	        value: function rotationEndHandler(e) {

	            if (e) {
	                e.preventDefault && e.preventDefault();
	            }

	            this.touch.x = Math.round(window.innerWidth / 2) / window.innerWidth * 2 - 1;
	            this.touch.y = -(Math.round(window.innerHeight / 2) / window.innerHeight) * 2 + 1;

	            this.raycaster.setFromCamera(this.touch, this.camera);

	            var intersected = this.raycaster.intersectObject(this.earth);

	            if (intersected && intersected.length > 0) {

	                var beforeIndex = this.scopeIndex;
	                this.scopeIndex = this.getScopeIndex(intersected[0].point);

	                // console.log(this.scopeIndex);
	                if (beforeIndex === this.scopeIndex) {
	                    return false;
	                } else {

	                    if (this.isEnd) return false;

	                    window.musicSprite.pause();

	                    window.musicSprite.gotoAndPlay(this.data[this.scopeIndex].musicName, function () {}, true);
	                }
	            }
	        }

	        // 自动旋转

	    }, {
	        key: 'rotAutoHandler',
	        value: function rotAutoHandler() {

	            this.camera.position.x = this.camera.position.x * Math.cos(this.rotSpeed) - this.camera.position.z * Math.sin(this.rotSpeed);

	            this.camera.position.z = this.camera.position.z * Math.cos(this.rotSpeed) + this.camera.position.x * Math.sin(this.rotSpeed);

	            this.count++;

	            // 隔100ms检测
	            if (this.count % 100 === 0) {

	                this.count = 0;

	                this.rotationEndHandler();
	            }
	        }

	        // 获取区域index

	    }, {
	        key: 'getScopeIndex',
	        value: function getScopeIndex(end) {

	            var arr = this.data;
	            var len = this.data.length;
	            var resultArr = [];

	            for (var i = 0; i < len; i++) {

	                var a = new THREE.Vector3(arr[i].dotPosition.x, arr[i].dotPosition.y, arr[i].dotPosition.z);

	                var x = a.x - end.x;

	                var y = a.y - end.y;

	                var z = a.z - end.z;

	                var result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

	                // console.log(i, result);

	                resultArr.push(result);
	            }

	            var index = resultArr.indexOf(Math.min.apply(Math, resultArr));

	            return index;
	        }

	        // 显示经纬度

	    }, {
	        key: 'showText',
	        value: function showText(scopeIndex) {
	            var _this2 = this;

	            var y = this.data[scopeIndex].bgPos.y / 2;

	            this.$text.css({
	                'background-position': '0 ' + y + 'px'
	            });

	            this.$text.removeClass('show');

	            setTimeout(function () {
	                _this2.$text.addClass('show');
	            }, 400);
	        }
	    }]);

	    return SceneView;
	}();

	export './SceneView.js';

/***/ })