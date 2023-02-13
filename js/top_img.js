var Jay = {
        // 更改主题色
    changeThemeColor: function(color) {
        if (document.querySelector('meta[name="theme-color"]') !== null) {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", color);
        }
    },
    
    is_Post: function() {
        var url = window.location.href; //获取url
        if (url.indexOf("/posts/") >= 0) {
            //判断url地址中是否包含code字符串
            return true;
        } else {
            return false;
        }
    },
    // 自适应主题色
    initThemeColor: function() {
        if (Jay.is_Post()) {
            const currentTop = window.scrollY || document.documentElement.scrollTop;
            if (currentTop === 0) {
                let themeColor = getComputedStyle(
                    document.documentElement
                ).getPropertyValue("--anzhiyu-main");
                Jay.changeThemeColor(themeColor);
            } else {
                let themeColor = getComputedStyle(
                    document.documentElement
                ).getPropertyValue("--anzhiyu-background");
                Jay.changeThemeColor(themeColor);
            }
        } else {
            let themeColor = getComputedStyle(
                document.documentElement
            ).getPropertyValue("--anzhiyu-background");
              Jay.changeThemeColor(themeColor);
        }
    },
};

function coverColor() {
    let e = document.getElementById("post-cover-img")?.src;
    void 0 !== e ? RGBaster.colors(e, {
        paletteSize: 30,
        exclude: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(254,254,254)"],
        success: function(e) {
            if ("rgb(66,90,239)" !== e.dominant) {
                const t = e.dominant.match(/\d+/g);
                let o = colorHex(`rgb(${t[0]},${t[1]},${t[2]})`);
                "light" === getContrastYIQ(colorHex(o)) && (o = LightenDarkenColor(colorHex(o), -40)),
                document.styleSheets[0].addRule(":root", "--anzhiyu-main:" + o + "!important"),
                document.styleSheets[0].addRule(":root", "--anzhiyu-main-op:" + o + "23!important"),
                document.styleSheets[0].addRule(":root", "--anzhiyu-main-op-deep:" + o + "dd!important"),
                document.styleSheets[0].addRule(":root", "--anzhiyu-main-none:" + o + "00!important"),
                Jay.initThemeColor(),
                document.getElementById("coverdiv").classList.add("loaded")
            }
        }
    }) : (document.styleSheets[0].addRule(":root", "--anzhiyu-main: var(--anzhiyu-theme)!important"),
    document.styleSheets[0].addRule(":root", "--anzhiyu-main-op: var(--anzhiyu-theme-op)!important"),
    document.styleSheets[0].addRule(":root", "--anzhiyu-main-op-deep:var(--anzhiyu-theme-op-deep)!important"),
    document.styleSheets[0].addRule(":root", "--anzhiyu-main-none: var(--anzhiyu-theme-none)!important"),
    Jay.initThemeColor())
}
function colorHex(e) {
    let t = e;
    if (/^(rgb|RGB)/.test(t)) {
        let e = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
          , o = "#";
        for (let t = 0; t < e.length; t++) {
            let n = Number(e[t]).toString(16);
            "0" === n && (n += n),
            o += n
        }
        return 7 !== o.length && (o = t),
        o
    }
    if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t))
        return t;
    {
        let e = t.replace(/#/, "").split("");
        if (6 === e.length)
            return t;
        if (3 === e.length) {
            let t = "#";
            for (let o = 0; o < e.length; o += 1)
                t += e[o] + e[o];
            return t
        }
    }
}
function colorRgb(e) {
    let t = e.toLowerCase();
    if (t && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (4 === t.length) {
            let e = "#";
            for (let o = 1; o < 4; o += 1)
                e += t.slice(o, o + 1).concat(t.slice(o, o + 1));
            t = e
        }
        let e = [];
        for (let o = 1; o < 7; o += 2)
            e.push(parseInt("0x" + t.slice(o, o + 2)));
        return "rgb(" + e.join(",") + ")"
    }
    return t
}
function LightenDarkenColor(e, t) {
    let o = !1;
    "#" === e[0] && (e = e.slice(1),
    o = !0);
    let n = parseInt(e, 16)
      , a = (n >> 16) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    let i = (n >> 8 & 255) + t;
    i > 255 ? i = 255 : i < 0 && (i = 0);
    let r = (255 & n) + t;
    return r > 255 ? r = 255 : r < 0 && (r = 0),
    (o ? "#" : "") + String("000000" + (r | i << 8 | a << 16).toString(16)).slice(-6)
}
function getContrastYIQ(e) {
    let t, o = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return t = 299 * o[1] + 587 * o[2] + 114 * o[3],
    t /= 255e3,
    t >= .5 ? "light" : "dark"
}