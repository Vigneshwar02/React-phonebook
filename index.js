require('dotenv').config()
const express = require('express');
const app = express();
const cors =require('cors');
const Contact= require('./model/mongo');


app.use(cors())
app.use(express.static('build'))
app.use(express.json())



app.get('/',(req,res)=>{
    res.send("<h1>Running on port 3000</h1>")
})

app.get('/info',(req,res)=>{
    const date = new Date
    res.send(`<p>Phonebook has info of ${contact.length} people</p><p>${date}</p>`)
})

app.get('/api/contact',(req,res)=>{
    Contact.find({}).then(contact=>{
        res.json(contact)
    })
})

app.post('/api/contact',(req,res)=>{
    const personName = req.body.name;
    const num = req.body.number;


    if(personName ===undefined){
        return res.status(400).json({error:'name missing'})
    }

    if(num ===undefined){
        return res.status(400).json({error:'num missing'})
    }

    const contact = new Contact({
        name: personName,
        number: num
    }) 

     contact.save().then(savedContact=>res.json(savedContact))
})


app.get('/api/contact/:id',(req,res)=>{
    const id = req.params.id;
    Contact.find({name:id}).then(contact=>res.json(contact))
})

app.delete('/api/contact/:id',(req,res)=>{
    const id=req.params.id
    // contact= contact.filter(cont=>cont.id!== id)
    Contact.findByIdAndRemove(id).then(() => res.status(204)).end()

    // res.status(204).end()
})
console.log(process.env.PORT)
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server's running at ${port}`)
})