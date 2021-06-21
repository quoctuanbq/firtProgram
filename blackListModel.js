// import
const mongoose = require("mongoose");

// connect db
mongoose.connect("mongodb://localhost/K11Mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


const BlackListSchema = mongoose.Schema({
  token: String
}, { collection: 'blackList' })

const BlackListModel = mongoose.model('blackList', BlackListSchema)

module.exports = BlackListModel