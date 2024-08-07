/*! @name @samueleastdev/videojs-settings-menu @version 0.0.9 @license MIT */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t(require("video.js")))
        : "function" == typeof define && define.amd
        ? define(["video.js"], t)
        : ((e = "undefined" != typeof globalThis ? globalThis : e || self).videojsSettingsMenu = t(e.videojs));
})(this, function (e) {
    "use strict";
    function t(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
    }
    var n = t(e);
    function s(e, t, n) {
        return (
            e(
                (n = {
                    path: t,
                    exports: {},
                    require: function (e, t) {
                        return (function () {
                            throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
                        })(null == t && n.path);
                    },
                }),
                n.exports
            ),
            n.exports
        );
    }
    var l = s(function (e) {
            (e.exports = function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            }),
                (e.exports.__esModule = !0),
                (e.exports.default = e.exports);
        }),
        a = s(function (e) {
            function t(n, s) {
                return (
                    (e.exports = t =
                        Object.setPrototypeOf ||
                        function (e, t) {
                            return (e.__proto__ = t), e;
                        }),
                    (e.exports.__esModule = !0),
                    (e.exports.default = e.exports),
                    t(n, s)
                );
            }
            (e.exports = t), (e.exports.__esModule = !0), (e.exports.default = e.exports);
        }),
        o = s(function (e) {
            (e.exports = function (e, t) {
                (e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), a(e, t);
            }),
                (e.exports.__esModule = !0),
                (e.exports.default = e.exports);
        }),
        i = n.default.getPlugin("plugin"),
        r = n.default.getComponent("Component"),
        u = n.default.getComponent("MenuButton"),
        d = {
            items: ["AudioTrackButton", "SubsCapsButton", "PlaybackRateMenuButton", "RatesButton"],
            languages: {
                settings: "Settings",
                loading: "Loading",
                back: "Back",
                captions_off: "Captions Off",
                default_audio: "Default Audio",
                audio: "Audio",
                subtitles: "Subtitles",
                chapters: "Chapters",
                speed: "Speed",
                quality: "Quality",
            },
        },
        c = (function (e) {
            function t(t, s) {
                var a;
                a = e.call(this, t) || this;
                var o = l(a);
                return (
                    (o.playerId = a.player.id()),
                    (a.options = n.default.mergeOptions(d, s)),
                    a.player.ready(function () {
                        a.player.addClass("vjs-settings-menu"), a.buildUI(), (n.default.browser.IS_IOS || n.default.browser.IS_ANDROID) && a.mobileBuildUI();
                    }),
                    a.player.on("playbackRateSwitched", function (e) {
                        var t = e.target.player.playbackRateSwitched;
                        this.getChild("controlBar")
                            .getChild("settingsMenuButton")
                            .controlText(t.height + "p, " + o.formatBps(t.bitrate));
                    }),
                    a.player.on("userinactive", function () {
                        document
                            .getElementById(o.playerId)
                            .querySelectorAll(".vjs-menu")
                            .forEach(function (e) {
                                e.classList.remove("vjs-lock-open");
                            });
                    }),
                    a.player.on("click", function (e) {
                        "VIDEO" === e.target.tagName &&
                            document
                                .getElementById(o.playerId)
                                .querySelectorAll(".vjs-menu")
                                .forEach(function (e) {
                                    e.classList.remove("vjs-lock-open");
                                });
                    }),
                    a.player.on("loadstart", function (e) {
                        this.one("canplaythrough", function (e) {
                            o.removeElementsByClass("vjs-setting-menu-clear"), n.default.browser.IS_IOS || n.default.browser.IS_ANDROID ? o.mobileBuildTopLevelMenu() : o.buildTopLevelMenu();
                        });
                    }),
                    a
                );
            }
            o(t, e);
            var s = t.prototype;
            return (
                (s.buildUI = function () {
                    var e = this,
                        t = (function (t) {
                            function s(n, s) {
                                var a;
                                (a = t.call(this, n, s) || this).addClass("vjs-settings-menu"), a.controlText(e.options.languages.loading);
                                var o = l(a);
                                return (
                                    e.player.one("canplaythrough", function (t) {
                                        o.controlText(e.options.languages.settings);
                                    }),
                                    (a.menu.contentEl_.id = e.playerId + "-vjs-settings-menu-default"),
                                    a
                                );
                            }
                            return (
                                o(s, t),
                                (s.prototype.handleClick = function () {
                                    n.default.browser.IS_IOS || n.default.browser.IS_ANDROID
                                        ? (e.player.getChild("settingsMenuMobileModal").el().style.display = "block")
                                        : (this.el().classList.toggle("vjs-toogle-btn"), this.menu.el().classList.toggle("vjs-lock-open"));
                                }),
                                s
                            );
                        })(u);
                    n.default.registerComponent("settingsMenuButton", t),
                        this.player.getChild("controlBar").addChild("settingsMenuButton"),
                        this.player.getChild("controlBar").getChild("fullscreenToggle") &&
                            this.player.getChild("controlBar").el().insertBefore(this.player.getChild("controlBar").getChild("settingsMenuButton").el(), this.player.getChild("controlBar").getChild("fullscreenToggle").el());
                }),
                (s.buildTopLevelMenu = function () {
                    var e = this,
                        t = e.player.getChild("controlBar").getChild("settingsMenuButton");
                    t.menu;
                    var n = t.menu.contentEl_;
                    (n.innerHTML = ""), n.classList.add("vjs-sm-top-level");
                    var s = document.createElement("li");
                    s.className = "vjs-sm-top-level-header";
                    var l = document.createElement("span");
                    (l.innerHTML = e.options.languages.settings), s.appendChild(l), n.appendChild(s);
                    var a = [],
                        o = !1,
                        i = !1;
                    e.player.textTracks().tracks_ &&
                        e.player.textTracks().tracks_.forEach(function (e) {
                            "chapters" === e.kind && (o = !0), ("subtitles" !== e.kind && "captions" !== e.kind) || (i = !0);
                        }),
                        o || a.push("ChaptersButton"),
                        i || a.push("SubsCapsButton"),
                        e.options.items
                            .filter(function (e) {
                                return !a.includes(e);
                            })
                            .forEach(function (t) {
                                if (e.player.getChild("controlBar").getChild(t)) {
                                    var s = e.setInitialStates(t);
                                    e.player.getChild("controlBar").getChild(t).addClass("vjs-hide-settings-menu-item");
                                    var l = document.createElement("li");
                                    (l.innerHTML = s.language), l.setAttribute("data-component", t.toLowerCase()), (l.className = "vjs-sm-list-item");
                                    var a = document.createElement("i");
                                    (a.className = "setting-menu-list-arrow setting-menu-list-arrow-right"), l.appendChild(a);
                                    var o = document.createElement("span");
                                    (o.id = e.playerId + "-setting-menu-child-span-" + t.toLowerCase()),
                                        (o.innerHTML = s.default),
                                        l.appendChild(o),
                                        n.appendChild(l),
                                        setTimeout(
                                            function () {
                                                e.buildMenuList(t);
                                            },
                                            "ChaptersButton" === t ? 1e3 : 0
                                        );
                                }
                            });
                    var r = document.querySelectorAll(".vjs-sm-list-item");
                    Array.from(r).forEach(function (t) {
                        t.addEventListener("click", function (t) {
                            document.querySelectorAll(".vjs-sm-top-level").forEach(function (e) {
                                e.classList.add("vjs-hidden");
                            });
                            var n = document.getElementById(e.playerId + "-setting-menu-child-menu-" + this.getAttribute("data-component"));
                            n.classList.remove("vjs-hidden"), n.classList.add("vjs-lock"), t.preventDefault();
                        });
                    });
                }),
                (s.mobileBuildUI = function () {
                    var e = (function (e) {
                        function t(t, n) {
                            return e.call(this, t, n) || this;
                        }
                        return (
                            o(t, e),
                            (t.prototype.createEl = function () {
                                return n.default.createEl("div", { className: "vjs-settings-menu-mobile" });
                            }),
                            t
                        );
                    })(r);
                    n.default.registerComponent("settingsMenuMobileModal", e), n.default.dom.prependTo(this.player.addChild("settingsMenuMobileModal").el(), document.body);
                }),
                (s.mobileBuildTopLevelMenu = function () {
                    var e = this,
                        t = this,
                        n = this.player.getChild("settingsMenuMobileModal"),
                        s = document.createElement("ul");
                    (s.className = "vjs-sm-mob-top-level vjs-setting-menu-clear"), n.el().appendChild(s);
                    var l = document.createElement("li");
                    (l.className = "vjs-setting-menu-mobile-top-header"), (l.innerHTML = this.options.languages.settings), s.appendChild(l);
                    var a = [],
                        o = !1,
                        i = !1;
                    t.player.textTracks().tracks_ &&
                        t.player.textTracks().tracks_.forEach(function (e) {
                            "chapters" === e.kind && (o = !0), ("subtitles" !== e.kind && "captions" !== e.kind) || (i = !0);
                        }),
                        o || a.push("ChaptersButton"),
                        i || a.push("SubsCapsButton"),
                        t.options.items
                            .filter(function (e) {
                                return !a.includes(e);
                            })
                            .forEach(function (e) {
                                if (t.player.getChild("controlBar").getChild(e)) {
                                    t.player.getChild("controlBar").getChild(e).addClass("vjs-hide-settings-menu-item");
                                    var l = t.setInitialStates(e),
                                        a = document.createElement("li");
                                    a.setAttribute("data-component", e.toLowerCase()), (a.innerHTML = l.language), (a.className = "vjs-sm-top-level-item");
                                    var o = document.createElement("span");
                                    (o.id = t.playerId + "-setting-menu-child-span-" + e.toLowerCase()),
                                        (o.innerHTML = l.default),
                                        a.appendChild(o),
                                        s.appendChild(a),
                                        setTimeout(
                                            function () {
                                                t.mobileBuildSecondLevelMenu(e, n.el());
                                            },
                                            "ChaptersButton" === e ? 1e3 : 0
                                        );
                                }
                            });
                    var r = document.querySelectorAll(".vjs-sm-top-level-item");
                    Array.from(r).forEach(function (e) {
                        e.addEventListener("click", function (e) {
                            e.preventDefault();
                            var n = this.getAttribute("data-component");
                            document.querySelectorAll(".vjs-sm-mob-top-level").forEach(function (e) {
                                e.classList.add("vjs-hidden");
                            }),
                                document.getElementById(t.playerId + "-mb-comp-" + n).classList.remove("vjs-hidden");
                        });
                    });
                    var u = document.createElement("li");
                    (u.innerHTML = "Close"),
                        (u.onclick = function (t) {
                            e.player.getChild("settingsMenuMobileModal").el().style.display = "none";
                        }),
                        (u.className = "setting-menu-footer-default"),
                        s.appendChild(u);
                }),
                (s.mobileBuildSecondLevelMenu = function (e, t) {
                    var n = this;
                    if ((this.player.getChild("controlBar").getChild("settingsMenuButton"), this.player.getChild("controlBar").getChild(e))) {
                        for (var s = this.player.getChild("controlBar").getChild(e).menu.contentEl_, l = 0; l < s.children.length; l++) {
                            var a = s.children[l].getAttribute("class");
                            ("setting-menu-header" !== a && "vjs-menu-title" !== a) || s.children[l].remove();
                        }
                        (s.id = n.playerId + "-mb-comp-" + e.toLowerCase()), s.classList.add("vjs-hidden"), s.classList.add("vjs-sm-mob-second-level"), s.classList.add("vjs-setting-menu-clear");
                        var o = document.createElement("li");
                        (o.className = "setting-menu-header"), o.setAttribute("data-component", e.toLowerCase());
                        var i = document.createElement("i");
                        (i.className = "setting-menu-list-arrow setting-menu-list-arrow-left"),
                            o.appendChild(i),
                            (o.onclick = function (e) {
                                document.querySelectorAll(".vjs-sm-mob-top-level").forEach(function (e) {
                                    e.classList.remove("vjs-hidden");
                                }),
                                    document.querySelectorAll(".vjs-menu-content").forEach(function (e) {
                                        e.classList.add("vjs-hidden");
                                    });
                                var t = document.getElementById(n.playerId + "-mb-comp-" + this.getAttribute("data-component")).querySelectorAll(".vjs-selected");
                                void 0 !== t && t.length > 0 && t[0].textContent && (document.getElementById(n.playerId + "-setting-menu-child-span-" + this.getAttribute("data-component")).innerText = n.cleanDefault(t[0].textContent)),
                                    document.querySelectorAll(".vjs-sm-list-item").forEach(function (e) {
                                        e.classList.remove("vjs-hidden");
                                    }),
                                    document.querySelectorAll(".vjs-menu-content").forEach(function (e) {
                                        e.classList.value.includes("vjs-lock") && (e.classList.remove("vjs-lock"), e.classList.add("vjs-hidden"));
                                    });
                            });
                        var r = document.createElement("span");
                        (r.innerHTML = n.options.languages.back), o.appendChild(r), s.insertBefore(o, s.firstChild), t.appendChild(s);
                    }
                }),
                (s.buildMenuList = function (e) {
                    var t = this,
                        n = this.player.getChild("controlBar").getChild("settingsMenuButton");
                    if (this.player.getChild("controlBar").getChild(e)) {
                        for (var s = this.player.getChild("controlBar").getChild(e).menu.contentEl_, l = 0; l < s.children.length; l++) {
                            var a = s.children[l].getAttribute("class");
                            ("setting-menu-header" !== a && "vjs-menu-title" !== a) || s.children[l].remove();
                        }
                        (s.id = t.playerId + "-setting-menu-child-menu-" + e.toLowerCase()), s.classList.add("vjs-hidden"), s.classList.add("vjs-setting-menu-clear");
                        var o = document.createElement("li");
                        (o.className = "setting-menu-header"), o.setAttribute("data-component", e.toLowerCase());
                        var i = document.createElement("i");
                        (i.className = "setting-menu-list-arrow setting-menu-list-arrow-left"),
                            o.appendChild(i),
                            (o.onclick = function (e) {
                                var n = document.getElementById(t.playerId + "-setting-menu-child-menu-" + this.getAttribute("data-component")).querySelectorAll(".vjs-selected");
                                void 0 !== n && n.length > 0 && n[0].textContent && (document.getElementById(t.playerId + "-setting-menu-child-span-" + this.getAttribute("data-component")).innerText = t.cleanDefault(n[0].textContent)),
                                    document.querySelectorAll(".vjs-sm-top-level").forEach(function (e) {
                                        e.classList.remove("vjs-hidden");
                                    }),
                                    document.querySelectorAll(".vjs-menu-content").forEach(function (e) {
                                        e.classList.value.includes("vjs-lock") && (e.classList.remove("vjs-lock"), e.classList.add("vjs-hidden"));
                                    });
                            });
                        var r = document.createElement("span");
                        (r.innerHTML = t.options.languages.back), o.appendChild(r), s.insertBefore(o, s.firstChild), n.menu.el().appendChild(s);
                    }
                }),
                (s.setInitialStates = function (e) {
                    switch (e) {
                        case "RatesButton":
                            return { default: "auto", language: this.options.languages.quality };
                        case "PlaybackRateMenuButton":
                            return { default: "1x", language: this.options.languages.speed };
                        case "ChaptersButton":
                            return { default: "", language: this.options.languages.chapters };
                        case "AudioTrackButton":
                            for (var t = this.player.audioTracks(), n = this.options.languages.defaultAudio, s = t.length; s--; ) t[s].enabled && (n = t[s].label);
                            return { default: n, language: this.options.languages.audio };
                        case "SubsCapsButton":
                            for (var l = this.player.textTracks(), a = this.options.languages.captions_off, o = l.length; o--; ) "subtitles" === l[o].kind && "showing" === l[o].mode && (a = l[o].label);
                            return { default: a, language: this.options.languages.subtitles };
                        default:
                            return { default: "", language: "Menu" };
                    }
                }),
                (s.removeElementsByClass = function (e) {
                    document.querySelectorAll(".vjs-sm-top-level").forEach(function (e) {
                        e.classList.remove("vjs-hidden");
                    });
                    for (var t = document.getElementsByClassName(e); t.length > 0; ) t[0].parentNode.removeChild(t[0]);
                }),
                (s.cleanDefault = function (e) {
                    var t = (e = e.replace(/\s\s+/g, " ")).indexOf(",");
                    return (e = (e = e.substring(0, -1 != t ? t : e.length)).replace(/(<([^>]+)>)/gi, ""));
                }),
                (s.formatBps = function (e) {
                    var t = -1;
                    do {
                        (e /= 1024), t++;
                    } while (e > 1024);
                    return Math.max(e, 0.1).toFixed(1) + [" kbps", " Mbps", " Gbps", " Tbps", "Pbps", "Ebps", "Zbps", "Ybps"][t];
                }),
                t
            );
        })(i);
    return (c.defaultState = {}), (c.VERSION = "0.0.9"), n.default.registerPlugin("settingsMenu", c), c;
});
