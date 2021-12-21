const viewModuleGenerator = require('./plop-templates/view-module/prompt')
const componentGenerator = require('./plop-templates/component/prompt')

module.exports = function (plop) {
    plop.setGenerator('view-module', viewModuleGenerator)
    plop.setGenerator('component', componentGenerator)
}

