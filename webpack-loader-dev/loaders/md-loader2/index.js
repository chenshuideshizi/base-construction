var parser = require('markdown-it')();
var Token = require('markdown-it/lib/token')

let id = 0

module.exports = function (source) {
    const customComponentsMap = {}
    parser.core.ruler.push(
        'extract_script_or_style', 
        function replace(state) {
            let newTokens = [];
            state.tokens
                .filter(token => token.type == 'fence' && token.info == 'vue')
                .forEach(token => {
                    // 对vue 进行特特处理
                    const componentName = `custom-component-${id++}`
                    let t = new Token('html_block', componentName, 0);
                    newTokens.push.apply(newTokens, t);
                    customComponentsMap[componentName] = token.content
                });
                
            state.tokens.push.apply(state.tokens, newTokens);
        }
    )


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
    console.log('vueSource', vueSource)
    return vueSource
}