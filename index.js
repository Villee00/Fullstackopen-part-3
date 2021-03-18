const { request, response } = require("express");

require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require('./models/person');
const { Mongoose } = require("mongoose");

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('content', (req, res) =>{return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons',(req, response) =>{
    Person.find({})
    .then(persons => {
        response.send(persons)
    })
})

app.get('/api/persons/:id',(req, response) =>{
    Person.findById(req.params.id).then(person => {
        response.send(person)
    })
})

// app.get('/info',(req, response) =>{
//     const resp = `Phonebook has info for ${taulukko.length} people <br> ${new Date()}` 
//     response.send(resp)
// })

app.delete('/api/persons/:id',(req, response) =>{
    
    Person.findByIdAndRemove(req.params.id)
    .then(result=> {
        response.status(204).end()
    })
    .catch(error =>{
        next(error)
    })

    response.status(204).end()
})

app.post('/api/persons', (req, response) =>{
    const body = req.body;
    
    if(!body.name || !body.number){
        const errorMessage = {error: 'content needs name and number field'}
        return response.status(400).json(errorMessage)
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(response => {
        console.log("Person added to db")
    })

    response.json(person)
})

app.put('/api/persons/:id', (req, res) =>{
    const body = req.body

    let newPerson = taulukko.find(person => person.id === Number(req.params.id))
    newPerson.number = body.number;
    
    res.json(newPerson)
    
})
const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log("Server started at port " + PORT)
})