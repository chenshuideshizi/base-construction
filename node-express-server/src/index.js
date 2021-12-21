const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})
// jsonp
app.get('/jsonp', (req, res) => {
    console.log(req)
    const { callback, name } = req.query
    const data = {
        code: 200,
        data: {
            name: name,
            extract: 'Hello World'
        }
    }

    // callback 的参数需要 使用 JSON.stringify
    res.send(`${callback}(${JSON.stringify(data)})`)
})

const port = 3000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})