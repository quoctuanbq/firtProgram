// import
const mongoose = require("mongoose");

// connect db
mongoose.connect("mongodb://localhost/K11Mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// tạo schema
const TodoSchema = mongoose.Schema(
  {
    ten: String,
    hoanThanh: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "list" }
);

// tạo model
const TodoModel = mongoose.model("list", TodoSchema);

// export
module.exports = TodoModel;
