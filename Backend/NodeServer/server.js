const express = require('express')
const app = express()   
const port = 2999       //subject to change

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})