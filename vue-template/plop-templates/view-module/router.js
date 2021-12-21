
import { registerStoreModule } from '@/views-{{moduleName}}/store'
import { merge } from 'lodash'

const routes = []

const moduleName = '{{moduleName}}'
const routerFiles = require.context('@/views-{{moduleName}}', true, /^\.\/([\w-]+\/index\.vue)|(router\.config\.js)$/)

routerFiles.keys().forEach(routerFile => {
  const fileSplit = routerFile.split('/')
  const fileName = fileSplit.pop()
  if (fileName !== 'index.vue') return
  const config = routerFiles(fileSplit.join('/') + '/router.config.js').default
  const route = merge({
    path: `/${moduleName}/${fileSplit[1]}`,
    name: `${moduleName}-${fileSplit[1]}`,
    component: () => import(`../../views-${moduleName}/${routerFile.replace('./', '')}`),
  }, config)
  route.beforeEnter = async (to, from, next) => {
    await config.beforeEnter?.(to, from, next)
    await registerStoreModule()
    next()
  }
  routes.push(route)
})

export default routes
