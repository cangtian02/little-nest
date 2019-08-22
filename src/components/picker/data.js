/**
 * picker组件获取基础数据
 * 性别 日期
 * @export
 * @class data
 */
export default {
  gender() {
    return [[{
      val: 1,
      text: '男'
    }, {
      val: 2,
      text: '女'
    }]];
  },
  getYear(year) {
    let data = [];

    for (let i = 0; i < 100; i++) {
      if (year - i >= 1790) {
        data.unshift({
          val: year - i,
          text: (year - i) + '年'
        });
      } else {
        break;
      }
    }

    for (let i = 1; i < 100; i++) {
      data.push({
        val: year + i,
        text: (year + i) + '年'
      });
    }

    return data;
  },
  getMonth() {
    let data = [];
    for (let i = 1; i < 13; i++) {
      data.push({
        val: i,
        text: (i < 10 ? '0' + i : i) + '月'
      });
    }
    return data;
  },
  getDay(year, month) {
    let data = [];
    for (let i = 1; i < this.day_arr(year, month) + 1; i++) {
      data.push({
        val: i,
        text: (i < 10 ? '0' + i : i) + '日'
      });
    }
    return data;
  },
  // 如果当前年份能被4整除但是不能被100整除或者能被400整除，即可确定为闰年，返回1，否则返回0
  is_leap(year) {
    return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0));
  },
  // 各月份的总天数
  day_arr(year, month) {
    let day_str = new Array(31, 28 + this.is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    return day_str[month - 1];
  },
  date(defaultDate) {
    let date = defaultDate.split('-');
    return [this.getYear(Number(date[0])), this.getMonth(), this.getDay(Number(date[0]), Number(date[1]))];
  }
}