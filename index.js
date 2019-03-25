var postcss = require('postcss')

const isNumber = function isNumber(val) {
  const regPos = /^\d+(\.\d+)?$/ //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数
  if(regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}

module.exports = postcss.plugin('postcss-auto-add-px', function () {

  return function (root, result) {

    root.walk(node => {

      let valueArr = []

      if (node.value) {
        valueArr = node.value.split(' ')
      }

      const excludeArr = ['z-index', 'opacity']

      let bool = excludeArr.find((item) => {
        return item === node.prop
      })

      if (!bool) {
        valueArr.forEach((item, index, arr) => {
          if (isNumber(item)) {
            valueArr[index] = item + 'px'
          }
        })
        node.value = valueArr.join(' ')
      }
      
    })

  }
})
