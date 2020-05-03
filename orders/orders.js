const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// configure bodyParser
app.use(bodyParser.json());

// connect our db
mongoose.connect(
  "mongodb://gum:password03@ds161411.mlab.com:61411/ordersservice",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to our orders service");
  }
);

//load our model
require("./Order");
const Order = mongoose.model("Order");

//create a new order
app.post("/order", (req, res) => {
  //new order, convert IDs to objectIds with mongoose
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };
  //inatialize new order instance
  var order = new Order(newOrder);
  //save
  order
    .save()
    .then(() => {
      res.send("Order create successfully");
      console.log("order created with success");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  console.log("Testit out");
});

//list orders
app.get("/orders", (req, res) => {
  Order.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen("7777", () => {
  console.log("Up and running - Orders service");
});
