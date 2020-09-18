export default {
    formatDate (date, fmt) {
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      // 如果fmt存在4个'y'字符，则将yyyy替换为：年份；RegExp.$1表示匹配到的第一组数据即yyyy
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o) {
        // M==5 ==> 005 ==>05；涉及到的语法：stringObject.substr(start,length)，substr()方法可在字符串中抽取从start下标开始的指定数目的字符。
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  }