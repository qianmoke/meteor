var _Preload = require('./Preload');
var _MediaSprite = require('./MediaSprite');
var Config = {};

// ajax请求链接
Config.requireUrl = '';

// 图片路径前缀
//  Config.imgPath = 'http://qrs.treedom.cn/streetgame/';
Config.imgPath = './dist/img/';

Config.meteorImg = Config.imgPath + 'bg_meteor.png';

Config.jumpLink = 'https://kandian.qq.com/mqq/activity/html/qqexplore.html?_wv=3&_bid=2464&x5PreFetch=1';

// 默认分享语
Config.defShare = {
    image_url: 'https://wa.qq.com/xplan/earth/dist/img/share.jpg',
    title: '这可能是地球上最美的h5',
    desc: '我们终将和世界的美好相遇',
    share_url: 'https://wa.qq.com/xplan/earth/index.html?_wv=5&_wwv=4'
};

Config.scale = 1;

// Config.videoVid = 'b0023mc8gur';
Config.videoVid = 'r0023hb5s6k';

Config.Preload = _Preload2.default;

Config.bgMusic = new Audio(Config.imgPath + 'music_bg.mp3');
Config.bgMusic.loop = true;

Config.loadDot = [{
    speed: 0.01,
    radiusX: 150,
    radiusY: 45,
    revise: 0
}, {
    speed: 0.02,
    radiusX: 100,
    radiusY: 35,
    revise: 10
}];

// 场景配置
Config.data = [{
    index: 0,
    textImg: '',
    bgPos: {
        x: 0,
        y: 0
    },
    contentImg: '',
    parallaxImg: [],
    parallaxBg: '',
    parallaxClass: '',
    dotPosition: {
        x: -1.32,
        y: -5.05,
        z: 0.98
    },
    dotImgName: 'ANTARCTICA',
    scope: [0, 266],
    cameraFar: {
        x: -7.88,
        y: -27.00,
        z: 1.87
    },
    cameraNear: {
        x: -1.39,
        y: -4.75,
        z: 0.33
    },
    longitude: '',
    latitude: '',
    musicName: 'music_antarctica',
    name: '冰川',
    kfName: 'kfAntarctica',
    bufferName: 'kf_antarctica',
    $kf: $('.ns-parallax .kf-antarctica'),
    videoTimeline: {
        start: 50.90,
        end: 69.00
    }
}, {
    index: 1,
    textImg: '',
    bgPos: {
        x: 0,
        y: -38
    },
    contentImg: '',
    parallaxImg: [],
    parallaxBg: '',
    parallaxClass: '',
    dotPosition: {
        x: 0.550,
        y: 0.024,
        z: 5.39
    },
    dotImgName: 'GALAPAGOS',
    scope: [266, 266 + 409],
    cameraFar: {
        x: -0.60,
        y: 0.14,
        z: 28.21
    },
    cameraNear: {
        x: -0.10,
        y: 0.024,
        z: 4.99
    },
    longitude: '',
    latitude: '',
    musicName: 'music_galapagos',
    name: '加拉帕戈斯',
    kfName: 'kfGalapagos',
    bufferName: 'kf_galapagos',
    $kf: $('.ns-parallax .kf-galapagos'),
    videoTimeline: {
        start: 22.00,
        end: 37.43
    }
}, {
    index: 2,
    textImg: '',
    bgPos: {
        x: 0,
        y: -38 * 2
    },
    contentImg: '',
    parallaxImg: [],
    parallaxBg: '',
    parallaxClass: '',
    dotPosition: {
        x: 1.880,
        y: 5.09,
        z: 0.89
    },
    dotImgName: 'GREENLAND',
    scope: [266 + 409, 266 + 409 * 2],
    cameraFar: {
        x: 7.24,
        y: 26.52,
        z: 7.06
    },
    cameraNear: {
        x: 1.30,
        y: 4.66,
        z: 1.24
    },
    longitude: '',
    latitude: '',
    musicName: 'music_greenland',
    name: '格陵兰岛',
    kfName: 'kfGreenland',
    bufferName: 'kf_greenland',
    $kf: $('.ns-parallax .kf-greenland'),
    videoTimeline: {
        start: 40.20,
        end: 47.80
    }
}, {
    index: 3,
    textImg: '',
    bgPos: {
        x: 0,
        y: -38 * 4
    },
    contentImg: '',
    parallaxImg: [],
    parallaxBg: '',
    parallaxClass: '',
    dotPosition: {
        x: 4.6,
        y: -1.29,
        z: -2.42
    },
    dotImgName: 'NAMIBIA',
    scope: [266 + 409 * 2, 266 + 409 * 3],
    cameraFar: {
        x: 26.46,
        y: -6.94,
        z: -9.96
    },
    cameraNear: {
        x: 4.52,
        y: -1.30,
        z: -1.63
    },
    longitude: '',
    latitude: '',
    musicName: 'music_namibia',
    name: '非洲沙海',
    kfName: 'kfNamibia',
    bufferName: 'kf_namibia',
    $kf: $('.ns-parallax .kf-namibia'),
    videoTimeline: {
        start: 2.80,
        end: 8.40
    }
}, {
    index: 4,
    textImg: '',
    bgPos: {
        x: 0,
        y: -38 * 3
    },
    contentImg: '',
    parallaxImg: [],
    parallaxBg: '',
    parallaxClass: '',
    dotPosition: {
        x: -4.390,
        y: 2.660,
        z: -2.410
    },
    dotImgName: 'MARIANA',
    scope: [266 + 409 * 3, 266 + 409 * 4],
    cameraFar: {
        x: -20.03,
        y: 13.47,
        z: -14.61
    },
    cameraNear: {
        x: -3.54,
        y: 2.38,
        z: -2.58
    },
    longitude: '',
    latitude: '',
    musicName: 'music_mariana',
    name: '马里亚纳',
    kfName: 'kfMariana',
    bufferName: 'kf_mariana',
    $kf: $('.ns-parallax .kf-mariana'),
    videoTimeline: {
        start: 10.80,
        end: 19.10
    }
}];

