import Vue from 'vue'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

Vue.filter('duration', function (value) {
  return moment.duration(value).format('hh:*m:ss')
})
