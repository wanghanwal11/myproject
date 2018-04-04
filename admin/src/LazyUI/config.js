export default {
  getHost: function () {
    var host = window.location.origin;
        //host = "http://192.168.0.10";
    return host;
  },
  getWebSpidersIP: function () {
    //开发环境
    var ip = 'http://shequ.vitoyun.cn:9500/';
    //var ip = 'http://192.168.0.10:3000/';
    return ip;
  },
  get url() {
    return {
      host: this.getHost(),
      nodeWebSpiders: this.getWebSpidersIP(),
      serverHost: "http://192.168.0.10/",
      aliHost: "http://shequ.vitoyun.cn/",
      supcodeslist: '/support/sup/supcodes/list',
      saveCommunityService: '/support/SupProviderService/SupProviderService/saveCommunityService',
      savePrice: '/support/SupProviderService/SupProviderService/save',
      getSecLevelService: '/support/SupProviderService/SupProviderService/getSecLevelService',
      delSecService: '/support/SupProviderService/SupProviderService/del',
      getOrderInfo: '/order/SupOrder/supOrder/get',
      userCancleOrder: '/order/SupOrder/supOrder/userCancleOrder',
      cancleOrderState: '/order/SupOrder/supOrder/cancleOrderState',
      UserAddressList: '/wx/weixinUserAddress/weixinUserAddress/list',
      listmenuurl: '/wx/WeiXinMenuUrl/weixinmenuurl/list',
      saveLevelThreeService: '/support/SupProviderService/SupProviderService/saveLevelThreeService',
      getThreeService: '/support/SupProviderService/SupProviderService/getThreeService',
      OrderNumOfReSend: '/order/SupOrder/supOrder/OrderNumOfReSend',
      delgzh: '/wx/api/wx/delgzh',
      weixinevent: 'wx/wechat/weixinevent/list',
      weixineventget: 'wx/wechat/weixinevent/get',
      wechat: 'wx/wechat/weixinevent/reply',
      weixineventzhuan: 'wx/wechat/weixinevent/report',
      weixineventprocess: 'wx/wechat/weixinevent/getEventInfo',
      getNotice: 'wx/wechat/weixineventdir/getDirByinitId',
      noticeSave: 'wx/wechat/weixineventdir/save',
      serverList: 'support/SupProviderService/SupProviderService/getCommunityService',
      getauthurl: '/wx/api/wx/getauthurl',
      queryAuth: '/wx/api/wx/initwechat',
      activeList: '/cmy/activity/cmyactivity/listByTimeArray',
      activeType: '/cmy/activity/cmyactivitytype/getActivityType',
      activityInfo: '/cmy/activity/cmyactivity/getActivityDetail',
      activityMessage: '/cmy/activity/cmyactivityqaa/getList',
      downSubCode: 'wx/api/wx/downSubCode',
      answerReply: '/cmy/activity/cmyactivityqaa/reply',
      del: '/cmy/activity/cmyactivityqaa/del',
      list: 'cmy/activity/cmyactivitysign/getList',
      getCmySearch: '/cmy/search/cmysearch/getCmySearch'
    }
  },
  get only() {
    return {
      //只读变量

    }
  },
  data : {
    sessionList: [],
    chatArr: []
  },
  //------------------------------一些常用方法------------------------
  //判断类型
  typeof (obj) {
    var gettype = Object.prototype.toString;
    switch(gettype.call(obj)) {
      case '[object HTMLDivElement]' :
        return 'element';
        break;
      case '[object String]' :
        return 'string';
        break;
      case '[object Object]' :
        return 'object';
        break;
      case '[object Array]' :
        return 'array';
        break;
      case '[object Function]' :
        return 'function';
        break;
      case '[object Number]' :
        return 'number';
        break;
      case '[object Boolean]' :
        return 'boolean';
        break;
      default :
        return null;
        break;
    }
  },
  //获取div left和top
  getDomXY(ATarget) {
    function CPos(x, y){
      this.x = x;
      this.y = y;
    }
    var target = ATarget;
    var pos = new CPos(target.offsetLeft, target.offsetTop);
    var target = target.offsetParent;
    while (target) {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        target = target.offsetParent
    }
    return pos;
  },
  FormatDate(time,format){
    var t = new Date(time);
    var tf = function(i) {
      return (i < 10 ? "0" :"") + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
      switch (a) {
        case "yyyy":
          return tf(t.getFullYear());
          break;

        case "MM":
          return tf(t.getMonth() + 1);
          break;

        case "mm":
          return tf(t.getMinutes());
          break;

        case "dd":
          return tf(t.getDate());
          break;

        case "HH":
          return tf(t.getHours());
          break;

        case "ss":
          return tf(t.getSeconds());
          break;
      }
    });
  },
  //获取地址栏参数的值
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  //在小于10的数字前加0，例如'9'-->'09'。
  paddNum: function(num){
    num += "";
    return num.replace(/^(\d)$/,"0$1");
  }
}
