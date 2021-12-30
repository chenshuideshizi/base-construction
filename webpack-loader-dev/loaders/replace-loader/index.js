module.exports = function (source) {
    // console.log('source', source)
    const newSource = source.replace(/World/ig, 'Loader') // 把 Word 替换成  Loader
    // console.log('newSource', newSource)
    return newSource
}