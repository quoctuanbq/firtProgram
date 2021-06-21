// import
const mongoose = require("mongoose");

// connect db
// mongodb+srv://tuanbqhe141256:tuan532001@cluster0.adtxn.mongodb.net/K11Mongo?retryWrites=true&w=majority
// mongoose.connect("mongodb+srv://tuanbqhe141256:tuan532001@cluster0.adtxn.mongodb.net/K11Mongo?retryWrites=true&w=majority", {
  mongoose.connect("mongodb://localhost/K11Mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// tạo schema
const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    role: String
  },
  { collection: "user" }
);

// tạo model
const UserModel = mongoose.model("user", UserSchema);
// UserModel.create({
//   username:'tuan2',
//   password:1231,
//   role: 'admin'
// })
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// })
// module.exports = UserModel;

