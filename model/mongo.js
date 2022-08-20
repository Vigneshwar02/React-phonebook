
const mongoose = require('mongoose')




const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(result=>console.log("connected successfully"))
    .catch(err=> console.log(err.message))

const contactSchema = new mongoose.Schema({
        id: String,
        name: String,
        number: String,
    })

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports= mongoose.model('Contact',contactSchema)