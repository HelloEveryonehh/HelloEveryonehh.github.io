var heo = {
    //是否在首页
    is_Post: function() {
        return window.location.href.indexOf("/posts/") >= 0
    },

  //更改主题色
  changeThemeColor: function(e) {
        null !== document.querySelector('meta[name="theme-color"]') && document.querySelector('meta[name="theme-color"]').setAttribute("content", e)
    },
    initThemeColor: function() {
        if (heo.is_Post()) {
            if (0 === (window.scrollY || document.documentElement.scrollTop)) {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--heo-main");
                heo.changeThemeColor(e)
            } else {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--heo-background");
                heo.changeThemeColor(e)
            }
        } else {
            let e = getComputedStyle(document.documentElement).getPropertyValue("--heo-background");
            heo.changeThemeColor(e)
        }
    }
}

function checkOpen() {}
function coverColor() {
    var e = document.getElementById("post-cover")?.src;
    void 0 !== e ? RGBaster.colors(e, {
        paletteSize: 30,
        exclude: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(254,254,254)"],
        success: function(e) {
            if ("rgb(66,90,239)" != e.dominant) {
                const o = e.dominant.match(/\d+/g);
                var t = `rgb(${o[0]},${o[1]},${o[2]})`;
                "light" == getContrastYIQ(colorHex(t)) && (t = LightenDarkenColor(colorHex(t), -40)),
                    document.styleSheets[0].addRule(":root", "--heo-main:" + t + "!important"),
                    document.styleSheets[0].addRule(":root", "--heo-main-op:" + t + "23!important"),
                    document.styleSheets[0].addRule(":root", "--heo-main-op-deep:" + t + "dd!important"),
                    document.styleSheets[0].addRule(":root", "--heo-main-none:" + t + "00!important"),
                    heo.initThemeColor(),
                    document.getElementById("coverdiv").classList.add("loaded")
            }
        }
    }) : (document.styleSheets[0].addRule(":root", "--heo-main: var(--heo-theme)!important"),
        document.styleSheets[0].addRule(":root", "--heo-main-op: var(--heo-theme-op)!important"),
        document.styleSheets[0].addRule(":root", "--heo-main-op-deep:var(--heo-theme-op-deep)!important"),
        document.styleSheets[0].addRule(":root", "--heo-main-none: var(--heo-theme-none)!important"),
        heo.initThemeColor())
}
function colorHex(e) {
    var t = e;
    if (/^(rgb|RGB)/.test(t)) {
        for (var o = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), n = "#", a = 0; a < o.length; a++) {
            var r = Number(o[a]).toString(16);
            "0" === r && (r += r),
                n += r
        }
        return 7 !== n.length && (n = t),
            n
    }
    if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t))
        return t;
    var i = t.replace(/#/, "").split("");
    if (6 === i.length)
        return t;
    if (3 === i.length) {
        var l = "#";
        for (a = 0; a < i.length; a += 1)
            l += i[a] + i[a];
        return l
    }
}
function colorRgb(e) {
    var t = e.toLowerCase();
    if (t && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (4 === t.length) {
            for (var o = "#", n = 1; n < 4; n += 1)
                o += t.slice(n, n + 1).concat(t.slice(n, n + 1));
            t = o
        }
        var a = [];
        for (n = 1; n < 7; n += 2)
            a.push(parseInt("0x" + t.slice(n, n + 2)));
        return "rgb(" + a.join(",") + ")"
    }
    return t
}
function LightenDarkenColor(e, t) {
    var o = !1;
    "#" == e[0] && (e = e.slice(1),
        o = !0);
    var n = parseInt(e, 16)
        , a = (n >> 16) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    var r = (n >> 8 & 255) + t;
    r > 255 ? r = 255 : r < 0 && (r = 0);
    var i = (255 & n) + t;
    return i > 255 ? i = 255 : i < 0 && (i = 0),
    (o ? "#" : "") + String("000000" + (i | r << 8 | a << 16).toString(16)).slice(-6)
}
function getContrastYIQ(e) {
    var t, o = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return t = 299 * o[1] + 587 * o[2] + 114 * o[3],
        (t /= 255e3) >= .5 ? "light" : "dark"
}

document.addEventListener("pjax:complete", (function() {
        coverColor()
        heo.initThemeColor()
    }
));
window.onload = function(){
    coverColor();
}