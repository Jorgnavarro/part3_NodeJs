import express from "express";
import morgan from "morgan";

const app = express();

app.disable('x-powered-by')

const PORT = 3001;

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] -response-time ms :body'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Kakaroto Powerfull",
        "number": "787878",
        "id": 5
    }
]



// welcome page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to our backend of Phonebook app</h1>')
})
// info about: amount of contacts and date
app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`
    <div>
        <h1>Phonebook has info for ${persons.length} people</h1>
        <p>${date}<p>
    </div>
    `)
})
// obtain the list of the persons
app.get('/api/persons', (req, res) => {
    res.json(persons);
})
// obtain an especific information about the contact with id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id);
    if(person){
        res.json(person)
    }else{
        res.status(404).send(`<h1>The person with id ${id}, doesn't exist in our database</h1>`);
    }

})

app.use(express.json())

//function generate id
const generateId = () => {
    const lastNumberID = 10000
    return Math.floor(Math.random() * (lastNumberID - 5 + 1) + 5);
}


//create a new contact
app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number){
        return res.status(400).json({
            error: "content missing"
        })
    }

    const findEqualName = persons.find(p => p.name === body.name)
    if(findEqualName){
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person);
    res.json(person);
})
// delete a contact
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end()
})

app.listen(PORT);
console.log(`Server listening on port: http://localhost:${PORT}`);