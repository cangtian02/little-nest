import Toast from '../components/toast/toast';

export default {
  toast: Toast,
  /**
   * 转换时间格式
   * 用法：format(ms,'yyyy-MM-dd hh:mm:ss')
   * @param time 毫秒数
   * @param fmt 要转换的时间格式
   */
  format(time, fmt) {
    let d = new Date(time + 8 * 3600 * 1000);
    let o = {
      "M+": d.getUTCMonth() + 1,                 //月份
      "d+": d.getUTCDate(),                    //日
      "h+": d.getUTCHours(),                   //小时
      "m+": d.getUTCMinutes(),                 //分
      "s+": d.getUTCSeconds(),                 //秒
      "q+": Math.floor((d.getUTCMonth() + 3) / 3), //季度
      "S": d.getUTCMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (d.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }, 
  /**
   * 判断object是否为空
   *
   * @param {*} object
   * @returns
   */
  isEmptyObject(object) {
    let t;
    for (t in object)
      return true;
    return false;
  },
  /**
   * 获取url参数
   * @param param 参数名
   * @returns {*}
   */
  getUrlParams(param) {
    let ps = decodeURI(window.location.href);
    if (ps === '') return '';
    let params = (ps.substr(ps.lastIndexOf("?") + 1)).split("&");
    if (params !== null) {
      for (let i = 0; i < params.length; i++) {
        let strs = params[i].split("=");
        if (strs[0] === param && strs[1]) {
          return strs[1];
        }
      }
    }
    return "";
  },
  /**
   * 数字转中文 1 => 一
   * 100内
   */
  numberToZh(num) {
    let arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    if (num < 11) return arr[num - 1];
    let str = '';
    (num + '').split('').forEach((val, idx) => {
      val = Number(val);
      if (idx === 0) {
        if (val === 1) {
          str += arr[9];
        } else {
          str += arr[val - 1];
          str += arr[9];
        }
      } else {
        str += arr[val - 1];
      }
    });
    return str;
  },
  // 输入框将光标转移到最后
  focusToLast(input) {
    let len = input.value.length;
    if (document.selection) {
      let sel = input.createTextRange();
      sel.moveStart('character', len);
      sel.collapse();
      sel.select();
    } else if (typeof input.selectionStart === 'number' && typeof input.selectionEnd === 'number') {
      input.selectionStart = input.selectionEnd = len;
    }
  },
  resetTime(d) {
    let _d = this.format(d, 'yyyy-MM-dd');
    let y1 = new Date().getFullYear();
    let y2 = _d.split('-')[0];
    return y2 < y1 ? this.format(d, 'yyyy-MM-dd') : this.format(d, 'MM-dd');
  },
  resetNum(n) {
    if (typeof n !== 'number') return 0;
    if (n < 1000) return n;

    if (n > 999 && n < 10000) {
      n = n / 1000;
      n = (n + '').includes('.')  ? n.toFixed(1) : n;
      return n + 'K';
    }

    if (n > 9999 && n < 100000000) {
      n = n / 10000;
      n = (n + '').includes('.') ? n.toFixed(0) : n;
      return n + 'W';
    }

    return n;
  },
}