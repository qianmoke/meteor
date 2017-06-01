(function() {

	'use strict';

	// import Config from './Config';

	var TD = {};

	// 美林版ajax对应接口
	TD.ajax = function (pm, succback, errorback) {
	    $.ajax({
	        type: pm.type || 'GET',
	        url: pm.url,
	        dataType: 'json',
	        data: pm.data || '',
	        success: function success(data) {
	            if (data.status === 1) {
	                succback && succback(data.data);
	            } else {
	                errorback && errorback(data.message);
	            }
	        },
	        error: function error() {
	            errorback && errorback('网络连接不稳定，请重试或刷新页面！');
	        }
	    });
	};
	// 元素基于屏幕自适应缩放，dom上有data-response属性的元素都会受它影响
	/*
	config = {
	    width: 375,
	    height: 600,
	    type: 'cover' //  'contain'
	}
	return config定义的scale值
	v1 新增，在dom上增加data-type属性，可选内容有"cover"、"contain"
	*/
	TD.responseBody = function (config) {
	    config = config || {};
	    config.width = config.width || 375;
	    config.height = config.height || 600;
	    config.type = config.type || 'cover'; // 'cover'、'contain'

	    var responseList = $('[data-response]');

	    var rate = void 0;
	    var rateCover = void 0;
	    var rateContain = void 0;

	    var responseFn = function responseFn() {
	        var rateX = document.documentElement.clientWidth / config.width;
	        var rateY = document.documentElement.clientHeight / config.height;

	        rateCover = rateX > rateY ? rateX : rateY;
	        rateContain = rateX < rateY ? rateX : rateY;

	        switch (config.type) {
	            case 'cover':
	                rate = rateCover;
	                break;
	            case 'contain':
	                rate = rateContain;
	                break;
	            default:
	                rate = 1;
	        }

	        responseList.each(function () {
	            var type = $(this).attr('data-type');
	            var elRate = void 0;
	            if (type === 'cover') {
	                elRate = rateCover;
	            } else if (type === 'contain') {
	                elRate = rateContain;
	            } else {
	                elRate = rate;
	            }
	            this.style.webkitTransform = 'scale(' + elRate + ')';
	        });
	    };

	    responseFn();

	    $(window).on('resize', function () {
	        responseFn();
	    });

	    return rate;
	};

	// 提示竖屏函数
	TD.portraitTips = function (el) {
	    var portraitFloat = typeof el === 'string' ? $(el) : el;

	    var orientHandler = function orientHandler() {
	        if (window.orientation === 90 || window.orientation === -90) {
	            portraitFloat.show();
	        } else {
	            portraitFloat.hide();
	        }
	    };
	    orientHandler();

	    $(window).on('resize', function () {
	        orientHandler();
	    });
	};

	/*
	检测转屏函数用法
	API：TD.rotateScreen.addListener(callback);// 添加事件侦听
	     TD.rotateScreen.removeListener();// 取消事件侦听

	example:
	TD.rotateScreen.addListener(function (data) {
	    if(data == 1) {
	        console.log('左转屏');
	        TD.rotateScreen.removeListener();// 注销事件侦听
	    }

	    if(data == 2) {
	        console.log('右转屏');
	    }

	    if(data == 3) {
	        console.log('竖屏');
	    }

	    if(data == 4) {
	        console.log('倒屏');
	    }
	})
	*/
	TD.rotateScreen = function () {
	    var rotate = void 0;

	    var add = function add(callback) {

	        rotate = function rotate(e) {
	            if (Math.abs(e.beta) < 15 && e.gamma < -40) {
	                callback && callback(1); // 左转屏
	            }
	            if (Math.abs(e.beta) < 15 && e.gamma > 40) {
	                callback && callback(2); // 右转屏
	            }
	            if (e.beta > 40 && Math.abs(e.gamma) < 15) {
	                callback && callback(3); // 竖屏
	            }
	            if (e.beta < -40 && Math.abs(e.gamma) < 15) {
	                callback && callback(4); // 倒屏
	            }
	        };

	        window.addEventListener('deviceorientation', rotate);
	    };

	    var remove = function remove() {
	        // 解决ios设备会缓存上次移除deviceorientation事件时角度的问题。
	        if (navigator.userAgent.indexOf('Android') > -1) {
	            window.removeEventListener('deviceorientation', rotate);
	        };
	    };

	    return {
	        addListener: add,
	        removeListener: remove
	    };
	}();

	// 网络工具包
	TD.util = {};
	TD.util.getQuery = function (name) {
	    // let _name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var _name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var regex = new RegExp('[\\?&]' + _name + '=([^&#]*)');
	    var results = regex.exec(location.search);
	    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
	TD.util.setCookie = function (name, value, expiredays) {
	    var exdate = new Date();
	    document.cookie = name + '=' + value + ';expires=' + (expiredays === null ? exdate.setDate(exdate.getDate() + expiredays) : exdate.toGMTString()) + ';domain=treedom.cn';
	};
	TD.util.getCookie = function (name) {
	    var cStart = void 0,
	        cEnd = void 0;
	    if (document.cookie.length > 0) {
	        cStart = document.cookie.indexOf(name + '=');
	        if (cStart !== -1) {
	            cStart = cStart + name.length + 1;
	            cEnd = document.cookie.indexOf(';', cStart);
	            if (cEnd === -1) cEnd = document.cookie.length;
	            return unescape(document.cookie.substring(cStart, cEnd));
	        }
	    }
	    return '';
	};

	/*
	判断访问终端和语言
	    使用：
	    if ( TD.browser.versions.qq ) {
	        console.log('go go');
	    }
	    注意BUG：在微信内TD.browser.versions.qq也会返回true；
	    解决：在判断手Q之后加上微信判断；
	*/
	TD.browser = {
	    versions: function () {
	        var u = navigator.userAgent;
	        // let app = navigator.appVersion;
	        return {
	            trident: u.indexOf('Trident') > -1, // IE内核
	            presto: u.indexOf('Presto') > -1, // opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
	            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, // 是否iPad
	            webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
	            weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
	            qq: u.match(/QQ/i) === 'QQ' // 是否QQ
	        };
	    }(),
	    language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};

	module.exports = TD;
})