window.musicSprite = new _MediaSprite.default({
    wrap: '', // 如果没有wrap,直接添加到body
    type: 'audio', // 如果是雪碧音可以填audio, 也可以不填
    src: Config.imgPath + 'music_sprite.mp3',
    classname: 'm-audio',
    timeline: {
        'music_namibia': {
            'start': 0,
            'end': 10.057142857142857,
            'loop': true
        },
        'music_galapagos': {
            'start': 12,
            'end': 22.057142857142857,
            'loop': true
        },
        'music_mariana': {
            'start': 24,
            'end': 34.10938775510204,
            'loop': true
        },
        'music_antarctica': {
            'start': 36,
            'end': 46.05714285714286,
            'loop': true
        },
        'music_greenland': {
            'start': 48,
            'end': 58.10938775510204,
            'loop': true
        }
    }
});

// 预加载的图片
Config.pageImgs = {
    imgs: [{
        name: 'bg_index_cover',
        url: Config.imgPath + 'bg_index_cover.png'
    }, {
        name: 'bg_text_deg',
        url: Config.imgPath + 'bg_text_deg.png'
    }, {
        name: 'bg_tips',
        url: Config.imgPath + 'bg_tips.png'
    }, {
        name: 'btn_show',
        url: Config.imgPath + 'btn_show.png'
    }, {
        name: 'btn_show_text',
        url: Config.imgPath + 'btn_show_text.png'
    }, {
        name: 'bg_end_text',
        url: Config.imgPath + 'bg_end_text.png'
    }, {
        name: 'bg_end_text1',
        url: Config.imgPath + 'bg_end_text1.png'
    }, {
        name: 'btn_link',
        url: Config.imgPath + 'btn_link.png'
    }, {
        name: 'btn_again',
        url: Config.imgPath + 'btn_again.png'
    }],
    sprites: [],
    textures: [{
        name: 'earth_cover',
        url: Config.imgPath + 'earth4.jpg'
    }, {
        name: 'earth_spec',
        url: Config.imgPath + 'earth_spec.jpg'
    }, {
        name: 'earth_bump',
        url: Config.imgPath + 'earth_bump.jpg'
    }, {
        name: 'earth_cloud',
        url: Config.imgPath + 'earth_cloud.png'
    }, {
        name: 'ANTARCTICA',
        url: Config.imgPath + 'i_antarctica.png'
    }, {
        name: 'MARIANA',
        url: Config.imgPath + 'i_mariana.png'
    }, {
        name: 'NAMIBIA',
        url: Config.imgPath + 'i_namibia.png'
    }, {
        name: 'GREENLAND',
        url: Config.imgPath + 'i_greenland.png'
    }, {
        name: 'GALAPAGOS',
        url: Config.imgPath + 'i_galapagos.png'
    }],
    keyimgs: [{
        el: $('.ns-parallax .kf-cloud'),
        pathPrefix: Config.imgPath,
        postfix: 'jpg'
    }]
};

export Config;