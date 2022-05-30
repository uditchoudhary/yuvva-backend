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
  db.collection("category")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/probiotics", (req, res) => {
  console.log("Probiotics");
  db.collection("productCategory")
    .find({ category_name: "Probiotics" })
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

app.get("/products/:productCategoryId", (req, res) => {
  let productCategoryId = Number(req.params.productCategoryId);
  const query = { productCategory_id: productCategoryId };
  db.collection("items")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/organics", (req, res) => {
  db.collection("productCategory")
    .find({ category_name: "Organics" })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/items", (req, res) => {
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

app.get("/items/:itemid", (req, res) => {
  let itemId = Number(req.params.itemid);
  db.collection("items").findOne({ item_id: itemId }, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/:category_id/all", (req, res) => {
  const categoryid = Number(req.params.category_id);
  const query = {
    category_id: categoryid,
  };

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
