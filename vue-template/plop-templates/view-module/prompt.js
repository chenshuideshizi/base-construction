const { notEmpty } = require('../utils')

module.exports = {
    description: '创建一个新的业务模块',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: '请输入模块名称(小驼峰格式,比如: helloWorld)',
        validate: notEmpty('模块名称不能为空')
      },
      {
        type: 'input',
        name: 'pageTitle',
        message: '请输入模块首页标题',
        validate: notEmpty('模块首页标题不能为空')
      },
      {
        type: 'input',
        name: 'moduleDefaultCode',
        message: '首页menu code'
      },
    ],
    actions: function (data) {
      if (data.createModuleName.split('-').length < 2) {
        throw new Error('模块名/页面名 至少两个单词，用 “-” 隔开')
      }
      return [
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/store/index.js',
          templateFile: 'plop-templates/module-template/store/index.js.hbs',
        },
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/store/initStoreState.js',
          templateFile: 'plop-templates/module-template/store/initStoreState.js',
        },
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/store/getters.js',
          templateFile: 'plop-templates/module-template/store/getters.js',
        },
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/store/modules/moduleA.js',
          templateFile: 'plop-templates/module-template/store/modules/moduleA.js',
        },
        {
          type: 'add',
          path: 'src/router/async-modules/{{createModuleName}}.js',
          templateFile: 'plop-templates/module-template/router.js.hbs',
        },
        {
          type: 'modify',
          pattern: /(.|\n)*/,
          path: 'plop-templates/module-template/module.list.json',
          template: JSON.stringify(moduleArr.concat(data.createModuleName), null, 2)
        },
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/{{createModuleName}}-index/index.vue',
          templateFile: 'plop-templates/module-template/default-page/index.vue.hbs',
        },
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/{{createModuleName}}-index/provide.js',
          templateFile: 'plop-templates/module-template/default-page/provide.js',
        },
        {
          type: 'add',
          path: 'src/views-{{createModuleName}}/{{createModuleName}}-index/router.config.js',
          templateFile: 'plop-templates/module-template/default-page/router.config.js.hbs',
        },
      ]
    }
  }