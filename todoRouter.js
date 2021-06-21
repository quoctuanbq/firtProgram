const express = require("express");
const TodoModel = require("./todoModel");
const router = express.Router();
const checkAuth = require('./checkAuth')

// lấy toàn bộ
router.get("/", (req, res) => {
  TodoModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// lấy cụ thể 1 data
router.get("/:id", (req, res) => {
  let id = req.params.id;
  TodoModel.findOne({ _id: id })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json("khong tim thay");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});
// Xóa nhiều bản ghi
router.delete("/deleteMany", checkAuth.checkCookie , (req, res) => {
  TodoModel.deleteMany({ _id: { $in: req.body["list[]"] } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// thêm data
router.post("/", checkAuth.checkCookie , (req, res) => {
  TodoModel.create({ ten: req.body.ten })
    .then((data) => {
      if (data) {
        res.json({
          mes: "tao thanh cong",
          err: false,
          data: data,
          status: 200,
        });
      } else {
        res.json({
          mes: "tao that bai",
          err: false,
          data: false,
          status: 300,
        });
      }
    })
    .catch((err) => {
      res.json({
        mes: "loi server",
        err: err,
        data: false,
        status: 500,
      });
    });
});

// xóa data
router.delete("/:id",checkAuth.checkCookie, (req, res) => {
  let id = req.params.id;
  TodoModel.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount) {
        res.json("xoa thanh cong");
      } else {
        res.json("xoa that bai");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});


// sửa data
router.put("/:id",checkAuth.checkCookie, (req, res) => {
  let id = req.params.id;
  TodoModel.updateOne({ _id: id }, { ten: req.body.ten })
    .then((data) => {
      if (data.nModified) {
        res.json("update thanh cong");
      } else {
        res.json("noi dung khong doi");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router