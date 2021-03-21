const { request, response } = require("express");

require('dotenv').config()
const express = require("express")
const morgan = require("morgan")

const cors = require("cors")
const Person = require('./models/person');

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('content', (req, res) =>{return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const errorHandler = (error, req, res, next) =>{
    if(error.name === "CastError"){
        return res.status(404).send({error: "malformed id"})
    }
    else if(error.name === "ValidationError"){
        return res.status(409).send({error: error.message})
    }
    else{
        console.log(error.message)
    }
    next(error)
}

app.get('/api/persons',(req, response) =>{
    Person.find({})
    .then(persons => {
        response.send(persons)
    })
})

app.get('/api/persons/:id',(req, response, next) =>{
    Person.findById(req.params.id).then(person => {
        response.send(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(req, response, next) =>{
    
    Person.findByIdAndRemove(req.params.id)
    .then(result=> {
        response.status(204).end()
    })
    .catch(error =>{
        next(error)
    })
})

app.post('/api/persons', (req, response, next) =>{
    const body = req.body;
    
    if(!body.name || !body.number){
        const errorMessage = {error: 'content needs name and number field'}
        return response.status(400).json(errorMessage)
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormated =>{
        response.json(savedAndFormated)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) =>{
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }
    
    Person.findByIdAndUpdate(req.params.id, person, {new:true})
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))    
})

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log("Server started at port " + PORT)
})