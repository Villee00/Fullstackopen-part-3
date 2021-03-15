const { request, response } = require("express");

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('content', (req, res) =>{return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


let taulukko = [
    {
    "id": 1,
    "name": "Art",
    "number": "555",
    },
    {
    "id": 2,
    "name": "ada",
    "number": "555",
    },
    {
    "id": 3,
    "name": "dfsf",
    "number": "242421414124142",
    },
    {
    "id": 4,
    "name": "ggdgrdgdgdgdgdg",
    "number": "231312151555",
    }
]

app.get('/api/persons',(req, response) =>{
    response.send(taulukko)
})

app.get('/api/persons/:id',(req, response) =>{
    const person = taulukko.find(target => target.id === Number(req.params.id))
    if(person){
        response.send(person)
    }
    else{
        response.status(404).end()
    }
    
})

app.get('/info',(req, response) =>{
    const resp = `Phonebook has info for ${taulukko.length} people <br> ${new Date()}` 
    response.send(resp)
})

app.delete('/api/persons/:id',(req, response) =>{
    taulukko = taulukko.filter(person => person.id !== Number(req.params.id))
    response.status(204).end()
})

app.post('/api/persons', (req, response) =>{
    const body = req.body;
    
    if(!body.name || !body.number){
        const errorMessage = {error: 'content needs name and number field'}
        return response.status(400).json(errorMessage)
    }

    if(taulukko.find(person => person.name === body.name)){
        const errorMessage = {error: 'name must be unique'}
        return response.status(400).json(errorMessage)
    }

    const person = {
        id: Math.floor(Math.random() * Math.floor(100000000)),
        name: body.name,
        number: body.number
    }
    taulukko = taulukko.concat(person)

    response.json(person)
})

app.put('/api/persons/:id', (req, res) =>{
    const body = req.body

    let newPerson = taulukko.find(person => person.id === Number(req.params.id))
    newPerson.number = body.number;
    
    res.json(newPerson)
    
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log("Server started at port " + PORT)
})