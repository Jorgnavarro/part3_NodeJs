import express from "express";
import morgan from "morgan";
import cors from "cors";
import Person  from "./models/person.js"


const app = express();


app.disable('x-powered-by')

app.use(cors())

app.use(express.static('build'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))



// welcome page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to our backend of Phonebook app</h1>')
})
// info about: amount of contacts and date
app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(personToSearch => {
        const totalPersons = [...personToSearch];
        res.send(`
        <div>
        <h1>Phonebook has info for ${totalPersons.length} people</h1>
        <p>${date}<p>
        </div>
        `)
    })
    
})
// obtain the list of the persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(personToSearch => {
        res.json(personToSearch);
    })
})
// obtain an especific information about the contact with id
app.get('/api/persons/:id', (req, res, next) => {
    // const id = Number(req.params.id)
    // const person = persons.find(p => p.id === id);
    // if(person){
        //     res.json(person)
        // }else{
            //     res.status(404).send(`<h1>The person with id ${id}, doesn't exist in our database</h1>`);
            // }
            Person.findById(req.params.id).then(person => {
                if(person){
                    res.json(person)
                }else{
                    res.status(404).send('<h1>The resource does not exist in our database</h1>')
                }
            })
            .catch(err => {
                console.log(`The person with id: ${req.params.id} does not exist.`)
                next(err)
            })
            
        })
        
app.use(express.json())
        



//create a new contact
app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name||!body.number){
        return res.status(400).json({
            error: "content missing"
        })
    }

    // const findEqualName = Person.find({name:`${body.name}`})
    //     .then(result => result)

    // if(findEqualName){
    //     return res.status(400).json({
    //         error: "name must be unique"
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        console.log(savedPerson)
        res.json(savedPerson);
    })
})

// Update a contact
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson =>{
            res.json(updatedPerson)    
        })
        .catch(error => {
            next(error)
        })
})

// delete a contact
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    if(err.name === "CastError"){
        return res.status(400).send({error: 'malformatted id'})
    }
}

app.use(errorHandler)


const PORT = process.env.PORT;

app.listen(PORT)

console.log(`Server listening on port: http://localhost:${PORT}`);