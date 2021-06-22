// mongodb+srv://tuanbqhe141256:tuan532001@cluster0.adtxn.mongodb.net/K11Mongo?retryWrites=true&w=majority

    const mongodb= require('mongodb')
    // mongoose.connect("mongodb://localhost/K11Mongo", {
        mongoose.connect("mongodb+srv://tuanbqhe141256:tuan532001@cluster0.adtxn.mongodb.net/K11Mongo?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then((data) => {
          console.log(data);
      })
      .catch((error) => {
          console.error(error)
      })
module.exports =mongoose