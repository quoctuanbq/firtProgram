const express = require("express");
const UserModel = require("./userModel");
const router = express.Router();
const checkAuth = require('./checkAuth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/dangNhap", async (req, res) => {
  try {
    let data = await UserModel.findOne({ username: req.body.username })
    if (data) {
      var crypt = await bcrypt.compare(req.body.password, data.password)
      if (crypt) {
        let token = jwt.sign({ id: data._id }, 'thai')
        res.json({ token: token });
      } else {
        res.json({ token: '' })
      }
    }
    else {
      res.json({ token: '' })
    }
  } catch (error) {
    res.json(err);
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  UserModel.findOne({ username: req.body.username })
    .then(data => {
      if (data) {
        res.json('user da ton tai')
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            UserModel.create({ username: req.body.username, password: hash })
              .then((data) => {
                res.json("tao tk thanh cong");
              })
              .catch((err) => {
                res.json(err);
              });
          });
        });
      }
    })
});

router.post("/checkCookie", checkAuth.checkToken, checkAuth.checkCookie, (req, res) => {
  res.json("da dang nhap")
});

router.put('/:id', checkAuth.checkCookie, (req, res) => {
  let id = req.params.id
  let username = req.body.username
  let password = req.body.password
  let newPass = req.body.newPass

  UserModel.updateOne({ _id: id, password: password, username: username }, { password: newPass })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })

})

router.delete('/:id', checkAuth.checkCookie, (req, res, next) => {
  if (req.role === 'admin') {
    next()
  } else {
    res.json('khong co quyen')
  }
},
  (req, res) => {
    UserModel.deleteOne({ _id: req.params.id })
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json(err)
      })
  })

module.exports = router;
