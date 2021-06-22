// import + tạo app
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cookieParser = require("cookie-parser");
const UserRouter = require("./userRouter");
const TodoRouter = require('./todoRouter')
const BlackListModel = require('./blackListModel')
const app = express();
const checkAuth = require('./checkAuth')
const port= process.env.PORT||3000

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// static
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/api/user/", UserRouter);
app.use('/api/todo/', TodoRouter)
// html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/todo.html"));
});

app.get("/dangky", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/dangky.html"));
});

app.get("/dangnhap", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/dangnhap.html"));
});
app.get("/caNhan", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/caNhan.html"));
});

app.post('/api/blackList/', checkAuth.checkCookie, (req, res) => {
  let token = req.cookies.user
  BlackListModel.create({ token: token })
    .then(data => {
      res.json('đăng xuất thành công')
    }).catch(err => {
      res.json('loi server')
    }
    )
})

// tạo cổng nghe
app.listen(port);
