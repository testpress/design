/*! @name videojs-sprite-thumbnails @version 0.5.3 @license MIT */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t(require("video.js"))) : "function" == typeof define && define.amd ? define(["video.js"], t) : ((e = e || self).videojsSpriteThumbnails = t(e.videojs));
})(this, function (e) {
    "use strict";
    var t = (e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e).getPlugin("plugin"),
        o = { url: "", width: 0, height: 0, interval: 1, responsive: 600 },
        r = (function (t) {
            var r, i;
            function n(r, i) {
                var n;
                return (
                    ((n = t.call(this, r) || this).options = e.mergeOptions(o, i)),
                    n.player.ready(function () {
                        !(function (t, o) {
                            var r = o.url,
                                i = o.height,
                                n = o.width,
                                a = o.responsive,
                                p = e.dom || e,
                                s = t.controlBar,
                                u = s.progressControl,
                                l = u.seekBar,
                                d = l.mouseTimeDisplay;
                            if (r && i && n && d) {
                                var c = p.createEl("img", { src: r }),
                                    f = function (e) {
                                        Object.keys(e).forEach(function (t) {
                                            var o = e[t],
                                                r = d.timeTooltip.el().style;
                                            "" !== o ? r.setProperty(t, o) : r.removeProperty(t);
                                        });
                                    },
                                    h = function () {
                                        var e = c.naturalWidth,
                                            u = c.naturalHeight;
                                        if (t.controls() && e && u) {
                                            var h = parseFloat(d.el().style.left);
                                            if (((h = t.duration() * (h / l.currentWidth())), !isNaN(h))) {
                                                h /= o.interval;
                                                var g = t.currentWidth(),
                                                    m = a && g < a ? g / a : 1,
                                                    v = e / n,
                                                    b = n * m,
                                                    y = i * m,
                                                    x = Math.floor(h % v) * -b,
                                                    k = Math.floor(h / v) * -y,
                                                    j = e * m + "px " + u * m + "px",
                                                    w = p.getBoundingClientRect(s.el()).top,
                                                    O = p.getBoundingClientRect(l.el()).top,
                                                    P = -y - Math.max(0, O - w);
                                                f({
                                                    width: b + "px",
                                                    height: y + "px",
                                                    "background-image": "url(" + r + ")",
                                                    "background-repeat": "no-repeat",
                                                    "background-position": x + "px " + k + "px",
                                                    "background-size": j,
                                                    top: P + "px",
                                                    color: "#fff",
                                                    "text-shadow": "1px 1px #000",
                                                    border: "2px solid #fff",
                                                    margin: "0 1px",
                                                });
                                            }
                                        }
                                    };
                                f({ width: "", height: "", "background-image": "", "background-repeat": "", "background-position": "", "background-size": "", top: "", color: "", "text-shadow": "", border: "", margin: "" }),
                                    u.on("mousemove", h),
                                    u.on("touchmove", h),
                                    t.addClass("vjs-sprite-thumbnails");
                            }
                        })(n.player, n.options);
                    }),
                    n
                );
            }
            return (i = t), ((r = n).prototype = Object.create(i.prototype)), (r.prototype.constructor = r), (r.__proto__ = i), n;
        })(t);
    return (r.defaultState = {}), (r.VERSION = "0.5.3"), e.registerPlugin("spriteThumbnails", r), r;
});
