<template>
  <div ref="container" class="markdow-preview">
    {{ codeStr }}
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "MarkdownPreview",
  props: {
    codeStr: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      instance: null,
    };
  },
  watch: {
    codeStr: {
      handler() {
        this.initInstance();
      },
    },
  },
  mounted() {
    this.renderCode();
  },
  methods: {
    renderCode() {
    //   const templateStart = this.codeStr.indexOf("<template>") + 10;
    //   const templateEnd = this.codeStr.indexOf("</template>");
    //   const templateStr = this.codeStr.slice(templateStart, templateEnd);
    //   const ctor = Vue.extend({ template: templateStr });
    //   new ctor().$mount(this.$refs.container);
        const {configData, styles} = this.parser(this.codeStr)
        const ctor = Vue.extend(configData);
        new ctor().$mount(this.$refs.container);
    },
    parser(codeStr) {
      const elem = document.createElement("div");
      console.log(codeStr.trim())
      elem.innerHTML = codeStr.trim()

      try {
        const template = elem.querySelector("template");
        const script = elem.querySelector("script");
        const styles = Array.from(elem.querySelectorAll("style")).map(
          (n) => n.innerHTML
        );
        
        console.log('script', script)
        const configData = {
            template: template ? template.innerHTML : ""
        }


        return {
          configData,
          styles
        };
      } catch (error) {
        return { error };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>