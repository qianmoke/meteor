var _SceneView = require('./SceneView');
var _Config = require('./Config');
var _KeyAnimation = require('./KeyAnimation');
require('https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js');

// 加载页对象
var IndexViewController = function IndexViewController() {

    // 公共变量
    var _that = this;

    // 私有变量
    var _private = {};

    _private.$pageEl = $('.m-index');

    _private.isInit = false;

    var isTouch = false;

    var isMove = false;

    var sceneView = null;

    var gamma = 0;

    var textIndex = -1;

    var videoInit = false;

    var isVideoReady = false;

    // 初始化，包括整体页面
    _private.init = function () {

        if (_private.isInit === true) {
            return;
        }

        _private.isInit = true;

        _private.startTime = 0;

        _private.$webgl = $('.ns-webgl-page');

        _private.$indexBox = _private.$pageEl.find('.index-box');
        _private.$name = _private.$indexBox.find('.name');

        _private.$btnShow = _private.$pageEl.find('.btn-show-parallax');
        _private.$btnShowText = _private.$btnShow.find('.text');

        _private.$btnEnd = $('.btn-show-end ');

        _private.$parallax = $('.ns-parallax');
        _private.$backTips = _private.$parallax.find('.tips');

        _private.$btnTips = $('.btn-tips');

        _private.kfCloud = null;
        _private.kfCloud2 = null;

        _private.$kfCloud = _private.$parallax.find('.kf-cloud');
        _private.$kfCloud2 = _private.$parallax.find('.kf-cloud2');

        _private.kflen = 0;

        sceneView = new _SceneView2.default(_private.$webgl, _Config2.default.data);

        _private.initKf();

        _private.$btnShow.on('touchstart', _private.showContent);

        _private.$btnEnd.on('touchstart', _private.hide);

        _private.$webgl.on('touchstart', _private.startHandler);
    };

    _private.startHandler = function (e) {

        e.preventDefault && e.preventDefault();

        sceneView.rotAuto = false;
        _private.$btnTips.addClass('hide');
        _private.$btnShow.addClass('show');
        // _private.$name.removeClass(sceneView.data[sceneView.scopeIndex].dotImgName);
    };

    _private.initKf = function () {

        var buffer = _Config2.default.Preload.buffer;

        _private.kfCloud = new _KeyAnimation2.default(_private.$kfCloud, 'array', buffer.keyimgs['kf_cloud'], {
            fps: 12,
            width: 750 / 2,
            height: 1200 / 2
        });
    };

    _private.videoInit = function () {

        window.txplayer.play();

        var timer = setInterval(function () {

            var time = window.txplayer.$video[0].currentTime;

            if (time > 0) {

                clearInterval(timer);

                // window.txvideo.setHistoryStart(0.4);
                window.txplayer.pause();

                window.txplayer.$video[0].currentTime = _Config2.default.data[sceneView.scopeIndex].videoTimeline.start;

                setTimeout(function () {

                    isVideoReady = true;
                }, 1000);

                timer = null;
            }
        }, 50);
    };

    _private.playKf = function (scopeIndex) {

        _private.kfCloud.fromTo(1, 12, 1, function () {

            if (isVideoReady) {

                window.txplayer.play();

                setTimeout(function () {
                    console.log('play');
                    window.txplayer.play();
                    // window.txplayer.$video[0].play();
                }, 300);

                _private.$kfCloud.addClass('hide');
            } else {

                _private.playKf(scopeIndex);

                console.log('video loading');
            }
        });
    };

    // 相机第一次移动
    _private.showContent = function (e) {

        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();

        isTouch = true;

        window.musicSprite.pause();

        _private.$btnShow.off('touchstart', _private.showContent);

        // video
        if (!videoInit) {

            _private.videoInit(sceneView.scopeIndex);

            videoInit = true;
        } else {

            window.txplayer.pause();

            window.txplayer.$video[0].currentTime = _Config2.default.data[sceneView.scopeIndex].videoTimeline.start;
        }

        _private.startTime = new Date().getTime();

        sceneView.controls.enabled = false;

        var scopeIndex = sceneView.scopeIndex;

        if (parseInt(sceneView.camera.position.x) === parseInt(sceneView.data[scopeIndex].cameraFar.x) && parseInt(sceneView.camera.position.y) === parseInt(sceneView.data[scopeIndex].cameraFar.y) && parseInt(sceneView.camera.position.z) === parseInt(sceneView.data[scopeIndex].cameraFar.z)) {

            _private.cameraMove(scopeIndex);
        } else {

            TweenLite.to(sceneView.camera.position, 0.6, {
                x: sceneView.data[scopeIndex].cameraFar.x,
                y: sceneView.data[scopeIndex].cameraFar.y,
                z: sceneView.data[scopeIndex].cameraFar.z,
                ease: Linear.easeNone,
                onComplete: function onComplete() {

                    _private.cameraMove(scopeIndex);
                }
            });
        }

        if (textIndex !== scopeIndex) {

            textIndex = scopeIndex;

            sceneView.showText(scopeIndex);
        }

        _private.$parallax.show();

        _private.$btnShow.on('touchend', _private.hideContent);
    };

    // 相机推进
    _private.cameraMove = function (scopeIndex) {

        if (!isTouch) return false;

        _private.moveNear = TweenLite.to(sceneView.camera.position, 0.6, {
            x: sceneView.data[scopeIndex].cameraNear.x,
            y: sceneView.data[scopeIndex].cameraNear.y,
            z: sceneView.data[scopeIndex].cameraNear.z,
            ease: Linear.easeNone,
            onComplete: function onComplete() {}
        });

        _private.timer1 = setTimeout(function () {

            isMove = true;

            _private.$parallax.addClass('show');

            _private.$btnShowText.addClass('hide');

            window.txplayer.ontimeupdate = function (vid, $video) {

                var timeline = _Config2.default.data[sceneView.scopeIndex].videoTimeline;
                // let currentTime = parseInt($video[0].currentTime, 10);
                var currentTime = $video[0].currentTime;

                // console.log(currentTime);
                if (!(timeline.start <= currentTime && currentTime <= timeline.end) && $video[0].currentTime !== 0 && isVideoReady) {

                    // window.txplayer.pause();

                    if ($video[0].currentTime >= timeline.end && isTouch) {
                        $video[0].currentTime = timeline.start;
                        window.txplayer.play();
                        // _private.$backTips.addClass('show');
                    }
                }
            };

            _private.playKf(scopeIndex);
        }, 500);
    };

    // 相机推出
    _private.backMove = function (scopeIndex) {

        _private.$parallax.removeClass('show');

        _private.moveFar = TweenLite.to(sceneView.camera.position, 0.6, {
            x: sceneView.data[scopeIndex].cameraFar.x,
            y: sceneView.data[scopeIndex].cameraFar.y,
            z: sceneView.data[scopeIndex].cameraFar.z,
            ease: Linear.easeNone,
            onComplete: function onComplete() {
                isMove = false;
                _private.$parallax.hide();
                sceneView.controls.enabled = true;
                _private.$btnShow.on('touchstart', _private.showContent);
                _private.startTime = new Date().getTime();
                // _private.kflen = 0;
                sceneView.rotAuto = true;
                window.txplayer.pause();
                window.musicSprite.gotoAndPlay(_Config2.default.data[sceneView.scopeIndex].musicName, function () {}, true);
                _private.$backTips.removeClass('show');
            }
        });
    };

    _private.hideCloud = function (scopeIndex) {

        // Config.data[scopeIndex].$kf.hide();

        _private.$kfCloud.removeClass('hide');

        window.txplayer.pause();

        _private.kfCloud.toFrom(12, 1, 1, function () {

            _private.backMove(scopeIndex);

            _private.$btnEnd.addClass('show');

            _private.$btnShowText.removeClass('hide');
        });

        _private.removeDevEvent();
    };

    _private.hideContent = function (e) {

        _private.$btnShow.off('touchend', _private.hideContent);

        isTouch = false;

        e.stopPropagation && e.stopPropagation();
        e.preventDefault && e.preventDefault();

        var endTime = new Date().getTime();

        var scopeIndex = sceneView.scopeIndex;

        if (endTime - _private.startTime > 470 && isMove) {

            if (_private.kflen >= 1) {

                _private[_Config2.default.data[scopeIndex].kfName].toFrom(_private.kflen, 1, 1, function () {

                    _private.hideCloud(scopeIndex);
                });
            } else {

                _private.hideCloud(scopeIndex);
            }
        } else {

            if (_private.moveNear) {
                _private.moveNear.pause();
                clearTimeout(_private.timer1);
                _private.timer1 = null;
            }

            _private.backMove(scopeIndex);
        }
    };

    _private.addDevEvent = function () {

        // window.addEventListener('deviceorientation', _private.parallaxHandler);

    };

    _private.removeDevEvent = function () {

        // window.removeEventListener('deviceorientation', _private.parallaxHandler);

    };

    _private.parallaxHandler = function (e) {

        if (e.gamma > 90) {
            gamma = e.gamma - 180;
        } else {
            gamma = e.gamma;
        }
        gamma = Math.min(20, Math.max(-20, Math.floor(gamma)));

        _private.$parallax.css('-webkit-transform', 'translate3d(0, 0, -100px) scale(1.08) rotateY(' + gamma + 'deg)');
    };

    _private.reset = function () {

        _private.$indexBox.removeClass('show hide');
        _private.$btnShow.removeClass('show hide');
        _private.$btnEnd.removeClass('show hide');
    };

    _private.hide = function (e) {

        e.preventDefault && e.preventDefault();

        sceneView.controls.enabled = false;

        sceneView.isEnd = true;

        window.musicSprite.pause();

        _Config2.default.bgMusic.play();

        _private.$indexBox.addClass('hide');
        _private.$btnShow.addClass('hide');
        _private.$btnEnd.addClass('hide');

        sceneView.$el.addClass('animate');

        _that.hide();

        setTimeout(function () {
            _private.reset();
        }, 500);

    };

    // 显示
    _that.show = function () {
        _private.$pageEl.show();

        setTimeout(function () {

            _private.$pageEl.addClass('show');

            TweenLite.to(sceneView.camera.position, 1, {
                z: -28,
                // ease: Linear,
                onComplete: function onComplete() {
                    _private.$indexBox.addClass('show');
                    sceneView.controls.enabled = true;
                    sceneView.rotAuto = true;
                }
            });

            TweenLite.to(sceneView.group.rotation, 1, {
                y: 0,
                // ease: Linear,
                onComplete: function onComplete() {}
            });
        }, 0);
    };

    // 隐藏
    _that.hide = function () {
        _that.onhide && _that.onhide();
        // _private.$pageEl.hide();
    };

    _that.again = function () {

        _Config2.default.bgMusic.pause();

        window.musicSprite.gotoAndPlay(_Config2.default.data[sceneView.scopeIndex].musicName, function () {}, true);

        _private.$indexBox.addClass('show');
        _private.$btnShow.addClass('show');
        _private.$btnEnd.addClass('show');

        sceneView.isEnd = false;

        sceneView.controls.enabled = true;

        sceneView.$el.removeClass('animate');
    };

    _private.init();
};

export { IndexViewController };