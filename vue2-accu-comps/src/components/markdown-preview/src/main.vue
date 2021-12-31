<template>
    <div ref="container" class="markdow-preview">
        {{codeStr}}
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'MarkdownPreview',
    props: {
        codeStr: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            instance: null
        }
    },
    watch: {
        codeStr: {
            handler() {
                this.initInstance()
            }
        }
    },
    mounted() {
        this.genCode()
    },
    methods: {
        genCode() {
            const templateStart = this.codeStr.indexOf('<template>') + 10
            const templateEnd = this.codeStr.indexOf('</template>')
            const templateStr = this.codeStr.slice(templateStart, templateEnd)
            const ctor = Vue.extend({template: templateStr})
            new ctor().$mount(this.$refs.container)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>