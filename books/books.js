//Load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//configure bodyPArser
app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose");

//load our Book model
require("./Book");
const Book = mongoose.model("Book");

//Connect = mongoose.connect(process.env.MONGO_URI)
mongoose.connect(
  "mongodb://gum:password01@ds137857.mlab.com:37857/booksservice",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Database is connected!");
  }
);

// Routes
app.get("/", (req, res) => {
  res.send("This is our Books service");
});

// create func
app.post("/book", (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher,
  };

  //Create new Book model instance
  var book = new Book(newBook);
  // save book
  book
    .save()
    .then(() => {
      console.log("New book created & Saved!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });

  // console.log(req.body);
  res.send("A new book was created with success in DB!");
});

// get all books route
app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      console.log(books);
      res.json(books);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// get a book by id route
app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        // Book data
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

// delete a book by it's id route
app.delete("/book/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send("Book removed with success!");
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// listen on port
app.listen(4545, () => {
  console.log("Up and running! -- This is our Books service on port 4545");
});
