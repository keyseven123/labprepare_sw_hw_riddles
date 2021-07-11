const express = require('express')
const app = express()   
const port = 2999       //subject to change
app.use(express.json());
var riddles = []

class Description {
    constructor(id, contentType, name, url) {
        this.id = id
        this.contentType = contentType
        this.name = name
        this.url = url
    }
}

class Riddle {      //TODO add Icon/pictures - make completion status numbers up to a maximum
    constructor(id, name, url, difficulty, completionMax) {
        this.id  = id
        this.name = name
        this.url = url
        this.difficulty = difficulty
        this.completionMax = completionMax
        this.completionState = 0
        this.explanation = []
        this.description = []
        this.hints = []
    }

    addHint(name, contentType) {
        let hint = new Description(this.hints.length, contentType, name, this.url + "/hints/" + this.hints.length)
        this.hints.push(hint)
    }

    addDescription(name, contentType) {
        let desc = new Description(this.description.length, contentType, name, this.url + "/description/" + this.description.length)
        this.description.push(desc)
    }

    addExplanation(name, contentType) {
        let explan = new Description(this.explanation.length, contentType, name, this.url + "/explanation/" + this.explanation.length)
        this.explanation.push(explan)
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

    
    return res.json(riddles)
})

app.get('/riddles/:riddleID', (req,res) => {
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        return res.sendStatus(400)
    }
    return res.json(myRiddle)
})

app.get('/riddles/:riddleID/hints/:hintID', (req, res) => {
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        return res.sendStatus(400)
    }
    let tmp = myRiddle.hints.find(x => x.id == req.params.hintID)
    if (tmp === undefined) {
        return res.sendStatus(400)
    }
    return res.json(tmp)
})

app.get('/riddles/:riddleID/explanation/:explanID', (req, res) => {
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        return res.sendStatus(400)
    }
    let tmp = myRiddle.explanation.find(x => x.id == req.params.explanID)
    if (tmp === undefined) {
        return res.sendStatus(400)
    }
    return res.json(tmp)
})

app.get('/riddles/:riddleID/description/:descID', (req, res) => {
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        return res.sendStatus(400)
    }
    let tmp = myRiddle.description.find(x => x.id == req.params.descID)
    if (tmp === undefined) {
        return res.sendStatus(400)
    }
    return res.json(tmp)
})

// curl -d '{"name":"Test Riddle","difficulty":4, "completionMax": 5}' -H 'content-type:application/json' "localhost:2999/createRiddle"
app.post('/createRiddle', (req, res) => {
    let myRiddle = new Riddle(riddles.length, req.body.name, "http://127.0.0.1:2999/riddles/" + riddles.length, req.body.difficulty, req.body.completionMax)
    riddles.push(myRiddle)
    return res.send(String(riddles.length -1))
})

app.post('/completeRiddle/:riddleID', (req, res) => {   //change to number
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        console.log(`Unable to complete riddle ${req.params.riddleID} - it does not exist`)
        return res.sendStatus(400)
    }
    myRiddle.completionState = myRiddle.completionState + 1
    return res.sendStatus(200)
})

// curl -d ' {"id":0,"name":"Test Hint","contentType"; "application/json"}' -H 'content-type:application/json' "localhost:2999/addHint/0"
app.post('/addHint/:riddleID', (req, res) => {
    
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        console.log(`Unable to add a hint to riddle ${req.params.riddleID} - it does not exist`)
        return res.status(404).send()
    }
    myRiddle.addHint(req.body.name, req.body.contentType)
    return res.status(200).send()
})

app.post('/addExplanation/:riddleID', (req, res) => {
    
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        console.log(`Unable to add an explanation to riddle ${req.params.riddleID} - it does not exist`)
        return res.status(404).send()
    }
    myRiddle.addExplanation(req.body.name, req.body.contentType)
    return res.status(200).send()
})

app.post('/addDescription/:riddleID', (req, res) => {
    
    let myRiddle = riddles.find(x => x.id == req.params.riddleID)
    if (myRiddle === undefined) {
        console.log(`Unable to add a description to riddle ${req.params.riddleID} - it does not exist`)
        return res.status(404).send()
    }
    myRiddle.addDescription(req.body.name, req.body.contentType)
    return res.status(200).send()
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})