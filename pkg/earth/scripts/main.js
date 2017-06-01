(function (){
	var _IndexViewController = require('./IndexViewController');
	var _Config = require('./Config');
	require('./lib/zepto.min.js');

	// 页面级对象池
	var pagePool = {
	    loadView: null,
	    indexView: null,
	    endView: null
	};
	var init = function init() {
	    // index页面
	    var indexPageBack = function indexPageBack() {
	        pagePool.indexView = pagePool.indexView || new _IndexViewController.default();
	        var indexView = pagePool.indexView;
	        indexView.show();
	        indexView.onhide = endPageBack;
	    };
	};

	var canvas = document.createElement('canvas');
	var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	if (gl) {
	    init();
	} else {
	    window.location.href = _Config.default.jumpLink;
	}
}) ();