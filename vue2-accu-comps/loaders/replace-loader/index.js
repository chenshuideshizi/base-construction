module.exports = function (source) {
    console.log('start run 【repalce】 loader')
    // console.log('source', source)
    const newSource = source.replace(/World/ig, 'Loader') // 把 Word 替换成  Loader
    // console.log('newSource', newSource)
    return newSource
}