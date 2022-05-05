let express = require("express");
let app = express();
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { use } = require("express/lib/application");
let port = process.env.PORT || 8230;
const mongoURL = process.env.mongoLiveUrl;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to express");
});

app.get("/categories", (req, res) => {
  db.collection("productCategory")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/probiotics", (req, res) => {
  db.collection("probioticsCategory")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/organics", (req, res) => {
  db.collection("organicsCategory")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/:category/all", (req, res) => {
  let category = req.params.category;
  let query = {};
  if (category === "probiotics") {
    query = { productCategory_name: "Probiotics" };
  } else if (category === "organics") {
    query = { productCategory_name: "Organics" };
  } else {
    return res.status(404).send("Category Not Found");
  }
  db.collection("items")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/items/", (req, res) => {
  let query = {};
  let itemId = Number(req.query.item);
  if (itemId) {
    query = { item_id: itemId };
  }
  db.collection("items")
    .find(query)
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
