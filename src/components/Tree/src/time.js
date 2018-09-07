Date['prototype'['format']] = (formatStr) => {
  var zeroize = function(value, length) {
    if (!length) {
      length = 2
    }
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0'
    }
    return zeros + value
  }
  return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0) {
    switch ($0) {
      case 'd': return this.getDate()
      case 'dd': return zeroize(this.getDate())
      case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][this.getDay()]
      case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.getDay()]
      case 'M': return this.getMonth() + 1
      case 'MM': return zeroize(this.getMonth() + 1)
      case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this.getMonth()]
      case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.getMonth()]
      case 'yy': return this.getFullYear().substr(2)
      case 'yyyy': return this.getFullYear()
      case 'h': return this.getHours() % 12 || 12
      case 'hh': return zeroize(this.getHours() % 12 || 12)
      case 'H': return this.getHours()
      case 'HH': return zeroize(this.getHours())
      case 'm': return this.getMinutes()
      case 'mm': return zeroize(this.getMinutes())
      case 's': return this.getSeconds()
      case 'ss': return zeroize(this.getSeconds())
      case 'l': return this.getMilliseconds()
      case 'll': return zeroize(this.getMilliseconds())
      case 'tt': return this.getHours() < 12 ? 'am' : 'pm'
      case 'TT': return this.getHours() < 12 ? 'AM' : 'PM'
    }
  })
}
