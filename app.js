let express = require("express");
let app = express();
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const dotenv = require("dotenv"); 
dotenv.config(); 
let port = process.env.PORT || 8230;
const mongoURL = process.env.mongoLiveUrl;

app.get("/", (req, res) => {
  res.send("Welcome to express");
});

app.get("/productCategory", (req, res) => {
  db.collection("productCategory")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// connection with database
MongoClient.connect(mongoURL, (err, client) => {

  if (err) console.log("Failed to connect db", err);
  db = client.db("yuvva-products-db");
  app.listen(port, () => {
    console.log("server is running at port ", port);
  });
});
