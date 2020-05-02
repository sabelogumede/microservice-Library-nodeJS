const mongoose = require("mongoose");

// a model structure
mongoose.model("Book", {
  // Title, author, numberPages, publisher

  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  numberPages: {
    type: Number,
    require: false,
  },
  publisher: {
    type: String,
    require: true,
  },
});
