const cheerio = require("cheerio")

module.exports.formatCodeData = function (html) {
    const templateTagStart = html.indexOf('<template>')
    const templateTagEnd = html.indexOf('</template>')
    const template = templateTagStart>=0 && templateTagEnd>=0 ? html.slice(templateTagStart + 10, templateTagEnd) : ''
    
    const scriptTagStart = html.indexOf('<script>')
    const scriptTagEnd = html.indexOf('</script>')
    const script = scriptTagStart >= 0 && scriptTagEnd >=  0 ? html.slice(scriptTagStart + 8, scriptTagEnd) : ''
    
    const styleTagStart = html.indexOf('<style')
    const styleTagEnd = html.indexOf('</style>')
    const styles = styleTagStart >= 0 && styleTagEnd >= 0 ? html.slice(styleTagStart + 7, styleTagEnd) : ''

    const result  = {
        template,
        script,
        styles
    } 

    console.log('result', result)

    return JSON.stringify(result)
}