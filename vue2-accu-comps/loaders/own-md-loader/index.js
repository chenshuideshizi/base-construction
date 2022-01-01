var parser = require('markdown-it')();
var Token = require('markdown-it/lib/token')
const { formatCodeData } = require('./utils')


module.exports = function (source) {
    // TODO:不知道为什么会有空的 source 进来
    if (source.length === 0) {
        return ''
    }
    this.cacheable(false)

    let codeStr = ''
    parser.core.ruler.push('extract_vue_code',  state => {
        state.tokens.reduce((acc, token, index) => {
                // 对 vue 进行特殊处理
            if (token.type === 'fence' && token.info === 'vue-run') {
                codeStr = formatCodeData(token.content)
                token.attrs = token.attrs || []
                console.log(token.attrs)

                if (!token.attrs.find(item => item[0] === 'v-pre')) {
                    token.attrs.push(["v-pre", "1"])
                }
 
                
                // TODO:预览标签可以改成可配置化的

                // 自定义预览标签 open label
                const openLabel = new Token('', 'markdown-preview', 1);
                openLabel.attrs = openLabel.attrs || []
                

                if (!openLabel.attrs.find(item => item[0] === ':codeStr')) {
                    openLabel.attrs.push([":codeStr", "codeStr"])
                }

                // 自定义预览标签 close label
                const closeLabel = new Token('', 'markdown-preview', -1);
                state.tokens.push(openLabel, closeLabel)
            }
            return acc
        }, [])
        return true
    })
    

    // 拼接最后的接果
    const resultResource = `
        <template>
            <section class="content me-doc">
                ${parser.render(source)}
            </section>
        </template>
        <script>
            export default {
                name: "component-doc",
                data() {
                    return {
                        codeStr: ${codeStr}
                    }
                }
            }
        </script>
        `

    console.log('resultResource',resultResource)
    return resultResource
}