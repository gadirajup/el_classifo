const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('/index.html'))

app.use(function(req, res) {
    res.type('text/plain')
    res.status(404)
    res.send('404')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))