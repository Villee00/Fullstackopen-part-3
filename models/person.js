const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`)
  })

const personSchema = new mongoose.Schema({
  name:  {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number:  {
    type: String,
    minLength: 8,
    required: true
  },
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)