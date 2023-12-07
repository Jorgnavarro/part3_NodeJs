import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import uniqueValidator from 'mongoose-unique-validator';

const url = process.env.MONGODB_URI


console.log('conecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('Conected to MongoDB')
    })
    .catch(err => { 
        console.log('Error connecting to MongoDB: ', err.message);
    })

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number:{
        type: String,
        minlength: 8,
        required: true,
        unique: true
    } 
})

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', { 
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person;
