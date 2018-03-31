
let loadData = function (to) {}

let setData = function (vm, data) {}

export default {

  beforeRouteEnter (to, from, next) {
    loadData(to).then(({ data }) => {
      next(vm => setData(vm, data))
    })
  },
  beforeRouteUpdate (to, from, next) {
    loadData(to).then(({ data }) => {
      setData(this, data)
      next()
    })
  }
}
