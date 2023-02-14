var heo = {
  
    //是否在首页
  is_Post: function() {
    var url=window.location.href;  //获取url
  if(url.indexOf("/p/") >= 0 ) { //判断url地址中是否包含code字符串
      return true;
    }else {
      return false;
     }
  },

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