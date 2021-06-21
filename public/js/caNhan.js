$.ajax({
  url: "/api/user/checkCookie",
  type: "POST",
})
  .then((data) => {
    console.log(data);
    if (data != "da dang nhap") {
      window.location.href = "/dangnhap";
    }
  })
  .catch((err) => {
    console.log(err);
    window.location.href = "/dangnhap";
  });
