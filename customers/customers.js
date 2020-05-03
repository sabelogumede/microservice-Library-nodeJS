const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//configure bodyPArser
app.use(bodyParser.json());

//Connect = mongoose.connect(process.env.MONGO_URI)
mongoose.connect(
  "mongodb://gum:password02@ds161411.mlab.com:61411/customersservice",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Database is connected - Customers service!");
  }
);

//load our Customer model
require("./Customer");
const Customer = mongoose.model("Customer");

//create func
app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  //Create new Customer model instance
  var customer = new Customer(newCustomer);
  // save customer
  customer
    .save()
    .then(() => {
      res.send("New customer created & Saved!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// get all customers
app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// get one customer
app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.send(customer);
      } else {
        res.send("Invalid ID!");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// delete customer by ID
app.delete("/customer/:id", (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("customer deleted success");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// app listing port
app.listen("5555", () => {
  console.log("Up and running - Customers service");
});
