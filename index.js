const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

//runing port number
const port =  process.env.PORT || 4200;

//Middleware
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//mongodb connection

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lrix8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const menuCollection = client.db(`${process.env.DB_NAME}`).collection("menuItems");

  //all menu
  app.get('/menu-list', (req, res) => {
      menuCollection.find({})
      .toArray((err, menu) => {
          res.send(menu)
      })
  })

  //breakfast
  app.get('/menu-breakfast', (req, res) => {
      menuCollection.find({category:"breakfast"})
      .toArray((err, breakfast) => {
          res.send(breakfast)
      })
  })

  //lunch
  app.get('/menu-lunch', (req, res) => {
    menuCollection.find({category:"lunch"})
    .toArray((err, breakfast) => {
        res.send(breakfast)
    })
})

//dinner
app.get('/menu-dinner', (req, res) => {
    menuCollection.find({category:"dinner"})
    .toArray((err, breakfast) => {
        res.send(breakfast)
    })
})
  
  
});



app.get('/', (req, res) => {
    res.send("I am working on port " + port)
})

app.listen(port);