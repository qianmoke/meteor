(function(module, exports) {

	'use strict';

	/*
	*
	***  How to use ***

	** style **
	.m-video{
	  position: absolute;
	  z-index: 0;
	  width: 1px;
	  height: 1px;
	}

	** 初始化 **
	let MediaSprite = new TD.MediaSprite({
	  wrap: '#videoWrap',   //如果没有wrap,直接添加到body
	  type: 'video',         //如果是雪碧音可以填audio, 也可以不填
	  src: 'http://hymm.treedom.cn/sound/bg.mp3',
	  classname: '.m-video'
	  timeline: {
	    'first': {
	       begin: 0.0,
	       end: 6.0
	    },
	    'second': {
	      begin: 10.0,
	      end: 15.0
	    }
	  }
	});

	** gotoAndPlay() **
	 @param {string} 雪碧音的命名
	 @param {function} 回调函数, 函数参数为雪碧音名字
	 @param {bool} 是否循环播放

	 mediaSprite.play('first', function (name) {
	 console.log(name + ' end');
	 }, true);

	 */

	var MediaSprite = function MediaSprite(config) {

	    var _config = config;
	    var media = null;
	    var domWrap = config.wrap ? document.querySelector(config.wrap) : null;
	    var isInit = false;
	    var _currentHandler = null;

	    var resizeVideo = function resizeVideo(config) {

	        config = config || {};
	        config.width = config.width || 750;
	        config.height = config.height || 1200;
	        config.type = config.type || 'contain'; // 'cover'、'contain'
	        // console.log(config);
	        console.log('resizeVideo');

	        var resizeGo = function resizeGo() {

	            if (this.currentTime > 0) {
	                var width = config.width / 100 + 'rem';

	                var height = config.height / 100 + 'rem';

	                if (config.type === 'cover') {
	                    media.style.top = '50%';
	                    media.style.left = '50%';
	                    media.style.width = width;
	                    media.style.height = height;
	                    media.style.margin = '-6.83rem 0 0 -3.75rem';
	                } else {
	                    media.style.width = '100%';
	                    media.style.height = '100%';
	                }

	                media.removeEventListener('timeupdate', resizeGo);

	                media.currentTime = 0;
	            }
	        };

	        media.addEventListener('timeupdate', resizeGo);
	    };

	    var _createMedia = function _createMedia() {

	        if (_config.type === 'video') {

	            media = document.createElement('video');

	            media.setAttribute('webkit-playsinline', '');
	            media.setAttribute('playsinline', '');
	            media.setAttribute('preload', 'preload');
	            media.className = _config.classname;
	        } else {
	            media = document.createElement('audio');
	            media.className = _config.classname;
	        }

	        media.src = _config.src;

	        media.id = 'spriteMedia' + Math.floor(Math.random() * 100000);

	        if (domWrap) {
	            domWrap.querySelector('.wrap') ? domWrap.querySelector('.wrap').appendChild(media) : domWrap.appendChild(media);
	            domWrap.style.zIndex = 0;
	        } else {
	            document.body.appendChild(media);
	        }
	    };

	    var gotoAndPlay = function gotoAndPlay(name, callback, loop) {

	        var begin = _config.timeline[name].start;
	        var end = _config.timeline[name].end;

	        // console.log(name, begin, end);

	        media.currentTime = begin;

	        if (_config.type === 'video') {
	            media.style.visibility = 'visible';
	        }

	        if (!isInit) {

	            if (_config.type === 'video') resizeVideo();

	            isInit = true;
	        }

	        var playHandler = function playHandler() {

	            if (this.currentTime >= end) {

	                if (loop) {
	                    media.currentTime = begin;
	                } else {

	                    this.pause();

	                    if (domWrap) {
	                        domWrap.style.zIndex = 0;
	                    } else {
	                        media.style.zIndex = 0;
	                    }

	                    // media.style.visibility = 'hidden';
	                    media.removeEventListener('timeupdate', playHandler);

	                    callback && callback(name);
	                }
	            }
	        };

	        media.removeEventListener('timeupdate', _currentHandler);

	        media.addEventListener('timeupdate', playHandler);

	        // 0延时将plpy()请求置于队列末位消除回调里直接play的报错，by————xsy
	        setTimeout(function () {
	            media.play();
	            if (domWrap) {
	                domWrap.style.zIndex = 99;
	            } else {
	                media.style.zIndex = 99;
	            }
	        }, 0);

	        _currentHandler = playHandler;
	    };

	    var _init = function _init() {

	        _createMedia();
	    };

	    var pause = function pause() {
	        media.pause();
	    };

	    var play = function play() {
	        media.play();
	    };

	    var stop = function stop() {
	        media.pause();
	        media.style.visibility = 'hidden';
	    };

	    _init();

	    return {
	        gotoAndPlay: gotoAndPlay,
	        pause: pause,
	        play: play,
	        dom: media,
	        stop: stop
	    };
	};

	module.exports = MediaSprite;

/***/ })