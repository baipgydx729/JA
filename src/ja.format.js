/**
 * Created by along on 16/4/25.
 */
(function (ja) {
    'use strict';
    ja.format = ja.format || {};

    /**
     * 让日期和时间按照指定的格式显示的方法
     * @method date
     * @memberOf format
     * @param {String} format 格式字符串
     * @return {String} 返回生成的日期时间字符串
     *
     * @example
     *  var d = new Date();
     *  // 以 YYYY-MM-dd hh:mm:ss 格式输出 d 的时间字符串
     *  J.format.date(d, "YYYY-MM-DD hh:mm:ss");
     */
    var dateformat = function(date, formatString){
        /*
         * eg:formatString="YYYY-MM-DD hh:mm:ss";
         */
        var o = {
            "M+" : date.getMonth()+1,    //month
            "D+" : date.getDate(),    //day
            "h+" : date.getHours(),    //hour
            "m+" : date.getMinutes(),    //minute
            "s+" : date.getSeconds(),    //second
            "q+" : Math.floor((date.getMonth()+3)/3),    //quarter
            "S" : date.getMilliseconds()    //millisecond
        }

        if(/(Y+)/.test(formatString)){
            formatString = formatString.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o){
            if(new RegExp("("+ k +")").test(formatString)){
                formatString = formatString.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return formatString;
    };



    var datefriendly = function(date){
        function getT(t){if(t<10 || t.length < 2){return "0"+t;}return t;}
        var od = date;
        var nd = new Date();
        var yd = new Date(nd.getTime());
        yd.setDate(yd.getDate()-1);
        var timeString, timeT = nd.getTime()-od.getTime();
        if(timeT <= (5 * 60 * 1000)){timeString = "刚刚";}
        else if(timeT <= (30 * 60 * 1000)){timeString = Math.round(timeT / (60 * 1000)) + " 分钟前";}
        else if(od.getFullYear() == nd.getFullYear() && od.getMonth() == nd.getMonth() && od.getDate() == nd.getDate()){
            timeString = "今天 " + getT(od.getHours()) + ":" + getT(od.getMinutes());
        }else if(od.getFullYear() == yd.getFullYear() && od.getMonth() == yd.getMonth() && od.getDate() == yd.getDate()){
            timeString = "昨天 " + getT(od.getHours()) + ":" + getT(od.getMinutes());
        }else if(od.getFullYear() == nd.getFullYear()){
            timeString = getT(od.getMonth()+1) + "-" + getT(od.getDate())
        }else {
            timeString = getT(od.getFullYear()) + "-" + getT(od.getMonth()+1) + "-" + getT(od.getDate())
        }
        return timeString;

    }


    Date.prototype.format = function (format) {
       return dateformat(this,format);
    }

    //日期格式化(友好时间)
    Date.prototype.formatFriendly = function(){
        return datefriendly(this);
    }

    ja.format = {
        date: dateformat,
        datefriendly: datefriendly
    }
})(JA);