const connect = require('connect')
const serveStatic = require('serve-static')

const app = connect()
app.use(serveStatic(__dirname))

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app listen on ${port}`)

