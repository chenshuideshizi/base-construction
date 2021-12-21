const semver = require('semver')
const { engines } = require('../package.json')

const version = engines.node
if (!semver.satisfies(process.version, version)) {
  console.error(`Node 版本必须是 ${version}, 当前版本为 ${process.version}`)
  process.exit(1)
}