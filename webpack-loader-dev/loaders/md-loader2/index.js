var markdownIt = require('markdown-it')();
const cheerio = require('cheerio');

function genWrap(inner) {
    return `
<template>
    <div class="wrap">${inner}</div>
</template>
<script>
export default {
    
}
</script>
`
}
module.exports = function (source) {
    console.log('source', source)
    const languageTagReg = '```()(\w+)````'
    const newResource = markdownIt.render(source)
    console.log('newResource', newResource)

    const $ = cheerio.load(newResource)
    console.log('$', $)
    const preEle = $('pre')
    console.log('preEle', preEle)
    Array.from($('pre')).forEach((curr, index) => {
        console.log(index, item)
    })
    return getWrap(newResource)
}