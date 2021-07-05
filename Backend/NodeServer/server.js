const express = require('express')
const app = express()   
const port = 2999       //subject to change
app.use(express.json());
var riddles = []

class Hint {        //TODO add pictures
    constructor(id, name, description) {
        process.stdout.write(`Creating new Hint: `)
        if (id == null || !id instanceof Number) {
            process.stdout.write(`FAIL - invalid id ${id}\n`)
            return null
        }
        if (name == null || !name instanceof String) {
            process.stdout.write(`FAIL - invalid name ${name}\n`)
            return null
        }
        if (description == null || !description instanceof String) {
            process.stdout.write(`FAIL - invalid description ${description}\n`)
            return null
        }
        this.id  = id
        this.name = name
        this.description = description
        process.stdout.write("SUCCESS\n")
    }

}

class Riddle {      //TODO add Icon/pictures - make completion status numbers up to a maximum
    constructor(id, name, description, difficulty) {
        process.stdout.write(`Creating new Riddle: `)
        if (id == null || !id instanceof Number) {
            process.stdout.write(`FAIL - invalid id ${id}\n`)
            return null
        }
        if (name == null || !name instanceof String) {
            process.stdout.write(`FAIL - invalid name ${name}\n`)
            return null
        }
        if (description == null || !description instanceof String) {
            process.stdout.write(`FAIL - invalid description ${description}\n`)
            return null
        }
        if (difficulty == null || !difficulty instanceof Number || difficulty < 0 || difficulty > 10) {
            process.stdout.write(`FAIL - invalid difficulty ${difficulty}\n`)
            return null
        }
        this.id  = id
        this.name = name
        this.description = description
        this.difficulty = difficulty
        this.hints = []
        this.completed = false
        riddles.push(this)
        process.stdout.write("SUCCESS\n")
    }

    addHint(hint) {
        process.stdout.write(`Adding hint to riddle ${this.id}: `)
        if (hint == null || !hint instanceof Hint) {
            process.stdout.write("FAIL - invalid hint format\n")
            return
        }
        this.hints.push(hint)
        process.stdout.write("SUCCESS\n")
    }
    
}

const raspi = false
if (raspi) {
    const gpio = require('onoff').Gpio
    const testLED = new gpio(4, 'out')
}

app.get('/', (req, res) => {
    if (raspi) {
        if (testLED.readSync() === 0) {
            testLED.writeSync(1)
        } else {
            testLED.writeSync(0)
        }
    }

    
    res.json(riddles)
})

// curl -d '{"name":"Test Riddle","description":"This Riddle serves as a Test","difficulty":4}' -H 'content-type:application/json' "localhost:2999/createRiddle"
app.post('/createRiddle', (req, res) => {
    if (req.body.name == null || req.body.description == null || req.body.difficulty == null) {
        console.log("Wrong parameters for creating a riddle")
        return res.status(400).send()
    }
    let myRiddle = new Riddle(riddles.length, req.body.name, req.body.description, req.body.difficulty)
    return res.send(String(riddles.length -1))
})

app.post('/completeRiddle/:riddleID', (req, res) => {   //change to number
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        console.log(`Unable to complete riddle ${req.params.riddleID} - it does not exist`)
        return res.sendStatus(400)
    }
    myRiddle.completed = true
    return res.sendStatus(200)
})

// curl -d ' {"id":0,"name":"Test Hint","description":"This is a useless Hint as a Test"}' -H 'content-type:application/json' "localhost:2999/addHint/0"
app.post('/addHint/:riddleID', (req, res) => {
    if (req.body.name == null || req.body.description == null) {
        console.log("Wrong parameters for creating a hint")
        return res.status(400).send()
    }
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        console.log(`Unable to add a hint to riddle ${req.params.riddleID} - it does not exist`)
        return res.status(404).send()
    }
    myRiddle.addHint(new Hint(myRiddle.hints.length, req.body.name, req.body.description))
    return res.status(200).send()
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})