import Vue from 'vue'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)
Vue.filter('duration', function (value, format) {
  if (format) {
    return moment.duration(value).format(format)
  }
  return moment.duration(value).format('hh:*mm:ss')
})

Vue.filter('number', function (value) {
  return value.toLocaleString()
})
