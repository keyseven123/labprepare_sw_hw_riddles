const express = require('express')
const app = express()   
const port = 2999       //subject to change

const gpio = require('onoff').Gpio
const testLED = new gpio(4, 'out')

app.get('/', (req, res) => {
    if (testLED.readSync() === 0) {
        testLED.writeSync(1)
    } else {
        testLED.writeSync(0)
    }
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})