var heo = {
  //更改主题色
  changeThemeColor: function(color) {
    if (document.querySelector('meta[name="theme-color"]') !== null) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
    }
  },

  //自适应主题色
  initThemeColor: function() {
    if (heo.is_Post()) {
      const currentTop = window.scrollY || document.documentElement.scrollTop
      if (currentTop > 0) {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
        heo.changeThemeColor(themeColor);
      }else {
        if (currentTop === 0) {
          let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-main');
          heo.changeThemeColor(themeColor);
        }
      }
    }else {
      let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
      heo.changeThemeColor(themeColor);
    }
  }
}