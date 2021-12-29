<template>
  <div class="wrapper"></div>
</template>

<script>


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      componentMap: {}
    }
  },
  created() {
    this.loadAllCustomComps()
  },
  methods: {
    loadAllCustomComps() {
      const routes = []
// var str = "abc123def";
// var patt1 = /[0-9]+/;
// document.write(str.match(patt1));
      const requireFiles = require.context('@/custom-components', true, /^\.\/[\w-]+\/\w+\.md$/)
      console.log(requireFiles)
      this.componentMap = requireFiles.keys().reduce((acc, key) => {
        const componentNameReg = /^\.\/([\w-]+)\/\w+\.md$/;
        const componentName = key.match(componentNameReg)[1]
        console.log('requireFiles(key)', requireFiles(key))
        acc[componentName] = requireFiles(key).default || requireFiles(key)
        console.log(acc[componentName])
        return acc
      }, {})

      console.log(this.componentMap)

      // this.componentMap = componentFiles.keys().reduce((acc, filePath) => {
      //   console.log(filePath)
      //   const componentNameReg = /^\.\/([\w-]+)\/\w+\.md$/;
      //   const componentName = filePath.match(componentNameReg)[1]
      //   const markdownFilePath = `@/custom-components/${filePath.slice(2)}`
      //   const a = require('@/custom-components/alarm-picture/README.md')
      //   const absolutePath = require(markdownFilePath)
      //   acc[componentName] = () => import(absolutePath)
      //   return acc
      // }, {})

      // Object.keys(this.componentMap).forEach((key) => {
      //   const item = this.componentMap[key]
      //   console.log(item)
      //   const p = item()
      //   console.log(p)
      // })

    }
  }
}
</script>

<style scoped lang="scss">

</style>
