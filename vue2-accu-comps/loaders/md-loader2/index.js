var parser = require('markdown-it')();
var Token = require('markdown-it/lib/token')

let id = 0

module.exports = function (source) {
    const customComponentsMap = {}

    parser.core.ruler.push(
        'extract_vue_code', 
        function extractVue(state) {
            const newTokens = state.tokens.reduce((acc, token) => {
                if (token.type === 'fence' && token.info === 'vue') {
                    // 对 vue 进行特殊处理
                    const componentName = `custom-component-${id++}`
                    let t = new Token('html_block', 'h1', 0);

                    customComponentsMap[componentName] = token.content
                    acc = acc.concat(t);
                }
                return acc
            }, [])


            state.tokens.push(...newTokens);
            return true
        }
    )

    // 测试代码，渲染后给每一行加上行数
    parser.core.ruler.push('show-line', (state)=> {
    	// forEach 遍历 tokens
		state.tokens.forEach(token => {
            // token.map 即所在的行数
            if (token.map) {
            	// 起始行
                // const start  = ["data-line-start", token.map[0].toString()]
                // // 结束行
                // const end  = ["data-line-end", token.map[1].toString()]
                // // 初始化属性
                // token.attrs = token.attrs || []
                // // 添加属性
                // token.attrs.push(start,end)
            }
        })
		return true;
    });

    const newResource = parser.render(source)
    const vueSource = `
        <template>
            <section class="content me-doc">
                ${newResource}
            </section>
        </template>
        <script>
            export default {
                name: 'component-doc',
                components: {

                }
            }
        </script>
        `
    return vueSource
}