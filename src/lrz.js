/**
 * lrz3
 * https://github.com/think2011/localResizeIMG3
 * @author think2011
 */
;
(function () {
    window.URL = window.URL || window.webkitURL;
    var userAgent = navigator.userAgent;

    /**
     * 客户端压缩图片
     * @param file
     * @param [options]
     * @param callback
     * @constructor
     */
    function Lrz(file, options, callback) {
        this.file = file;
        this.callback = callback;
        this.defaults = {quality: 7};

        // 适应传入的参数
        if (callback) {
            for (var p in options) {
                this.defaults[p] = options[p];
            }
            if (this.defaults.quality > 10) this.defaults.quality = 10;
        } else {
            this.callback = options;
        }

        this.results = {
            blob: null,
            origin: null,
            base64: null
        };

        this.init();
    }

    Lrz.prototype = {
        constructor: Lrz,

        /**
         * 初始化
         */
        init: function () {
            var that = this;

            that.create(that.file, that.callback);
        },

        /**
         * 生成base64
         * @param file
         * @param callback
         */
        create: function (file, callback) {
            var that = this,
                img = new Image(),
                results = that.results,
                blob = URL.createObjectURL(file);

            img.onload = function () {
                // 获得图片缩放尺寸
                var resize = that.resize(this);

                // 创建canvas
                var canvas = document.createElement('canvas'), ctx;
                canvas.width = resize.w;
                canvas.height = resize.h;
                ctx = canvas.getContext('2d');

                // 生成结果
                results.blob = blob;
                results.origin = file;

                // 兼容 IOS
                if (/iphone/i.test(userAgent)) {
                    try {
                        var mpImg = new MegaPixImage(img);
                        mpImg.render(canvas, {
                            maxWidth: canvas.width,
                            maxHeight: canvas.height,
                            quality: that.defaults.quality
                        });

                        // 调整正确的拍摄方向
                        EXIF.getData(img, function () {
                            var orientationEXIF = (EXIF.pretty(this)).match(/Orientation : (\d)/),
                                orientation = orientationEXIF ? +orientationEXIF[1] : 1;

                            switch (orientation) {
                                case 3:
                                    ctx.rotate(180 * Math.PI / 180);
                                    ctx.drawImage(img, -resize.w, -resize.h, resize.w, resize.h);
                                    break;

                                case 6:
                                    canvas.width = resize.h;
                                    canvas.height = resize.w;
                                    ctx.rotate(90 * Math.PI / 180);
                                    ctx.drawImage(img, 0, -resize.h, resize.w, resize.h);
                                    break;

                                case 8:
                                    canvas.width = resize.h;
                                    canvas.height = resize.w;
                                    ctx.rotate(270 * Math.PI / 180);
                                    ctx.drawImage(img, -resize.w, 0, resize.w, resize.h);
                                    break;

                                default :
                                    ctx.drawImage(img, 0, 0, resize.w, resize.h);

                            }

                            results.base64 = canvas.toDataURL('image/jpeg', that.defaults.quality);
                        });
                    } catch (_error) {
                        alert('未引用mobile补丁，无法生成图片。');
                    }
                }

                // 兼容 Android
                else if (/Android/i.test(userAgent)) {
                    try {
                        var encoder = new JPEGEncoder();

                        ctx.drawImage(img, 0, 0, resize.w, resize.h);
                        results.base64 = encoder.encode(ctx.getImageData(0, 0, canvas.width, canvas.height), that.defaults.quality * 100);
                    } catch (_error) {
                        alert('未引用mobile补丁，无法生成图片。');
                    }
                }

                // 其他情况
                else {
                    ctx.drawImage(img, 0, 0, resize.w, resize.h);
                    results.base64 = canvas.toDataURL('image/jpeg', that.defaults.quality);
                }

                // 执行回调
                callback(results);
            };

            img.src = blob;
        },

        /**
         * 获得图片的缩放尺寸
         * @param img
         * @returns {{w: (Number), h: (Number)}}
         */
        resize: function (img) {
            var w = this.defaults.width,
                h = this.defaults.height,
                scale = img.width / img.height,
                ret = {w: img.width, h: img.height};

            if (w & h) {
                ret.w = w;
                ret.h = h;
            }
            else if (w) {
                ret.w = w;
                ret.h = Math.ceil(w / scale);
            }

            else if (h) {
                ret.w = Math.ceil(h * scale);
                ret.h = h;
            }

            return ret;
        }
    };

    // 暴露接口
    window.lrz = function (file, options, callback) {
        return new Lrz(file, options, callback);
    };
})()