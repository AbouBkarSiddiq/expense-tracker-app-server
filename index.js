var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:kuchb@cluster0.9fr59.mongodb.net/expense-tracker?retryWrites=true&w=majority";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/get-transactions', (req, res) => {
  let transactions = [];
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    transactions = client.db("expense-tracker").collection("transaction").find().toArray(function(err, docs) {
      transactions = docs;
    });
    client.close();
  });
  res.status(200).send(transactions);
});

app.post('/add-transaction', (req, res) => {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    const doc = {
      description: req.body.description,
      amount: req.body.amount,
      createdAt: new Date()
    }
    client.db("expense-tracker").collection("transaction").insertOne(doc).then((response)=>{
      client.close();
      res.status(201).send("Transaction added successfully!");
    })
  });
});

app.post('/delete-transaction', (req, res) => {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    transactions = client.db("expense-tracker").collection("transaction").find().toArray(function(err, docs) {
      transactions = docs;
    });
    client.close();
  });
  res.status(200).send("Transaction deleted successfully!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
