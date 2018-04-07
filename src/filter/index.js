import Vue from 'vue'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

Vue.filter('duration', function (value) {
  if (!value) return ''
  return moment.duration(value).format()
})
