const { notEmpty } = require('../utils.js')

module.exports = {
    description: '创建一个新的公共组件',
    prompts: [{
        type: 'input',
        name: 'name',
        message: '请输入组件名称',
        validate: notEmpty('name')
    },
    ],
    actions: data => {
        const name = '{{properCase name}}'
        const actions = [{
            type: 'add',
            path: `src/components/${name}/index.vue`,
            templateFile: 'plop-templates/component/default-component.vue.hbs',
            data: {}
        }]

        return actions
    }
}
