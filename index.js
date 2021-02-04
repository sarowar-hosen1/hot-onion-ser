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

  app.post("/data", (req, res) => {
      const data = req.body;
      menuCollection.insertMany(data)
      .then(result => {
          if(result.insertedCount > 0) {
              res.send(result)
          }
      })
  })
  
});



app.get('/', (req, res) => {
    res.send("I am working on port " + port)
})

app.listen(port);