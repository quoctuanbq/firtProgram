const UserModel = require('./userModel')
const BlackListModel = require('./blackListModel')
const jwt = require('jsonwebtoken')

async function checkToken(req, res, next) {
  try {
    let cookie = req.cookies.user;
    let data = await BlackListModel.findOne({ token: cookie })
    if (data) {
      res.json('cookie không hợp lệ')
    } else {
      next()
    }
  }
  catch (error) {
    res.json('loi server')
  }

}

function checkCookie(req, res, next) {
  let cookie = req.cookies.user;
  let id = jwt.verify(cookie, 'thai').id
  UserModel.findOne({ _id: id })
    .then((data) => {
      if (data) {
        req.role = data.role
        next()
      } else {
        res.json("chua dang nhap");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkRoleAdmin(req, res, next) {
  console.log(req.role);
  if (req.role === 'admin') {
    next()
  } else {
    res.json('khong co quyen xoa user')
  }
}

module.exports = { checkCookie, checkRoleAdmin, checkToken }