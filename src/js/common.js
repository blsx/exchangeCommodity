/**
 * 设置cookie
 * @description < 登录时，写入cookie >
 */

export function setCookie (name, value, expiremMinutes) {
  let exDate = new Date();
  exDate.setTime(exDate.getTime() + expiremMinutes * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ((expiremMinutes == null) ? '' : ';expires=' + exDate.toGMTString());
}

/**
 * 读取cookie
 * @description < 点击保存密码时，读取cookie >
 */
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
        return unescape(document.cookie.substring(start, end));
      }
    }
  }
  return '';
}

/**
 * 删除cookie
 * @description < 未点击保存密码时，删除cookie >
 */
export function delCookie (name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
  }
}
