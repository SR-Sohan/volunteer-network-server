const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdjzs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {

  const volunTeerItemCollection = client.db("volunteerNetwork").collection("volunteerItem");
  const volunTeerCollection = client.db("volunteerNetwork").collection("volunteer");

// Added Volunter Item
  app.post('/addVolunteerItem', (req,res)=> {
      const volunteerItem = req.body;
      volunTeerItemCollection.insertOne(volunteerItem)
      .then(result => {
        res.send(result)
      })
  });

  //Added Volunter Regsition data
  app.post('/addVolunteer', (req,res)=> {
    const volunteer = req.body;
    volunTeerCollection.insertOne(volunteer)
    .then(result => {
      res.send(result)
    })
  });

  //Delete  with id
  app.delete('/delete/:id', (req,res)=>{
      volunTeerCollection.deleteOne({_id: ObjectId(req.params.id)})
      .then( result => {
        res.send(result)
      })
  })


  // Get Volunteer Item 
  app.get( '/volunteerItem' , (req,res) =>{
    volunTeerItemCollection.find({})
    .toArray( (err, documets) =>{
      res.send(documets)
    })
  });

  // Find a Volunteer with id
  app.get('/volunteerId', (req,res) => {
    volunTeerItemCollection.find({})
    .toArray( (err, documets) =>{
      res.send(documets)
    })
  })

// Find volunteer Email and show event
  app.get('/eventList', (req,res) =>{
    volunTeerCollection.find({email: req.query.email})
    .toArray( (err, documets) => {
      res.send(documets)
    })
  })

  // Find volunteer list
  app.get('/volunteerList', (req,res) =>{
    volunTeerCollection.find({})
    .toArray( (err, documets) => {
      res.send(documets)
    })
  })

  //blank api
  app.get('/', (req,res)=>{
    res.send('Its working')
  })

  
});


app.listen( process.env.PORT || port )