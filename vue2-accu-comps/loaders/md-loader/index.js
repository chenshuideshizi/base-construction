var parser = require('markdown-it')();
var Token = require('markdown-it/lib/token')

let id = 0

module.exports = function (source) {
    // TODO:不知道为什么会有空的 source 进来
    if (source.length === 0) {
        return ''
    }
    this.cacheable(false)

    let markdownCodeStr = ''

    parser.core.ruler.push('extract_vue_code',  state => {
            state.tokens.reduce((acc, token, index) => {
                if (token.type === 'fence' && token.info === 'vue') {
                    // 对 vue 进行特殊处理
                    const componentName = `custom-component-${id++}`
                    let t = new Token('html_block', 'h1', 0);
                    markdownCodeStr = token.content
                    const openLabel = new Token('', 'markdown-preview', 1);
                    openLabel.attrs = token.attrs || []
                    openLabel.attrs.push([":codeStr", "markdownCodeStr"])

                    const textLabel = new Token('html_block', '', 0)
                    textLabel.content = '{{markdownCodeStr}}'
                    const closeLabel = new Token('', 'markdown-preview', -1);
                    state.tokens.push(openLabel, textLabel, closeLabel)
                }
                return acc
            }, [])
        }
    )

    // 测试代码，渲染后给每一行加上行数
    // TODO:为什么会执行多次
    // parser.core.ruler.push('show-line', (state)=> {
	// 	state.tokens.forEach((token, i) => {
    //         // token.map 即所在的行数
    //         if (token.map) {
    //         	// 起始行
    //             const start  = ["data-line-start", token.map[0].toString()]
    //             // 结束行
    //             const end  = ["data-line-end", token.map[1].toString()]
    //             // 初始化属性
    //             token.attrs = token.attrs || []
    //             // 添加属性
    //             token.attrs.push(start,end)
    //         }
    //     })
	// 	return true;
    // });

    let testStr = '111'
    const newResource = parser.render(source)
    const dataVal = JSON.stringify({ markdownCodeStr: markdownCodeStr })
    const vueSource = `
        <template>
            <section class="content me-doc">
                ${newResource}
            </section>
        </template>
        <script>
            export default {
                name: "component-doc",
                data() {
                    return (${dataVal})
                }
            }
        </script>
        `
        console.log(vueSource)
    return vueSource
}